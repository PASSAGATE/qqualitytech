"use client";

import Image from "next/image";
import type { EquipmentAdminRow } from "../equipment/repository";
import { DeleteEquipmentButton } from "./delete-equipment-button";
import { EditEquipmentModal } from "./edit-equipment-modal";

export function EquipmentManagementTable({
  onPreview,
  paginatedRows,
}: {
  onPreview: (row: EquipmentAdminRow) => void;
  paginatedRows: EquipmentAdminRow[];
}) {
  return (
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
                  onClick={() => onPreview(row)}
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
                  onClick={() => onPreview(row)}
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
                    월 임대료:{" "}
                    {row.monthlyRentalPrice.toLocaleString("ko-KR")}원
                  </p>
                  <p>
                    재고: {row.availableCount}/{row.totalCount}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs text-on-surface-variant">
                  {row.createdAt}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <EditEquipmentModal
                    equipmentId={row.equipmentId}
                    name={row.name}
                    modelCode={row.modelCode}
                    description={row.description}
                    typeValue={row.typeValue}
                    categoryValue={row.categoryValue}
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
  );
}
