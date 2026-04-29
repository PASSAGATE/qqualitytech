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
  category?: string;
  status: string;
  saleEnabled: boolean;
  rentalEnabled: boolean;
  imageUrl: string | null;
  imageUrls?: string[];
  createdAt: string;
};

type EquipmentApiListResponse = {
  items?: EquipmentApiItem[];
};

type EquipmentDbRow = {
  id?: string | number | null;
  name?: string | null;
  model_code?: string | null;
  sale_price?: number | null;
  monthly_rental_price?: number | null;
  total_count?: number | null;
  available_count?: number | null;
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
  sale_enabled?: boolean | null;
  rental_enabled?: boolean | null;
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

function apiBaseUrlCandidates() {
  const primary = apiBaseUrl().trim();
  const normalizedPrimary = primary.replace(/\/+$/, "");
  const candidates = [normalizedPrimary];

  if (normalizedPrimary.includes("://localhost:")) {
    candidates.push(normalizedPrimary.replace("://localhost:", "://127.0.0.1:"));
  }

  return Array.from(new Set(candidates));
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
  categoryValue: string;
  categoryLabel: string;
  statusValue: string;
  status: { label: string; tone: "active" | "inactive" };
  salePrice: number;
  monthlyRentalPrice: number;
  totalCount: number;
  availableCount: number;
  saleEnabled: boolean;
  rentalEnabled: boolean;
  createdAt: string;
};

const DEFAULT_EQUIPMENT_IMAGE = "/window.svg";

function toSafeImageUrl(input: string | null | undefined): string {
  const value = input?.trim();
  if (!value) {
    return DEFAULT_EQUIPMENT_IMAGE;
  }

  if (value.startsWith("/")) {
    return value;
  }

  try {
    const url = new URL(value);
    const isAllowedHost =
      url.hostname === "lh3.googleusercontent.com" ||
      url.hostname.endsWith(".supabase.co");

    if (url.protocol === "https:" && isAllowedHost) {
      return value;
    }
  } catch {
    return DEFAULT_EQUIPMENT_IMAGE;
  }

  return DEFAULT_EQUIPMENT_IMAGE;
}

function buildMinimalItem(row: EquipmentDbRow): EquipmentItem {
  const rawId =
    typeof row.id === "string" || typeof row.id === "number"
      ? String(row.id)
      : "unknown";
  const title = row.name?.trim() || row.title?.trim() || `장비 ${rawId.slice(0, 8)}`;
  const image = toSafeImageUrl(row.image?.trim() || equipmentCatalog[0]?.image || "");
  const slug = slugify(row.slug?.trim() || title) || `equipment-${rawId.slice(0, 8).toLowerCase()}`;
  const type = row.type?.trim()?.toLowerCase() || "sale";
  const category = type === "rental" ? "rental" : "sale";
  const modelCode = row.model_code?.trim() || "N/A";

  return {
    slug,
    category,
    categoryLabel: toCategoryLabel(category),
    cardTag: "GENERAL",
    model: `MODEL: ${modelCode}`,
    itemCode: modelCode,
    catalogCategory: "산업 장비",
    title,
    summary: row.description?.trim() || "",
    description: row.description?.trim() || "",
    image,
    alt: title,
    specs: [],
    gallery: [{ image, alt: title }],
    features: [],
    technicalSpecs: [],
    relatedSlugs: [],
    relatedDescription: "",
  };
}

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
  const normalized = category.trim().toLowerCase();
  if (normalized === "architecture") return "건축";
  if (normalized === "civil") return "토목";
  if (normalized === "calibration") return "검교정";
  if (normalized === "sale") return "판매 장비";
  if (normalized === "rental") return "임대 장비";
  if (normalized === "sale_and_rental") return "판매/임대 장비";
  return "기타 장비";
}

