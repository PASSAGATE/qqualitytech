"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AddToCartPanelProps = {
  equipmentId: string;
  saleEnabled: boolean;
  rentalEnabled: boolean;
};

type ApiError = {
  message?: string;
  error?: string;
};

async function addToCart(
  equipmentId: string,
  mode: "buy" | "rent",
): Promise<{ ok: boolean; message?: string }> {
  try {
    const payload =
      mode === "rent"
        ? { equipmentId, mode, count: 1, rentalMonths: 12 }
        : { equipmentId, mode, count: 1 };

    const response = await fetch("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = "장바구니 추가에 실패했습니다.";
      try {
        const data = (await response.json()) as ApiError;
        message = data.message ?? data.error ?? message;
      } catch {
        // ignore parse errors
      }
      return { ok: false, message };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "백엔드 연결에 실패했습니다." };
  }
}

export function AddToCartPanel({
  equipmentId,
  saleEnabled,
  rentalEnabled,
}: AddToCartPanelProps) {
  const router = useRouter();
  const [loadingMode, setLoadingMode] = useState<"buy" | "rent" | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="space-y-2 rounded-sm border border-outline-variant/20 bg-surface-container-low p-4">
      <p className="text-xs font-bold uppercase text-on-surface-variant">
        장바구니 담기
      </p>
      <div className="grid grid-cols-2 gap-2">
        {saleEnabled ? (
          <button
            type="button"
            disabled={loadingMode !== null}
            onClick={async () => {
              setFeedback(null);
              setLoadingMode("buy");
              const result = await addToCart(equipmentId, "buy");
              setLoadingMode(null);
              if (!result.ok) {
                if (result.message === "Unauthorized") {
                  router.push("/login?error=로그인이%20필요합니다.");
                  return;
                }
                setFeedback(result.message ?? "장바구니 추가에 실패했습니다.");
                return;
              }
              setFeedback("장바구니에 추가되었습니다.");
              window.dispatchEvent(new CustomEvent("cart:changed"));
            }}
            className="inline-flex w-full items-center justify-center rounded-sm border border-outline-variant/40 px-2 py-2 text-xs font-bold text-primary transition-colors hover:bg-surface-container-high disabled:opacity-60"
          >
            {loadingMode === "buy" ? "추가 중..." : "구매 담기"}
          </button>
        ) : (
          <span className="inline-flex items-center justify-center rounded-sm border border-outline-variant/25 px-2 py-2 text-xs font-semibold text-on-surface-variant">
            구매 불가
          </span>
        )}
        {rentalEnabled ? (
          <button
            type="button"
            disabled={loadingMode !== null}
            onClick={async () => {
              setFeedback(null);
              setLoadingMode("rent");
              const result = await addToCart(equipmentId, "rent");
              setLoadingMode(null);
              if (!result.ok) {
                if (result.message === "Unauthorized") {
                  router.push("/login?error=로그인이%20필요합니다.");
                  return;
                }
                setFeedback(result.message ?? "장바구니 추가에 실패했습니다.");
                return;
              }
              setFeedback("장바구니에 추가되었습니다.");
              window.dispatchEvent(new CustomEvent("cart:changed"));
            }}
            className="inline-flex w-full items-center justify-center rounded-sm border border-outline-variant/40 px-2 py-2 text-xs font-bold text-primary transition-colors hover:bg-surface-container-high disabled:opacity-60"
          >
            {loadingMode === "rent" ? "추가 중..." : "임대 담기"}
          </button>
        ) : (
          <span className="inline-flex items-center justify-center rounded-sm border border-outline-variant/25 px-2 py-2 text-xs font-semibold text-on-surface-variant">
            임대 불가
          </span>
        )}
      </div>
      {feedback ? (
        <p className="text-xs font-semibold text-secondary">{feedback}</p>
      ) : null}
    </div>
  );
}

