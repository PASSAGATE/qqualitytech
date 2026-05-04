type ApiError = {
  message?: string;
  error?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  role: string;
  fullName: string | null;
  phone: string | null;
  companyName: string | null;
  createdAt: string;
};

export type MyOrder = {
  id: string;
  totalPrice: number;
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
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  items: Array<{
    equipmentName: string | null;
    equipmentCode: string | null;
  }>;
};

export type MyOrderListResponse = {
  total: number;
  items: MyOrder[];
};

export type MyPageOrderStats = {
  totalOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  pendingPayments: number;
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

export async function fetchMyProfile(accessToken: string): Promise<UserProfile> {
  const response = await fetch(`${apiBaseUrl()}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as UserProfile;
}

export async function fetchMyOrders(
  accessToken: string,
): Promise<MyOrderListResponse> {
  const response = await fetch(`${apiBaseUrl()}/orders/me?page=1&limit=5`, {
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

export function formatDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleDateString("ko-KR");
}

export function getDisplayName(profile: UserProfile, fallbackEmail?: string) {
  return profile.fullName?.trim() || fallbackEmail?.split("@")[0] || "사용자";
}

export function getRoleLabel(role: string) {
  return role?.toLowerCase() === "admin" ? "관리자" : "일반 사용자";
}

export function getMyPageOrderStats(
  myOrders: MyOrderListResponse | null,
): MyPageOrderStats {
  return {
    totalOrders: myOrders?.total ?? 0,
    inProgressOrders:
      myOrders?.items.filter((item) =>
        ["awaiting_payment", "paid", "confirmed", "preparing", "shipped"].includes(
          item.status,
        ),
      ).length ?? 0,
    completedOrders:
      myOrders?.items.filter((item) => item.status === "completed").length ?? 0,
    pendingPayments:
      myOrders?.items.filter((item) => item.paymentStatus === "pending").length ??
      0,
  };
}
