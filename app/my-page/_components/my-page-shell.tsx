import type { ReactNode } from "react";
import Link from "next/link";
import { ClipboardList, Home, LogOut, UserRound } from "lucide-react";
import { logoutAction } from "../../admin/actions";

type MyPageShellProps = {
  activeNav: "profile" | "orders";
  children: ReactNode;
};

export function MyPageShell({ activeNav, children }: MyPageShellProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface xl:pl-64">
      <aside className="border-b border-outline-variant/20 bg-surface xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-64 xl:flex-col xl:border-r xl:border-b-0">
        <div className="p-6">
          <h1 className="text-xl font-black tracking-[-0.04em] text-primary">
            사용자 센터
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant">내 계정 v1.0</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 pb-4 xl:flex-1 xl:overflow-y-auto xl:pb-0">
          <Link
            href="/"
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Home className="size-5" />
            <span>홈페이지</span>
          </Link>
          <Link
            href="/my-page"
            className={
              activeNav === "profile"
                ? "inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
                : "inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            }
          >
            <UserRound className="size-5" />
            <span>내 프로필</span>
          </Link>
          <Link
            href="/my-page/orders"
            className={
              activeNav === "orders"
                ? "inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
                : "inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            }
          >
            <ClipboardList className="size-5" />
            <span>내 주문 내역</span>
          </Link>
        </nav>

        <div className="hidden border-t border-outline-variant/20 p-4 xl:mt-auto xl:flex xl:flex-col xl:gap-1">
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              <LogOut className="size-5" />
              <span>로그아웃</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-white/85 px-5 shadow-sm backdrop-blur-md sm:px-8 lg:px-12">
          <div className="flex min-h-16 items-center justify-between py-4">
            <span className="text-lg font-bold tracking-[-0.03em] text-primary">
              MY PAGE
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-12">{children}</main>
      </div>
    </div>
  );
}
