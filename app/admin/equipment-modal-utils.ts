import type { FormEvent } from "react";

export const EQUIPMENT_IMAGE_SLOT_COUNT = 5;
export const EQUIPMENT_IMAGE_SLOT_NUMBERS = [1, 2, 3, 4, 5] as const;
export const MAX_TOTAL_UPLOAD_BYTES = 9 * 1024 * 1024;

export async function readFilePreview(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("이미지 미리보기를 불러오지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

export function replaceAt<T>(items: T[], index: number, value: T) {
  return items.map((item, currentIndex) =>
    currentIndex === index ? value : item,
  );
}

export function getFormNumber(form: HTMLFormElement, name: string) {
  return Number(
    (form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "0",
  );
}

export function getFormSelectValue(form: HTMLFormElement, name: string) {
  return (
    (form.elements.namedItem(name) as HTMLSelectElement | null)?.value ?? ""
  ).toLowerCase();
}

export function getSelectedFiles(form: HTMLFormElement, fieldPrefix: string) {
  return EQUIPMENT_IMAGE_SLOT_NUMBERS.map(
    (index) =>
      (form.elements.namedItem(`${fieldPrefix}_${index}`) as HTMLInputElement | null)
        ?.files?.[0],
  ).filter((file): file is File => Boolean(file));
}

export function getTotalUploadBytes(files: File[]) {
  return files.reduce((sum, file) => sum + file.size, 0);
}

export function validateEquipmentFormBasics(form: HTMLFormElement) {
  const total = getFormNumber(form, "total_count");
  const available = getFormNumber(form, "available_count");
  const type = getFormSelectValue(form, "type");
  const salePrice = getFormNumber(form, "sale_price");
  const monthlyRentalPrice = getFormNumber(form, "monthly_rental_price");

  if (available > total) {
    return "사용 가능 수량은 총 재고 수량보다 클 수 없습니다.";
  }

  if (type === "sale" && salePrice <= 0) {
    return "판매 장비는 판매가를 1원 이상 입력해 주세요.";
  }

  if (type === "rental" && monthlyRentalPrice <= 0) {
    return "임대 장비는 월 임대료를 1원 이상 입력해 주세요.";
  }

  if (
    type === "sale_and_rental" &&
    (salePrice <= 0 || monthlyRentalPrice <= 0)
  ) {
    return "판매+임대 장비는 판매가와 월 임대료를 모두 1원 이상 입력해 주세요.";
  }

  return null;
}

export function preventWithError(
  event: FormEvent<HTMLFormElement>,
  error: string,
  setFormError: (error: string) => void,
) {
  event.preventDefault();
  setFormError(error);
}
