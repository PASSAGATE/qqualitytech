import type { CartLiveSummary } from "./cart-live-panel-utils";

export function CartSummaryCard({ summary }: { summary: CartLiveSummary }) {
  return (
    <section className="rounded-md border border-outline-variant/20 bg-surface-container-low p-6 shadow-sm">
      <h2 className="text-lg font-bold text-primary">주문 요약</h2>
      <div className="mt-4 space-y-2 text-sm text-on-surface-variant">
        <div className="flex items-center justify-between">
          <span>품목 수</span>
          <span className="font-semibold text-primary">
            {summary.itemCount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>총 수량</span>
          <span className="font-semibold text-primary">
            {summary.totalQuantity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>구매 소계</span>
          <span className="font-semibold text-primary">
            {summary.buySubtotal.toLocaleString("ko-KR")}원
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>임대 소계</span>
          <span className="font-semibold text-primary">
            {summary.rentSubtotal.toLocaleString("ko-KR")}원
          </span>
        </div>
      </div>
      <div className="mt-5 border-t border-outline-variant/20 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
          Total
        </p>
        <p className="mt-1 text-2xl font-black text-primary">
          {summary.totalAmount.toLocaleString("ko-KR")}원
        </p>
      </div>
    </section>
  );
}
