import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Mail,
  MapPin,
  Send,
  Settings2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import {
  type EquipmentFeature,
} from "../data";
import { fetchEquipmentBySlug, fetchEquipmentCatalog } from "../repository";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchEquipmentBySlug(slug);

  if (!item) {
    return {
      title: "시험장비 상세 | QqualityTech",
    };
  }

  return {
    title: `${item.title} | QqualityTech`,
    description: item.description,
  };
}

const featureToneStyles: Record<EquipmentFeature["tone"], string> = {
  light: "bg-surface-container-lowest text-on-surface shadow-sm",
  primary: "bg-primary text-white",
  surface: "bg-surface-container text-on-surface",
  muted: "bg-surface-container-highest text-on-surface",
};

const featureTextStyles: Record<EquipmentFeature["tone"], string> = {
  light: "text-on-surface-variant",
  primary: "text-blue-100",
  surface: "text-on-surface-variant",
  muted: "text-on-surface-variant",
};

const featureHeadingStyles: Record<EquipmentFeature["tone"], string> = {
  light: "text-primary",
  primary: "text-white",
  surface: "text-primary",
  muted: "text-primary",
};

const featureIconStyles: Record<EquipmentFeature["tone"], string> = {
  light: "text-secondary",
  primary: "text-[color:var(--color-secondary-fixed-dim)]",
  surface: "text-primary",
  muted: "text-secondary",
};

