import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MyOrderListResponse } from "../my-page-data";
import { formatDate, paymentStatusLabel, statusLabel } from "../my-page-data";

export function RecentOrdersCard({
  myOrders,
}: {
  myOrders: MyOrderListResponse | null;
}) {
  return (
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
                  {order.items.length > 1 ? ` 외 ${order.items.length - 1}건` : ""}
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
  );
}