function toTypeLabel(type: string | null | undefined): string {
  const normalized = (type ?? "").toLowerCase().trim();
  if (normalized === "sale") return "판매 장비";
  if (normalized === "rental") return "임대 장비";
  if (normalized === "sale_and_rental") return "판매/임대 장비";
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
  const image = toSafeImageUrl(row.image?.trim() || imageUrlList[0] || "");
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
          image: toSafeImageUrl(url),
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
      toSafeImageUrl(image) ||
      toSafeImageUrl(fallback?.image) ||
      toSafeImageUrl(equipmentCatalog[0]?.image) ||
      DEFAULT_EQUIPMENT_IMAGE,
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

  if (normalized === "active") {
    return { value: "active", label: "활성", tone: "active" as const };
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
  // API is the source of truth for equipments now.
  // If API responded (even with empty array), do not fall back to legacy table.
  if (apiRows !== null) {
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
  for (const baseUrl of apiBaseUrlCandidates()) {
    let response: Response;

    try {
      response = await fetch(`${baseUrl}/equipments?limit=100`, {
        next: { revalidate: 30 },
      });
    } catch (error) {
      console.warn(
        `[equipment.repository] API fetch failed for ${baseUrl}:`,
        error,
      );
      continue;
    }

    if (!response.ok) {
      console.warn(
        `[equipment.repository] API responded non-ok for ${baseUrl}: ${response.status}`,
      );
      continue;
    }

    let data: EquipmentApiListResponse;
    try {
      data = (await response.json()) as EquipmentApiListResponse;
    } catch (error) {
      console.warn(
        `[equipment.repository] API JSON parse failed for ${baseUrl}:`,
        error,
      );
      continue;
    }

    const items = Array.isArray(data.items) ? data.items : [];
    return items.map((item) => {
      const normalizedType = item.type?.toLowerCase() ?? "sale";
      const category = item.category?.trim()?.toLowerCase() || "architecture";

      const normalizedImageUrls = Array.isArray(item.imageUrls)
        ? item.imageUrls.filter((url): url is string => typeof url === "string" && url.trim().length > 0)
        : item.imageUrl
          ? [item.imageUrl]
          : [];

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        title: item.name,
        description: item.description,
        summary: item.description,
        model_code: item.code,
        sale_price: item.salePrice,
        monthly_rental_price: item.monthlyRentalPrice,
        total_count: item.totalCount,
        available_count: item.availableCount,
        image_urls: normalizedImageUrls,
        image: toSafeImageUrl(normalizedImageUrls[0] ?? item.imageUrl),
        type: normalizedType,
        category,
        category_label: toCategoryLabel(category),
      status: item.status,
      sale_enabled: item.saleEnabled,
      rental_enabled: item.rentalEnabled,
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

  return null;
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
    return [];
  }

  const mapped = rows
    .map((row) => {
      const item = buildItemFromDb(row) ?? buildMinimalItem(row);

      const statusInfo = toStatus(row.status);
      const rawType = row.type?.trim()?.toLowerCase() || "sale";
      const rawCategory = row.category?.trim()?.toLowerCase() || "architecture";
      const rawId =
        typeof row.id === "string" || typeof row.id === "number"
          ? String(row.id)
          : "";
      if (!rawId) {
        return null;
      }
      const shortId =
        typeof row.id === "string"
          ? row.id.slice(0, 8).toUpperCase()
          : typeof row.id === "number"
            ? String(row.id)
            : "UNKNOWN";

      return {
        equipmentId: rawId,
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
        typeLabel: toTypeLabel(rawType),
        categoryValue: rawCategory,
        categoryLabel: toCategoryLabel(rawCategory),
        statusValue: statusInfo.value,
        status: { label: statusInfo.label, tone: statusInfo.tone },
        salePrice: row.sale_price ?? 0,
        monthlyRentalPrice: row.monthly_rental_price ?? 0,
        totalCount: row.total_count ?? 0,
        availableCount: row.available_count ?? 0,
        saleEnabled: row.sale_enabled ?? rawType !== "rental",
        rentalEnabled: row.rental_enabled ?? rawType !== "sale",
        createdAt: formatDate(row.created_at),
      } satisfies EquipmentAdminRow;
    })
    .filter((row): row is EquipmentAdminRow => row !== null);

  if (mapped.length === 0) {
    return [];
  }

  return mapped;
}
