import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import { EquipmentGallery } from "./equipment-gallery";
import { AddToCartPanel } from "./add-to-cart-panel";
import {
  fetchAdminEquipmentRows,
  fetchEquipmentBySlug,
  fetchEquipmentCatalog,
} from "../repository";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchEquipmentBySlug(slug);

  if (!item) {
    return {
      title: "시험장비 상세 | 큐품질관리기술",
    };
  }

  return {
    title: `${item.title} | 큐품질관리기술`,
    description: item.description,
  };
}

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

export default async function EquipmentDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { id } = await searchParams;
  const [adminRows, itemBySlug, equipmentCatalog] = await Promise.all([
    fetchAdminEquipmentRows(),
    fetchEquipmentBySlug(slug),
    fetchEquipmentCatalog(),
  ]);
  const preferredRow = id
    ? adminRows.find((row) => row.equipmentId === id) ?? null
    : null;
  const item = preferredRow?.item ?? itemBySlug;

  if (!item) {
    notFound();
  }
  const cartTarget =
    preferredRow ??
    adminRows.find((row) => row.item.slug === item.slug) ??
    null;
  const getItemHref = (itemSlug: string) => {
    const matched = adminRows.find((row) => row.item.slug === itemSlug);
    return matched
      ? `/equipment/${itemSlug}?id=${matched.equipmentId}`
      : `/equipment/${itemSlug}`;
  };

  const gallery =
    item.gallery.length > 0
      ? item.gallery
      : [{ image: item.image, alt: item.alt }];

  const technicalSpecs =
    item.technicalSpecs.length > 0
      ? item.technicalSpecs
      : item.specs.map((spec) => ({
          item: spec.label,
          specification: spec.value,
        }));
  const relatedItemsBySlug = item.relatedSlugs
    .map((relatedSlug) =>
      equipmentCatalog.find((catalogItem) => catalogItem.slug === relatedSlug),
    )
    .filter((relatedItem) => relatedItem !== undefined)
    .slice(0, 3);
  const relatedItems =
    relatedItemsBySlug.length > 0
      ? relatedItemsBySlug
      : equipmentCatalog
          .filter(
            (catalogItem) =>
              catalogItem.slug !== item.slug &&
              catalogItem.category === item.category,
          )
          .slice(0, 3);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/equipment" />

      <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <nav className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
          <Link
            href="/equipment"
            className="transition-colors hover:text-secondary"
          >
            장비 카탈로그
          </Link>
          <Icon icon={ChevronRight} className="size-4" />
          <Link
            href="/equipment"
            className="transition-colors hover:text-secondary"
          >
            {item.categoryLabel}
          </Link>
          <Icon icon={ChevronRight} className="size-4" />
          <span className="font-medium text-primary">{item.title}</span>
        </nav>

        <div className="flex flex-col gap-12">
          <div className="mx-auto w-full max-w-5xl space-y-12">
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

              {cartTarget ? (
                <div className="mt-6 max-w-md">
                  <AddToCartPanel
                    equipmentId={cartTarget.equipmentId}
                    saleEnabled={cartTarget.saleEnabled}
                    rentalEnabled={cartTarget.rentalEnabled}
                  />
                </div>
              ) : null}
            </section>

            <EquipmentGallery title={item.title} images={gallery} />

            {/* <section className="space-y-6">
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
            </section> */}

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

          {/* <aside className="w-full space-y-8 lg:w-96">
            <div className="sticky top-32 rounded-sm border border-surface-container-high bg-white p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-bold text-primary">
                구매 및 견적 문의
              </h3>
              {inquirySuccess === "1" ? (
                <p className="mb-4 rounded-sm bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary">
                  문의가 정상적으로 접수되었습니다. 빠르게 연락드리겠습니다.
                </p>
              ) : null}
              {inquiryError ? (
                <p className="mb-4 rounded-sm bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {inquiryError}
                </p>
              ) : null}

              <div className="mb-8 space-y-6">
                {cartTarget ? (
                  <AddToCartPanel
                    equipmentId={cartTarget.equipmentId}
                    saleEnabled={cartTarget.saleEnabled}
                    rentalEnabled={cartTarget.rentalEnabled}
                  />
                ) : null}

                <div className="flex items-start gap-4">
                  <Icon
                    icon={Wrench}
                    className="mt-0.5 size-5 text-secondary"
                  />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                      기술 지원 센터
                    </p>
                    <p className="text-lg font-bold text-primary">
                      010-6666-5269
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
                      qqstart@naver.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Icon
                    icon={MapPin}
                    className="mt-0.5 size-5 text-secondary"
                  />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-on-surface-variant">
                      주소
                    </p>
                    <p className="text-sm font-medium text-primary">
                      경기도 구리시 갈매동 545
                    </p>
                  </div>
                </div>
              </div>

              <form action={createEquipmentInquiryAction} className="space-y-4">
                <input type="hidden" name="equipment_slug" value={item.slug} />
                <input
                  type="hidden"
                  name="equipment_title"
                  value={item.title}
                />
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    성함 / 업체명
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="갈매동 / (주)큐품질관리기술"
                    required
                    className="w-full rounded-sm border-none bg-surface-container-highest p-3 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    placeholder="010-0000-0000"
                    required
                    className="w-full rounded-sm border-none bg-surface-container-highest p-3 text-sm outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-on-surface-variant">
                    문의 내용
                  </label>
                  <textarea
                    name="message"
                    placeholder="견적 요청 사유 및 장비 구성을 입력해주세요."
                    required
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
          </aside> */}
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

          <div className="-mx-5 overflow-x-auto px-5 md:hidden">
            <div className="flex snap-x snap-mandatory gap-4 pb-2">
              {relatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.slug}
                  href={getItemHref(relatedItem.slug)}
                  className="group block min-w-[78%] snap-start rounded-sm bg-surface-container-lowest p-2"
                >
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm bg-surface-container">
                    <Image
                      src={relatedItem.image}
                      alt={relatedItem.alt}
                      fill
                      sizes="80vw"
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
          </div>

          <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
            {relatedItems.map((relatedItem) => (
              <Link
                key={relatedItem.slug}
                href={getItemHref(relatedItem.slug)}
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
