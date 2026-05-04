import type { Metadata } from "next";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { EquipmentListCta } from "./equipment-list-cta";
import { EquipmentListFilters } from "./equipment-list-filters";
import { EquipmentListGrid } from "./equipment-list-grid";
import {
  getEquipmentListState,
  getEquipmentPagination,
  getFilteredEquipmentRows,
  getSortedEquipmentRows,
  type EquipmentListSearchParams,
} from "./equipment-list-helpers";
import { EquipmentListHero } from "./equipment-list-hero";
import { EquipmentListPagination } from "./equipment-list-pagination";
import { fetchAdminEquipmentRows } from "./repository";

export const metadata: Metadata = {
  title: "시험장비 목록 | 큐품질관리기술",
  description:
    "큐품질관리기술의 전문 시험장비 카탈로그에서 콘크리트, 토질, 아스팔트, 금속 및 비파괴 시험 장비를 확인하세요.",
};

type EquipmentPageProps = {
  searchParams: Promise<EquipmentListSearchParams>;
};

export default async function EquipmentPage({
  searchParams,
}: EquipmentPageProps) {
  const params = await searchParams;
  const { currentPage, searchQuery, selectedCategory, selectedSort } =
    getEquipmentListState(params);

  const equipmentRows = await fetchAdminEquipmentRows();
  const filteredRows = getFilteredEquipmentRows({
    equipmentRows,
    searchQuery,
    selectedCategory,
  });
  const sortedRows = getSortedEquipmentRows({
    filteredRows,
    selectedSort,
  });
  const { paginatedRows, safePage, totalPages } = getEquipmentPagination({
    currentPage,
    sortedRows,
  });

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/equipment" />

      <main>
        <EquipmentListHero />

        <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
          <EquipmentListFilters
            q={params.q}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
          <EquipmentListGrid paginatedRows={paginatedRows} />
          <EquipmentListPagination
            q={params.q}
            category={selectedCategory}
            sort={selectedSort}
            safePage={safePage}
            totalPages={totalPages}
            totalRows={sortedRows.length}
          />
          <EquipmentListCta />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
