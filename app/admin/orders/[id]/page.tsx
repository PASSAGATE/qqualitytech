import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Truck } from "lucide-react";
import { AdminShell } from "../../admin-shell";
import { requireAdminSession } from "../../admin-auth";
import { fetchAdminOrderDetail } from "@/lib/backend/orders";
import {
  orderStatusMeta,
  orderTimeline,
  orderTypeLabel,
  paymentStatusMeta,
} from "@/lib/ui/order-status";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "주문 상세 | 관리자",
  description: "관리자 주문 상세 페이지",
};

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
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

type AdminOrderDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: AdminOrderDetailPageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const { session } = await requireAdminSession();

  if (!session?.access_token) {
    redirect("/login?error=%EC%84%B8%EC%85%98%EC%9D%B4%20%EC%9C%A0%ED%9A%A8%ED%95%98%EC%A7%80%20%EC%95%8A%EC%8A%B5%EB%8B%88%EB%8B%A4.");
  }

  const order = await fetchAdminOrderDetail(session.access_token, id);
  if (!order) {
    notFound();
  }
  const orderStatus = orderStatusMeta(order.status);
  const paymentStatus = paymentStatusMeta(order.paymentStatus);
  const timeline = orderTimeline(order.orderType, order.status);

  const backPage = Number.parseInt(page ?? "1", 10);
  const safeBackPage = Number.isFinite(backPage) && backPage > 0 ? backPage : 1;

  return (
    <AdminShell activeNav="orders">
      <section className="mb-8 flex items-center justify-between gap-3 border-b border-outline-variant/10 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
            주문 상세
          </h2>
          <p className="mt-2 max-w-2xl text-on-surface-variant">
            주문/결제/배송 정보를 상세하게 확인할 수 있습니다.
          </p>
        </div>
        <Link
          href={`/admin/orders?page=${safeBackPage}`}
          className="inline-flex items-center gap-2 rounded-sm bg-surface-container-high px-3 py-2 text-sm font-bold text-primary transition-colors hover:bg-surface-container-highest"
        >
          <ArrowLeft className="size-4" />
          목록으로
        </Link>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-primary">주문 품목</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left">
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
                    단가
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
                    <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                      {item.unitPrice.toLocaleString("ko-KR")}원
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
          <h3 className="text-lg font-bold text-primary">주문 정보</h3>
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
              <span className="font-semibold text-primary">주문자:</span>{" "}
              {order.user?.fullName || order.companyName}
            </p>
            <p>
              <span className="font-semibold text-primary">이메일:</span>{" "}
              {order.user?.email || "-"}
            </p>
            <p>
              <span className="font-semibold text-primary">주문일:</span>{" "}
              {formatDateTime(order.createdAt)}
            </p>
            <p className="inline-flex items-center gap-1">
              <Truck className="size-4 text-on-surface-variant" />
              <span>
                {order.deliveryMethod === "delivery" ? "배송" : "픽업"}
              </span>
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
                <li key={`${step.label}-${index}`} className="flex items-center gap-2">
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
              배송비
            </p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {order.deliveryFee.toLocaleString("ko-KR")}원
            </p>
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
    </AdminShell>
  );
}
