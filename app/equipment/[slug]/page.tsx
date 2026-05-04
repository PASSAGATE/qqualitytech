import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";
import {
  fetchAdminEquipmentRows,
  fetchEquipmentBySlug,
  fetchEquipmentCatalog,
} from "../repository";
import { EquipmentBreadcrumb } from "./equipment-breadcrumb";
import {
  getGalleryImages,
  getRelatedCards,
  getRelatedItems,
  getTechnicalSpecs,
} from "./equipment-detail-helpers";
import { EquipmentGallery } from "./equipment-gallery";
import { EquipmentHero } from "./equipment-hero";
import { EquipmentSpecsTable } from "./equipment-specs-table";
import { RelatedEquipmentSection } from "./related-equipment-section";

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
    ? (adminRows.find((row) => row.equipmentId === id) ?? null)
    : null;
  const item = preferredRow?.item ?? itemBySlug;

  if (!item) {
    notFound();
  }

  const cartTarget =
    preferredRow ??
    adminRows.find((row) => row.item.slug === item.slug) ??
    null;
  const gallery = getGalleryImages(item);
  const technicalSpecs = getTechnicalSpecs(item);
  const relatedItems = getRelatedItems(item, equipmentCatalog);
  const relatedCards = getRelatedCards(adminRows, relatedItems);

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/equipment" />

      <main className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:px-12">
        <EquipmentBreadcrumb item={item} />

        <div className="flex flex-col gap-12">
          <div className="mx-auto w-full max-w-5xl space-y-12">
            <EquipmentHero item={item} cartTarget={cartTarget} />
            <EquipmentGallery title={item.title} images={gallery} />
            <EquipmentSpecsTable technicalSpecs={technicalSpecs} />
          </div>
        </div>

        <RelatedEquipmentSection relatedCards={relatedCards} />
      </main>

      <SiteFooter />
    </div>
  );
}