const featureIcons: Record<EquipmentFeature["icon"], LucideIcon> = {
  wrench: Wrench,
  chart: BarChart3,
  shield: ShieldCheck,
  sliders: Settings2,
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

function getFallbackFeatures(title: string): EquipmentFeature[] {
  return [
    {
      icon: "wrench",
      title: "현장 맞춤 셋업 지원",
      description: `${title} 도입 시 프로젝트 환경에 맞춘 설치 및 초기 셋업 가이드를 제공합니다.`,
      tone: "light",
    },
    {
      icon: "chart",
      title: "정밀 데이터 리포팅",
      description: "측정 결과를 빠르게 정리해 품질 보고서와 검수 문서 작성에 활용할 수 있습니다.",
      tone: "primary",
    },
    {
      icon: "shield",
      title: "안정적인 운용 설계",
      description: "반복 시험과 장시간 사용을 고려한 안정적인 하드웨어 구성을 제공합니다.",
      tone: "surface",
    },
    {
      icon: "sliders",
      title: "프로젝트별 운용 옵션",
      description: "시험 조건과 운영 시나리오에 맞춘 운용 옵션으로 다양한 현장 요구에 대응합니다.",
      tone: "muted",
    },
  ];
}

export default async function EquipmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await fetchEquipmentBySlug(slug);

  if (!item) {
    notFound();
  }

  const equipmentCatalog = await fetchEquipmentCatalog();

  const gallery =
    item.gallery.length > 0
      ? item.gallery
      : [
          { image: item.image, alt: item.alt },
          { image: item.image, alt: item.alt },
          { image: item.image, alt: item.alt },
          { image: item.image, alt: item.alt },
          { image: item.image, alt: item.alt },
        ];
  const [mainImage, ...thumbnailImages] = gallery;
  const galleryTiles = thumbnailImages.slice(0, 4);

  while (galleryTiles.length < 4) {
    galleryTiles.push({ image: item.image, alt: item.alt });
  }

  const features =
    item.features.length > 0 ? item.features : getFallbackFeatures(item.title);
  const technicalSpecs =
    item.technicalSpecs.length > 0
      ? item.technicalSpecs
      : item.specs.map((spec) => ({
          item: spec.label,
          specification: spec.value,
        }));
  const relatedItems = item.relatedSlugs
    .map((relatedSlug) =>
      equipmentCatalog.find((catalogItem) => catalogItem.slug === relatedSlug),
    )
    .filter((relatedItem) => relatedItem !== undefined)
    .slice(0, 3);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/equipment" />

      <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
          <Link href="/equipment" className="transition-colors hover:text-secondary">
            장비 카탈로그
          </Link>
          <Icon icon={ChevronRight} className="size-4" />
          <Link href="/equipment" className="transition-colors hover:text-secondary">
            {item.categoryLabel}
          </Link>
          <Icon icon={ChevronRight} className="size-4" />
          <span className="font-medium text-primary">{item.title}</span>
        </nav>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-12">
            <section>
              <div className="mb-2 flex flex-wrap items-center gap-4">
                <span className="rounded-sm bg-primary-container px-3 py-1 text-xs font-bold tracking-[0.2em] text-on-primary-container uppercase">
                  {item.itemCode}
                </span>
                <span className="text-sm font-bold text-secondary">
                  CAT: {item.catalogCategory}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-extrabold tracking-[-0.08em] text-primary md:text-5xl">
                {item.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
            </section>

            <section className="grid grid-cols-4 gap-4">
              <div className="relative col-span-4 aspect-video overflow-hidden rounded-sm bg-surface-container">
                <Image
                  src={mainImage.image}
                  alt={mainImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>

              {galleryTiles.map((image, index) => {
                const isOverlayTile = index === galleryTiles.length - 1;

                return (
                  <div
                    key={`${image.image}-${index}`}
                    className={`relative aspect-square overflow-hidden rounded-sm ${index === 0 ? "border-2 border-secondary bg-surface-container-high" : "bg-surface-container-high"}`}
                  >
                    <Image
                      src={image.image}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 25vw, 18vw"
                      className={`${isOverlayTile ? "object-cover opacity-60" : "object-cover"}`}
                    />
                    {isOverlayTile ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/40 text-center text-lg font-bold text-white">
                        + 12 더보기
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">
                핵심 기능 및 특징
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {features.map((feature) => {
                  const FeatureIcon = featureIcons[feature.icon];

                  return (
                    <article
                      key={feature.title}
                      className={`flex min-h-[200px] flex-col justify-between rounded-sm p-8 ${featureToneStyles[feature.tone]}`}
                    >
                      <Icon
                        icon={FeatureIcon}
                        className={`mb-4 size-10 ${featureIconStyles[feature.tone]}`}
                      />
                      <div>
                        <h3
                          className={`mb-2 text-xl font-bold tracking-tight ${featureHeadingStyles[feature.tone]}`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`text-sm leading-relaxed ${featureTextStyles[feature.tone]}`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">
                기술 사양 (Technical Specifications)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-left">
                      <th className="border-b border-outline-variant/20 p-4 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                        항목 (Item)
                      </th>
                      <th className="border-b border-outline-variant/20 p-4 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                        상세 사양 (Specification)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {technicalSpecs.map((spec) => (
                      <tr key={spec.item}>
                        <td className="w-1/3 bg-surface-container-low/50 p-4 text-sm font-semibold text-primary-container">
                          {spec.item}
                        </td>
                        <td className="p-4 text-sm text-on-surface">
                          {spec.specification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="w-full space-y-8 lg:w-96">
            <div className="sticky top-32 rounded-sm border border-surface-container-high bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-bold text-primary">
                구매 및 견적 문의
              </h3>

              <div className="mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon icon={Wrench} className="mt-0.5 size-5 text-secondary" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                      기술 지원 센터
                    </p>
                    <p className="text-lg font-bold text-primary">
                      02-1234-5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon icon={Mail} className="mt-0.5 size-5 text-secondary" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                      이메일 문의
                    </p>
                    <p className="text-sm font-medium text-primary">
                      sales@qqualitytech.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon icon={MapPin} className="mt-0.5 size-5 text-secondary" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                      전시장 위치
                    </p>
                    <p className="text-sm font-medium text-primary">
                      경기도 안양시 동안구 산업단지길 123
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    성함 / 업체명
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동 / (주)큐퀄리티"
                    className="w-full rounded-sm border-none bg-surface-container-highest p-3 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full rounded-sm border-none bg-surface-container-highest p-3 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    문의 내용
                  </label>
                  <textarea
                    placeholder="견적 요청 사유 및 장비 구성을 입력해주세요."
                    className="h-32 w-full rounded-sm border-none bg-surface-container-highest p-3 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-secondary py-4 font-bold text-white transition-all hover:opacity-90"
                >
                  <Icon icon={Send} className="size-5" />
                  견적 요청하기
                </button>
              </form>

              <p className="mt-4 text-center text-[10px] text-on-surface-variant">
                보통 24시간 이내에 담당 엔지니어가 답변 드립니다.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-24 border-t border-surface-container-high pt-16">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                관련 시험 장비
              </h2>
              <p className="mt-2 text-on-surface-variant">
                함께 검토하기 좋은 추천 솔루션입니다.
              </p>
            </div>
            <Link
              href="/equipment"
              className="inline-flex items-center gap-1 font-bold text-secondary transition-colors hover:underline"
            >
              모든 장비 보기
              <Icon icon={ArrowRight} className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {relatedItems.map((relatedItem) => (
              <Link
                key={relatedItem.slug}
                href={`/equipment/${relatedItem.slug}`}
                className="group block"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm bg-surface-container">
                  <Image
                    src={relatedItem.image}
                    alt={relatedItem.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mb-1 text-xs font-bold text-secondary">
                  {relatedItem.itemCode}
                </p>
                <h4 className="text-lg font-bold text-primary transition-colors group-hover:text-secondary">
                  {relatedItem.title}
                </h4>
                <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
                  {relatedItem.relatedDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
