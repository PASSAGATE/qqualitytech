import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { equipmentCatalog, type EquipmentItem } from "./data";

type EquipmentApiItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  code: string | null;
  salePrice: number;
  monthlyRentalPrice: number;
  totalCount: number;
  availableCount: number;
  type: string;
  status: string;
  saleEnabled: boolean;
  rentalEnabled: boolean;
  imageUrl: string | null;
  createdAt: string;
};

type EquipmentApiListResponse = {
  items?: EquipmentApiItem[];
};

type EquipmentDbRow = {
  id?: string | number | null;
  name?: string | null;
  model_code?: string | null;
  image_urls?: unknown;
  type?: string | null;
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

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

export type EquipmentAdminRow = {
  equipmentId: string;
  id: string;
  item: EquipmentItem;
  name: string;
  modelCode: string;
  description: string;
  imageUrls: string[];
  typeValue: string;
  typeLabel: string;
  statusValue: string;
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

function slugify(value: string): string {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized.replace(/^-|-$/g, "");
}

function toCategoryLabel(category: string): string {
  const normalized = category.toLowerCase();
  if (normalized === "sale") return "판매 장비";
  if (normalized === "rental") return "임대 장비";
  return "기타 장비";
}

function buildItemFromDb(row: EquipmentDbRow): EquipmentItem | null {
  const fallbackSlug =
    typeof row.id === "string" || typeof row.id === "number"
      ? `equipment-${String(row.id).slice(0, 8).toLowerCase()}`
      : "";
  const slugBase = row.slug?.trim() || row.name?.trim() || fallbackSlug;
  const slug = slugBase ? slugify(slugBase) || fallbackSlug : fallbackSlug;
  const title = row.title?.trim() || row.name?.trim();
  const imageUrlList = asStringArray(row.image_urls);
  const image = row.image?.trim() || imageUrlList[0] || "";
  const category = row.category?.trim() || row.type?.trim() || "GENERAL";
  const fallback = slug
    ? equipmentCatalog.find((item) => item.slug === slug)
    : undefined;

  if (!slug || !title) {
    return fallback ?? null;
  }

  const galleryFromImageUrls =
    imageUrlList.length > 0
      ? imageUrlList.map((url, index) => ({
          image: url,
          alt: row.alt?.trim() || title || `equipment image ${index + 1}`,
        }))
      : [];

  return {
    slug,
    category: category || fallback?.category || "GENERAL",
    categoryLabel:
      row.category_label?.trim() ||
      fallback?.categoryLabel ||
      toCategoryLabel(category),
    cardTag: row.card_tag?.trim() || fallback?.cardTag || "GENERAL",
    model:
      row.model?.trim() ||
      (row.model_code?.trim() ? `MODEL: ${row.model_code.trim()}` : "") ||
      fallback?.model ||
      "MODEL: -",
    itemCode:
      row.item_code?.trim() ||
      row.model_code?.trim() ||
      fallback?.itemCode ||
      slug.toUpperCase(),
    catalogCategory:
      row.catalog_category?.trim() || fallback?.catalogCategory || "산업 장비",
    title: title || fallback?.title || "장비",
    summary: row.summary?.trim() || fallback?.summary || "",
    description: row.description?.trim() || fallback?.description || "",
    image:
      image ||
      fallback?.image ||
      equipmentCatalog[0]?.image ||
      "",
    alt: row.alt?.trim() || fallback?.alt || title || "equipment",
    badge: row.badge?.trim() || fallback?.badge,
    badgeTone: row.badge_tone?.trim() || fallback?.badgeTone,
    specs: toEquipmentSpecArray(row.specs).length
      ? toEquipmentSpecArray(row.specs)
      : fallback?.specs || [],
    gallery: toGalleryArray(row.gallery).length
      ? toGalleryArray(row.gallery)
      : galleryFromImageUrls.length > 0
        ? galleryFromImageUrls
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

  if (
    normalized === "active" ||
    normalized === "running" ||
    normalized === "available"
  ) {
    return { value: "available", label: "운영중", tone: "active" as const };
  }

  if (normalized === "rented") {
    return { value: "rented", label: "임대중", tone: "maintenance" as const };
  }

  if (normalized === "sold") {
    return { value: "sold", label: "판매완료", tone: "inactive" as const };
  }

  if (normalized === "maintenance" || normalized === "in_maintenance") {
    return { value: "in_maintenance", label: "점검중", tone: "maintenance" as const };
  }

  if (
    normalized === "warning" ||
    normalized === "attention" ||
    normalized === "needs_attention"
  ) {
    return { value: "needs_attention", label: "점검 필요", tone: "warning" as const };
  }

  return { value: "inactive", label: "비활성", tone: "inactive" as const };
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
  const apiRows = await fetchEquipmentRowsFromApi();
  if (apiRows && apiRows.length > 0) {
    return apiRows;
  }

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

async function fetchEquipmentRowsFromApi(): Promise<EquipmentDbRow[] | null> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl()}/equipments?limit=200`, {
      cache: "no-store",
    });
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  let data: EquipmentApiListResponse;
  try {
    data = (await response.json()) as EquipmentApiListResponse;
  } catch {
    return null;
  }

  const items = Array.isArray(data.items) ? data.items : [];

  return items.map((item) => {
    const normalizedType = item.type?.toLowerCase() ?? "sale";
    const category =
      normalizedType === "rental" ? "rental" : "sale";

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      title: item.name,
      description: item.description,
      summary: item.description,
      model_code: item.code,
      image: item.imageUrl,
      type: normalizedType,
      category,
      category_label: toCategoryLabel(category),
      status: item.status,
      is_visible: item.status?.toLowerCase() === "active",
      is_featured: false,
      created_at: item.createdAt,
      specs: [
        {
          label: "판매가",
          value: `${item.salePrice.toLocaleString("ko-KR")}원`,
        },
        {
          label: "월 임대료",
          value: `${item.monthlyRentalPrice.toLocaleString("ko-KR")}원`,
        },
        {
          label: "재고",
          value: `${item.availableCount}/${item.totalCount}`,
        },
      ],
    } satisfies EquipmentDbRow;
  });
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
      equipmentId: `local-${index + 1}`,
      id: `EQ-${2024 - Math.floor(index / 3)}-${String(index + 1).padStart(3, "0")}`,
      item,
      name: item.title,
      modelCode: item.model.replace("MODEL: ", ""),
      description: item.description,
      imageUrls: item.gallery.map((galleryItem) => galleryItem.image),
      typeValue: "sale",
      typeLabel: item.categoryLabel,
      statusValue: "available",
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

      const statusInfo = toStatus(row.status);
      const rawType = row.type?.trim()?.toLowerCase() || row.category?.trim()?.toLowerCase() || "sale";
      const rawId =
        typeof row.id === "string" || typeof row.id === "number"
          ? String(row.id)
          : "";
      const shortId =
        typeof row.id === "string"
          ? row.id.slice(0, 8).toUpperCase()
          : typeof row.id === "number"
            ? String(row.id)
            : String(index + 1).padStart(3, "0");

      return {
        equipmentId: rawId || `local-${index + 1}`,
        id: `EQ-${shortId}`,
        item,
        name: row.name?.trim() || item.title,
        modelCode: row.model_code?.trim() || item.model.replace("MODEL: ", ""),
        description: row.description?.trim() || item.description,
        imageUrls:
          asStringArray(row.image_urls).length > 0
            ? asStringArray(row.image_urls)
            : [item.image],
        typeValue: rawType,
        typeLabel: row.category_label?.trim() || item.categoryLabel,
        statusValue: statusInfo.value,
        status: { label: statusInfo.label, tone: statusInfo.tone },
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
