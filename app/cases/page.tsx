import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { caseCategories, fieldCases } from "./data";

export const metadata: Metadata = {
  title: "시공사례 | QqualityTech",
  description:
    "QqualityTech의 정밀 진단 기술과 첨단 시험 장비가 적용된 주요 시공 사례를 확인하세요.",
};

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

export default function CasesPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/cases" />

      <main className="min-h-screen">
        <section className="relative overflow-hidden bg-primary-container py-24">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24)_0,transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%,transparent)] [background-size:220px_220px,26px_26px]" />
          <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="mb-4 block text-sm font-bold tracking-[0.24em] text-secondary">
                  FIELD CASES
                </span>
                <h1 className="text-5xl font-black leading-tight tracking-[-0.08em] text-white md:text-6xl">
                  시공사례
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-primary-container">
                  QqualityTech의 정밀 진단 기술과 첨단 시험 장비가 적용된 주요
                  현장 리포트입니다. 구조물의 안전과 품질을 위한 최적의
                  엔지니어링 솔루션을 확인하십시오.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="min-w-[160px] rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="text-3xl font-black text-secondary">500+</div>
                  <div className="mt-1 text-xs font-bold tracking-[0.16em] text-slate-400">
                    누적 수행 프로젝트
                  </div>
                </div>
                <div className="min-w-[160px] rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="text-3xl font-black text-secondary">
                    120%
                  </div>
                  <div className="mt-1 text-xs font-bold tracking-[0.16em] text-slate-400">
                    품질 관리 기준 상회
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-outline-variant/20 bg-surface-container py-8">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row lg:px-12">
            <div className="flex w-full gap-2 overflow-x-auto pb-2 md:w-auto md:pb-0">
              {caseCategories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className={
                    index === 0
                      ? "rounded-sm bg-primary px-6 py-2 text-sm font-bold text-white"
                      : "rounded-sm bg-white px-6 py-2 text-sm font-bold text-primary transition-colors hover:bg-surface-container-highest"
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="현장명 검색..."
                className="w-full rounded-sm border-none bg-surface-container-highest px-4 py-3 pr-11 text-sm outline-none transition-all focus:ring-1 focus:ring-secondary"
              />
              <Icon
                icon={Search}
                className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {fieldCases.map((item) => (
              <article
                id={item.slug}
                key={item.slug}
                className="group flex scroll-mt-32 flex-col overflow-hidden rounded-sm bg-surface-container-lowest transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="bg-primary/90 px-3 py-1 text-[10px] font-bold tracking-tight text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <h2 className="mb-3 text-xl font-extrabold tracking-tight text-primary">
                    {item.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-6">
                    <span className="text-xs font-black tracking-[0.18em] text-secondary">
                      {item.solutionLabel}
                    </span>
                    <Link
                      href={`/cases#${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-secondary"
                    >
                      View Details
                      <Icon icon={ArrowRight} className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 flex items-center justify-center gap-4">
            <button
              type="button"
              className="border border-outline-variant/30 p-2 text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Icon icon={ChevronLeft} className="size-5" />
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="h-10 w-10 bg-primary text-sm font-bold text-white"
              >
                1
              </button>
              {[2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className="h-10 w-10 bg-white text-sm font-bold text-primary transition-colors hover:bg-surface-container-high"
                >
                  {page}
                </button>
              ))}
              <span className="flex h-10 w-10 items-center justify-center">
                ...
              </span>
              <button
                type="button"
                className="h-10 w-10 bg-white text-sm font-bold text-primary transition-colors hover:bg-surface-container-high"
              >
                12
              </button>
            </div>
            <button
              type="button"
              className="border border-outline-variant/30 p-2 text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Icon icon={ChevronRight} className="size-5" />
            </button>
          </div>
        </section>

        <section className="bg-surface-container-low px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-black text-primary">
              안전한 건설의 파트너, QqualityTech가 함께합니다
            </h2>
            <p className="mb-10 text-lg text-on-surface-variant">
              귀하의 현장에 최적화된 맞춤형 품질 관리 솔루션이 필요하십니까?
              전문 엔지니어와 실시간 상담이 가능합니다.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-secondary px-10 py-4 font-bold text-white shadow-xl shadow-secondary/20 transition-transform hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                  boxShadow: "0 14px 28px rgba(255, 107, 44, 0.32)",
                }}
              >
                기술 문의하기
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-10 py-4 font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                카탈로그 다운로드
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
