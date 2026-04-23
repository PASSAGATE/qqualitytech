export type CartMode = "buy" | "rent";

export type CartItem = {
  id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentCode: string | null;
  equipmentType: string | null;
  equipmentStatus: string | null;
  imageUrl: string | null;
  mode: CartMode;
  count: number;
  rentalMonths: number | null;
  unitPrice: number;
  lineTotal: number;
  createdAt: string;
  updatedAt: string;
};

export type CartSummary = {
  itemCount: number;
  totalQuantity: number;
  buySubtotal: number;
  rentSubtotal: number;
  totalAmount: number;
};

export type CartResponse = {
  id: string;
  userId: string;
  items: CartItem[];
  summary: CartSummary;
};

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export async function fetchMyCart(
  accessToken: string,
): Promise<CartResponse | null> {
  try {
    const response = await fetch(`${apiBaseUrl()}/cart`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CartResponse;
  } catch {
    return null;
  }
}

