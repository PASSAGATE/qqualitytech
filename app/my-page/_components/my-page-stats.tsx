import {
  ClipboardList,
  PackageCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import type { MyPageOrderStats } from "../my-page-data";

export function MyPageStats({
  stats,
}: {
  stats: MyPageOrderStats;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
        <div className="mb-3 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
          <ClipboardList className="size-4" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          총 주문
        </p>
        <p className="mt-1 text-2xl font-black text-primary">
          {stats.totalOrders}
        </p>
      </article>
      <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm">
        <div className="mb-3 inline-flex rounded-full bg-[#eef4ff] p-2 text-primary">
          <Truck className="size-4" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
          진행중
        </p>
        <p className="mt-1 text-2xl font-black text-primary">
          {stats.inProgressOrders}
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
          {stats.completedOrders}
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
          {stats.pendingPayments}
        </p>
      </article>
    </section>
  );
}
