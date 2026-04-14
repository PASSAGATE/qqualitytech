import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Eye,
  EyeOff,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Plus,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { logoutAction } from "./actions";
import { fetchAdminEquipmentRows } from "../equipment/repository";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 대시보드 | QqualityTech",
  description:
    "QqualityTech 시험장비 관리 시스템에서 등록 장비 상태와 운영 현황을 한눈에 관리할 수 있습니다.",
};

const sideNavigation: Array<{
  label: string;
  icon: LucideIcon;
  active?: boolean;
}> = [
  { label: "대시보드", icon: LayoutDashboard },
  { label: "장비 관리", icon: Wrench, active: true },
  // { label: "유지보수", icon: ShieldCheck },
  // { label: "사용자 설정", icon: Users },
  // { label: "시스템 로그", icon: ScrollText },
];

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent
      aria-hidden="true"
      className={className}
      strokeWidth={1.8}
    />
  );
}

function getStatusStyles(statusTone: string) {
  if (statusTone === "active") {
    return {
      dotClassName: "bg-secondary",
      textClassName: "text-primary",
    };
  }

  if (statusTone === "maintenance") {
    return {
      dotClassName: "bg-[#ba1a1a]",
      textClassName: "text-[#ba1a1a]",
    };
  }

  if (statusTone === "warning") {
    return {
      dotClassName: "bg-[#fd7629]",
      textClassName: "text-[#a04100]",
    };
  }

  return {
    dotClassName: "bg-outline",
    textClassName: "text-on-surface-variant",
  };
}

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      "/login?error=Supabase%20sozlanmagan.%20NEXT_PUBLIC_SUPABASE_URL%20va%20NEXT_PUBLIC_SUPABASE_ANON_KEY%20kerak.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Iltimos,%20avval%20tizimga%20kiring.");
  }

  const equipmentAdminRows = await fetchAdminEquipmentRows();
  const totalEquipmentCount = equipmentAdminRows.length;
  const activeEquipmentCount = equipmentAdminRows.filter(
    (row) => row.status.label === "운영중",
  ).length;
  const attentionEquipmentCount = equipmentAdminRows.filter(
    (row) => row.status.label === "점검중" || row.status.label === "점검 필요",
  ).length;
  const hiddenEquipmentCount = equipmentAdminRows.filter(
    (row) => !row.visible,
  ).length;

  return (
    <div className="min-h-screen bg-surface text-on-surface xl:pl-64">
      <aside className="border-b border-outline-variant/20 bg-surface xl:fixed xl:inset-y-0 xl:left-0 xl:flex xl:w-64 xl:flex-col xl:border-r xl:border-b-0">
        <div className="p-6">
          <h1 className="text-xl font-black tracking-[-0.04em] text-primary">
            산업용 장비 관리
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant">
            관리 시스템 v1.2
          </p>
        </div>

        <nav className="flex flex-col gap-1 px-3 pb-4 xl:flex-1 xl:overflow-y-auto xl:pb-0">
          {sideNavigation.map((item) => (
            <button
              key={item.label}
              type="button"
              className={
                item.active
                  ? "inline-flex w-full items-center gap-3 rounded-sm border-r-4 border-secondary bg-surface-container px-4 py-3 text-left font-bold text-primary"
                  : "inline-flex w-full items-center gap-3 rounded-sm px-4 py-3 text-left font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
              }
            >
              <Icon icon={item.icon} className="size-5" />
              <span>{item.label}</span>
            </button>
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

              <label className="relative block w-full md:w-72">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
                  <Icon icon={Search} className="size-4" />
                </span>
                <input
                  type="text"
                  placeholder="장비 모델명 또는 코드 검색..."
                  className="w-full rounded-sm border-none bg-surface-container-low py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-secondary/50"
                />
              </label>
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

        <main className="flex-1 p-5 sm:p-8 lg:p-12">
          <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
                시험장비 목록
              </h2>
              <p className="mt-2 max-w-2xl text-on-surface-variant">
                시스템에 등록된 모든 산업용 시험장비의 실시간 상태와 이력을
                관리합니다. 최신 점검 일정을 확인하세요.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
            >
              <Icon icon={Plus} className="size-5" />
              장비 추가
            </button>
          </section>

          <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-sm border-l-4 border-primary bg-surface-container-lowest p-6 shadow-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                전체 장비
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {totalEquipmentCount}
                </span>
                <span className="text-xs font-bold text-secondary">Live</span>
              </div>
            </article>

            <article className="rounded-sm border-l-4 border-secondary bg-surface-container-lowest p-6 shadow-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                운영 중
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {activeEquipmentCount}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {totalEquipmentCount > 0
                    ? Math.round((activeEquipmentCount / totalEquipmentCount) * 100)
                    : 0}
                  %
                </span>
              </div>
            </article>

            <article className="rounded-sm border-l-4 border-[#ba1a1a] bg-surface-container-lowest p-6 shadow-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                점검 필요
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {attentionEquipmentCount}
                </span>
                <span className="text-xs font-bold text-[#ba1a1a]">긴급</span>
              </div>
            </article>

            <article className="rounded-sm border-l-4 border-on-primary-container bg-surface-container-lowest p-6 shadow-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                비활성
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {hiddenEquipmentCount}
                </span>
              </div>
            </article>
          </section>

          <section className="mb-6 flex flex-wrap items-center gap-4 rounded-sm bg-surface-container-low p-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase text-on-surface-variant">
                타입:
              </label>
              <select className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary">
                <option>전체</option>
                <option>물성 시험기</option>
                <option>환경 시험기</option>
                <option>분석 장비</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase text-on-surface-variant">
                상태:
              </label>
              <select className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary">
                <option>전체</option>
                <option>운영중</option>
                <option>점검중</option>
                <option>점검 필요</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase text-on-surface-variant">
                노출여부:
              </label>
              <select className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary">
                <option>전체</option>
                <option>Visible</option>
                <option>Hidden</option>
              </select>
            </div>

            <button
              type="button"
              className="ml-auto text-xs font-bold text-secondary transition-colors hover:underline"
            >
              필터 초기화
            </button>
          </section>

          <section className="overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[1080px] w-full border-collapse text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      이미지
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      장비명 / 모델
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      타입
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      상태
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      추천
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      노출
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.22em]">
                      등록정보
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-[0.22em]">
                      관리
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/10">
                  {equipmentAdminRows.map((row) => {
                    const statusStyles = getStatusStyles(row.status.tone);

                    return (
                      <tr
                        key={row.id}
                        className="group transition-colors hover:bg-surface-container"
                      >
                        <td className="px-6 py-4 font-mono text-xs text-on-surface-variant">
                          {row.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative h-12 w-12 overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-high">
                            <Image
                              src={row.item.image}
                              alt={row.item.alt}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-primary">
                              {row.item.title}
                            </span>
                            <span className="text-xs font-medium text-secondary">
                              {row.item.model.replace("MODEL: ", "")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-sm bg-surface-container-highest px-2 py-1 text-[10px] font-bold uppercase">
                            {row.typeLabel}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`h-2 w-2 rounded-full ${statusStyles.dotClassName}`}
                            />
                            <span
                              className={`text-sm font-medium ${statusStyles.textClassName}`}
                            >
                              {row.status.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Icon
                            icon={Star}
                            className={`size-5 ${
                              row.featured
                                ? "fill-secondary text-secondary"
                                : "text-outline-variant"
                            }`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Icon
                            icon={row.visible ? Eye : EyeOff}
                            className={`size-5 ${
                              row.visible
                                ? "text-on-primary-container"
                                : "text-outline-variant"
                            }`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-primary">
                              {row.manager}
                            </span>
                            <span className="text-xs text-on-surface-variant">
                              {row.createdAt}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            className="rounded-full p-2 transition-all hover:bg-surface-container-high"
                          >
                            <Icon
                              icon={MoreVertical}
                              className="size-4 text-on-surface-variant"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-outline-variant/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-on-surface-variant">
                전체 {totalEquipmentCount}개 중 1-{equipmentAdminRows.length}개 표시
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm transition-all hover:bg-surface-container"
                >
                  <Icon icon={ChevronLeft} className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-xs font-bold text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-xs font-medium transition-all hover:bg-surface-container"
                >
                  2
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-xs font-medium transition-all hover:bg-surface-container"
                >
                  3
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-xs font-medium transition-all hover:bg-surface-container"
                >
                  ...
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-xs font-medium transition-all hover:bg-surface-container"
                >
                  12
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-sm transition-all hover:bg-surface-container"
                >
                  <Icon icon={ChevronRight} className="size-4" />
                </button>
              </div>
            </div>
          </section>
        </main>

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
