import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CircleHelp,
  CreditCard,
  House,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Search,
  Settings,
  Wrench,
} from "lucide-react";
import { logoutAction } from "./actions";

type AdminNavKey = "equipment" | "orders" | "deliveryFees";

const sideNavigation: Array<{
  key: AdminNavKey;
  label: string;
  icon: LucideIcon;
  href: string;
}> = [
  { key: "equipment", label: "장비 관리", icon: Wrench, href: "/admin" },
  { key: "orders", label: "주문 관리", icon: CreditCard, href: "/admin/orders" },
  {
    key: "deliveryFees",
    label: "배송비 관리",
    icon: MapPinned,
    href: "/admin/delivery-fees",
  },
];

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent aria-hidden="true" className={className} strokeWidth={1.8} />
  );
}

export function AdminShell({
  activeNav,
  children,
  searchQuery = "",
}: {
  activeNav: AdminNavKey;
  children: ReactNode;
  searchQuery?: string;
}) {
  return (
    <div className="min-h-screen bg-surface text-on-surface xl:pl-64">
      <aside className="border-b border-outline-variant/20 bg-surface xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-64 xl:flex-col xl:border-r xl:border-b-0">
        <div className="p-6">
          <h1 className="text-xl font-black tracking-[-0.04em] text-primary">
            산업용 장비 관리
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant">관리 시스템 v1.2</p>
        </div>

        <nav className="flex flex-col gap-1 px-3 pb-4 xl:flex-1 xl:overflow-y-auto xl:pb-0">
          <Link
            href="/"
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Icon icon={House} className="size-5" />
            <span>홈페이지</span>
          </Link>
          <Link
            href="/admin"
            className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Icon icon={LayoutDashboard} className="size-5" />
            <span>대시보드</span>
          </Link>
          {sideNavigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={
                item.key === activeNav
                  ? "inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
                  : "inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
              }
            >
              <Icon icon={item.icon} className="size-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden border-t border-outline-variant/20 p-4 xl:mt-auto xl:flex xl:flex-col xl:gap-1">
          <button
            type="button"
            className="inline-flex items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Icon icon={Settings} className="size-5" />
            <span>설정</span>
          </button>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              <Icon icon={LogOut} className="size-5" />
              <span>로그아웃</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-white/85 px-5 shadow-sm backdrop-blur-md sm:px-8 lg:px-12">
          <div className="flex min-h-16 flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
              <span className="text-lg font-bold tracking-[-0.03em] text-primary">
                EQUIP-MASTER
              </span>

              <div className="relative block w-full md:w-72">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
                  <Icon icon={Search} className="size-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  readOnly
                  placeholder="장비 모델명 또는 코드 검색..."
                  className="w-full rounded-sm border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-secondary/50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full p-2 text-on-surface-variant transition-colors hover:text-secondary active:scale-95"
                >
                  <Icon icon={Bell} className="size-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-2 text-on-surface-variant transition-colors hover:text-secondary active:scale-95"
                >
                  <Icon icon={CircleHelp} className="size-5" />
                </button>
              </div>

              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary-container text-xs font-bold text-white">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD32XHVRl0C0kypR9B79d0y-2q5ScpBxgsZdmmp5ICEWIhUVZYK25NWhzUY2B9RquT55BTMckt0xpcB215C20ii21BRM1l_lHYtqYztLh1mAS1HydJx5OK21o4usdRt5R9_hGtaDeGIh_qHDrNthpuJYsGBGZrd8yOW4BuzrizncvJuFzkoonUdiOK3iqx7wk3AWKQFQj4Hvkuo8uUm1K021Szve7gGBYrqXKw95Zzxld_Gfip9_bUpsbBtLNICy64HQ52E-cKeOJAd"
                  alt="사용자 아바타"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-12">{children}</main>

        <footer className="mt-auto flex flex-col gap-4 border-t border-outline-variant/10 bg-surface-container-low px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <p className="text-xs text-on-surface-variant">
            © 2024 EQUIP-MASTER Industrial Solutions. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="#"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-secondary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-secondary"
            >
              Terms of Service
            </a>
            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-[0.2em] text-primary transition-colors hover:text-secondary"
            >
              Support
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

