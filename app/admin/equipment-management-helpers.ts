import type { EquipmentAdminRow } from "../equipment/repository";

export const EQUIPMENT_MANAGEMENT_PAGE_SIZE = 10;

export function normalizeEquipmentFilter(value: string | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export function filterEquipmentRows({
  category,
  query,
  rows,
  status,
  type,
}: {
  category: string;
  query: string;
  rows: EquipmentAdminRow[];
  status: string;
  type: string;
}) {
  const search = query.trim().toLowerCase();

  return rows.filter((row) => {
    const matchesQuery =
      search.length === 0 ||
      row.item.title.toLowerCase().includes(search) ||
      row.item.model.toLowerCase().includes(search);
    const matchesType = type === "all" || row.typeValue.toLowerCase() === type;
    const matchesCategory =
      category === "all" || row.categoryValue.toLowerCase() === category;
    const matchesStatus =
      status === "all" || row.statusValue.toLowerCase() === status;

    return matchesQuery && matchesType && matchesCategory && matchesStatus;
  });
}

export function paginateEquipmentRows({
  filteredRows,
  page,
}: {
  filteredRows: EquipmentAdminRow[];
  page: number;
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / EQUIPMENT_MANAGEMENT_PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * EQUIPMENT_MANAGEMENT_PAGE_SIZE;

  return {
    paginatedRows: filteredRows.slice(
      pageStart,
      pageStart + EQUIPMENT_MANAGEMENT_PAGE_SIZE,
    ),
    safePage,
    totalPages,
  };
}
