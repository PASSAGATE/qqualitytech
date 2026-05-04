import type { EquipmentAdminRow } from "./repository";
import { EquipmentCard } from "./equipment-card";

export function EquipmentListGrid({
  paginatedRows,
}: {
  paginatedRows: EquipmentAdminRow[];
}) {
  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedRows.length === 0 ? (
        <article className="col-span-full rounded-md border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
          <h3 className="text-xl font-bold text-primary">검색 결과가 없습니다</h3>
          <p className="mt-2 text-sm text-on-surface-variant">
            다른 검색어 또는 필터 조건으로 다시 시도해 주세요.
          </p>
        </article>
      ) : null}

      {paginatedRows.map((row) => (
        <EquipmentCard key={row.equipmentId} row={row} />
      ))}
    </section>
  );
}
