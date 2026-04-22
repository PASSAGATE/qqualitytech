import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckCircle2, LogOut, Save, UserRound } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { updateMyPageProfileAction } from "./actions";
import { logoutAction } from "../admin/actions";

export const metadata: Metadata = {
  title: "내 프로필 | 큐품질관리기술",
  description: "사용자 계정 정보와 개인 설정을 관리하는 프로필 페이지입니다.",
};

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

type UserProfile = {
  id: string;
  email: string;
  role: string;
  fullName: string | null;
  phone: string | null;
  companyName: string | null;
  createdAt: string;
  updatedAt: string;
};

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function fetchMyProfile(accessToken: string): Promise<UserProfile> {
  const response = await fetch(`${apiBaseUrl()}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as UserProfile;
}

type MyPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function MyPage({ searchParams }: MyPageProps) {
  const { success, error } = await searchParams;
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      "/login?error=Supabase%20환경%20설정이%20없습니다.%20관리자에게%20문의해%20주세요.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect("/login?error=로그인이%20필요합니다.");
  }

  if (!session?.access_token) {
    redirect("/login?error=세션이%20유효하지%20않습니다.");
  }

  let profile: UserProfile;
  try {
    profile = await fetchMyProfile(session.access_token);
  } catch (fetchError) {
    await supabase.auth.signOut();
    const message =
      fetchError instanceof Error
        ? fetchError.message === "Invalid or expired token"
          ? "세션이 만료되었습니다. 다시 로그인해 주세요."
          : fetchError.message
        : "프로필 정보를 불러오지 못했습니다.";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  const displayName = profile.fullName?.trim() || user.email?.split("@")[0] || "사용자";
  const createdAt = new Date(profile.createdAt).toLocaleDateString("ko-KR");
  const roleLabel = profile.role === "ADMIN" ? "관리자" : "일반 사용자";

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-outline-variant/60 bg-surface-container-low px-6 shadow-sm">
        <div className="text-xl font-black text-primary-container">피델리티 건설</div>
      </header>

      <aside className="fixed top-16 left-0 hidden h-[calc(100vh-64px)] w-64 flex-col border-r border-outline-variant/60 bg-white p-4 lg:flex">
        <div className="mb-8 px-2">
          <h2 className="text-lg font-bold text-primary-container">마이페이지</h2>
          <p className="text-xs text-on-surface-variant">사용자 프로필 관리</p>
        </div>

        <nav className="flex-1 space-y-1 text-sm font-medium">
          <a
            href="/my-page"
            className="flex items-center gap-3 rounded border-r-4 border-[#35e524] bg-surface-container-low px-3 py-2 font-bold text-primary-container"
          >
            <UserRound className="size-4" />
            <span>내 프로필</span>
          </a>
        </nav>

        <form action={logoutAction} className="mt-auto">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded bg-primary-container px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <LogOut className="size-4" />
            로그아웃
          </button>
        </form>
      </aside>

      <main className="min-h-screen px-6 pt-24 pb-12 lg:ml-64">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant pb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-primary-container">내 프로필</h1>
              <p className="mt-1 text-sm text-on-surface-variant">계정 정보 및 개인 설정을 관리하세요.</p>
            </div>
            {success ? (
              <div className="flex items-center gap-2 rounded bg-[#daf7d4] px-4 py-2 text-sm font-semibold text-[#0f5d08]">
                <CheckCircle2 className="size-4" />
                <span>{success}</span>
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="rounded bg-[#ffdad6] px-4 py-3 text-sm font-semibold text-[#93000a]">
              {error}
            </div>
          ) : null}

          <div className="rounded-xl border border-outline-variant bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low">
                <UserRound className="size-6 text-primary-container" />
              </div>
              <div>
                <p className="text-lg font-bold text-primary-container">{displayName}</p>
                <p className="text-sm text-on-surface-variant">{profile.email}</p>
              </div>
            </div>

            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-bold tracking-wide text-on-surface-variant uppercase">
                  계정 유형
                </p>
                <p className="font-medium text-primary-container">{roleLabel}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold tracking-wide text-on-surface-variant uppercase">
                  계정 생성일
                </p>
                <p className="font-medium text-primary-container">{createdAt}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold tracking-wide text-on-surface-variant uppercase">
                  사용자 ID
                </p>
                <p className="truncate font-medium text-primary-container">{profile.id}</p>
              </div>
            </div>
          </div>

          <form
            action={updateMyPageProfileAction}
            className="space-y-6 rounded-xl border border-outline-variant bg-white p-6 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary-container" htmlFor="fullName">
                  이름
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  defaultValue={profile.fullName ?? ""}
                  maxLength={120}
                  className="w-full rounded border border-outline-variant bg-surface-container-low p-3 outline-none transition-all focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary-container" htmlFor="phone">
                  연락처
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={profile.phone ?? ""}
                  maxLength={30}
                  className="w-full rounded border border-outline-variant bg-surface-container-low p-3 outline-none transition-all focus:ring-2 focus:ring-primary-container"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-container" htmlFor="companyName">
                소속 회사명
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                defaultValue={profile.companyName ?? ""}
                maxLength={150}
                className="w-full rounded border border-outline-variant bg-surface-container-low p-3 outline-none transition-all focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div className="flex justify-end border-t border-outline-variant pt-5">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded bg-primary-container px-6 py-2.5 font-bold text-white transition-all hover:opacity-90"
              >
                <Save className="size-4" />
                저장
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
