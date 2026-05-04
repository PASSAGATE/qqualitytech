"use client";

import { useMemo, useRef, useState } from "react";
import type { CartResponse } from "@/lib/backend/cart";
import { CartItemCard } from "./cart-item-card";
import { CartSummaryCard } from "./cart-summary-card";
import type { ApiError, CartUpdatePayload, DraftItem } from "./cart-live-panel-utils";
import {
  getDraftLineTotal,
  getLiveSummary,
  toDraftItems,
  toFriendlyError,
} from "./cart-live-panel-utils";
import { CheckoutPreviewPanel } from "./checkout-preview-panel";

type CartLivePanelProps = {
  cart: CartResponse;
  defaultImage: string;
};

export function CartLivePanel({ cart, defaultImage }: CartLivePanelProps) {
  const [items, setItems] = useState<DraftItem[]>(() => toDraftItems(cart.items));
  const [error, setError] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<Record<string, string>>({});
  const [savingIds, setSavingIds] = useState<Record<string, boolean>>({});
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const liveSummary = useMemo(() => getLiveSummary(items), [items]);
  const buyItems = useMemo(
    () => items.filter((item) => item.mode === "buy"),
    [items],
  );
  const rentItems = useMemo(
    () => items.filter((item) => item.mode === "rent"),
    [items],
  );

  const cartForPreview: CartResponse = {
    ...cart,
    items: items.map((item) => ({
      ...item,
      count: item.draftCount,
      rentalMonths:
        item.mode === "rent" ? item.draftRentalMonths : item.rentalMonths,
      lineTotal:
        getDraftLineTotal(item),
    })),
    summary: liveSummary,
  };

  const scheduleUpdate = (itemId: string, payload: CartUpdatePayload) => {
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
        try {
          const updatedCart = (await response.json()) as CartResponse;
          setItems(toDraftItems(updatedCart.items));
        } catch {
          // ignore parse errors and keep optimistic state
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

  const switchItemMode = (itemId: string, nextMode: "buy" | "rent") => {
    const target = items.find((item) => item.id === itemId);
    if (!target || target.mode === nextMode) {
      return;
    }
    const nextRentalMonths = target.draftRentalMonths || 6;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              mode: nextMode,
              draftRentalMonths: nextMode === "rent" ? nextRentalMonths : item.draftRentalMonths,
            }
          : item,
      ),
    );
    setItemErrors((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    scheduleUpdate(itemId, {
      mode: nextMode,
      count: target.draftCount,
      rentalMonths: nextMode === "rent" ? nextRentalMonths : undefined,
    });
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

        {buyItems.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-surface-container-low px-4 py-2.5">
              <h3 className="text-sm font-extrabold text-primary">구매 장바구니</h3>
              <span className="text-xs font-semibold text-on-surface-variant">
                {buyItems.length}개
              </span>
            </div>
            {buyItems.map((item) => (
              <CartItemCard
                key={item.id}
                defaultImage={defaultImage}
                error={itemErrors[item.id]}
                isSaving={Boolean(savingIds[item.id])}
                item={item}
                onDeleteItem={deleteItem}
                onSwitchMode={switchItemMode}
                onUpdateBuyCount={updateBuyCount}
                onUpdateRentCount={updateRentCount}
                onUpdateRentMonths={updateRentMonths}
              />
            ))}
          </section>
        ) : null}

        {rentItems.length > 0 ? (
          <section className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-surface-container-low px-4 py-2.5">
              <h3 className="text-sm font-extrabold text-primary">임대 장바구니</h3>
              <span className="text-xs font-semibold text-on-surface-variant">
                {rentItems.length}개
              </span>
            </div>
            {rentItems.map((item) => (
              <CartItemCard
                key={item.id}
                defaultImage={defaultImage}
                error={itemErrors[item.id]}
                isSaving={Boolean(savingIds[item.id])}
                item={item}
                onDeleteItem={deleteItem}
                onSwitchMode={switchItemMode}
                onUpdateBuyCount={updateBuyCount}
                onUpdateRentCount={updateRentCount}
                onUpdateRentMonths={updateRentMonths}
              />
            ))}
          </section>
        ) : null}
      </div>

      {items.length > 0 ? (
        <aside className="xl:sticky xl:top-28 xl:self-start">
          <CartSummaryCard summary={liveSummary} />
          <CheckoutPreviewPanel
            cart={cartForPreview}
            onConfirmed={handleCheckoutConfirmed}
          />
        </aside>
      ) : null}
    </div>
  );
}
