"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type CartItem = {
  id: string;
  equipmentName: string;
  mode: "buy" | "rent";
  count: number;
  rentalMonths: number | null;
  lineTotal: number;
};

type CartResponse = {
  items: CartItem[];
  summary: {
    totalQuantity: number;
    totalAmount: number;
  };
};

type HeaderCartButtonProps = {
  initialCartCount: number;
};

async function fetchCartData(): Promise<CartResponse | null> {
  try {
    const response = await fetch("/api/cart", { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as CartResponse;
  } catch {
    return null;
  }
}

export function HeaderCartButton({ initialCartCount }: HeaderCartButtonProps) {
  const [cartCount, setCartCount] = useState(initialCartCount);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    const data = await fetchCartData();
    setLoading(false);

    if (!data) {
      setCartCount(0);
      setCartItems([]);
      setTotalAmount(0);
      return;
    }

    setCartCount(data.summary.totalQuantity ?? 0);
    setCartItems(data.items ?? []);
    setTotalAmount(data.summary.totalAmount ?? 0);
  }, []);

  useEffect(() => {
    const handleCartChanged = () => {
      void refreshCart();
    };
    window.addEventListener("cart:changed", handleCartChanged);
    return () => {
      window.removeEventListener("cart:changed", handleCartChanged);
    };
  }, [refreshCart]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={async () => {
          const next = !open;
          setOpen(next);
          if (next) {
            await refreshCart();
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-md border border-outline-variant/60 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary"
      >
        <ShoppingCart className="size-4" />
        장바구니
        {cartCount > 0 ? (
          <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            {cartCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-96 rounded-lg border border-outline-variant/60 bg-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-primary">장바구니</p>
            {loading ? (
              <span className="text-xs font-medium text-on-surface-variant">
                불러오는 중...
              </span>
            ) : null}
          </div>

          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <p className="rounded-sm bg-surface-container-low px-3 py-6 text-center text-xs font-semibold text-on-surface-variant">
                장바구니가 비어 있습니다.
              </p>
            ) : null}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-sm border border-outline-variant/20 px-3 py-2"
              >
                <p className="truncate text-sm font-semibold text-primary">
                  {item.equipmentName}
                </p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  {item.mode === "buy" ? "구매" : `임대 ${item.rentalMonths ?? 0}개월`}
                  {" · "}수량 {item.count}
                </p>
                <p className="mt-1 text-xs font-bold text-secondary">
                  {item.lineTotal.toLocaleString("ko-KR")}원
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 border-t border-outline-variant/20 pt-3">
            <p className="mb-3 text-right text-sm font-bold text-primary">
              합계 {totalAmount.toLocaleString("ko-KR")}원
            </p>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #ff8c3b 0%, #ff5f2f 100%)",
                boxShadow: "0 10px 22px rgba(255, 107, 44, 0.28)",
              }}
            >
              장바구니 페이지로 이동
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
