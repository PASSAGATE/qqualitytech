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
  SlidersHorizontal,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { featuredEquipment } from "./data";

export const metadata: Metadata = {
  title: "시험장비 목록 | QqualityTech",
  description:
    "QqualityTech의 전문 시험장비 카탈로그에서 콘크리트, 토질, 아스팔트, 금속 및 비파괴 시험 장비를 확인하세요.",
};

const categories = [
  { label: "전체보기", active: true },
  { label: "콘크리트" },
  { label: "토질" },
  { label: "아스팔트" },
  { label: "금속/철강" },
  { label: "비파괴 시험" },
];

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent
      aria-hidden="true"
      className={className}
      strokeWidth={1.8}
    />
  );
}

export default function EquipmentPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/equipment" />

      <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <section className="mb-16">
          <span className="mb-3 block text-xs font-bold tracking-[0.22em] text-secondary">
            INDUSTRIAL CATALOG
          </span>
          <h1 className="mb-6 max-w-3xl text-5xl font-black leading-tight tracking-[-0.08em] text-primary md:text-6xl">
            정밀한 측정을 위한
            <br />
            전문 시험장비 카탈로그
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-on-surface-variant">
            국제 표준을 준수하는 고정밀 건설 시험 장비를 통해 프로젝트의
            안전과 품질을 보장하십시오. 큐퀄리티테크의 모든 장비는 엄격한
            캘리브레이션을 거쳐 제공됩니다.
          </p>
        </section>

        <section className="sticky top-24 z-40 mb-12">
          <div className="flex flex-col items-center gap-6 rounded-xl bg-surface-container-lowest p-4 shadow-sm lg:flex-row">
            <div className="group relative w-full lg:w-96">
              <Icon
                icon={Search}
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary"
              />
              <input
                type="text"
                placeholder="장비 명칭 또는 모델 번호 검색"
                className="w-full rounded-md border-none bg-surface-container-highest py-3 pl-12 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="flex flex-1 flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.label}
                  type="button"
                  className={
                    category.active
                      ? "rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all"
                      : "rounded-full bg-surface-container-high px-5 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:bg-surface-container-highest"
                  }
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="hidden h-10 w-px bg-outline-variant lg:block" />

            <button
              type="button"
              className="flex items-center gap-2 px-4 text-sm font-bold text-primary"
            >
              <Icon icon={SlidersHorizontal} className="size-5" />
              필터 상세설정
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredEquipment.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-sm bg-surface-container-lowest transition-all hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {item.badge ? (
                  <div
                    className={`absolute top-4 right-4 rounded-sm px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${item.badgeTone ?? "bg-secondary text-white"}`}
                  >
                    {item.badge}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-outline">
                    {item.category}
                  </span>
                  <span className="text-xs font-black text-secondary">
                    {item.model}
                  </span>
                </div>

                <h2 className="mb-4 text-xl font-extrabold leading-tight text-primary">
                  {item.title}
                </h2>

                <div className="mb-6 flex-1 space-y-2">
                  {item.specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between text-xs ${index < item.specs.length - 1 ? "border-b border-outline-variant/10 pb-2" : ""}`}
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
                  href={`/equipment/${item.slug}`}
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
                설비 구축 컨설팅을 제공합니다. 전문가와 상담하여 최적의
                솔루션을 설계하십시오.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-sm bg-secondary px-8 py-4 font-bold text-white transition-all hover:opacity-90"
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
                  02-1234-5678
                </div>
                <div className="text-sm text-on-primary-container">
                  sales@qqualitytech.com
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
