"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, ShoppingCart } from "lucide-react";
import type { EquipmentAdminRow } from "./repository";

type EquipmentCardProps = {
  row: EquipmentAdminRow;
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
        ? { equipmentId, mode, count: 1, rentalMonths: 6 }
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

export function EquipmentCard({ row }: EquipmentCardProps) {
  const router = useRouter();
  const [loadingMode, setLoadingMode] = useState<"buy" | "rent" | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [addFxPhase, setAddFxPhase] = useState<"hidden" | "center" | "fly">(
    "hidden",
  );
  const detailHref = `/equipment/${row.item.slug}?id=${row.equipmentId}`;
  const hasAnyMode = row.saleEnabled || row.rentalEnabled;

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={() => {
          router.push(detailHref);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            router.push(detailHref);
          }
        }}
        className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-black bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
      >
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <Image
            src={row.item.image}
            alt={row.item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
              boxShadow: "0 10px 20px rgba(255, 107, 44, 0.35)",
            }}
          >
            {row.categoryLabel}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded-md bg-surface-container-low px-2 py-1 text-[10px] font-bold text-on-surface-variant">
              {row.typeLabel}
            </span>
            <span className="text-[11px] font-bold text-secondary">{row.item.model}</span>
          </div>

          <h2 className="mb-4 line-clamp-2 min-h-[3rem] text-lg font-extrabold leading-tight text-primary">
            {row.item.title}
          </h2>

          <div className="mb-4 rounded-xl bg-slate-50 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
              판매가
            </p>
            <p className="mt-1 text-xl font-black text-primary">
              {row.salePrice.toLocaleString("ko-KR")}원
            </p>
          </div>

          <div className="mt-auto grid grid-cols-1 gap-2">
            {hasAnyMode ? (
              <button
                type="button"
                disabled={loadingMode !== null}
                onClick={async (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  const mode = row.saleEnabled ? "buy" : "rent";

                  setFeedback(null);
                  setLoadingMode(mode);
                  const result = await addToCart(row.equipmentId, mode);
                  setLoadingMode(null);
                  if (!result.ok) {
                    if (result.message === "Unauthorized") {
                      router.push("/login?error=로그인이%20필요합니다.");
                      return;
                    }
                    setFeedback(result.message ?? "장바구니 추가에 실패했습니다.");
                    return;
                  }
                  setFeedback(null);
                  setAddFxPhase("center");
                  setTimeout(() => setAddFxPhase("fly"), 1000);
                  setTimeout(() => setAddFxPhase("hidden"), 1750);
                  window.dispatchEvent(new CustomEvent("cart:changed"));
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-extrabold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                  boxShadow: "0 12px 24px rgba(255, 107, 44, 0.30)",
                }}
                aria-label="장바구니 추가"
              >
                {loadingMode ? (
                  "추가 중..."
                ) : (
                  <>
                    <ShoppingCart className="size-4" aria-hidden="true" />
                    담기
                  </>
                )}
              </button>
            ) : (
              <span className="inline-flex items-center justify-center rounded-xl border border-outline-variant/20 py-2.5 text-xs font-semibold text-on-surface-variant">
                장바구니 추가 불가
              </span>
            )}
          </div>

          {feedback ? (
            <p className="mt-2 text-xs font-semibold text-secondary">{feedback}</p>
          ) : null}
        </div>

      </article>
      {addFxPhase !== "hidden" ? (
        <div className="pointer-events-none fixed inset-0 z-[150]">
          <div
            className={
              addFxPhase === "center"
                ? "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-2xl transition-all duration-700"
                : "absolute left-1/2 top-1/2 flex translate-x-[42vw] -translate-y-[44vh] scale-50 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-white opacity-0 shadow-2xl transition-all duration-700"
            }
          >
            <ShoppingCart className="size-5" aria-hidden="true" />
            <Plus className="size-4" aria-hidden="true" />
            장바구니에 추가됨
          </div>
        </div>
      ) : null}
    </>
  );
}
