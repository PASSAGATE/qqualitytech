"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { resolveUserRoleFromBackend } from "@/lib/backend/user-role";

function toLoginError(message: string) {
  return `/login?error=${encodeURIComponent(message)}`;
}

export async function loginAction(formData: FormData) {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password) {
    redirect(toLoginError("이메일과 비밀번호를 입력해 주세요."));
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      toLoginError(
        "Supabase 환경 설정이 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.",
      ),
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(toLoginError(`로그인에 실패했습니다: ${error.message}`));
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect(toLoginError("로그인 세션을 가져오지 못했습니다."));
  }

  const role = await resolveUserRoleFromBackend(session.access_token);
  if (!role) {
    await supabase.auth.signOut();
    redirect(
      toLoginError("세션 확인에 실패했습니다. 다시 로그인해 주세요."),
    );
  }

  redirect(role === "admin" ? "/admin" : "/my-page");
}
