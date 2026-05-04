import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CircleHelp } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MyPageShell } from "../_components/my-page-shell";
import { MyPageStats } from "../_components/my-page-stats";

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

function statusTone(status: MyOrder["status"]) {
  switch (status) {
    case "completed":
      return "bg-[#e7f6ec] text-[#1d7a3a]";
    case "cancelled":
    case "expired":
      return "bg-[#fde8e8] text-[#b42318]";
    case "shipped":
    case "active_rental":
      return "bg-[#eef4ff] text-primary";
    default:
      return "bg-[#fff3e8] text-[#b45309]";
  }
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
    <MyPageShell activeNav="orders">
      <div className="w-full space-y-6">
        <div className="border-b border-outline-variant/10 pb-6">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
            내 주문 내역
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            최근 주문 및 결제 상태를 확인할 수 있습니다.
          </p>
        </div>

        <MyPageStats
          stats={{
            totalOrders,
            inProgressOrders,
            completedOrders,
            pendingPayments,
          }}
        />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm xl:col-span-8">
            <h2 className="text-lg font-bold text-primary">빠른 요약</h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              가장 최근 주문은{" "}
              <span className="font-semibold text-primary">
                {myOrders?.items[0]
                  ? formatDateTime(myOrders.items[0].createdAt)
                  : "-"}
              </span>
              에 생성되었습니다.
            </p>
          </article>

          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm xl:col-span-4">
            <h2 className="text-lg font-bold text-primary">빠른 실행</h2>
            <p className="mt-1 text-xs text-on-surface-variant">
              필요한 페이지로 바로 이동하세요.
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
                href="/my-page"
                className="inline-flex w-full items-center justify-between rounded-sm bg-surface-container-low px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
              >
                프로필 수정
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
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusTone(order.status)}`}
                      >
                        {statusLabel(order.status)}
                      </span>
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
    </MyPageShell>
  );
}
