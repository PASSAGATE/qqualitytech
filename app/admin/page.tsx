import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CircleHelp,
  LayoutDashboard,
  House,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  Wrench,
} from "lucide-react";
import { logoutAction } from "./actions";
import { fetchAdminEquipmentRows } from "../equipment/repository";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { resolveUserRoleFromBackend } from "@/lib/backend/user-role";
import { AddEquipmentModal } from "./add-equipment-modal";
import { DeliveryFeesManagementPanel } from "./delivery-fees-management-panel";
import { EquipmentManagementPanel } from "./equipment-management-panel";
import { OrderManagementPanel } from "./order-management-panel";
import { fetchAdminOrders } from "@/lib/backend/orders";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 대시보드 | 큐품질관리기술",
  description:
    "큐품질관리기술 시험장비 관리 시스템에서 등록 장비 상태와 운영 현황을 한눈에 관리할 수 있습니다.",
};

type AdminPageProps = {
  searchParams: Promise<{
    createError?: string;
    updateError?: string;
    deleteError?: string;
    created?: string;
    updated?: string;
    deleted?: string;
    archived?: string;
    archivedReason?: string;
    q?: string;
    type?: string;
    status?: string;
  }>;
};

const sideNavigation: Array<{
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
}> = [
  { label: "홈페이지", icon: House, href: "/" },
  { label: "대시보드", icon: LayoutDashboard, href: "/admin" },
  { label: "장비 관리", icon: Wrench, href: "/admin", active: true },
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
    <IconComponent aria-hidden="true" className={className} strokeWidth={1.8} />
  );
}

type EquipmentInquiryRow = {
  id: string;
  equipment_slug: string | null;
  equipment_title: string | null;
  customer_name: string;
  customer_phone: string;
  message: string;
  created_at: string | null;
};

