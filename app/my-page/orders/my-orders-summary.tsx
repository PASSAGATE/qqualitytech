import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";
import { formatDateTime, type MyOrderListResponse } from "./my-orders-data";

export function MyOrdersSummary({
  myOrders,
}: {
  myOrders: MyOrderListResponse | null;
}) {
  return (
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
  );
}
