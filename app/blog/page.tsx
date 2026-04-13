import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { blogCategories, blogPosts, featuredInsight } from "./data";

export const metadata: Metadata = {
  title: "블로그 | QqualityTech",
  description:
    "QqualityTech의 최신 기술 가이드, 산업 동향, 시험 장비 유지관리 노하우를 블로그에서 확인하세요.",
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

export default function BlogPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/blog" />

      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <header className="mb-16">
          <h1 className="mb-4 text-5xl font-black tracking-[-0.06em] text-primary">
            블로그 & 기술 인사이트
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            큐퀄리티테크의 최신 기술 가이드, 산업 동향 및 시험 장비 유지관리
            노하우를 공유합니다.
          </p>
        </header>

        <section className="mb-24">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <article
              id={featuredInsight.slug}
              className="group relative overflow-hidden rounded-sm bg-primary lg:col-span-8"
            >
              <Image
                src={featuredInsight.image}
                alt={featuredInsight.alt}
                width={1200}
                height={700}
                className="h-[500px] w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary via-primary/20 to-transparent p-12">
                <span className="mb-4 inline-flex w-fit bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white">
                  Featured Insight
                </span>
                <h2 className="mb-6 max-w-2xl text-4xl font-bold leading-tight text-white">
                  {featuredInsight.title}
                </h2>
                <p className="mb-8 max-w-xl text-lg text-slate-300">
                  {featuredInsight.description}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-white">
                  <span>{featuredInsight.date}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>{featuredInsight.category}</span>
                </div>
              </div>
            </article>

            <aside className="flex flex-col gap-8 lg:col-span-4">
              <div className="flex h-full flex-col justify-center rounded-sm bg-surface-container-low p-8">
                <h3 className="mb-4 text-2xl font-bold text-primary">구독하기</h3>
                <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">
                  정기적으로 발행되는 기술 백서와 장비 가이드를 이메일로
                  받아보세요.
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="이메일 주소를 입력하세요"
                    className="w-full rounded-sm border-none bg-surface-container-highest p-4 text-sm text-on-surface outline-none transition-all focus:ring-2 focus:ring-secondary"
                  />
                  <button
                    type="button"
                    className="w-full bg-primary py-4 font-bold text-white transition-colors hover:bg-primary/90"
                  >
                    지금 구독
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="mb-12 flex flex-wrap gap-3 border-b border-outline-variant/20 pb-8">
          {blogCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={
                index === 0
                  ? "rounded-sm bg-primary px-6 py-2 text-sm font-semibold text-white"
                  : "rounded-sm bg-surface-container px-6 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-high"
              }
            >
              {category}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article id={post.slug} key={post.slug} className="flex scroll-mt-32 flex-col">
              <div className="mb-6 aspect-video overflow-hidden rounded-sm bg-surface-container-highest">
                <Image
                  src={post.image}
                  alt={post.alt}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                  {post.category}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {post.date}
                </span>
              </div>
              <Link
                href={`/blog#${post.slug}`}
                className="mb-3 text-xl font-bold leading-snug text-primary transition-colors hover:text-secondary"
              >
                {post.title}
              </Link>
              <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
                {post.description}
              </p>
              <Link
                href={`/blog#${post.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-4"
              >
                자세히 보기
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </article>
          ))}
        </section>

        <div className="mt-24 flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Icon icon={ChevronLeft} className="size-5" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary font-bold text-white"
          >
            1
          </button>
          {[2, 3].map((page) => (
            <button
              key={page}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-container font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
            >
              {page}
            </button>
          ))}
          <span className="px-2">...</span>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-container font-bold text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            12
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            <Icon icon={ChevronRight} className="size-5" />
          </button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
