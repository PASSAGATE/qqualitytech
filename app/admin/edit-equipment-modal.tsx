"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { Pencil, X } from "lucide-react";
import { updateEquipmentAction } from "./equipment-actions";
import {
  EQUIPMENT_STATUS_OPTIONS,
  EQUIPMENT_TYPE_OPTIONS,
} from "./equipment-enums";

type EditEquipmentModalProps = {
  equipmentId: string;
  name: string;
  modelCode: string;
  description: string;
  typeValue: string;
  statusValue: string;
  salePrice: number;
  monthlyRentalPrice: number;
  totalCount: number;
  availableCount: number;
  imageUrls: string[];
};

const NEW_IMAGE_SLOT_COUNT = 5;

async function readFilePreview(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("이미지 미리보기를 불러오지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

export function EditEquipmentModal({
  equipmentId,
  name,
  modelCode,
  description,
  typeValue,
  statusValue,
  salePrice,
  monthlyRentalPrice,
  totalCount,
  availableCount,
  imageUrls,
}: EditEquipmentModalProps) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(typeValue || "sale");
  const [newImagePreviews, setNewImagePreviews] = useState<Array<string | null>>(
    Array(NEW_IMAGE_SLOT_COUNT).fill(null),
  );
  const [deleteFlags, setDeleteFlags] = useState<boolean[]>(
    Array(NEW_IMAGE_SLOT_COUNT).fill(false),
  );
  const currentImageUrls = useMemo(() => imageUrls.filter(Boolean), [imageUrls]);

  const handleImageChange = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setNewImagePreviews((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? null : value,
        ),
      );
      return;
    }

    try {
      const preview = await readFilePreview(file);
      setDeleteFlags((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? false : value,
        ),
      );
      setNewImagePreviews((prev) =>
        prev.map((value, currentIndex) =>
          currentIndex === index ? preview : value,
        ),
      );
    } catch {
      setNewImagePreviews((prev) =>
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
        className="inline-flex items-center gap-1 rounded-sm border border-outline-variant/30 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-high"
      >
        <Pencil className="size-3.5" />
        수정
      </button>

      {open ? (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-md bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold tracking-tight text-primary">
                장비 수정
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

            <form
              action={updateEquipmentAction}
              className="space-y-5"
              onSubmit={(event) => {
                setFormError(null);
                const form = event.currentTarget;
                const total = Number(
                  (form.elements.namedItem("total_count") as HTMLInputElement | null)
                    ?.value ?? "0",
                );
                const available = Number(
                  (form.elements.namedItem("available_count") as HTMLInputElement | null)
                    ?.value ?? "0",
                );
                const keepCount = [1, 2, 3, 4, 5].filter((index) => {
                  const hasCurrentImage = Boolean(currentImageUrls[index - 1]);
                  const markedDelete =
                    (form.elements.namedItem(`delete_image_flag_${index}`) as HTMLInputElement | null)
                      ?.value === "1";
                  return hasCurrentImage && !markedDelete;
                }).length;
                const newCount = [1, 2, 3, 4, 5].filter((index) => {
                  const input = form.elements.namedItem(`new_image_file_${index}`) as HTMLInputElement | null;
                  return Boolean(input?.files?.[0]);
                }).length;

                if (available > total) {
                  event.preventDefault();
                  setFormError("사용 가능 수량은 총 재고 수량보다 클 수 없습니다.");
                  return;
                }

                if (keepCount + newCount === 0) {
                  event.preventDefault();
                  setFormError("최소 1장 이상의 이미지를 유지하거나 업로드해 주세요.");
                }
              }}
            >
              {formError ? (
                <p className="rounded-md border border-[#f5c2c7] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#c92a2a]">
                  {formError}
                </p>
              ) : null}
              <input type="hidden" name="equipment_id" value={equipmentId} />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-primary">
                  장비명 *
                  <input
                    name="name"
                    required
                    defaultValue={name}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>

                <label className="space-y-2 text-sm font-semibold text-primary">
                  모델 코드
                  <input
                    name="model_code"
                    defaultValue={modelCode}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-2 text-sm font-semibold text-primary">
                  장비 타입 *
                  <select
                    name="type"
                    required
                    defaultValue={typeValue || ""}
                    onChange={(event) => {
                      setSelectedType(event.target.value);
                    }}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  >
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
                    defaultValue={statusValue || "active"}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  >
                    {EQUIPMENT_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {selectedType === "sale" || selectedType === "sale_and_rental" ? (
                  <label className="space-y-2 text-sm font-semibold text-primary">
                    판매가 (원)
                    <input
                      name="sale_price"
                      type="number"
                      min={0}
                      defaultValue={salePrice}
                      className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                    />
                  </label>
                ) : (
                  <input type="hidden" name="sale_price" value={salePrice} />
                )}
                {selectedType === "rental" || selectedType === "sale_and_rental" ? (
                  <label className="space-y-2 text-sm font-semibold text-primary">
                    월 임대료 (원)
                    <input
                      name="monthly_rental_price"
                      type="number"
                      min={0}
                      defaultValue={monthlyRentalPrice}
                      className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                    />
                  </label>
                ) : (
                  <input
                    type="hidden"
                    name="monthly_rental_price"
                    value={monthlyRentalPrice}
                  />
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-primary">
                  총 재고 수량
                  <input
                    name="total_count"
                    type="number"
                    min={0}
                    defaultValue={totalCount}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-primary">
                  사용 가능 수량
                  <input
                    name="available_count"
                    type="number"
                    min={0}
                    defaultValue={availableCount}
                    className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                  />
                </label>
              </div>

              <fieldset className="space-y-3">
                <legend className="mb-1 text-sm font-semibold text-primary">
                  이미지 슬롯 (최대 5장)
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: NEW_IMAGE_SLOT_COUNT }).map((_, index) => (
                    <div
                      key={`slot-${index + 1}`}
                      className="space-y-2 rounded-md border border-dashed border-outline-variant/40 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-surface-container-high px-2 py-1 text-[11px] font-bold text-primary">
                          슬롯 {index + 1}
                        </span>
                        {currentImageUrls[index] ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteFlags((prev) =>
                                  prev.map((value, currentIndex) =>
                                    currentIndex === index ? !value : value,
                                  ),
                                );
                              }}
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
                                name={`delete_image_urls_${index + 1}`}
                                value={currentImageUrls[index]}
                              />
                            ) : null}
                            <input
                              type="hidden"
                              name={`delete_image_flag_${index + 1}`}
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
                            alt={`새 이미지 미리보기 ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : currentImageUrls[index] ? (
                          <Image
                            src={currentImageUrls[index]}
                            alt={`현재 이미지 ${index + 1}`}
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
                        name={`new_image_file_${index + 1}`}
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          void handleImageChange(index, event);
                        }}
                        className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium file:mr-3 file:rounded-md file:border-0 file:bg-secondary/15 file:px-3 file:py-1.5 file:font-semibold file:text-primary outline-none transition-all focus:border-secondary"
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <label className="block space-y-2 text-sm font-semibold text-primary">
                설명
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={description}
                  className="w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary"
                />
              </label>

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
                  className="rounded-md bg-secondary px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
                >
                  수정 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
