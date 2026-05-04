import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Download, Headset, MessageSquare, Search } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { fetchAdminEquipmentRows } from "./repository";
import { EquipmentCard } from "./equipment-card";

export const metadata: Metadata = {
  title: "시험장비 목록 | 큐품질관리기술",
  description:
    "큐품질관리기술의 전문 시험장비 카탈로그에서 콘크리트, 토질, 아스팔트, 금속 및 비파괴 시험 장비를 확인하세요.",
};

const categoryFilters = [
  { label: "전체보기", value: "all" },
  { label: "건축", value: "architecture" },
  { label: "토목", value: "civil" },
  { label: "검교정", value: "calibration" },
] as const;
const PAGE_SIZE = 12;
const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB";

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent aria-hidden="true" className={className} strokeWidth={1.8} />
  );
}

type EquipmentPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
};

function buildPageHref({
  q,
  category,
  sort,
  page,
}: {
  q?: string;
  category?: string;
  sort?: string;
  page: number;
}) {
  const params = new URLSearchParams();
  if (q?.trim()) params.set("q", q.trim());
  if (category && category !== "all") params.set("category", category);
  if (sort && sort !== "latest") params.set("sort", sort);
  params.set("page", String(page));
  const query = params.toString();
  return query ? `/equipment?${query}` : "/equipment";
}

export default async function EquipmentPage({
  searchParams,
}: EquipmentPageProps) {
  const { q, category, sort, page } = await searchParams;
  const searchQuery = (q ?? "").trim().toLowerCase();
  const selectedCategory = category ?? "all";
  const selectedSort = (sort ?? "latest").toLowerCase();
  const currentPageRaw = Number(page ?? "1");
  const currentPage = Number.isFinite(currentPageRaw)
    ? Math.max(1, Math.floor(currentPageRaw))
    : 1;

  const equipmentRows = await fetchAdminEquipmentRows();
  const filteredRows = equipmentRows.filter((row) => {
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

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (selectedSort === "name_asc") {
      return a.item.title.localeCompare(b.item.title, "ko");
    }
    if (selectedSort === "name_desc") {
      return b.item.title.localeCompare(a.item.title, "ko");
    }
    // latest: keep repository order (created_at desc)
    return 0;
  });
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginatedRows = sortedRows.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/equipment" />

      <main>
        <section className="relative min-h-[620px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Professional construction testing equipment catalog background"
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-35 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.9)_55%,rgba(0,21,42,0.28)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1600px] items-center px-5 py-24 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <span className="mb-5 block text-sm font-bold uppercase tracking-[0.24em] text-secondary">
                Industrial Catalog
              </span>
              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                정밀한 측정을 위한
                <br />
                전문 시험장비 카탈로그
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                국제 표준을 준수하는 고정밀 건설 시험 장비를 통해 프로젝트의
                안전과 품질을 보장하십시오. 큐품질관리기술의 모든 장비는 엄격한
                캘리브레이션을 거쳐 제공됩니다.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
          <section className="sticky top-24 z-40 mb-12">
            <form
              method="get"
              className="flex flex-col items-center gap-6 rounded-xl bg-surface-container-lowest p-4 shadow-sm lg:flex-row"
            >
              <div className="group relative w-full lg:w-96">
                <Icon
                  icon={Search}
                  className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary"
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
                  background:
                    "linear-gradient(135deg, #ff8c3b 0%, #ff5f2f 100%)",
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

          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedRows.length === 0 ? (
              <article className="col-span-full rounded-md border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
                <h3 className="text-xl font-bold text-primary">
                  검색 결과가 없습니다
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  다른 검색어 또는 필터 조건으로 다시 시도해 주세요.
                </p>
              </article>
            ) : null}

            {paginatedRows.map((row) => (
              <EquipmentCard key={row.equipmentId} row={row} />
            ))}
          </section>

          {sortedRows.length > 0 ? (
            <section className="mt-10 flex items-center justify-center gap-2">
              {safePage > 1 ? (
                <Link
                  href={buildPageHref({
                    q,
                    category: selectedCategory,
                    sort: selectedSort,
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
                    category: selectedCategory,
                    sort: selectedSort,
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
          ) : null}

          <section className="relative mt-24 overflow-hidden rounded-xl bg-primary-container p-12 lg:p-20">
            <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 opacity-20">
              <div className="h-full w-full bg-gradient-to-l from-secondary to-transparent" />
            </div>

            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.07em] text-white">
                  원하시는 장비를 찾지 못하셨나요?
                </h2>
                <p className="mb-8 max-w-xl text-lg leading-relaxed text-on-primary-container">
                  큐품질관리기술은 기성 제품 외에도 프로젝트 특성에 맞는 커스텀
                  시험 설비 구축 컨설팅을 제공합니다. 전문가와 상담하여 최적의
                  솔루션을 설계하십시오.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-sm bg-secondary px-8 py-4 font-bold text-white transition-all hover:opacity-90"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                      boxShadow: "0 14px 28px rgba(255, 107, 44, 0.32)",
                    }}
                  >
                    전문가와 상담하기
                    <Icon icon={MessageSquare} className="size-5" />
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/20 bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20"
                  >
                    카탈로그 PDF 다운로드
                    <Icon icon={Download} className="size-5" />
                  </button>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
                      <Icon icon={Headset} className="size-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white">
                        실시간 기술 지원
                      </div>
                      <div className="text-sm text-on-primary-container">
                        평일 09:00 - 18:00 (GMT+9)
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-black tracking-tight text-white">
                    010-8941-4628
                  </div>
                  <div className="text-sm text-on-primary-container">
                    qqstart@naver.com
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
