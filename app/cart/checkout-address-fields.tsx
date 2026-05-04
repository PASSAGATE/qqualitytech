"use client";

import type {
  AddressSearchResult,
  DeliveryMethod,
} from "./checkout-preview-types";

type CheckoutAddressFieldsProps = {
  address: string;
  addressKeyword: string;
  addressResults: AddressSearchResult[];
  addressSearchError: string | null;
  addressSearchLoading: boolean;
  companyName: string;
  deliveryMethod: DeliveryMethod;
  requiresDeliveryFields: boolean;
  onAddressChange: (value: string) => void;
  onAddressKeywordChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
  onDeliveryMethodChange: (value: DeliveryMethod) => void;
  onSelectAddress: (result: AddressSearchResult) => void;
};

export function CheckoutAddressFields({
  address,
  addressKeyword,
  addressResults,
  addressSearchError,
  addressSearchLoading,
  companyName,
  deliveryMethod,
  requiresDeliveryFields,
  onAddressChange,
  onAddressKeywordChange,
  onCompanyNameChange,
  onDeliveryMethodChange,
  onSelectAddress,
}: CheckoutAddressFieldsProps) {
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="deliveryMethod"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={() => onDeliveryMethodChange("pickup")}
          />
          픽업
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="deliveryMethod"
            value="delivery"
            checked={deliveryMethod === "delivery"}
            onChange={() => onDeliveryMethodChange("delivery")}
          />
          배송
        </label>
      </div>

      {requiresDeliveryFields ? (
        <div className="grid gap-3">
          <div className="grid gap-2">
            <input
              value={addressKeyword}
              onChange={(event) => onAddressKeywordChange(event.target.value)}
              placeholder="도로명/건물명으로 주소 검색"
              className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
            />
            <p className="text-[11px] text-on-surface-variant">
              주소 검색은 입력 시 자동으로 진행됩니다.
            </p>
            {addressSearchLoading ? (
              <p className="text-xs font-semibold text-on-surface-variant">
                검색 중...
              </p>
            ) : null}

            {addressSearchError ? (
              <p className="text-xs font-semibold text-[#b42318]">
                {addressSearchError}
              </p>
            ) : null}

            {addressResults.length > 0 ? (
              <div className="max-h-52 overflow-y-auto rounded-md border border-outline-variant/25 bg-surface-container-low">
                {addressResults.map((result, index) => (
                  <button
                    key={`${result.roadAddr}-${result.zipNo}-${index}`}
                    type="button"
                    onClick={() => onSelectAddress(result)}
                    className="block w-full border-b border-outline-variant/15 px-3 py-2 text-left transition-colors hover:bg-surface-container-high last:border-b-0"
                  >
                    <p className="text-sm font-semibold text-primary">
                      {result.roadAddr}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      지번: {result.jibunAddr || "-"} / 우편번호:{" "}
                      {result.zipNo || "-"}
                    </p>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <input
            value={address}
            onChange={(event) => onAddressChange(event.target.value)}
            placeholder="상세 주소를 포함해 최종 배송 주소를 확인해 주세요"
            className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
          />
        </div>
      ) : null}

      <input
        value={companyName}
        onChange={(event) => onCompanyNameChange(event.target.value)}
        placeholder="회사명 (선택)"
        className="w-full rounded-md border border-outline-variant/40 px-3 py-2 text-sm outline-none focus:border-secondary"
      />
    </div>
  );
}
