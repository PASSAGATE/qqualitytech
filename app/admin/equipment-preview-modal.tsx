"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { EquipmentAdminRow } from "../equipment/repository";

export function EquipmentPreviewModal({
  onClose,
  previewRow,
}: {
  onClose: () => void;
  previewRow: EquipmentAdminRow | null;
}) {
  if (!previewRow) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/55 p-4">
      <div className="w-full max-w-3xl rounded-md bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-primary">장비 미리보기</h3>
          <button
            type="button"
            onClick={onClose}
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
            <p className="text-xl font-bold text-primary">
              {previewRow.item.title}
            </p>
            <p className="font-medium text-secondary">{previewRow.modelCode}</p>
            <p className="text-on-surface">{previewRow.description || "-"}</p>
            <div className="mt-3 space-y-1 text-on-surface-variant">
              <p>분류: {previewRow.categoryLabel}</p>
              <p>타입: {previewRow.typeLabel}</p>
              <p>상태: {previewRow.status.label}</p>
              <p>판매가: {previewRow.salePrice.toLocaleString("ko-KR")}원</p>
              <p>
                월 임대료:{" "}
                {previewRow.monthlyRentalPrice.toLocaleString("ko-KR")}원
              </p>
              <p>
                재고: {previewRow.availableCount}/{previewRow.totalCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
