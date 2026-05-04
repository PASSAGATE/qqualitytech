"use client";

import type { CheckoutPreviewResponse } from "./checkout-preview-types";

type CheckoutPreviewResultProps = {
  confirming: boolean;
  preview: CheckoutPreviewResponse;
  onConfirm: () => void;
};

export function CheckoutPreviewResult({
  confirming,
  preview,
  onConfirm,
}: CheckoutPreviewResultProps) {
  return (
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
        onClick={onConfirm}
        disabled={confirming}
        className="mt-4 w-full rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {confirming ? "주문 처리 중..." : "주문 확정"}
      </button>
    </div>
  );
}
