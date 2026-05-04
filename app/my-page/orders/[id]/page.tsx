import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Truck } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  orderStatusMeta,
  orderTimeline,
  orderTypeLabel,
  paymentStatusMeta,
} from "@/lib/ui/order-status";
import { MyPageShell } from "../../_components/my-page-shell";

export const metadata: Metadata = {
  title: "주문 상세 | 큐품질관리기술",
  description: "사용자 주문 상세 페이지입니다.",
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

type OrderItem = {
  id: string;
  equipmentName: string | null;
  equipmentCode: string | null;
  count: number;
  unitPrice: number;
  rentalMonths: number | null;
  subtotalPrice: number;
};

type OrderDetail = {
  id: string;
  orderType: "buy" | "rent";
  deliveryMethod: "delivery" | "pickup";
  address: string | null;
  deliveryFee: number;
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
  updatedAt: string;
  items: OrderItem[];
};

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function fetchMyOrderDetail(
  accessToken: string,
  orderId: string,
): Promise<OrderDetail> {
  const response = await fetch(`${apiBaseUrl()}/orders/me/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  return (await response.json()) as OrderDetail;
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

type MyOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MyOrderDetailPage({ params }: MyOrderDetailPageProps) {
  const { id } = await params;
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

  let order: OrderDetail;
  try {
    order = await fetchMyOrderDetail(session.access_token, id);
  } catch (fetchError) {
    const message =
      fetchError instanceof Error
        ? fetchError.message
        : "주문 상세 정보를 불러오지 못했습니다.";
    redirect(`/my-page/orders?error=${encodeURIComponent(message)}`);
  }
  const orderStatus = orderStatusMeta(order.status);
  const paymentStatus = paymentStatusMeta(order.paymentStatus);
  const timeline = orderTimeline(order.orderType, order.status);

  return (
    <MyPageShell activeNav="orders">
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
              주문 상세
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              주문 상태와 품목 상세를 확인할 수 있습니다.
            </p>
          </div>
          <Link
            href="/my-page/orders"
            className="inline-flex items-center gap-2 rounded-sm bg-surface-container-high px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-surface-container-highest"
          >
            <ArrowLeft className="size-4" />
            목록으로
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-primary">주문 품목</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[720px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-surface-container-high text-on-surface-variant">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                      품목
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                      수량
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                      임대 개월
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                      소계
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-on-surface">
                        {item.equipmentName ?? item.equipmentCode ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">
                        {item.count}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-secondary">
                        {item.rentalMonths ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-primary">
                        {item.subtotalPrice.toLocaleString("ko-KR")}원
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="space-y-4 rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">주문 정보</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-primary">주문 구분:</span>{" "}
                {orderTypeLabel(order.orderType)}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-primary">주문 상태:</span>{" "}
                <span
                  className={`rounded-sm px-2 py-1 text-xs font-bold ${orderStatus.className}`}
                >
                  {orderStatus.label}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-primary">결제 상태:</span>{" "}
                <span
                  className={`rounded-sm px-2 py-1 text-xs font-bold ${paymentStatus.className}`}
                >
                  {paymentStatus.label}
                </span>
              </p>
              <p>
                <span className="font-semibold text-primary">주문일:</span>{" "}
                {formatDateTime(order.createdAt)}
              </p>
              <p className="inline-flex items-center gap-1">
                <Truck className="size-4 text-on-surface-variant" />
                <span>{order.deliveryMethod === "delivery" ? "배송" : "픽업"}</span>
              </p>
              {order.address ? (
                <p className="text-on-surface-variant">{order.address}</p>
              ) : null}
            </div>
            <div className="border-t border-outline-variant/20 pt-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                진행 타임라인
              </p>
              <ol className="mt-2 space-y-2">
                {timeline.steps.map((step, index) => (
                  <li
                    key={`${step.label}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`inline-flex size-5 items-center justify-center rounded-full text-[11px] font-bold ${
                        step.state === "done"
                          ? "bg-[#e7f6ec] text-[#1d7a3a]"
                          : step.state === "current"
                            ? "bg-[#e8f1fd] text-[#175cd3]"
                            : "bg-surface-container-high text-on-surface-variant"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`text-sm ${
                        step.state === "upcoming"
                          ? "text-on-surface-variant"
                          : "font-semibold text-primary"
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
              {timeline.isTerminal && timeline.terminalLabel ? (
                <p className="mt-2 text-xs font-semibold text-[#b42318]">
                  최종 상태: {timeline.terminalLabel}
                </p>
              ) : null}
            </div>
            <div className="border-t border-outline-variant/20 pt-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                총 결제 금액
              </p>
              <p className="mt-1 text-2xl font-black text-primary">
                {order.totalPrice.toLocaleString("ko-KR")}원
              </p>
            </div>
          </article>
        </section>
      </div>
    </MyPageShell>
  );
}
