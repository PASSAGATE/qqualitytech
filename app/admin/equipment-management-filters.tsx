"use client";

type EquipmentManagementFiltersProps = {
  category: string;
  onCategoryChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onReset: () => void;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  query: string;
  status: string;
  type: string;
};

export function EquipmentManagementFilters({
  category,
  onCategoryChange,
  onQueryChange,
  onReset,
  onStatusChange,
  onTypeChange,
  query,
  status,
  type,
}: EquipmentManagementFiltersProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-sm bg-surface-container-low p-4">
      <div className="flex items-center gap-2">
        <label className="text-xs font-bold uppercase text-on-surface-variant">
          검색:
        </label>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="장비명/모델"
          className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-secondary"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold uppercase text-on-surface-variant">
          타입:
        </label>
        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
          className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary"
        >
          <option value="all">전체</option>
          <option value="sale">판매(sale)</option>
          <option value="rental">임대(rental)</option>
          <option value="sale_and_rental">판매+임대(sale_and_rental)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold uppercase text-on-surface-variant">
          분류:
        </label>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary"
        >
          <option value="all">전체</option>
          <option value="architecture">건축(architecture)</option>
          <option value="civil">토목(civil)</option>
          <option value="calibration">검교정(calibration)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-bold uppercase text-on-surface-variant">
          상태:
        </label>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-sm border-none bg-surface-container-lowest px-3 py-1.5 text-xs focus:ring-1 focus:ring-secondary"
        >
          <option value="all">전체</option>
          <option value="active">활성(active)</option>
          <option value="inactive">비활성(inactive)</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="ml-auto rounded-sm border border-outline-variant/40 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-low"
      >
        필터 초기화
      </button>
    </div>
  );
}
