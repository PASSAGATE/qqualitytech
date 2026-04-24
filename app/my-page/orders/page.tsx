import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList, Home, LogOut, UserRound } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { logoutAction } from "../../admin/actions";

export const metadata: Metadata = {
  title: "내 주문 내역 | 큐품질관리기술",
  description: "사용자 주문 내역을 확인하는 페이지입니다.",
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

type MyOrderItem = {
  id: string;
  equipmentName: string | null;
  equipmentCode: string | null;
  count: number;
  rentalMonths: number | null;
  subtotalPrice: number;
};

type MyOrder = {
  id: string;
  orderType: "buy" | "rent";
  deliveryMethod: "delivery" | "pickup";
  address: string | null;
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
  items: MyOrderItem[];
};

type MyOrderListResponse = {
  page: number;
  limit: number;
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

async function fetchMyOrders(accessToken: string): Promise<MyOrderListResponse> {
  const response = await fetch(`${apiBaseUrl()}/orders/me?page=1&limit=20`, {
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

function formatDateTime(input: string) {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${d} ${hh}:${mm}`;
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

function orderTypeLabel(type: MyOrder["orderType"]) {
  return type === "buy" ? "구매" : "임대";
}

export default async function MyOrdersPage() {
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

  let myOrders: MyOrderListResponse | null = null;
  try {
    myOrders = await fetchMyOrders(session.access_token);
  } catch (fetchError) {
    await supabase.auth.signOut();
    const message =
      fetchError instanceof Error
        ? fetchError.message === "Invalid or expired token"
          ? "세션이 만료되었습니다. 다시 로그인해 주세요."
          : fetchError.message
        : "주문 정보를 불러오지 못했습니다.";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

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
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <UserRound className="size-5" />
            <span>내 프로필</span>
          </Link>
          <Link
            href="/my-page/orders"
            className="inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
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
            <div className="border-b border-outline-variant/10 pb-6">
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
                내 주문 내역
              </h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                최근 주문 및 결제 상태를 확인할 수 있습니다.
              </p>
            </div>

            <section className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
              <div className="border-b border-outline-variant/10 px-6 py-4">
                <h2 className="text-xl font-bold text-primary">주문 목록</h2>
                <p className="mt-1 text-xs text-on-surface-variant">
                  총 {myOrders?.total ?? 0}건
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[1080px] w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container-high text-on-surface-variant">
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        주문일시
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        구분
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        품목
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        주문 상태
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        결제 상태
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                        합계
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                        상세
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {!myOrders || myOrders.items.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-10 text-center text-sm font-medium text-on-surface-variant"
                        >
                          아직 주문 내역이 없습니다.
                        </td>
                      </tr>
                    ) : null}
                    {myOrders?.items.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 text-sm font-medium text-on-surface-variant">
                          {formatDateTime(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">
                          {orderTypeLabel(order.orderType)}
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface">
                          {order.items[0]?.equipmentName ??
                            order.items[0]?.equipmentCode ??
                            "-"}
                          {order.items.length > 1
                            ? ` 외 ${order.items.length - 1}건`
                            : ""}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-primary">
                          {statusLabel(order.status)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-secondary">
                          {paymentStatusLabel(order.paymentStatus)}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-primary">
                          {order.totalPrice.toLocaleString("ko-KR")}원
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/my-page/orders/${order.id}`}
                            className="rounded-sm bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest"
                          >
                            상세 보기
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
