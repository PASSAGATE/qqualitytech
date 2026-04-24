"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/login");
}

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export async function updateOrderPaymentStatusAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/admin?paymentError=Supabase%20client%20is%20not%20configured");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/login?error=%EB%8B%A4%EC%8B%9C%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%95%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.");
  }

  const orderId = String(formData.get("orderId") ?? "").trim();
  const paymentStatus = String(formData.get("paymentStatus") ?? "").trim();

  if (!orderId || !paymentStatus) {
    redirect("/admin?paymentError=%EC%9A%94%EC%B2%AD%20%EA%B0%92%EC%9D%B4%20%EC%98%AC%EB%B0%94%EB%A5%B4%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.");
  }

  try {
    const response = await fetch(
      `${apiBaseUrl()}/orders/admin/${encodeURIComponent(orderId)}/payment-status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ paymentStatus }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      let message = `결제 상태 업데이트 실패 (${response.status})`;
      try {
        const data = (await response.json()) as { message?: string; error?: string };
        message = data.message ?? data.error ?? message;
      } catch {
        // ignore parse error
      }
      redirect(`/admin?paymentError=${encodeURIComponent(message)}`);
    }

    redirect("/admin?paymentUpdated=1");
  } catch {
    redirect(
      "/admin?paymentError=%EA%B2%B0%EC%A0%9C%20%EC%83%81%ED%83%9C%20%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%20%EC%A4%91%20%EC%84%9C%EB%B2%84%20%EC%97%B0%EA%B2%B0%EC%97%90%20%EC%8B%A4%ED%8C%A8%ED%96%88%EC%8A%B5%EB%8B%88%EB%8B%A4.",
    );
  }
}
