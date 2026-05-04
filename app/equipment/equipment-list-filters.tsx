import Link from "next/link";
import { Search } from "lucide-react";
import { categoryFilters } from "./equipment-list-helpers";

type EquipmentListFiltersProps = {
  q?: string;
  selectedCategory: string;
  selectedSort: string;
};

export function EquipmentListFilters({
  q,
  selectedCategory,
  selectedSort,
}: EquipmentListFiltersProps) {
  return (
    <section className="sticky top-24 z-40 mb-12">
      <form
        method="get"
        className="flex flex-col items-center gap-6 rounded-xl bg-surface-container-lowest p-4 shadow-sm lg:flex-row"
      >
        <div className="group relative w-full lg:w-96">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary"
            strokeWidth={1.8}
          />
          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="장비 명칭 또는 모델 번호 검색"
            className="w-full rounded-md border-none bg-surface-container-highest py-3 pl-12 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="flex flex-1 flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              type="submit"
              name="category"
              value={filter.value}
              className={
                selectedCategory === filter.value
                  ? "rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all"
                  : "rounded-full bg-surface-container-high px-5 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:bg-surface-container-highest"
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase text-on-surface-variant">
            정렬
          </label>
          <select
            name="sort"
            defaultValue={selectedSort}
            className="rounded-md border-none bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface-variant outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="latest">최신 등록순</option>
            <option value="name_asc">이름 오름차순</option>
            <option value="name_desc">이름 내림차순</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-secondary px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #ff8c3b 0%, #ff5f2f 100%)",
            boxShadow: "0 10px 22px rgba(255, 107, 44, 0.28)",
          }}
        >
          필터 적용
        </button>
        <Link
          href="/equipment"
          className="text-sm font-bold text-secondary transition-colors hover:underline"
        >
          필터 초기화
        </Link>
      </form>
    </section>
  );
}
