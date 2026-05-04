import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";

export function QuickActionsCard() {
  return (
    <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm xl:col-span-4">
      <h2 className="text-lg font-bold text-primary">빠른 실행</h2>
      <p className="mt-1 text-xs text-on-surface-variant">
        자주 쓰는 메뉴로 바로 이동하세요.
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
          href="/my-page/orders"
          className="inline-flex w-full items-center justify-between rounded-sm bg-surface-container-low px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-high"
        >
          주문 내역 관리
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
  );
}
