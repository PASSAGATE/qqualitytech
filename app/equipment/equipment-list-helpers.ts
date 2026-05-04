import type { EquipmentAdminRow } from "./repository";

export const categoryFilters = [
  { label: "전체보기", value: "all" },
  { label: "건축", value: "architecture" },
  { label: "토목", value: "civil" },
  { label: "검교정", value: "calibration" },
] as const;

export const EQUIPMENT_PAGE_SIZE = 12;

export type EquipmentListSearchParams = {
  category?: string;
  page?: string;
  q?: string;
  sort?: string;
};

export type EquipmentListState = {
  currentPage: number;
  searchQuery: string;
  selectedCategory: string;
  selectedSort: string;
};

export function buildPageHref({
  q,
  category,
  sort,
  page,
}: {
  category?: string;
  page: number;
  q?: string;
  sort?: string;
}) {
  const params = new URLSearchParams();
  if (q?.trim()) params.set("q", q.trim());
  if (category && category !== "all") params.set("category", category);
  if (sort && sort !== "latest") params.set("sort", sort);
  params.set("page", String(page));
  const query = params.toString();
  return query ? `/equipment?${query}` : "/equipment";
}

export function getEquipmentListState({
  category,
  page,
  q,
  sort,
}: EquipmentListSearchParams): EquipmentListState {
  const currentPageRaw = Number(page ?? "1");

  return {
    currentPage: Number.isFinite(currentPageRaw)
      ? Math.max(1, Math.floor(currentPageRaw))
      : 1,
    searchQuery: (q ?? "").trim().toLowerCase(),
    selectedCategory: category ?? "all",
    selectedSort: (sort ?? "latest").toLowerCase(),
  };
}

export function getFilteredEquipmentRows({
  equipmentRows,
  searchQuery,
  selectedCategory,
}: {
  equipmentRows: EquipmentAdminRow[];
  searchQuery: string;
  selectedCategory: string;
}) {
  return equipmentRows.filter((row) => {
    const isActive = row.statusValue.toLowerCase() === "active";
    const matchesQuery =
      searchQuery.length === 0 ||
      row.item.title.toLowerCase().includes(searchQuery) ||
      row.item.model.toLowerCase().includes(searchQuery) ||
      row.item.summary.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" || row.categoryValue === selectedCategory;

    return isActive && matchesQuery && matchesCategory;
  });
}

export function getSortedEquipmentRows({
  filteredRows,
  selectedSort,
}: {
  filteredRows: EquipmentAdminRow[];
  selectedSort: string;
}) {
  return [...filteredRows].sort((a, b) => {
    if (selectedSort === "name_asc") {
      return a.item.title.localeCompare(b.item.title, "ko");
    }
    if (selectedSort === "name_desc") {
      return b.item.title.localeCompare(a.item.title, "ko");
    }

    return 0;
  });
}

export function getEquipmentPagination({
  currentPage,
  sortedRows,
}: {
  currentPage: number;
  sortedRows: EquipmentAdminRow[];
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(sortedRows.length / EQUIPMENT_PAGE_SIZE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * EQUIPMENT_PAGE_SIZE;

  return {
    paginatedRows: sortedRows.slice(pageStart, pageStart + EQUIPMENT_PAGE_SIZE),
    safePage,
    totalPages,
  };
}
