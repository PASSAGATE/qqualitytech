export const EQUIPMENT_TYPE_OPTIONS = [
  { value: "sale", label: "판매 장비 (sale)" },
  { value: "rental", label: "임대 장비 (rental)" },
  { value: "sale_and_rental", label: "판매+임대 장비 (sale_and_rental)" },
] as const;

export const EQUIPMENT_STATUS_OPTIONS = [
  { value: "active", label: "활성 (active)" },
  { value: "inactive", label: "비활성 (inactive)" },
] as const;

export const EQUIPMENT_TYPE_VALUES = EQUIPMENT_TYPE_OPTIONS.map(
  (option) => option.value,
);
export const EQUIPMENT_STATUS_VALUES = EQUIPMENT_STATUS_OPTIONS.map(
  (option) => option.value,
);
