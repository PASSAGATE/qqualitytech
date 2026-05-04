"use client";

export function EquipmentManagementPagination({
  filteredCount,
  onNext,
  onPrevious,
  safePage,
  totalCount,
  totalPages,
}: {
  filteredCount: number;
  onNext: () => void;
  onPrevious: () => void;
  safePage: number;
  totalCount: number;
  totalPages: number;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-outline-variant/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs font-medium text-on-surface-variant">
        전체 {totalCount}개 중 {filteredCount}개 필터됨, {safePage}/{totalPages}{" "}
        페이지
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={onPrevious}
          className="rounded-sm bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-xs font-semibold text-on-surface-variant">
          {safePage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={onNext}
          className="rounded-sm bg-surface-container-high px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
