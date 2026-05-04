"use client";

import { useMemo, useState } from "react";
import type { EquipmentAdminRow } from "../equipment/repository";
import {
  filterEquipmentRows,
  normalizeEquipmentFilter,
  paginateEquipmentRows,
} from "./equipment-management-helpers";
import { EquipmentManagementFilters } from "./equipment-management-filters";
import { EquipmentManagementPagination } from "./equipment-management-pagination";
import { EquipmentManagementTable } from "./equipment-management-table";
import { EquipmentPreviewModal } from "./equipment-preview-modal";

type EquipmentManagementPanelProps = {
  initialCategory?: string;
  initialQuery?: string;
  initialStatus?: string;
  initialType?: string;
  rows: EquipmentAdminRow[];
};

export function EquipmentManagementPanel({
  rows,
  initialQuery = "",
  initialType = "all",
  initialCategory = "all",
  initialStatus = "all",
}: EquipmentManagementPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(normalizeEquipmentFilter(initialType) || "all");
  const [category, setCategory] = useState(
    normalizeEquipmentFilter(initialCategory) || "all",
  );
  const [status, setStatus] = useState(
    normalizeEquipmentFilter(initialStatus) || "all",
  );
  const [page, setPage] = useState(1);
  const [previewRow, setPreviewRow] = useState<EquipmentAdminRow | null>(null);

  const filteredRows = useMemo(
    () =>
      filterEquipmentRows({
        category,
        query,
        rows,
        status,
        type,
      }),
    [category, query, rows, status, type],
  );
  const { paginatedRows, safePage, totalPages } = paginateEquipmentRows({
    filteredRows,
    page,
  });

  const resetToFirstPage = (action: () => void) => {
    action();
    setPage(1);
  };

  return (
    <>
      <EquipmentManagementFilters
        query={query}
        type={type}
        category={category}
        status={status}
        onQueryChange={(value) => resetToFirstPage(() => setQuery(value))}
        onTypeChange={(value) =>
          resetToFirstPage(() =>
            setType(normalizeEquipmentFilter(value) || "all"),
          )
        }
        onCategoryChange={(value) =>
          resetToFirstPage(() =>
            setCategory(normalizeEquipmentFilter(value) || "all"),
          )
        }
        onStatusChange={(value) =>
          resetToFirstPage(() =>
            setStatus(normalizeEquipmentFilter(value) || "all"),
          )
        }
        onReset={() =>
          resetToFirstPage(() => {
            setQuery("");
            setType("all");
            setCategory("all");
            setStatus("all");
          })
        }
      />

      <section className="overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
        <EquipmentManagementTable
          paginatedRows={paginatedRows}
          onPreview={setPreviewRow}
        />
        <EquipmentManagementPagination
          totalCount={rows.length}
          filteredCount={filteredRows.length}
          safePage={safePage}
          totalPages={totalPages}
          onPrevious={() => setPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        />
      </section>

      <EquipmentPreviewModal
        previewRow={previewRow}
        onClose={() => setPreviewRow(null)}
      />
    </>
  );
}
