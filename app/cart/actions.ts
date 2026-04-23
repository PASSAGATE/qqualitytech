"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type ApiError = {
  message?: string;
  error?: string;
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

async function requireAccessToken() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/login?error=Supabase%20설정을%20확인해%20주세요.");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/login?error=로그인이%20필요합니다.");
  }

  return session.access_token;
}

export async function updateCartItemCountAction(formData: FormData) {
  const itemId = String(formData.get("itemId") ?? "").trim();
  const mode = String(formData.get("mode") ?? "").trim().toLowerCase();

  if (!itemId || (mode !== "buy" && mode !== "rent")) {
    redirect("/cart?error=항목%20정보가%20올바르지%20않습니다.");
  }

  let payload: Record<string, number>;
  if (mode === "rent") {
    const rentalMonths = Number(formData.get("rentalMonths") ?? "0");
    if (!Number.isFinite(rentalMonths) || rentalMonths < 6 || rentalMonths > 36) {
      redirect("/cart?error=임대%20개월은%206~36%20사이여야%20합니다.");
    }
    payload = { count: 1, rentalMonths };
  } else {
    const count = Number(formData.get("count") ?? "0");
    if (!Number.isFinite(count) || count < 1) {
      redirect("/cart?error=수량이%20올바르지%20않습니다.");
    }
    payload = { count };
  }

  const accessToken = await requireAccessToken();
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/cart/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    redirect("/cart?error=백엔드%20연결에%20실패했습니다.");
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirect(`/cart?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/cart");
  revalidatePath("/");
  redirect("/cart?updated=1");
}

export async function deleteCartItemAction(formData: FormData) {
  const itemId = String(formData.get("itemId") ?? "").trim();
  if (!itemId) {
    redirect("/cart?error=삭제할%20항목을%20찾을%20수%20없습니다.");
  }

  const accessToken = await requireAccessToken();
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/cart/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
  } catch {
    redirect("/cart?error=백엔드%20연결에%20실패했습니다.");
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirect(`/cart?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/cart");
  revalidatePath("/");
  redirect("/cart?deleted=1");
}
