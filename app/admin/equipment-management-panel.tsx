"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { EquipmentAdminRow } from "../equipment/repository";
import { EditEquipmentModal } from "./edit-equipment-modal";
import { DeleteEquipmentButton } from "./delete-equipment-button";

type EquipmentManagementPanelProps = {
  rows: EquipmentAdminRow[];
  initialQuery?: string;
  initialType?: string;
  initialStatus?: string;
};

const PAGE_SIZE = 10;

function normalize(value: string | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export function EquipmentManagementPanel({
  rows,
  initialQuery = "",
  initialType = "all",
  initialStatus = "all",
}: EquipmentManagementPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(normalize(initialType) || "all");
  const [status, setStatus] = useState(normalize(initialStatus) || "all");
  const [page, setPage] = useState(1);
  const [previewRow, setPreviewRow] = useState<EquipmentAdminRow | null>(null);

  const filteredRows = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery =
        search.length === 0 ||
        row.item.title.toLowerCase().includes(search) ||
        row.item.model.toLowerCase().includes(search);
      const matchesType = type === "all" || row.typeValue.toLowerCase() === type;
      const matchesStatus =
        status === "all" || row.statusValue.toLowerCase() === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [query, rows, status, type]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginatedRows = filteredRows.slice(pageStart, pageStart + PAGE_SIZE);

  const onQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const onTypeChange = (value: string) => {
    setType(normalize(value) || "all");
    setPage(1);
  };

  const onStatusChange = (value: string) => {
    setStatus(normalize(value) || "all");
    setPage(1);
  };

  const resetFilters = () => {
    setQuery("");
    setType("all");
    setStatus("all");
    setPage(1);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-4 rounded-sm bg-surface-container-low p-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase text-on-surface-variant">
            검색:
          </label>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="장비명/모델"
            className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-secondary"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase text-on-surface-variant">
            타입:
          </label>
          <select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary"
          >
            <option value="all">전체</option>
            <option value="sale">판매(sale)</option>
            <option value="rental">임대(rental)</option>
            <option value="sale_and_rental">판매+임대(sale_and_rental)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase text-on-surface-variant">
            상태:
          </label>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary"
          >
            <option value="all">전체</option>
            <option value="active">활성(active)</option>
            <option value="inactive">비활성(inactive)</option>
          </select>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="ml-auto rounded-sm border border-outline-variant/40 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-low"
        >
          필터 초기화
        </button>
      </div>

      <section className="overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1080px] w-full border-collapse text-left">
            <thead>
              <tr className="bg-primary text-white">
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
                  가격/재고
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
              {paginatedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm font-semibold text-on-surface-variant"
                  >
                    검색/필터 조건에 맞는 장비가 없습니다.
                  </td>
                </tr>
              ) : null}
              {paginatedRows.map((row) => (
                <tr
                  key={row.equipmentId}
                  className="group transition-colors hover:bg-surface-container"
                >
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setPreviewRow(row)}
                      className="relative h-12 w-12 overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-high"
                    >
                      <Image
                        src={row.item.image}
                        alt={row.item.alt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => setPreviewRow(row)}
                      className="flex flex-col text-left"
                    >
                      <span className="font-bold text-primary">{row.item.title}</span>
                      <span className="text-xs font-medium text-secondary">
                        {row.item.model.replace("MODEL: ", "")}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-sm bg-surface-container-highest px-2 py-1 text-[10px] font-bold uppercase">
                      {row.typeLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-primary">
                      {row.status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-on-surface-variant">
                      <p>판매가: {row.salePrice.toLocaleString("ko-KR")}원</p>
                      <p>
                        월 임대료: {row.monthlyRentalPrice.toLocaleString("ko-KR")}원
                      </p>
                      <p>
                        재고: {row.availableCount}/{row.totalCount}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-surface-variant">{row.createdAt}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <EditEquipmentModal
                        equipmentId={row.equipmentId}
                        name={row.name}
                        modelCode={row.modelCode}
                        description={row.description}
                        typeValue={row.typeValue}
                        statusValue={row.statusValue}
                        salePrice={row.salePrice}
                        monthlyRentalPrice={row.monthlyRentalPrice}
                        totalCount={row.totalCount}
                        availableCount={row.availableCount}
                        imageUrls={row.imageUrls}
                      />
                      <DeleteEquipmentButton
                        equipmentId={row.equipmentId}
                        title={row.item.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-outline-variant/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-on-surface-variant">
            전체 {rows.length}개 중 {filteredRows.length}개 필터됨, {safePage}/{totalPages} 페이지
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="rounded-sm bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
            >
              이전
            </button>
            <span className="text-xs font-semibold text-on-surface-variant">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-sm bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      </section>

      {previewRow ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-3xl rounded-md bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-primary">장비 미리보기</h3>
              <button
                type="button"
                onClick={() => setPreviewRow(null)}
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-outline-variant/25">
                  <Image
                    src={previewRow.imageUrls[0] ?? previewRow.item.image}
                    alt={previewRow.item.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {previewRow.imageUrls.slice(0, 5).map((url, index) => (
                    <div
                      key={`${previewRow.equipmentId}-preview-${index + 1}`}
                      className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/25"
                    >
                      <Image
                        src={url}
                        alt={`${previewRow.item.alt} ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-xl font-bold text-primary">{previewRow.item.title}</p>
                <p className="font-medium text-secondary">{previewRow.modelCode}</p>
                <p className="text-on-surface">{previewRow.description || "-"}</p>
                <div className="mt-3 space-y-1 text-on-surface-variant">
                  <p>타입: {previewRow.typeLabel}</p>
                  <p>상태: {previewRow.status.label}</p>
                  <p>판매가: {previewRow.salePrice.toLocaleString("ko-KR")}원</p>
                  <p>
                    월 임대료: {previewRow.monthlyRentalPrice.toLocaleString("ko-KR")}원
                  </p>
                  <p>
                    재고: {previewRow.availableCount}/{previewRow.totalCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
