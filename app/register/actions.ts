"use server";

import { redirect } from "next/navigation";

function toRegisterError(message: string, sessionId?: string) {
  const params = new URLSearchParams();
  params.set("error", message);
  if (sessionId) {
    params.set("sessionId", sessionId);
  }
  return `/register?${params.toString()}`;
}

function toRegisterSuccess(message: string) {
  const params = new URLSearchParams();
  params.set("success", message);
  params.set("step", "done");
  return `/register?${params.toString()}`;
}

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
  statusCode?: number;
};

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? `요청 실패 (${response.status})`;
  } catch {
    return `요청 실패 (${response.status})`;
  }
}

export async function startVerificationAction(formData: FormData) {
  const fullNameValue = formData.get("fullName");
  const phoneValue = formData.get("phone");
  const fullName = typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const phone = typeof phoneValue === "string" ? phoneValue.trim() : "";

  if (!fullName || !phone) {
    redirect(toRegisterError("이름과 전화번호를 입력해 주세요."));
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/auth/verification/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, phone }),
      cache: "no-store",
    });
  } catch {
    redirect(
      toRegisterError(
        "백엔드 연결에 실패했습니다. 서버가 실행 중인지 확인해 주세요.",
      ),
    );
  }

  if (!response.ok) {
    redirect(toRegisterError(await readApiError(response)));
  }

  const data = (await response.json()) as {
    sessionId: string;
  };

  if (!data.sessionId) {
    redirect(toRegisterError("인증 세션 생성에 실패했습니다."));
  }

  redirect(`/register?sessionId=${encodeURIComponent(data.sessionId)}&step=verify`);
}

export async function completeSignupAction(formData: FormData) {
  const sessionIdValue = formData.get("sessionId");
  const emailValue = formData.get("email");
  const companyNameValue = formData.get("companyName");
  const passwordValue = formData.get("password");

  const sessionId =
    typeof sessionIdValue === "string" ? sessionIdValue.trim() : "";
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const companyName =
    typeof companyNameValue === "string" ? companyNameValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!sessionId || !email || !companyName || !password) {
    redirect(
      toRegisterError(
        "sessionId, 이메일, 회사명, 비밀번호를 모두 입력해 주세요.",
        sessionId || undefined,
      ),
    );
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/auth/signup/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        email,
        companyName,
        password,
      }),
      cache: "no-store",
    });
  } catch {
    redirect(
      toRegisterError(
        "백엔드 연결에 실패했습니다. 서버가 실행 중인지 확인해 주세요.",
        sessionId || undefined,
      ),
    );
  }

  if (!response.ok) {
    redirect(
      toRegisterError(await readApiError(response), sessionId || undefined),
    );
  }

  redirect(toRegisterSuccess("회원가입이 완료되었습니다."));
}
