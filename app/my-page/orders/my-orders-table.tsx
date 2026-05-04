import Link from "next/link";
import {
  formatDateTime,
  orderTypeLabel,
  paymentStatusLabel,
  statusLabel,
  statusTone,
  type MyOrderListResponse,
} from "./my-orders-data";

export function MyOrdersTable({
  myOrders,
}: {
  myOrders: MyOrderListResponse | null;
}) {
  return (
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
  );
}
