"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function toRegisterError(message: string) {
  const params = new URLSearchParams();
  params.set("error", message);
  return `/register?${params.toString()}`;
}

function toRegisterSuccess(message: string, email?: string) {
  const params = new URLSearchParams();
  params.set("success", message);
  if (email) {
    params.set("email", email);
  }
  params.set("step", "confirm-email");
  return `/register?${params.toString()}`;
}

function resolveEmailRedirectTo() {
  const explicit =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (explicit) {
    return `${explicit.replace(/\/$/, "")}/login`;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}/login`;
  }

  return "http://localhost:3000/login";
}

export async function registerWithEmailConfirmationAction(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const confirmPasswordValue = formData.get("confirmPassword");
  const companyNameValue = formData.get("companyName");
  const fullNameValue = formData.get("fullName");
  const phoneValue = formData.get("phone");

  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";
  const confirmPassword =
    typeof confirmPasswordValue === "string" ? confirmPasswordValue : "";
  const companyName =
    typeof companyNameValue === "string" ? companyNameValue.trim() : "";
  const fullName = typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const phone = typeof phoneValue === "string" ? phoneValue.trim() : "";
  const normalizedPhone = phone.length > 0 ? phone : undefined;

  if (!email || !password || !confirmPassword || !companyName || !fullName) {
    redirect(toRegisterError("필수 항목을 모두 입력해 주세요."));
  }

  if (password.length < 8) {
    redirect(toRegisterError("비밀번호는 최소 8자 이상이어야 합니다."));
  }

  if (password !== confirmPassword) {
    redirect(toRegisterError("비밀번호 확인이 일치하지 않습니다."));
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect(
      toRegisterError(
        "Supabase 환경 설정이 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.",
      ),
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: resolveEmailRedirectTo(),
      data: {
        role: "customer",
        company_name: companyName,
        companyName,
        full_name: fullName,
        phone: normalizedPhone,
      },
    },
  });

  if (error) {
    redirect(toRegisterError(`회원가입에 실패했습니다: ${error.message}`));
  }

  redirect(
    toRegisterSuccess(
      "인증 메일을 발송했습니다. 이메일의 확인 링크를 눌러 가입을 완료해 주세요.",
      email,
    ),
  );
}
