import type { CartItem } from "@/lib/backend/cart";

export type ApiError = {
  message?: string;
  error?: string;
};

export type DraftItem = CartItem & {
  draftCount: number;
  draftRentalMonths: number;
};

export type CartLiveSummary = {
  itemCount: number;
  totalQuantity: number;
  buySubtotal: number;
  rentSubtotal: number;
  totalAmount: number;
};

export type CartUpdatePayload = {
  count?: number;
  rentalMonths?: number;
  mode?: "buy" | "rent";
};

export function toDraftItems(items: CartItem[]): DraftItem[] {
  return items.map((item) => ({
    ...item,
    draftCount: item.count,
    draftRentalMonths: item.rentalMonths ?? 6,
  }));
}

export function getDraftLineTotal(item: DraftItem) {
  return item.mode === "buy"
    ? item.unitPrice * item.draftCount
    : item.unitPrice * item.draftCount * item.draftRentalMonths;
}

export function getLiveSummary(items: DraftItem[]): CartLiveSummary {
  return items.reduce(
    (acc, item) => {
      const lineTotal = getDraftLineTotal(item);

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
}

export function toFriendlyError(message: string) {
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
