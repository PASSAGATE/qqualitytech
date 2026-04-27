"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CartItem, CartResponse } from "@/lib/backend/cart";
import { CheckoutPreviewPanel } from "./checkout-preview-panel";

type ApiError = {
  message?: string;
  error?: string;
};

type CartLivePanelProps = {
  cart: CartResponse;
  defaultImage: string;
};

type DraftItem = CartItem & {
  draftCount: number;
  draftRentalMonths: number;
};

function toDraftItems(items: CartItem[]): DraftItem[] {
  return items.map((item) => ({
    ...item,
    draftCount: item.count,
    draftRentalMonths: item.rentalMonths ?? 6,
  }));
}

function toFriendlyError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("requested quantity exceeds available stock")) {
    return "요청 수량이 현재 재고를 초과했습니다.";
  }
  if (normalized.includes("insufficient stock")) {
    return "재고가 부족합니다. 수량을 줄여 주세요.";
  }
  if (normalized.includes("cart item not found")) {
    return "장바구니 항목을 찾을 수 없습니다.";
  }
  return message;
}

export function CartLivePanel({ cart, defaultImage }: CartLivePanelProps) {
  const [items, setItems] = useState<DraftItem[]>(() => toDraftItems(cart.items));
  const [error, setError] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, string>>({});
  const [savingIds, setSavingIds] = useState<Record<string, boolean>>({});
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const liveSummary = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const lineTotal =
          item.mode === "buy"
            ? item.unitPrice * item.draftCount
            : item.unitPrice * item.draftCount * item.draftRentalMonths;

        acc.itemCount += 1;
        acc.totalQuantity += item.draftCount;

        if (item.mode === "buy") {
          acc.buySubtotal += lineTotal;
        } else {
          acc.rentSubtotal += lineTotal;
        }

        acc.totalAmount = acc.buySubtotal + acc.rentSubtotal;
        return acc;
      },
      {
        itemCount: 0,
        totalQuantity: 0,
        buySubtotal: 0,
        rentSubtotal: 0,
        totalAmount: 0,
      },
    );
  }, [items]);

  const cartForPreview: CartResponse = {
    ...cart,
    items: items.map((item) => ({
      ...item,
      count: item.draftCount,
      rentalMonths:
        item.mode === "rent" ? item.draftRentalMonths : item.rentalMonths,
      lineTotal:
        item.mode === "buy"
          ? item.unitPrice * item.draftCount
          : item.unitPrice * item.draftCount * item.draftRentalMonths,
    })),
    summary: liveSummary,
  };

  const scheduleUpdate = (itemId: string, payload: Record<string, number>) => {
    const existing = debounceTimers.current[itemId];
    if (existing) {
      clearTimeout(existing);
    }

    debounceTimers.current[itemId] = setTimeout(async () => {
      setSavingIds((prev) => ({ ...prev, [itemId]: true }));
      setError(null);
      try {
        const response = await fetch(`/api/cart/items/${itemId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
        });

        if (!response.ok) {
          let message = "항목 업데이트에 실패했습니다.";
          try {
            const data = (await response.json()) as ApiError;
            message = data.message ?? data.error ?? message;
          } catch {
            // ignore parse errors
          }
          setItemErrors((prev) => ({
            ...prev,
            [itemId]: toFriendlyError(message),
          }));
          return;
        }

        setItemErrors((prev) => {
          const next = { ...prev };
          delete next[itemId];
          return next;
        });
        window.dispatchEvent(new CustomEvent("cart:changed"));
      } catch {
        setItemErrors((prev) => ({
          ...prev,
          [itemId]: "백엔드 연결에 실패했습니다.",
        }));
      } finally {
        setSavingIds((prev) => ({ ...prev, [itemId]: false }));
      }
    }, 450);
  };

  const updateBuyCount = (itemId: string, nextCount: number) => {
    const safeCount = Number.isFinite(nextCount) ? Math.max(1, Math.floor(nextCount)) : 1;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, draftCount: safeCount } : item,
      ),
    );
    setItemErrors((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    scheduleUpdate(itemId, { count: safeCount });
  };

  const updateRentMonths = (itemId: string, nextMonths: number) => {
    const parsed = Number.isFinite(nextMonths) ? Math.floor(nextMonths) : 6;
    const safeMonths = Math.min(36, Math.max(6, parsed));
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, draftRentalMonths: safeMonths } : item,
      ),
    );
    setItemErrors((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    const target = items.find((item) => item.id === itemId);
    scheduleUpdate(itemId, {
      count: target?.draftCount ?? 1,
      rentalMonths: safeMonths,
    });
  };

  const updateRentCount = (itemId: string, nextCount: number) => {
    const safeCount = Number.isFinite(nextCount)
      ? Math.max(1, Math.floor(nextCount))
      : 1;
    const target = items.find((item) => item.id === itemId);
    const safeMonths = target?.draftRentalMonths ?? 6;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, draftCount: safeCount } : item,
      ),
    );
    setItemErrors((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    scheduleUpdate(itemId, { count: safeCount, rentalMonths: safeMonths });
  };

  const deleteItem = async (itemId: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!response.ok) {
        let message = "항목 삭제에 실패했습니다.";
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse errors
        }
        setError(toFriendlyError(message));
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== itemId));
      setItemErrors((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
      window.dispatchEvent(new CustomEvent("cart:changed"));
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    }
  };

  const handleCheckoutConfirmed = () => {
    setItems([]);
    setError(null);
    setItemErrors({});
  };

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {error ? (
          <p className="rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
            {error}
          </p>
        ) : null}

        {items.length === 0 ? (
          <div className="rounded-md border border-outline-variant/20 bg-surface-container-low p-10 text-center text-sm text-on-surface-variant">
            장바구니가 비어 있습니다.
          </div>
        ) : null}

        {items.map((item) => {
          const isSaving = Boolean(savingIds[item.id]);
          const liveLineTotal =
            item.mode === "buy"
              ? item.unitPrice * item.draftCount
              : item.unitPrice * item.draftCount * item.draftRentalMonths;

          const detailHref = item.equipmentSlug
            ? `/equipment/${item.equipmentSlug}?id=${item.equipmentId}`
            : null;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-md border border-outline-variant/20 bg-white shadow-sm"
            >
              <div className="grid gap-4 p-4 sm:grid-cols-[128px_1fr] sm:p-5">
                <div className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-low">
                  {detailHref ? (
                    <Link href={detailHref} className="block h-full w-full">
                      <Image
                        src={item.imageUrl || defaultImage}
                        alt={item.equipmentName}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={item.imageUrl || defaultImage}
                      alt={item.equipmentName}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-bold text-on-surface-variant">
                        {item.mode === "buy"
                          ? "구매"
                          : `임대 ${item.draftRentalMonths}개월`}
                      </span>
                      <span className="text-xs font-semibold text-secondary">
                        단가 {item.unitPrice.toLocaleString("ko-KR")}원
                      </span>
                    </div>
                    {detailHref ? (
                      <Link
                        href={detailHref}
                        className="text-lg font-bold text-primary transition-colors hover:text-secondary"
                      >
                        {item.equipmentName}
                      </Link>
                    ) : (
                      <p className="text-lg font-bold text-primary">{item.equipmentName}</p>
                    )}
                    <p className="mt-1 text-sm font-black text-primary-container">
                      합계 {liveLineTotal.toLocaleString("ko-KR")}원
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.mode === "buy" ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.draftCount}
                          onChange={(event) => {
                            updateBuyCount(item.id, Number(event.target.value));
                          }}
                          className="w-20 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                        />
                        <span className="text-xs font-semibold text-on-surface-variant">
                          수량
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={item.draftCount}
                          onChange={(event) => {
                            updateRentCount(item.id, Number(event.target.value));
                          }}
                          className="w-20 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                        />
                        <span className="text-xs font-semibold text-on-surface-variant">
                          수량
                        </span>
                        <input
                          type="number"
                          min={6}
                          max={36}
                          value={item.draftRentalMonths}
                          onChange={(event) => {
                            updateRentMonths(item.id, Number(event.target.value));
                          }}
                          className="w-24 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                        />
                        <span className="text-xs font-semibold text-on-surface-variant">
                          개월
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => void deleteItem(item.id)}
                      className="rounded-md border border-[#f2b8b5] px-3 py-1.5 text-xs font-semibold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8]"
                    >
                      삭제
                    </button>

                    {isSaving ? (
                      <span className="text-xs font-semibold text-secondary">
                        저장 중...
                      </span>
                    ) : null}
                  </div>
                  {itemErrors[item.id] ? (
                    <p className="text-xs font-semibold text-[#b42318]">
                      {itemErrors[item.id]}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {items.length > 0 ? (
        <aside className="xl:sticky xl:top-28 xl:self-start">
          <section className="rounded-md border border-outline-variant/20 bg-surface-container-low p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">주문 요약</h2>
            <div className="mt-4 space-y-2 text-sm text-on-surface-variant">
              <div className="flex items-center justify-between">
                <span>품목 수</span>
                <span className="font-semibold text-primary">
                  {liveSummary.itemCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>총 수량</span>
                <span className="font-semibold text-primary">
                  {liveSummary.totalQuantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>구매 소계</span>
                <span className="font-semibold text-primary">
                  {liveSummary.buySubtotal.toLocaleString("ko-KR")}원
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>임대 소계</span>
                <span className="font-semibold text-primary">
                  {liveSummary.rentSubtotal.toLocaleString("ko-KR")}원
                </span>
              </div>
            </div>
            <div className="mt-5 border-t border-outline-variant/20 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                Total
              </p>
              <p className="mt-1 text-2xl font-black text-primary">
                {liveSummary.totalAmount.toLocaleString("ko-KR")}원
              </p>
            </div>
          </section>
          <CheckoutPreviewPanel
            cart={cartForPreview}
            onConfirmed={handleCheckoutConfirmed}
          />
        </aside>
      ) : null}
    </div>
  );
}
