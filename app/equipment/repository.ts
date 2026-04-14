import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { equipmentCatalog, type EquipmentItem } from "./data";

type EquipmentDbRow = {
  id?: string | number | null;
  slug?: string | null;
  category?: string | null;
  category_label?: string | null;
  card_tag?: string | null;
  model?: string | null;
  item_code?: string | null;
  catalog_category?: string | null;
  title?: string | null;
  summary?: string | null;
  description?: string | null;
  image?: string | null;
  alt?: string | null;
  badge?: string | null;
  badge_tone?: string | null;
  specs?: unknown;
  gallery?: unknown;
  features?: unknown;
  technical_specs?: unknown;
  related_slugs?: unknown;
  related_description?: string | null;
  is_featured?: boolean | null;
  is_visible?: boolean | null;
  status?: string | null;
  manager_name?: string | null;
  created_at?: string | null;
};

export type EquipmentAdminRow = {
  id: string;
  item: EquipmentItem;
  typeLabel: string;
  status: { label: string; tone: "active" | "maintenance" | "warning" | "inactive" };
  featured: boolean;
  visible: boolean;
  manager: string;
  createdAt: string;
};

function asRecordArray(input: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.filter((value): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  });
}

function asStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.filter((value): value is string => typeof value === "string");
}

function toEquipmentSpecArray(input: unknown): EquipmentItem["specs"] {
  return asRecordArray(input)
    .map((entry) => ({
      label: typeof entry.label === "string" ? entry.label : "",
      value: typeof entry.value === "string" ? entry.value : "",
    }))
    .filter((entry) => entry.label && entry.value);
}

function toGalleryArray(input: unknown): EquipmentItem["gallery"] {
  return asRecordArray(input)
    .map((entry) => ({
      image: typeof entry.image === "string" ? entry.image : "",
      alt: typeof entry.alt === "string" ? entry.alt : "",
    }))
    .filter((entry) => entry.image && entry.alt);
}

function toFeatureArray(input: unknown): EquipmentItem["features"] {
  const toFeatureIcon = (
    value: unknown,
  ): EquipmentItem["features"][number]["icon"] => {
    if (
      value === "wrench" ||
      value === "chart" ||
      value === "shield" ||
      value === "sliders"
    ) {
      return value;
    }

    return "wrench";
  };

  const toFeatureTone = (
    value: unknown,
  ): EquipmentItem["features"][number]["tone"] => {
    if (
      value === "light" ||
      value === "primary" ||
      value === "surface" ||
      value === "muted"
    ) {
      return value;
    }

    return "light";
  };

  return asRecordArray(input)
    .map((entry) => ({
      icon: toFeatureIcon(entry.icon),
      title: typeof entry.title === "string" ? entry.title : "",
      description: typeof entry.description === "string" ? entry.description : "",
      tone: toFeatureTone(entry.tone),
    }))
    .filter((entry) => entry.title && entry.description);
}

function toTechnicalSpecArray(input: unknown): EquipmentItem["technicalSpecs"] {
  return asRecordArray(input)
    .map((entry) => ({
      item: typeof entry.item === "string" ? entry.item : "",
      specification: typeof entry.specification === "string" ? entry.specification : "",
    }))
    .filter((entry) => entry.item && entry.specification);
}

function buildItemFromDb(row: EquipmentDbRow): EquipmentItem | null {
  const slug = row.slug?.trim();
  const title = row.title?.trim();
  const image = row.image?.trim();
  const fallback = slug
    ? equipmentCatalog.find((item) => item.slug === slug)
    : undefined;

  if (!slug || !title || !image) {
    return fallback ?? null;
  }

  return {
    slug,
    category: row.category?.trim() || fallback?.category || "GENERAL",
    categoryLabel:
      row.category_label?.trim() || fallback?.categoryLabel || "기타 장비",
    cardTag: row.card_tag?.trim() || fallback?.cardTag || "GENERAL",
    model: row.model?.trim() || fallback?.model || "MODEL: -",
    itemCode: row.item_code?.trim() || fallback?.itemCode || slug.toUpperCase(),
    catalogCategory:
      row.catalog_category?.trim() || fallback?.catalogCategory || "산업 장비",
    title,
    summary: row.summary?.trim() || fallback?.summary || "",
    description: row.description?.trim() || fallback?.description || "",
    image,
    alt: row.alt?.trim() || fallback?.alt || title,
    badge: row.badge?.trim() || fallback?.badge,
    badgeTone: row.badge_tone?.trim() || fallback?.badgeTone,
    specs: toEquipmentSpecArray(row.specs).length
      ? toEquipmentSpecArray(row.specs)
      : fallback?.specs || [],
    gallery: toGalleryArray(row.gallery).length
      ? toGalleryArray(row.gallery)
      : fallback?.gallery || [],
    features: toFeatureArray(row.features).length
      ? toFeatureArray(row.features)
      : fallback?.features || [],
    technicalSpecs: toTechnicalSpecArray(row.technical_specs).length
      ? toTechnicalSpecArray(row.technical_specs)
      : fallback?.technicalSpecs || [],
    relatedSlugs: asStringArray(row.related_slugs).length
      ? asStringArray(row.related_slugs)
      : fallback?.relatedSlugs || [],
    relatedDescription:
      row.related_description?.trim() || fallback?.relatedDescription || "",
  };
}

