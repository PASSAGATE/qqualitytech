export type OrderType = "buy" | "rent";
export type OrderStatus =
  | "awaiting_payment"
  | "paid"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "active_rental"
  | "completed"
  | "cancelled"
  | "expired";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

function badgeClass(tone: "neutral" | "info" | "success" | "danger" | "warn") {
  switch (tone) {
    case "success":
      return "bg-[#e7f6ec] text-[#1d7a3a]";
    case "danger":
      return "bg-[#fde8e8] text-[#b42318]";
    case "warn":
      return "bg-[#fff7e6] text-[#9a6700]";
    case "info":
      return "bg-[#e8f1fd] text-[#175cd3]";
    default:
      return "bg-surface-container-high text-on-surface-variant";
  }
}

export function orderStatusMeta(status: OrderStatus) {
  switch (status) {
    case "awaiting_payment":
      return { label: "결제대기", className: badgeClass("warn") };
    case "paid":
      return { label: "결제완료", className: badgeClass("success") };
    case "confirmed":
      return { label: "주문확정", className: badgeClass("info") };
    case "preparing":
      return { label: "준비중", className: badgeClass("info") };
    case "shipped":
      return { label: "배송중", className: badgeClass("info") };
    case "active_rental":
      return { label: "임대진행", className: badgeClass("info") };
    case "completed":
      return { label: "완료", className: badgeClass("success") };
    case "cancelled":
      return { label: "취소", className: badgeClass("danger") };
    case "expired":
      return { label: "만료", className: badgeClass("danger") };
    default:
      return { label: status, className: badgeClass("neutral") };
  }
}

export function paymentStatusMeta(status: PaymentStatus) {
  switch (status) {
    case "pending":
      return { label: "결제대기", className: badgeClass("warn") };
    case "paid":
      return { label: "결제완료", className: badgeClass("success") };
    case "failed":
      return { label: "결제실패", className: badgeClass("danger") };
    case "refunded":
      return { label: "환불", className: badgeClass("danger") };
    default:
      return { label: status, className: badgeClass("neutral") };
  }
}

export function orderTypeLabel(orderType: OrderType) {
  return orderType === "buy" ? "구매" : "임대";
}

export function orderTimeline(orderType: OrderType, status: OrderStatus) {
  const base =
    orderType === "rent"
      ? ["결제대기", "결제완료", "주문확정", "임대진행", "완료"]
      : ["결제대기", "결제완료", "주문확정", "준비중", "배송중", "완료"];

  const progress: Record<OrderStatus, number> = {
    awaiting_payment: 0,
    paid: 1,
    confirmed: 2,
    preparing: 3,
    shipped: 4,
    active_rental: 3,
    completed: base.length - 1,
    cancelled: 0,
    expired: 0,
  };

  const currentIndex = Math.min(progress[status] ?? 0, base.length - 1);
  const isTerminal = status === "cancelled" || status === "expired";

  return {
    isTerminal,
    terminalLabel: isTerminal ? orderStatusMeta(status).label : null,
    steps: base.map((label, index) => ({
      label,
      state:
        index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming",
    })),
  };
}

