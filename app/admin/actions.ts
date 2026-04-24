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

function apiBaseUrlCandidates() {
  const primary = apiBaseUrl().trim().replace(/\/+$/, "");
  const candidates = [
    primary,
    "http://localhost:4000/api/v1",
    "http://127.0.0.1:4000/api/v1",
  ];

  if (primary.includes("://localhost:")) {
    candidates.push(primary.replace("://localhost:", "://127.0.0.1:"));
  }

  return Array.from(new Set(candidates));
}

function extractApiErrorMessage(data: unknown, fallback: string) {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const payload = data as { message?: unknown; error?: unknown };
  const message =
    typeof payload.message === "string"
      ? payload.message
      : Array.isArray(payload.message)
        ? payload.message.join(", ")
        : typeof payload.error === "string"
          ? payload.error
          : fallback;

  const lower = message.toLowerCase();
  if (lower.includes("invalid status transition")) {
    return "현재 주문 단계에서는 선택한 상태로 변경할 수 없습니다.";
  }
  if (lower.includes("order not found")) {
    return "주문을 찾을 수 없습니다.";
  }
  if (lower.includes("admin role required")) {
    return "관리자 권한이 필요합니다.";
  }
  if (lower.includes("request failed") || lower.includes("internal server error")) {
    return "서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return message;
}

export async function updateOrderPaymentStatusAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect(
      "/admin/orders?paymentError=Supabase%20client%20is%20not%20configured",
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/login?error=%EB%8B%A4%EC%8B%9C%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%95%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.");
  }

  const orderId = String(formData.get("orderId") ?? "").trim();
  const paymentStatus = String(formData.get("paymentStatus") ?? "").trim();
  const returnPage = String(formData.get("returnPage") ?? "1").trim() || "1";
  const pageQuery = `page=${encodeURIComponent(returnPage)}`;

  if (!orderId || !paymentStatus) {
    redirect(
      `/admin/orders?${pageQuery}&paymentError=%EC%9A%94%EC%B2%AD%20%EA%B0%92%EC%9D%B4%20%EC%98%AC%EB%B0%94%EB%A5%B4%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.&paymentOrderId=${encodeURIComponent(orderId)}`,
    );
  }

  let lastErrorMessage = "";
  let lastConnectionError = "";
  let updated = false;

  for (const baseUrl of apiBaseUrlCandidates()) {
    try {
      const response = await fetch(
        `${baseUrl}/orders/admin/${encodeURIComponent(orderId)}/payment-status`,
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
          const data = (await response.json()) as {
            message?: string;
            error?: string;
          };
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse error
        }
        lastErrorMessage = message;
        continue;
      }

      updated = true;
      break;
    } catch {
      lastConnectionError = baseUrl;
      // try next candidate
    }
  }

  if (updated) {
    redirect(
      `/admin/orders?${pageQuery}&paymentUpdated=1&paymentOrderId=${encodeURIComponent(orderId)}`,
    );
  }

  if (lastErrorMessage) {
    redirect(
      `/admin/orders?${pageQuery}&paymentError=${encodeURIComponent(lastErrorMessage)}&paymentOrderId=${encodeURIComponent(orderId)}`,
    );
  }

  const connectionMessage = lastConnectionError
    ? `결제 상태 업데이트 중 서버 연결에 실패했습니다. (${lastConnectionError})`
    : "결제 상태 업데이트 중 서버 연결에 실패했습니다.";
  redirect(
    `/admin/orders?${pageQuery}&paymentError=${encodeURIComponent(connectionMessage)}&paymentOrderId=${encodeURIComponent(orderId)}`,
  );
}

export async function updateOrderStatusAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect(
      "/admin/orders?statusError=Supabase%20client%20is%20not%20configured",
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect("/login?error=%EB%8B%A4%EC%8B%9C%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%ED%95%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.");
  }

  const orderId = String(formData.get("orderId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const returnPage = String(formData.get("returnPage") ?? "1").trim() || "1";
  const pageQuery = `page=${encodeURIComponent(returnPage)}`;

  if (!orderId || !status) {
    redirect(
      `/admin/orders/${encodeURIComponent(orderId)}?${pageQuery}&statusError=%EC%83%81%ED%83%9C%20%EC%9A%94%EC%B2%AD%20%EA%B0%92%EC%9D%B4%20%EC%98%AC%EB%B0%94%EB%A5%B4%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.`,
    );
  }

  let lastErrorMessage = "";
  let lastConnectionError = "";
  let updated = false;

  for (const baseUrl of apiBaseUrlCandidates()) {
    try {
      const response = await fetch(
        `${baseUrl}/orders/admin/${encodeURIComponent(orderId)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ status }),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        let message = `주문 상태 업데이트 실패 (${response.status})`;
        try {
          const data = (await response.json()) as unknown;
          message = extractApiErrorMessage(data, message);
        } catch {
          // ignore parse error
        }
        lastErrorMessage = message;
        continue;
      }

      updated = true;
      break;
    } catch {
      lastConnectionError = baseUrl;
    }
  }

  if (updated) {
    redirect(
      `/admin/orders/${encodeURIComponent(orderId)}?${pageQuery}&statusUpdated=1`,
    );
  }

  if (lastErrorMessage) {
    redirect(
      `/admin/orders/${encodeURIComponent(orderId)}?${pageQuery}&statusError=${encodeURIComponent(lastErrorMessage)}`,
    );
  }

  const connectionMessage = lastConnectionError
    ? `주문 상태 업데이트 중 서버 연결에 실패했습니다. (${lastConnectionError})`
    : "주문 상태 업데이트 중 서버 연결에 실패했습니다.";

  redirect(
    `/admin/orders/${encodeURIComponent(orderId)}?${pageQuery}&statusError=${encodeURIComponent(connectionMessage)}`,
  );
}
