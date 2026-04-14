"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { createEquipmentAction } from "./equipment-actions";
import {
  EQUIPMENT_STATUS_OPTIONS,
  EQUIPMENT_TYPE_OPTIONS,
} from "./equipment-enums";

const IMAGE_SLOT_COUNT = 5;

async function readFilePreview(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("이미지 미리보기를 불러오지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

export function AddEquipmentModal() {
  const [open, setOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<Array<string | null>>(
    Array(IMAGE_SLOT_COUNT).fill(null),
  );

  const handleImageChange = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreviews((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? null : value,
        ),
      );
      return;
    }

    try {
      const preview = await readFilePreview(file);
      setImagePreviews((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? preview : value,
        ),
      );
    } catch {
      setImagePreviews((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? null : value,
        ),
      );
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
      >
        <Plus className="size-5" />
        장비 추가
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold tracking-tight text-primary">
                장비 등록
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
                aria-label="닫기"
              >
                <X className="size-5" />
              </button>
            </div>

            <form action={createEquipmentAction} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-primary">
                  장비명 *
                  <input
                    name="name"
                    required
                    placeholder="예: 만능 재료 시험기"
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>

                <label className="space-y-2 text-sm font-semibold text-primary">
                  모델 코드
                  <input
                    name="model_code"
                    placeholder="예: Q-UTM600"
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-semibold text-primary">
                장비 타입 *
                <select
                  name="type"
                  required
                  className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  defaultValue=""
                >
                  <option value="" disabled>
                    타입을 선택해 주세요
                  </option>
                  {EQUIPMENT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-2 text-sm font-semibold text-primary">
                상태
                <select
                  name="status"
                  className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  defaultValue="available"
                >
                  {EQUIPMENT_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="space-y-3">
                <legend className="mb-1 text-sm font-semibold text-primary">
                  이미지 파일 업로드 (최대 5장)
                </legend>
                <p className="text-xs font-medium text-on-surface-variant">
                  최소 1장 이상 업로드해 주세요.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: IMAGE_SLOT_COUNT }).map((_, index) => (
                    <label
                      key={`image-slot-${index + 1}`}
                      className="space-y-2 text-sm font-semibold text-primary"
                    >
                      이미지 {index + 1}
                      <input
                        name={`image_file_${index + 1}`}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          void handleImageChange(index, event);
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

              <label className="block space-y-2 text-sm font-semibold text-primary">
                설명
                <textarea
                  name="description"
                  rows={4}
                  placeholder="장비 설명을 입력하세요."
                  className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                />
              </label>

              <div className="flex flex-wrap gap-6">
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <input
                    name="is_visible"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-outline-variant text-secondary"
                  />
                  노출
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <input
                    name="is_featured"
                    type="checkbox"
                    className="h-4 w-4 rounded border-outline-variant text-secondary"
                  />
                  추천
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-outline-variant/40 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-secondary px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
