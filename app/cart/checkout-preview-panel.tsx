"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartResponse } from "@/lib/backend/cart";

type CheckoutPreviewItem = {
  cartItemId: string;
  equipmentId: string;
  equipmentName: string;
  equipmentCode: string | null;
  mode: "buy" | "rent";
  count: number;
  rentalMonths: number | null;
  unitPrice: number;
  lineTotal: number;
};

type CheckoutPreviewResponse = {
  deliveryMethod: "delivery" | "pickup";
  buyOrderPreview: {
    itemCount: number;
    subtotal: number;
    items: CheckoutPreviewItem[];
  };
  rentOrderPreview: {
    itemCount: number;
    subtotal: number;
    items: CheckoutPreviewItem[];
  };
  deliveryFee: number;
  totalPrice: number;
};

type ApiError = {
  message?: string;
  error?: string;
};

type DeliveryFeeOption = {
  id: string;
  region: string;
  fee: number;
  isActive: boolean;
};

type CheckoutPreviewPanelProps = {
  cart: CartResponse;
};

export function CheckoutPreviewPanel({ cart }: CheckoutPreviewPanelProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "pickup",
  );
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [regionOptions, setRegionOptions] = useState<DeliveryFeeOption[]>([]);
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
    return region.trim().length === 0 || address.trim().length === 0;
  }, [address, hasItems, loading, loadingRegions, region, requiresDeliveryFields]);

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

  const handlePreview = async () => {
    setError(null);
    setConfirmSuccess(null);
    setLoading(true);

    try {
      const response = await fetch("/api/checkout/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryMethod,
          region: requiresDeliveryFields ? region.trim() : undefined,
          address: requiresDeliveryFields ? address.trim() : undefined,
          companyName: companyName.trim() || undefined,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        let message = `요청 실패 (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse error
        }
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
    setConfirming(true);

    try {
      const response = await fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryMethod,
          region: requiresDeliveryFields ? region.trim() : undefined,
          address: requiresDeliveryFields ? address.trim() : undefined,
          companyName: companyName.trim() || undefined,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        let message = `요청 실패 (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse error
        }
        setError(message);
        return;
      }

      setConfirmSuccess("주문이 접수되었습니다. 결제를 진행해 주세요.");
      window.dispatchEvent(new CustomEvent("cart:changed"));
      setTimeout(() => {
        window.location.href = "/cart?confirmed=1";
      }, 450);
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

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="deliveryMethod"
              value="pickup"
              checked={deliveryMethod === "pickup"}
              onChange={() => setDeliveryMethod("pickup")}
            />
            픽업
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="deliveryMethod"
              value="delivery"
              checked={deliveryMethod === "delivery"}
              onChange={() => setDeliveryMethod("delivery")}
            />
            배송
          </label>
        </div>

        {requiresDeliveryFields ? (
          <div className="grid gap-3">
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
            >
              <option value="">
                {loadingRegions ? "지역 불러오는 중..." : "배송 지역을 선택해 주세요"}
              </option>
              {regionOptions.map((option) => (
                <option key={option.id} value={option.region}>
                  {option.region} ({option.fee.toLocaleString("ko-KR")}원)
                </option>
              ))}
            </select>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="배송 주소"
              className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
            />
          </div>
        ) : null}

        <input
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="회사명 (선택)"
          className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
        />
      </div>

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
        <div className="mt-4 rounded-md bg-surface-container-low p-4 text-sm">
          <div className="space-y-1 text-on-surface-variant">
            <p>
              구매 소계:{" "}
              <span className="font-semibold text-primary">
                {preview.buyOrderPreview.subtotal.toLocaleString("ko-KR")}원
              </span>
            </p>
            <p>
              임대 소계:{" "}
              <span className="font-semibold text-primary">
                {preview.rentOrderPreview.subtotal.toLocaleString("ko-KR")}원
              </span>
            </p>
            <p>
              배송비:{" "}
              <span className="font-semibold text-primary">
                {preview.deliveryFee.toLocaleString("ko-KR")}원
              </span>
            </p>
          </div>

          <div className="mt-3 border-t border-outline-variant/20 pt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
              Preview Total
            </p>
            <p className="mt-1 text-xl font-black text-primary">
              {preview.totalPrice.toLocaleString("ko-KR")}원
            </p>
          </div>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={confirming}
            className="mt-4 w-full rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {confirming ? "주문 처리 중..." : "주문 확정"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
