"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

type ApiError = {
  message?: string;
  error?: string;
};

function redirectWithError(message: string): never {
  redirect(`/my-page?error=${encodeURIComponent(message)}`);
}

function redirectWithLoginError(message: string): never {
  redirect(`/login?error=${encodeURIComponent(message)}`);
}

function redirectWithSuccess(message: string): never {
  redirect(`/my-page?success=${encodeURIComponent(message)}`);
}

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export async function updateMyPageProfileAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();

  if (fullName.length > 120 || phone.length > 30 || companyName.length > 150) {
    redirectWithError("입력 길이가 허용 범위를 초과했습니다.");
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirectWithError("Supabase 환경 설정이 없습니다.");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirectWithLoginError("로그인이 필요합니다.");
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        fullName: fullName || undefined,
        phone: phone || undefined,
        companyName: companyName || undefined,
      }),
      cache: "no-store",
    });
  } catch {
    redirectWithError("백엔드 연결에 실패했습니다. 서버 상태를 확인해 주세요.");
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirectWithError(message);
  }

  redirectWithSuccess("프로필이 저장되었습니다.");
}
