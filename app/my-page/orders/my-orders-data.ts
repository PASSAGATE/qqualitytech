type ApiError = {
  error?: string;
  message?: string;
};

export type MyOrderItem = {
  count: number;
  equipmentCode: string | null;
  equipmentName: string | null;
  id: string;
  rentalMonths: number | null;
  subtotalPrice: number;
};

export type MyOrder = {
  address: string | null;
  createdAt: string;
  deliveryMethod: "delivery" | "pickup";
  id: string;
  items: MyOrderItem[];
  orderType: "buy" | "rent";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  status:
    | "awaiting_payment"
    | "paid"
    | "confirmed"
    | "preparing"
    | "shipped"
    | "active_rental"
    | "completed"
    | "cancelled"
    | "expired";
  totalPrice: number;
};

export type MyOrderListResponse = {
  items: MyOrder[];
  limit: number;
  page: number;
  total: number;
};

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function fetchMyOrders(
  accessToken: string,
): Promise<MyOrderListResponse> {
  const response = await fetch(`${apiBaseUrl()}/orders/me?page=1&limit=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as MyOrderListResponse;
}

export function formatDateTime(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${d} ${hh}:${mm}`;
}

export function statusLabel(status: MyOrder["status"]) {
  switch (status) {
    case "awaiting_payment":
      return "결제대기";
    case "paid":
      return "결제완료";
    case "confirmed":
      return "주문확정";
    case "preparing":
      return "준비중";
    case "shipped":
      return "배송중";
    case "active_rental":
      return "임대진행";
    case "completed":
      return "완료";
    case "cancelled":
      return "취소";
    case "expired":
      return "만료";
    default:
      return status;
  }
}

export function paymentStatusLabel(status: MyOrder["paymentStatus"]) {
  switch (status) {
    case "pending":
      return "결제대기";
    case "paid":
      return "결제완료";
    case "failed":
      return "결제실패";
    case "refunded":
      return "환불";
    default:
      return status;
  }
}

export function orderTypeLabel(type: MyOrder["orderType"]) {
  return type === "buy" ? "구매" : "임대";
}

export function statusTone(status: MyOrder["status"]) {
  switch (status) {
    case "completed":
      return "bg-[#e7f6ec] text-[#1d7a3a]";
    case "cancelled":
    case "expired":
      return "bg-[#fde8e8] text-[#b42318]";
    case "shipped":
    case "active_rental":
      return "bg-[#eef4ff] text-primary";
    default:
      return "bg-[#fff3e8] text-[#b45309]";
  }
}

export function getMyOrderStats(myOrders: MyOrderListResponse | null) {
  return {
    completedOrders:
      myOrders?.items.filter((item) => item.status === "completed").length ?? 0,
    inProgressOrders:
      myOrders?.items.filter((item) =>
        [
          "awaiting_payment",
          "paid",
          "confirmed",
          "preparing",
          "shipped",
        ].includes(item.status),
      ).length ?? 0,
    pendingPayments:
      myOrders?.items.filter((item) => item.paymentStatus === "pending").length ??
      0,
    totalOrders: myOrders?.total ?? 0,
  };
}
