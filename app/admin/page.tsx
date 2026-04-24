import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { AdminShell } from "./admin-shell";
import { AddEquipmentModal } from "./add-equipment-modal";
import { EquipmentManagementPanel } from "./equipment-management-panel";
import { requireAdminSession } from "./admin-auth";
import { fetchAdminEquipmentRows } from "../equipment/repository";

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

  const { supabase } = await requireAdminSession();

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
    <AdminShell activeNav="equipment" searchQuery={q ?? ""}>
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
                ? Math.round((availableEquipmentCount / totalEquipmentCount) * 100)
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
            <MessageSquare className="size-5 text-secondary" />
            <h3 className="text-lg font-bold text-primary">문의 요청 목록</h3>
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
            문의 데이터를 불러오지 못했습니다: {equipmentInquiryError.message}
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

      <EquipmentManagementPanel
        rows={equipmentAdminRows}
        initialQuery={q ?? ""}
        initialType={type ?? "all"}
        initialStatus={status ?? "active"}
      />
    </AdminShell>
  );
}

