"use client";

import type { ChangeEvent } from "react";
import Image from "next/image";
import { EQUIPMENT_IMAGE_SLOT_NUMBERS } from "./equipment-modal-utils";

export function EditEquipmentImageSlots({
  currentImageUrls,
  deleteFlags,
  newImagePreviews,
  onImageChange,
  onToggleDelete,
}: {
  currentImageUrls: string[];
  deleteFlags: boolean[];
  newImagePreviews: Array<string | null>;
  onImageChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
  onToggleDelete: (index: number) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-sm font-semibold text-primary">
        이미지 슬롯 (최대 5장)
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {EQUIPMENT_IMAGE_SLOT_NUMBERS.map((slotNumber, index) => (
          <div
            key={`slot-${slotNumber}`}
            className="space-y-2 rounded-md border border-dashed border-outline-variant/40 p-3"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-surface-container-high px-2 py-1 text-[11px] font-bold text-primary">
                슬롯 {slotNumber}
              </span>
              {currentImageUrls[index] ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleDelete(index)}
                    className={
                      deleteFlags[index]
                        ? "rounded-sm bg-[#fde8e8] px-2 py-1 text-xs font-bold text-[#b42318]"
                        : "rounded-sm bg-surface-container-high px-2 py-1 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest"
                    }
                  >
                    {deleteFlags[index] ? "삭제 취소" : "삭제"}
                  </button>
                  {deleteFlags[index] ? (
                    <input
                      type="hidden"
                      name={`delete_image_urls_${slotNumber}`}
                      value={currentImageUrls[index]}
                    />
                  ) : null}
                  <input
                    type="hidden"
                    name={`delete_image_flag_${slotNumber}`}
                    value={deleteFlags[index] ? "1" : "0"}
                  />
                </div>
              ) : (
                <span className="text-xs font-semibold text-on-surface-variant">
                  빈 슬롯
                </span>
              )}
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/30 bg-surface-container-lowest">
              {newImagePreviews[index] ? (
                <Image
                  src={newImagePreviews[index] ?? ""}
                  alt={`새 이미지 미리보기 ${slotNumber}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : currentImageUrls[index] ? (
                <Image
                  src={currentImageUrls[index]}
                  alt={`현재 이미지 ${slotNumber}`}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-on-surface-variant">
                  미리보기 없음
                </div>
              )}
            </div>
            <input
              name={`new_image_file_${slotNumber}`}
              type="file"
              accept="image/*"
              onChange={(event) => {
                onImageChange(index, event);
              }}
              className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium file:mr-3 file:rounded-md file:border-0 file:bg-secondary/15 file:px-3 file:py-1.5 file:font-semibold file:text-primary outline-none transition-all focus:border-secondary"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
