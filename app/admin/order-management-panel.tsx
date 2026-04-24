import type { AdminOrder } from "@/lib/backend/orders";
import { updateOrderPaymentStatusAction } from "./actions";

type OrderManagementPanelProps = {
  orders: AdminOrder[];
  total: number;
  currentPage?: number;
  paymentUpdated?: boolean;
  paymentError?: string | null;
  paymentOrderId?: string | null;
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

function toOrderTypeLabel(type: AdminOrder["orderType"]) {
  return type === "buy" ? "구매" : "임대";
}

function toDeliveryMethodLabel(method: AdminOrder["deliveryMethod"]) {
  return method === "delivery" ? "배송" : "픽업";
}

function toStatusLabel(status: AdminOrder["status"]) {
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

function toPaymentStatusLabel(status: AdminOrder["paymentStatus"]) {
  switch (status) {
    case "pending":
      return "대기";
    case "paid":
      return "완료";
    case "failed":
      return "실패";
    case "refunded":
      return "환불";
    default:
      return status;
  }
}

function orderItemSummary(order: AdminOrder) {
  if (order.items.length === 0) {
    return "-";
  }

  const first = order.items[0];
  if (order.items.length === 1) {
    return first.equipmentName ?? first.equipmentCode ?? first.id;
  }

  return `${first.equipmentName ?? first.equipmentCode ?? first.id} 외 ${
    order.items.length - 1
  }건`;
}

export function OrderManagementPanel({
  orders,
  total,
  currentPage = 1,
  paymentUpdated = false,
  paymentError = null,
  paymentOrderId = null,
}: OrderManagementPanelProps) {
  return (
    <section className="mb-10 overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
      <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
        <h3 className="text-lg font-bold text-primary">주문 관리</h3>
        <span className="text-xs font-semibold text-on-surface-variant">
          총 {total}건
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1080px] w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-high text-on-surface-variant">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                주문일시
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                고객
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                구분
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                품목
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                상태
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                결제
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                상태 요약
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                합계
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                처리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-10 text-center text-sm font-medium text-on-surface-variant"
                >
                  주문 데이터가 없습니다.
                </td>
              </tr>
            ) : null}
            {orders.map((order) => (
              <tr key={order.id} className="align-top">
                <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                  {formatDateTime(order.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-primary">
                    {order.user?.fullName || order.companyName}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {order.user?.email || "-"}
                  </p>
                </td>
                <td className="px-6 py-4 text-xs text-on-surface">
                  <p>{toOrderTypeLabel(order.orderType)}</p>
                  <p>{toDeliveryMethodLabel(order.deliveryMethod)}</p>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface">
                  {orderItemSummary(order)}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-primary">
                  {toStatusLabel(order.status)}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-secondary">
                  {toPaymentStatusLabel(order.paymentStatus)}
                </td>
                <td className="px-6 py-4 text-xs text-on-surface-variant">
                  {toStatusLabel(order.status)} /{" "}
                  {toPaymentStatusLabel(order.paymentStatus)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-primary">
                  {order.totalPrice.toLocaleString("ko-KR")}원
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="space-y-2">
                    {order.paymentStatus === "pending" ? (
                      <div className="inline-flex items-center gap-2">
                        <form action={updateOrderPaymentStatusAction}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <input
                            type="hidden"
                            name="paymentStatus"
                            value="paid"
                          />
                          <input
                            type="hidden"
                            name="returnPage"
                            value={String(currentPage)}
                          />
                          <button
                            type="submit"
                            className="rounded-sm bg-[#1d7a3a] px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                          >
                            결제완료
                          </button>
                        </form>
                        <form action={updateOrderPaymentStatusAction}>
                          <input type="hidden" name="orderId" value={order.id} />
                          <input
                            type="hidden"
                            name="paymentStatus"
                            value="failed"
                          />
                          <input
                            type="hidden"
                            name="returnPage"
                            value={String(currentPage)}
                          />
                          <button
                            type="submit"
                            className="rounded-sm bg-[#b42318] px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                          >
                            결제실패
                          </button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-xs text-on-surface-variant">-</span>
                    )}

                    {paymentOrderId === order.id && paymentError ? (
                      <p className="text-xs font-semibold text-[#b42318]">
                        {paymentError}
                      </p>
                    ) : null}
                    {paymentOrderId === order.id &&
                    paymentUpdated &&
                    !paymentError ? (
                      <p className="text-xs font-semibold text-[#1d7a3a]">
                        결제 상태가 업데이트되었습니다.
                      </p>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