function formatDateTime(input: string | null) {
  if (!input) {
    return "-";
  }

  const date = new Date(input);

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

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const {
    createError,
    updateError,
    deleteError,
    created,
    updated,
    deleted,
    archived,
    archivedReason,
    q,
    type,
    status,
  } = await searchParams;
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      "/login?error=Supabase%20%ED%99%98%EA%B2%BD%20%EC%84%A4%EC%A0%95%EC%9D%B4%20%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.%20NEXT_PUBLIC_SUPABASE_URL%20%EA%B3%BC%20NEXT_PUBLIC_SUPABASE_ANON_KEY%EB%A5%BC%20%ED%99%95%EC%9D%B8%ED%95%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect(
      "/login?error=%EA%B4%80%EB%A6%AC%EC%9E%90%20%ED%8E%98%EC%9D%B4%EC%A7%80%EB%8A%94%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%ED%9B%84%20%EC%9D%B4%EC%9A%A9%ED%95%A0%20%EC%88%98%20%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4.",
    );
  }

  const role = session?.access_token
    ? await resolveUserRoleFromBackend(session.access_token)
    : null;
  if (role !== "admin") {
    redirect(
      "/my-page?error=%EA%B4%80%EB%A6%AC%EC%9E%90%20%EA%B6%8C%ED%95%9C%EC%9D%B4%20%ED%95%84%EC%9A%94%ED%95%A9%EB%8B%88%EB%8B%A4.",
    );
  }

  const shouldLoadInquiryDb = process.env.INQUIRY_STORAGE_MODE === "db";
  const equipmentInquiries: EquipmentInquiryRow[] = [];
  let equipmentInquiryError: { message: string } | null = null;

  if (shouldLoadInquiryDb) {
    const { data: equipmentInquiryRows, error } = await supabase
      .from("equipment_inquiries")
      .select(
        "id, equipment_slug, equipment_title, customer_name, customer_phone, message, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);

    equipmentInquiryError = error ? { message: error.message } : null;

    equipmentInquiries.push(
      ...((equipmentInquiryRows as EquipmentInquiryRow[] | null) ?? []).map(
        (row) => ({
          ...row,
          customer_name: row.customer_name?.trim() || "-",
          customer_phone: row.customer_phone?.trim() || "-",
          message: row.message?.trim() || "-",
          equipment_slug: row.equipment_slug?.trim() || null,
          equipment_title: row.equipment_title?.trim() || null,
        }),
      ),
    );
  }

  const equipmentAdminRows = await fetchAdminEquipmentRows();
  const adminOrders = session?.access_token
    ? await fetchAdminOrders(session.access_token, { page: 1, limit: 20 })
    : null;
  const adminOrderRows = adminOrders?.items ?? [];
  const adminOrderTotal = adminOrders?.total ?? 0;
  const equipmentBySlug = new Map(
    equipmentAdminRows.map((row) => [row.item.slug, row]),
  );

  const totalEquipmentCount = equipmentAdminRows.length;
  const availableEquipmentCount = equipmentAdminRows.filter(
    (row) => row.statusValue === "active",
  ).length;
  const inactiveEquipmentCount = equipmentAdminRows.filter(
    (row) => row.statusValue === "inactive",
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
            <Link
              key={item.label}
              href={item.href}
              className={
                item.active
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
                  value={q ?? ""}
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

        <main className="flex-1 p-5 sm:p-8 lg:p-12">
          <section className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
                시험장비 목록
              </h2>
              <p className="mt-2 max-w-2xl text-on-surface-variant">
                시스템에 등록된 장비의 판매/임대 상태와 노출 여부를 관리합니다.
              </p>
            </div>

            <AddEquipmentModal />
          </section>

          {createError || updateError || deleteError ? (
            <p className="mb-6 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
              {createError ?? updateError ?? deleteError}
            </p>
          ) : null}
          {!createError && created === "1" ? (
            <p className="mb-6 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장비가 성공적으로 등록되었습니다.
            </p>
          ) : null}
          {!createError && updated === "1" ? (
            <p className="mb-6 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장비 정보가 성공적으로 수정되었습니다.
            </p>
          ) : null}
          {!createError && !updateError && !deleteError && deleted === "1" ? (
            <p className="mb-6 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장비가 성공적으로 삭제되었습니다.
            </p>
          ) : null}
          {!createError && !updateError && !deleteError && archived === "1" ? (
            <p className="mb-6 rounded-sm bg-[#fff7e6] px-4 py-3 text-sm font-semibold text-[#9a6700]">
              {archivedReason?.trim() ||
                "연관 주문 이력이 있어 장비를 완전 삭제하지 않고 비활성(아카이브) 처리했습니다."}
            </p>
          ) : null}

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
                활성 장비
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {availableEquipmentCount}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {totalEquipmentCount > 0
                    ? Math.round(
                        (availableEquipmentCount / totalEquipmentCount) * 100,
                      )
                    : 0}
                  %
                </span>
              </div>
            </article>

            <article className="rounded-sm border-l-4 border-[#ba1a1a] bg-surface-container-lowest p-6 shadow-sm">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                비활성 장비
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">
                  {inactiveEquipmentCount}
                </span>
                <span className="text-xs font-bold text-[#ba1a1a]">관리</span>
              </div>
            </article>
          </section>

          <section className="mb-10 overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/10 px-6 py-4">
              <div className="inline-flex items-center gap-2">
                <Icon icon={MessageSquare} className="size-5 text-secondary" />
                <h3 className="text-lg font-bold text-primary">
                  문의 요청 목록
                </h3>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant">
                {shouldLoadInquiryDb
                  ? `최근 ${equipmentInquiries.length}건`
                  : "이메일 전용 모드"}
              </span>
            </div>

            {!shouldLoadInquiryDb ? (
              <p className="m-6 rounded-sm bg-surface-container px-4 py-3 text-sm font-medium text-on-surface-variant">
                현재 문의는 DB 저장 없이 이메일로만 전송됩니다.
              </p>
            ) : null}

            {equipmentInquiryError ? (
              <p className="m-6 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
                문의 데이터를 불러오지 못했습니다:{" "}
                {equipmentInquiryError.message}
              </p>
            ) : null}

            {!equipmentInquiryError && shouldLoadInquiryDb ? (
              <div className="overflow-x-auto">
                <table className="min-w-[920px] w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-surface-container-high text-on-surface-variant">
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        접수일시
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        장비
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        고객명
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        연락처
                      </th>
                      <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                        문의 내용
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {equipmentInquiries.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-10 text-center text-sm font-medium text-on-surface-variant"
                        >
                          아직 접수된 문의가 없습니다.
                        </td>
                      </tr>
                    ) : null}
                    {equipmentInquiries.map((inquiry) =>
                      (() => {
                        const matchedEquipment = inquiry.equipment_slug
                          ? equipmentBySlug.get(inquiry.equipment_slug)
                          : undefined;
                        const equipmentName =
                          matchedEquipment?.name ||
                          matchedEquipment?.item.title ||
                          inquiry.equipment_title ||
                          "-";

                        return (
                          <tr key={inquiry.id} className="align-top">
                            <td className="px-6 py-4 text-xs font-medium text-on-surface-variant">
                              {formatDateTime(inquiry.created_at)}
                            </td>
                            <td className="px-6 py-4">
                              {inquiry.equipment_slug ? (
                                <Link
                                  href={`/equipment/${inquiry.equipment_slug}`}
                                  className="line-clamp-2 text-sm font-semibold text-primary transition-colors hover:text-secondary hover:underline"
                                >
                                  {equipmentName}
                                </Link>
                              ) : (
                                <span className="line-clamp-2 text-sm font-semibold text-primary">
                                  {equipmentName}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-primary">
                              {inquiry.customer_name}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-on-surface">
                              {inquiry.customer_phone}
                            </td>
                            <td className="px-6 py-4 text-sm text-on-surface">
                              {inquiry.message}
                            </td>
                          </tr>
                        );
                      })(),
                    )}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>

          <OrderManagementPanel orders={adminOrderRows} total={adminOrderTotal} />

          <DeliveryFeesManagementPanel />

          <EquipmentManagementPanel
            rows={equipmentAdminRows}
            initialQuery={q ?? ""}
            initialType={type ?? "all"}
            initialStatus={status ?? "active"}
          />
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
