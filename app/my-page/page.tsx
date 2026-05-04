import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MyPageShell } from "./_components/my-page-shell";
import { MyPageStats } from "./_components/my-page-stats";
import { ProfileForm } from "./_components/profile-form";
import { ProfileSummary } from "./_components/profile-summary";
import { QuickActionsCard } from "./_components/quick-actions-card";
import { RecentOrdersCard } from "./_components/recent-orders-card";
import {
  fetchMyOrders,
  fetchMyProfile,
  getDisplayName,
  getMyPageOrderStats,
  getRoleLabel,
  type MyOrderListResponse,
  type UserProfile,
} from "./my-page-data";

export const metadata: Metadata = {
  title: "내 프로필 | 큐품질관리기술",
  description: "사용자 계정 정보와 개인 설정을 관리하는 프로필 페이지입니다.",
};

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
  let myOrders: MyOrderListResponse | null = null;
  try {
    profile = await fetchMyProfile(session.access_token);
    myOrders = await fetchMyOrders(session.access_token);
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

  const displayName = getDisplayName(profile, user.email);
  const createdAt = new Date(profile.createdAt).toLocaleDateString("ko-KR");
  const roleLabel = getRoleLabel(profile.role);
  const orderStats = getMyPageOrderStats(myOrders);

  return (
    <MyPageShell activeNav="profile">
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

        <MyPageStats stats={orderStats} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <RecentOrdersCard myOrders={myOrders} />
          <QuickActionsCard />
        </section>

        <ProfileSummary
          createdAt={createdAt}
          displayName={displayName}
          profile={profile}
          roleLabel={roleLabel}
        />
        <ProfileForm profile={profile} />
      </div>
    </MyPageShell>
  );
}
