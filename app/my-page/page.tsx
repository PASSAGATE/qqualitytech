import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  ClipboardList,
  Home,
  LogOut,
  Save,
  UserRound,
} from "lucide-react";
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
  const roleLabel =
    profile.role?.toLowerCase() === "admin" ? "관리자" : "일반 사용자";

  return (
    <div className="min-h-screen bg-surface text-on-surface xl:pl-64">
      <aside className="border-b border-outline-variant/20 bg-surface xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-64 xl:flex-col xl:border-r xl:border-b-0">
        <div className="p-6">
          <h1 className="text-xl font-black tracking-[-0.04em] text-primary">
            사용자 센터
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant">내 계정 v1.0</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 pb-4 xl:flex-1 xl:overflow-y-auto xl:pb-0">
          <Link
            href="/"
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Home className="size-5" />
            <span>홈페이지</span>
          </Link>
          <Link
            href="/my-page"
            className="inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
          >
            <UserRound className="size-5" />
            <span>내 프로필</span>
          </Link>
          <Link
            href="/my-page/orders"
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <ClipboardList className="size-5" />
            <span>내 주문 내역</span>
          </Link>
        </nav>

        <div className="hidden border-t border-outline-variant/20 p-4 xl:mt-auto xl:flex xl:flex-col xl:gap-1">
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              <LogOut className="size-5" />
              <span>로그아웃</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-white/85 px-5 shadow-sm backdrop-blur-md sm:px-8 lg:px-12">
          <div className="flex min-h-16 items-center justify-between py-4">
            <span className="text-lg font-bold tracking-[-0.03em] text-primary">
              MY PAGE
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-12">
          <div className="w-full space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-outline-variant/10 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
                  내 프로필
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                  계정 정보 및 개인 설정을 관리하세요.
                </p>
              </div>
              {success ? (
                <div className="flex items-center gap-2 rounded-sm bg-[#e7f6ec] px-4 py-2 text-sm font-semibold text-[#1d7a3a]">
                  <CheckCircle2 className="size-4" />
                  <span>{success}</span>
                </div>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
                {error}
              </div>
            ) : null}

            <div className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low">
                  <UserRound className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">{displayName}</p>
                  <p className="text-sm text-on-surface-variant">{profile.email}</p>
                </div>
              </div>

              <div className="grid gap-4 text-sm md:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    계정 유형
                  </p>
                  <p className="font-medium text-primary">{roleLabel}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    계정 생성일
                  </p>
                  <p className="font-medium text-primary">{createdAt}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    사용자 ID
                  </p>
                  <p className="truncate font-medium text-primary">{profile.id}</p>
                </div>
              </div>
            </div>

            <form
              action={updateMyPageProfileAction}
              className="space-y-6 rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary" htmlFor="fullName">
                    이름
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    defaultValue={profile.fullName ?? ""}
                    maxLength={120}
                    className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary" htmlFor="phone">
                    연락처
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={profile.phone ?? ""}
                    maxLength={30}
                    className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="companyName">
                  소속 회사명
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  defaultValue={profile.companyName ?? ""}
                  maxLength={150}
                  className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
                />
              </div>

              <div className="flex justify-end border-t border-outline-variant/20 pt-5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm bg-secondary px-6 py-2.5 font-bold text-white transition-all hover:opacity-90"
                >
                  <Save className="size-4" />
                  저장
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
