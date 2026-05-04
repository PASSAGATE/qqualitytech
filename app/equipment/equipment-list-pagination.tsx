import Link from "next/link";
import { buildPageHref } from "./equipment-list-helpers";

type EquipmentListPaginationProps = {
  category?: string;
  q?: string;
  safePage: number;
  sort?: string;
  totalPages: number;
  totalRows: number;
};

export function EquipmentListPagination({
  category,
  q,
  safePage,
  sort,
  totalPages,
  totalRows,
}: EquipmentListPaginationProps) {
  if (totalRows === 0) {
    return null;
  }

  return (
    <section className="mt-10 flex items-center justify-center gap-2">
      {safePage > 1 ? (
        <Link
          href={buildPageHref({
            q,
            category,
            sort,
            page: safePage - 1,
          })}
          className="rounded-md border border-outline-variant/40 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
        >
          이전
        </Link>
      ) : (
        <span className="rounded-md border border-outline-variant/20 px-3 py-2 text-sm font-semibold text-on-surface-variant/50">
          이전
        </span>
      )}
      <span className="px-3 text-sm font-semibold text-on-surface-variant">
        {safePage} / {totalPages}
      </span>
      {safePage < totalPages ? (
        <Link
          href={buildPageHref({
            q,
            category,
            sort,
            page: safePage + 1,
          })}
          className="rounded-md border border-outline-variant/40 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
        >
          다음
        </Link>
      ) : (
        <span className="rounded-md border border-outline-variant/20 px-3 py-2 text-sm font-semibold text-on-surface-variant/50">
          다음
        </span>
      )}
    </section>
  );
}