function toStatus(status: string | null | undefined) {
  const normalized = status?.toLowerCase().trim();

  if (normalized === "active" || normalized === "running") {
    return { label: "운영중", tone: "active" as const };
  }

  if (normalized === "maintenance") {
    return { label: "점검중", tone: "maintenance" as const };
  }

  if (normalized === "warning" || normalized === "attention") {
    return { label: "점검 필요", tone: "warning" as const };
  }

  return { label: "비활성", tone: "inactive" as const };
}

function formatDate(dateInput: string | null | undefined): string {
  if (!dateInput) {
    return "-";
  }

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

async function fetchEquipmentRowsFromDb(): Promise<EquipmentDbRow[] | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return null;
  }

  return data as EquipmentDbRow[];
}

export async function fetchEquipmentCatalog(): Promise<EquipmentItem[]> {
  const rows = await fetchEquipmentRowsFromDb();

  if (!rows || rows.length === 0) {
    return equipmentCatalog;
  }

  const mapped = rows
    .map((row) => buildItemFromDb(row))
    .filter((item): item is EquipmentItem => item !== null);

  return mapped.length > 0 ? mapped : equipmentCatalog;
}

export async function fetchEquipmentBySlug(
  slug: string,
): Promise<EquipmentItem | undefined> {
  const catalog = await fetchEquipmentCatalog();
  return catalog.find((item) => item.slug === slug);
}

export async function fetchFeaturedEquipment(limit = 4): Promise<EquipmentItem[]> {
  const rows = await fetchEquipmentRowsFromDb();

  if (!rows || rows.length === 0) {
    return equipmentCatalog.slice(0, limit);
  }

  const featuredRows = rows.filter((row) => row.is_featured === true);
  const sourceRows = featuredRows.length > 0 ? featuredRows : rows;
  const mapped = sourceRows
    .map((row) => buildItemFromDb(row))
    .filter((item): item is EquipmentItem => item !== null);

  if (mapped.length === 0) {
    return equipmentCatalog.slice(0, limit);
  }

  return mapped.slice(0, limit);
}

export async function fetchAdminEquipmentRows(): Promise<EquipmentAdminRow[]> {
  const rows = await fetchEquipmentRowsFromDb();

  if (!rows || rows.length === 0) {
    return equipmentCatalog.slice(0, 6).map((item, index) => ({
      id: `EQ-${2024 - Math.floor(index / 3)}-${String(index + 1).padStart(3, "0")}`,
      item,
      typeLabel: item.categoryLabel,
      status:
        index % 4 === 0
          ? { label: "점검중", tone: "maintenance" }
          : { label: "운영중", tone: "active" },
      featured: index < 3,
      visible: index !== 5,
      manager: "관리자",
      createdAt: "-",
    }));
  }

  const mapped = rows
    .map((row, index) => {
      const item = buildItemFromDb(row);

      if (!item) {
        return null;
      }

      return {
        id:
          typeof row.id === "string" || typeof row.id === "number"
            ? `EQ-${row.id}`
            : item.itemCode || `EQ-${index + 1}`,
        item,
        typeLabel: row.category_label?.trim() || item.categoryLabel,
        status: toStatus(row.status),
        featured: row.is_featured ?? Boolean(item.badge),
        visible: row.is_visible ?? true,
        manager: row.manager_name?.trim() || "관리자",
        createdAt: formatDate(row.created_at),
      } satisfies EquipmentAdminRow;
    })
    .filter((row): row is EquipmentAdminRow => row !== null);

  if (mapped.length === 0) {
    return [];
  }

  return mapped;
}
