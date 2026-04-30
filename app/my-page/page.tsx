import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CircleHelp,
  CheckCircle2,
  ClipboardList,
  Home,
  LogOut,
  PackageCheck,
  Save,
  ShoppingCart,
  Truck,
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

type MyOrder = {
  id: string;
  totalPrice: number;
  status:
    | "awaiting_payment"
    | "paid"
    | "confirmed"
    | "preparing"
    | "shipped"
    | "active_rental"
    | "completed"
    | "cancelled"
    | "expired";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  items: Array<{
    equipmentName: string | null;
    equipmentCode: string | null;
  }>;
};

type MyOrderListResponse = {
  total: number;
  items: MyOrder[];
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

async function fetchMyOrders(accessToken: string): Promise<MyOrderListResponse> {
  const response = await fetch(`${apiBaseUrl()}/orders/me?page=1&limit=5`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as MyOrderListResponse;
}

function statusLabel(status: MyOrder["status"]) {
  switch (status) {
    case "awaiting_payment":
      return "결제대기";
    case "paid":
      return "결제완료";
    case "confirmed":
      return "주문확정";
    case "preparing":
      return "준비중";
    case "shipped":
      return "배송중";
    case "active_rental":
      return "임대진행";
    case "completed":
      return "완료";
    case "cancelled":
      return "취소";
    case "expired":
      return "만료";
    default:
      return status;
  }
}

function paymentStatusLabel(status: MyOrder["paymentStatus"]) {
  switch (status) {
    case "pending":
      return "결제대기";
    case "paid":
      return "결제완료";
    case "failed":
      return "결제실패";
    case "refunded":
      return "환불";
    default:
      return status;
  }
}

function formatDate(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleDateString("ko-KR");
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

  const displayName = profile.fullName?.trim() || user.email?.split("@")[0] || "사용자";
  const createdAt = new Date(profile.createdAt).toLocaleDateString("ko-KR");
  const roleLabel =
    profile.role?.toLowerCase() === "admin" ? "관리자" : "일반 사용자";
  const totalOrders = myOrders?.total ?? 0;
  const inProgressOrders =
    myOrders?.items.filter((item) =>
      ["awaiting_payment", "paid", "confirmed", "preparing", "shipped"].includes(
        item.status,
      ),
    ).length ?? 0;
  const completedOrders =
    myOrders?.items.filter((item) => item.status === "completed").length ?? 0;
  const pendingPayments =
    myOrders?.items.filter((item) => item.paymentStatus === "pending").length ?? 0;

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

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                  <ClipboardList className="size-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  총 주문
                </p>
                <p className="mt-1 text-2xl font-black text-primary">{totalOrders}</p>
              </article>
              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#eef4ff] p-2 text-primary">
                  <Truck className="size-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  진행중
                </p>
                <p className="mt-1 text-2xl font-black text-primary">
                  {inProgressOrders}
                </p>
              </article>
              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#e7f6ec] p-2 text-[#1d7a3a]">
                  <PackageCheck className="size-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  완료
                </p>
                <p className="mt-1 text-2xl font-black text-primary">
                  {completedOrders}
                </p>
              </article>
              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#fff3e8] p-2 text-[#b45309]">
                  <ShoppingCart className="size-4" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  결제 대기
                </p>
                <p className="mt-1 text-2xl font-black text-primary">
                  {pendingPayments}
                </p>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest shadow-sm xl:col-span-8">
                <div className="flex items-center justify-between border-b border-outline-variant/10 px-5 py-4">
                  <div>
                    <h2 className="text-lg font-bold text-primary">최근 주문</h2>
                    <p className="text-xs text-on-surface-variant">
                      최근 5건 기준 요약입니다.
                    </p>
                  </div>
                  <Link
                    href="/my-page/orders"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-secondary transition-colors hover:opacity-80"
                  >
                    전체 보기
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {myOrders && myOrders.items.length > 0 ? (
                    myOrders.items.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-semibold text-primary">
                            {order.items[0]?.equipmentName ??
                              order.items[0]?.equipmentCode ??
                              "주문 품목"}
                            {order.items.length > 1
                              ? ` 외 ${order.items.length - 1}건`
                              : ""}
                          </p>
                          <p className="mt-1 text-xs text-on-surface-variant">
                            {formatDate(order.createdAt)} · {statusLabel(order.status)}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold text-primary">
                            {order.totalPrice.toLocaleString("ko-KR")}원
                          </p>
                          <p className="mt-1 text-xs font-semibold text-secondary">
                            {paymentStatusLabel(order.paymentStatus)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="px-5 py-8 text-sm text-on-surface-variant">
                      표시할 주문 내역이 없습니다.
                    </p>
                  )}
                </div>
              </article>

              <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm xl:col-span-4">
                <h2 className="text-lg font-bold text-primary">빠른 실행</h2>
                <p className="mt-1 text-xs text-on-surface-variant">
                  자주 쓰는 메뉴로 바로 이동하세요.
                </p>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/equipment"
                    className="inline-flex w-full items-center justify-between rounded-sm bg-surface-container-low px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
                  >
                    장비 보러가기
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/my-page/orders"
                    className="inline-flex w-full items-center justify-between rounded-sm bg-surface-container-low px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
                  >
                    주문 내역 관리
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    href="/contact#inquiry"
                    className="inline-flex w-full items-center justify-between rounded-sm bg-surface-container-low px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
                  >
                    A/S 문의
                    <CircleHelp className="size-4" />
                  </Link>
                </div>
              </article>
            </section>

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
