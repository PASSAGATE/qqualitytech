export const EQUIPMENT_TYPE_OPTIONS = [
  { value: "sale", label: "판매 장비 (sale)" },
  { value: "rental", label: "임대 장비 (rental)" },
] as const;

export const EQUIPMENT_STATUS_OPTIONS = [
  { value: "available", label: "판매/임대 가능 (available)" },
  { value: "sold", label: "판매 완료 (sold)" },
  { value: "rented", label: "임대 중 (rented)" },
] as const;

export const EQUIPMENT_TYPE_VALUES = EQUIPMENT_TYPE_OPTIONS.map(
  (option) => option.value,
);
export const EQUIPMENT_STATUS_VALUES = EQUIPMENT_STATUS_OPTIONS.map(
  (option) => option.value,
);
