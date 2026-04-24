export type OrderType = "buy" | "rent";
export type DeliveryMethod = "delivery" | "pickup";
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

export type AdminOrderItem = {
  id: string;
  equipmentId: string;
  equipmentName: string | null;
  equipmentCode: string | null;
  count: number;
  unitPrice: number;
  rentalMonths: number | null;
  subtotalPrice: number;
  createdAt: string;
};

export type AdminOrderPayment = {
  id: string;
  provider: string | null;
  transactionId: string | null;
  amount: number;
  status: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminOrder = {
  id: string;
  userId: string;
  orderType: OrderType;
  companyName: string;
  deliveryMethod: DeliveryMethod;
  address: string | null;
  deliveryFee: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  reservationExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  } | null;
  items: AdminOrderItem[];
  payments: AdminOrderPayment[];
};

export type AdminOrderListResponse = {
  page: number;
  limit: number;
  total: number;
  items: AdminOrder[];
};

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export async function fetchAdminOrders(
  accessToken: string,
  options?: {
    page?: number;
    limit?: number;
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
    orderType?: OrderType;
  },
): Promise<AdminOrderListResponse | null> {
  const params = new URLSearchParams();
  params.set("page", String(options?.page ?? 1));
  params.set("limit", String(options?.limit ?? 20));
  if (options?.status) {
    params.set("status", options.status);
  }
  if (options?.paymentStatus) {
    params.set("paymentStatus", options.paymentStatus);
  }
  if (options?.orderType) {
    params.set("orderType", options.orderType);
  }

  try {
    const response = await fetch(`${apiBaseUrl()}/orders/admin?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AdminOrderListResponse;
  } catch {
    return null;
  }
}

export async function fetchAdminOrderDetail(
  accessToken: string,
  orderId: string,
): Promise<AdminOrder | null> {
  try {
    const response = await fetch(
      `${apiBaseUrl()}/orders/admin/${encodeURIComponent(orderId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AdminOrder;
  } catch {
    return null;
  }
}
