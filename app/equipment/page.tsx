import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Download,
  Headset,
  MessageSquare,
  Search,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { fetchAdminEquipmentRows } from "./repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "시험장비 목록 | 큐품질관리기술",
  description:
    "큐품질관리기술의 전문 시험장비 카탈로그에서 콘크리트, 토질, 아스팔트, 금속 및 비파괴 시험 장비를 확인하세요.",
};

const typeFilters = [
  { label: "전체보기", value: "all" },
  { label: "판매 장비", value: "sale" },
  { label: "임대 장비", value: "rental" },
] as const;

const statusFilters = [
  { label: "전체 상태", value: "all" },
  { label: "가능", value: "available" },
  { label: "판매 완료", value: "sold" },
  { label: "임대 중", value: "rented" },
] as const;

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
    type?: string;
    status?: string;
    sort?: string;
  }>;
};

export default async function EquipmentPage({
  searchParams,
}: EquipmentPageProps) {
  const { q, type, status, sort } = await searchParams;
  const searchQuery = (q ?? "").trim().toLowerCase();
  const selectedType = (type ?? "all").toLowerCase();
  const selectedStatus = (status ?? "all").toLowerCase();
  const selectedSort = (sort ?? "latest").toLowerCase();

  const equipmentRows = await fetchAdminEquipmentRows();
  const publicRows = equipmentRows.filter((row) => row.visible);
  const filteredRows = publicRows.filter((row) => {
    const matchesQuery =
      searchQuery.length === 0 ||
      row.item.title.toLowerCase().includes(searchQuery) ||
      row.item.model.toLowerCase().includes(searchQuery) ||
      row.item.summary.toLowerCase().includes(searchQuery);
    const matchesType =
      selectedType === "all" || row.typeValue.toLowerCase() === selectedType;
    const matchesStatus =
      selectedStatus === "all" ||
      row.statusValue.toLowerCase() === selectedStatus;

    return matchesQuery && matchesType && matchesStatus;
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

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/equipment" />

      <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <section className="mb-16">
          <span className="mb-3 block text-xs font-bold tracking-[0.22em] text-secondary">
            INDUSTRIAL CATALOG
          </span>
          <h1 className="mb-6 max-w-3xl text-5xl font-black leading-tight tracking-[-0.02em] text-primary md:text-6xl">
            정밀한 측정을 위한
            <br />
            전문 시험장비 카탈로그
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-on-surface-variant">
            국제 표준을 준수하는 고정밀 건설 시험 장비를 통해 프로젝트의 안전과
            품질을 보장하십시오. 큐퀄리티테크의 모든 장비는 엄격한
            캘리브레이션을 거쳐 제공됩니다.
          </p>
        </section>

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
              {typeFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="submit"
                  name="type"
                  value={filter.value}
                  className={
                    selectedType === filter.value
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
                상태
              </label>
              <select
                name="status"
                defaultValue={selectedStatus}
                className="rounded-md border-none bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface-variant outline-none focus:ring-2 focus:ring-secondary"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
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

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedRows.length === 0 ? (
            <article className="col-span-full rounded-md border border-outline-variant/20 bg-surface-container-lowest p-10 text-center">
              <h3 className="text-xl font-bold text-primary">
                검색 결과가 없습니다
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                다른 검색어 또는 필터 조건으로 다시 시도해 주세요.
              </p>
            </article>
          ) : null}

          {sortedRows.map((row) => (
            <article
              key={row.equipmentId}
              className="group flex flex-col overflow-hidden rounded-sm bg-surface-container-lowest transition-all hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={row.item.image}
                  alt={row.item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {row.featured ? (
                  <div className="absolute top-4 right-4 rounded-sm bg-secondary px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white">
                    FEATURED
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                    {row.typeLabel}
                  </span>
                  <span className="text-xs font-black text-secondary">
                    {row.item.model}
                  </span>
                </div>

                <h2 className="mb-4 text-xl font-extrabold leading-tight text-primary">
                  {row.item.title}
                </h2>

                <div className="mb-6 flex-1 space-y-2">
                  {(row.item.specs.length > 0
                    ? row.item.specs
                    : [{ label: "상태", value: row.status.label }]
                  )
                    .slice(0, 3)
                    .map((spec, index) => (
                      <div
                        key={spec.label}
                        className={`flex justify-between text-xs ${index < 2 ? "border-b border-outline-variant/10 pb-2" : ""}`}
                      >
                        <span className="font-medium text-on-surface-variant">
                          {spec.label}
                        </span>
                        <span className="font-bold text-primary">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/equipment/${row.item.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 bg-surface-container-high py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  상세 스펙 보기
                  <Icon icon={ArrowRight} className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </section>

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
                큐퀄리티테크는 기성 제품 외에도 프로젝트 특성에 맞는 커스텀 시험
                설비 구축 컨설팅을 제공합니다. 전문가와 상담하여 최적의 솔루션을
                설계하십시오.
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
                    <div className="font-bold text-white">실시간 기술 지원</div>
                    <div className="text-sm text-on-primary-container">
                      평일 09:00 - 18:00 (GMT+9)
                    </div>
                  </div>
                </div>
                <div className="mb-2 text-3xl font-black tracking-tight text-white">
                  010-6666-5269
                </div>
                <div className="text-sm text-on-primary-container">
                  qqstart@naver.com
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
