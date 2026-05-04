import type { EquipmentItem } from "../data";
import type { EquipmentAdminRow } from "../repository";

export type RelatedEquipmentCard = {
  href: string;
  item: EquipmentItem;
};

export function getItemHref(
  adminRows: EquipmentAdminRow[],
  itemSlug: string,
) {
  const matched = adminRows.find((row) => row.item.slug === itemSlug);
  return matched
    ? `/equipment/${itemSlug}?id=${matched.equipmentId}`
    : `/equipment/${itemSlug}`;
}

export function getGalleryImages(item: EquipmentItem) {
  return item.gallery.length > 0
    ? item.gallery
    : [{ image: item.image, alt: item.alt }];
}

export function getTechnicalSpecs(item: EquipmentItem) {
  return item.technicalSpecs.length > 0
    ? item.technicalSpecs
    : item.specs.map((spec) => ({
        item: spec.label,
        specification: spec.value,
      }));
}

export function getRelatedItems(
  item: EquipmentItem,
  equipmentCatalog: EquipmentItem[],
) {
  const relatedItemsBySlug = item.relatedSlugs
    .map((relatedSlug) =>
      equipmentCatalog.find((catalogItem) => catalogItem.slug === relatedSlug),
    )
    .filter((relatedItem): relatedItem is EquipmentItem => relatedItem !== undefined)
    .slice(0, 3);

  return relatedItemsBySlug.length > 0
    ? relatedItemsBySlug
    : equipmentCatalog
        .filter(
          (catalogItem) =>
            catalogItem.slug !== item.slug && catalogItem.category === item.category,
        )
        .slice(0, 3);
}

export function getRelatedCards(
  adminRows: EquipmentAdminRow[],
  relatedItems: EquipmentItem[],
): RelatedEquipmentCard[] {
  return relatedItems.map((item) => ({
    href: getItemHref(adminRows, item.slug),
    item,
  }));
}
