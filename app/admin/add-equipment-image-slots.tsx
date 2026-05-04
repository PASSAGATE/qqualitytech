"use client";

import type { ChangeEvent } from "react";
import Image from "next/image";
import { EQUIPMENT_IMAGE_SLOT_NUMBERS } from "./equipment-modal-utils";

export function AddEquipmentImageSlots({
  imagePreviews,
  onImageChange,
}: {
  imagePreviews: Array<string | null>;
  onImageChange: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 text-sm font-semibold text-primary">
        이미지 파일 업로드 (최대 5장)
      </legend>
      <p className="text-xs font-medium text-on-surface-variant">
        최소 1장 이상 업로드해 주세요.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {EQUIPMENT_IMAGE_SLOT_NUMBERS.map((slotNumber, index) => (
          <label
            key={`image-slot-${slotNumber}`}
            className="space-y-2 rounded-md border border-dashed border-outline-variant/40 p-3 text-sm font-semibold text-primary transition-colors hover:border-secondary/60"
          >
            <span className="inline-flex items-center rounded-full bg-surface-container-high px-2 py-1 text-[11px] font-bold">
              슬롯 {slotNumber}
            </span>
            <input
              name={`image_file_${slotNumber}`}
              type="file"
              accept="image/*"
              onChange={(event) => {
                onImageChange(index, event);
              }}
              className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium file:mr-3 file:rounded-md file:border-0 file:bg-secondary/15 file:px-3 file:py-1.5 file:font-semibold file:text-primary outline-none transition-all focus:border-secondary"
            />
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {imagePreviews.map((preview, index) => (
          <div
            key={`preview-${index + 1}`}
            className="relative aspect-square overflow-hidden rounded-md border border-outline-variant/30 bg-surface-container-lowest"
          >
            {preview ? (
              <Image
                src={preview}
                alt={`업로드 미리보기 ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-on-surface-variant">
                미리보기 {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}
