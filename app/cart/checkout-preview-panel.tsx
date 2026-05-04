"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartResponse } from "@/lib/backend/cart";
import { CheckoutAddressFields } from "./checkout-address-fields";
import { CheckoutPreviewResult } from "./checkout-preview-result";
import type {
  AddressSearchResult,
  CheckoutPreviewResponse,
  DeliveryFeeOption,
  DeliveryMethod,
} from "./checkout-preview-types";
import {
  readApiErrorMessage,
  resolveRegionFromAddressResult,
  resolveRegionFromAddressText,
} from "./checkout-preview-utils";

type CheckoutPreviewPanelProps = {
  cart: CartResponse;
  onConfirmed?: () => void;
};

export function CheckoutPreviewPanel({
  cart,
  onConfirmed,
}: CheckoutPreviewPanelProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    "pickup",
  );
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [regionOptions, setRegionOptions] = useState<DeliveryFeeOption[]>([]);
  const [addressKeyword, setAddressKeyword] = useState("");
  const [addressResults, setAddressResults] = useState<AddressSearchResult[]>(
    [],
  );
  const [addressSearchLoading, setAddressSearchLoading] = useState(false);
  const [addressSearchError, setAddressSearchError] = useState<string | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CheckoutPreviewResponse | null>(null);
  const [confirmSuccess, setConfirmSuccess] = useState<string | null>(null);

  const hasItems = cart.items.length > 0;
  const requiresDeliveryFields = deliveryMethod === "delivery";

  const isSubmitDisabled = useMemo(() => {
    if (!hasItems || loading || loadingRegions) {
      return true;
    }
    if (!requiresDeliveryFields) {
      return false;
    }
    return address.trim().length === 0;
  }, [address, hasItems, loading, loadingRegions, requiresDeliveryFields]);

  useEffect(() => {
    let mounted = true;
    const loadRegions = async () => {
      setLoadingRegions(true);
      try {
        const response = await fetch("/api/delivery-fees", {
          cache: "no-store",
        });
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as DeliveryFeeOption[];
        if (!mounted) {
          return;
        }
        setRegionOptions(Array.isArray(data) ? data : []);
      } catch {
        // ignore and keep empty options
      } finally {
        if (mounted) {
          setLoadingRegions(false);
        }
      }
    };

    void loadRegions();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectAddress = (result: AddressSearchResult) => {
    setAddress(result.roadAddr);
    const matchedRegion = resolveRegionFromAddressResult(result, regionOptions);
    if (matchedRegion) {
      setRegion(matchedRegion);
    }
    setAddressResults([]);
    setAddressSearchError(null);
  };

  useEffect(() => {
    if (!requiresDeliveryFields) {
      setAddressSearchLoading(false);
      setAddressSearchError(null);
      setAddressResults([]);
      return;
    }

    const keyword = addressKeyword.trim();
    if (keyword.length === 0) {
      setAddressSearchLoading(false);
      setAddressSearchError(null);
      setAddressResults([]);
      return;
    }

    if (keyword.length < 2) {
      setAddressSearchLoading(false);
      setAddressSearchError("검색어를 2자 이상 입력해 주세요.");
      setAddressResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setAddressSearchError(null);
      setAddressSearchLoading(true);
      try {
        const response = await fetch(
          `/api/address-search?keyword=${encodeURIComponent(keyword)}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (!response.ok) {
          const message = await readApiErrorMessage(
            response,
            `주소 검색 실패 (${response.status})`,
          );
          setAddressSearchError(message);
          setAddressResults([]);
          return;
        }

        const data = (await response.json()) as AddressSearchResult[];
        setAddressResults(Array.isArray(data) ? data : []);
        if (!Array.isArray(data) || data.length === 0) {
          setAddressSearchError("검색 결과가 없습니다.");
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAddressSearchError("주소 검색 서버 연결에 실패했습니다.");
          setAddressResults([]);
        }
      } finally {
        setAddressSearchLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [addressKeyword, requiresDeliveryFields]);

  const handlePreview = async () => {
    setError(null);
    setConfirmSuccess(null);

    const resolvedRegion = requiresDeliveryFields
      ? region.trim() || resolveRegionFromAddressText(address, regionOptions)
      : undefined;
    if (requiresDeliveryFields && !resolvedRegion) {
      setPreview(null);
      setError("주소에서 지역을 확인할 수 없습니다. 도로명 주소를 다시 선택해 주세요.");
      return;
    }
    if (resolvedRegion) {
      setRegion(resolvedRegion);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/checkout/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryMethod,
          region: resolvedRegion,
          address: requiresDeliveryFields ? address.trim() : undefined,
          companyName: companyName.trim() || undefined,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const message = await readApiErrorMessage(
          response,
          `요청 실패 (${response.status})`,
        );
        setPreview(null);
        setError(message);
        return;
      }

      const data = (await response.json()) as CheckoutPreviewResponse;
      setPreview(data);
    } catch {
      setPreview(null);
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview) {
      return;
    }

    setError(null);
    setConfirmSuccess(null);

    const resolvedRegion = requiresDeliveryFields
      ? region.trim() || resolveRegionFromAddressText(address, regionOptions)
      : undefined;
    if (requiresDeliveryFields && !resolvedRegion) {
      setError("주소에서 지역을 확인할 수 없습니다. 도로명 주소를 다시 선택해 주세요.");
      return;
    }
    if (resolvedRegion) {
      setRegion(resolvedRegion);
    }

    setConfirming(true);

    try {
      const response = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryMethod,
          region: resolvedRegion,
          address: requiresDeliveryFields ? address.trim() : undefined,
          companyName: companyName.trim() || undefined,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const message = await readApiErrorMessage(
          response,
          `요청 실패 (${response.status})`,
        );
        setError(message);
        return;
      }

      onConfirmed?.();
      window.dispatchEvent(new CustomEvent("cart:changed"));
      setConfirmSuccess("주문이 생성되었습니다. 결제를 진행해 주세요.");
      const Swal = (await import("sweetalert2")).default;
      void Swal.fire({
        icon: "success",
        title: "주문이 생성되었습니다.",
        text: "결제를 진행해 주세요.",
        confirmButtonText: "확인",
        confirmButtonColor: "#175cd3",
      });
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <section className="mt-4 rounded-md border border-outline-variant/20 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-primary">결제 미리보기</h3>
      <p className="mt-1 text-xs text-on-surface-variant">
        배송 방식/지역을 선택하면 예상 결제 금액을 확인할 수 있습니다.
      </p>

      <CheckoutAddressFields
        address={address}
        addressKeyword={addressKeyword}
        addressResults={addressResults}
        addressSearchError={addressSearchError}
        addressSearchLoading={addressSearchLoading}
        companyName={companyName}
        deliveryMethod={deliveryMethod}
        requiresDeliveryFields={requiresDeliveryFields}
        onAddressChange={setAddress}
        onAddressKeywordChange={setAddressKeyword}
        onCompanyNameChange={setCompanyName}
        onDeliveryMethodChange={setDeliveryMethod}
        onSelectAddress={handleSelectAddress}
      />

      {error ? (
        <p className="mt-4 rounded-sm bg-[#fde8e8] px-3 py-2 text-xs font-semibold text-[#b42318]">
          {error}
        </p>
      ) : null}
      {confirmSuccess ? (
        <p className="mt-4 rounded-sm bg-[#e7f6ec] px-3 py-2 text-xs font-semibold text-[#1d7a3a]">
          {confirmSuccess}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handlePreview}
        disabled={isSubmitDisabled}
        className="mt-4 w-full rounded-md bg-primary-container px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "계산 중..." : "결제 미리보기 계산"}
      </button>

      {preview ? (
        <CheckoutPreviewResult
          confirming={confirming}
          preview={preview}
          onConfirm={handleConfirm}
        />
      ) : null}
    </section>
  );
}
