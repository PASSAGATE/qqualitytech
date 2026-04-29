"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, ShoppingCart } from "lucide-react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const detailHref = `/equipment/${row.item.slug}?id=${row.equipmentId}`;
  const hasAnyMode = row.saleEnabled || row.rentalEnabled;

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className="group flex cursor-pointer flex-col overflow-hidden rounded-sm bg-surface-container-lowest transition-all hover:-translate-y-1"
      >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={row.item.image}
          alt={row.item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
            {row.typeLabel}
          </span>
          <span className="text-xs font-black text-secondary">{row.item.model}</span>
        </div>

        <h2 className="mb-4 text-xl font-extrabold leading-tight text-primary">
          {row.item.title}
        </h2>

        <div className="mb-4 flex-1 space-y-2">
          <div className="flex justify-between border-b border-outline-variant/10 pb-2 text-xs">
            <span className="font-medium text-on-surface-variant">판매가</span>
            <span className="font-bold text-primary">
              {row.salePrice.toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
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
              className="inline-flex items-center justify-center rounded-md border border-outline-variant/40 py-2 text-base font-black leading-none text-primary transition-colors hover:bg-surface-container-low disabled:opacity-60"
              aria-label="장바구니 추가"
            >
              {loadingMode ? (
                "…"
              ) : (
                <ShoppingCart className="size-4" aria-hidden="true" />
              )}
            </button>
          ) : (
            <span className="inline-flex items-center justify-center rounded-md border border-outline-variant/20 py-2 text-xs font-semibold text-on-surface-variant">
              장바구니 추가 불가
            </span>
          )}
        </div>

        {feedback ? (
          <p className="mt-2 text-xs font-semibold text-secondary">{feedback}</p>
        ) : null}
      </div>

      </article>
      {mounted && addFxPhase !== "hidden"
        ? createPortal(
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
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
