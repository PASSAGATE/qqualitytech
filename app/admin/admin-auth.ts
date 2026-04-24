import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { resolveUserRoleFromBackend } from "@/lib/backend/user-role";

export async function requireAdminSession() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      "/login?error=Supabase%20%ED%99%98%EA%B2%BD%20%EC%84%A4%EC%A0%95%EC%9D%B4%20%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.%20NEXT_PUBLIC_SUPABASE_URL%20%EA%B3%BC%20NEXT_PUBLIC_SUPABASE_ANON_KEY%EB%A5%BC%20%ED%99%95%EC%9D%B8%ED%95%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect(
      "/login?error=%EA%B4%80%EB%A6%AC%EC%9E%90%20%ED%8E%98%EC%9D%B4%EC%A7%80%EB%8A%94%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%ED%9B%84%20%EC%9D%B4%EC%9A%A9%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.",
    );
  }

  const role = session?.access_token
    ? await resolveUserRoleFromBackend(session.access_token)
    : null;

  if (role !== "admin") {
    redirect(
      "/my-page?error=%EA%B4%80%EB%A6%AC%EC%9E%90%20%EA%B6%8C%ED%95%9C%EC%9D%B4%20%ED%95%84%EC%9A%94%ED%95%A9%EB%8B%88%EB%8B%A4.",
    );
  }

  return { supabase, session, user };
}

