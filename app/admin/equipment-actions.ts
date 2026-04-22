"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  EQUIPMENT_STATUS_VALUES,
  EQUIPMENT_TYPE_VALUES,
} from "./equipment-enums";

type ApiError = {
  message?: string;
  error?: string;
};

function apiBaseUrl() {
  return (
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:4000/api/v1"
  );
}

function toAdminError(
  message: string,
  key: "createError" | "updateError" | "deleteError" = "createError",
) {
  return `/admin?${key}=${encodeURIComponent(message)}`;
}

function sanitizeFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex > -1 ? fileName.slice(0, dotIndex) : fileName;
  const ext = dotIndex > -1 ? fileName.slice(dotIndex).toLowerCase() : "";

  const safeBase = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${safeBase || "equipment"}${ext}`;
}

function normalizeType(
  value: string,
): "sale" | "rental" | "sale_and_rental" | null {
  const normalized = value.trim().toLowerCase();
  if (
    normalized === "sale" ||
    normalized === "rental" ||
    normalized === "sale_and_rental"
  ) {
    return normalized;
  }

  return null;
}

function normalizeStatus(value: string): "active" | "inactive" {
  const normalized = value.trim().toLowerCase();

  if (normalized === "active" || normalized === "available") {
    return "active";
  }

  if (
    normalized === "inactive" ||
    normalized === "sold" ||
    normalized === "rented"
  ) {
    return "inactive";
  }

  return "active";
}

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function uploadImageFiles(
  files: File[],
  userId: string,
  supabase: NonNullable<Awaited<ReturnType<typeof createServerSupabaseClient>>>,
  errorKey: "createError" | "updateError",
) {
  if (files.some((file) => !file.type.startsWith("image/"))) {
    redirect(toAdminError("이미지 파일만 업로드할 수 있습니다.", errorKey));
  }

  const bucket = process.env.SUPABASE_EQUIPMENT_BUCKET ?? "equipment-images";
  const uploadedUrls: string[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const safeName = sanitizeFileName(file.name);
    const filePath = `${userId}/${Date.now()}-${index + 1}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      redirect(toAdminError(`이미지 업로드 실패: ${uploadError.message}`, errorKey));
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}

export async function createEquipmentAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      toAdminError(
        "Supabase 환경 설정이 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.",
      ),
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token || !session.user) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요."));
  }

  const name = String(formData.get("name") ?? "").trim();
  const modelCode = String(formData.get("model_code") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const typeInput = String(formData.get("type") ?? "").trim();
  const statusInput = String(formData.get("status") ?? "").trim();
  const imageFiles = [1, 2, 3, 4, 5]
    .map((index) => formData.get(`image_file_${index}`))
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!name) {
    redirect(toAdminError("장비명을 입력해 주세요."));
  }

  if (!typeInput) {
    redirect(toAdminError("장비 타입을 입력해 주세요."));
  }

  if (
    !EQUIPMENT_TYPE_VALUES.includes(
      typeInput as (typeof EQUIPMENT_TYPE_VALUES)[number],
    )
  ) {
    redirect(
      toAdminError(
        `지원하지 않는 장비 타입입니다. (${EQUIPMENT_TYPE_VALUES.join(", ")})`,
      ),
    );
  }

  if (
    statusInput &&
    !EQUIPMENT_STATUS_VALUES.includes(
      statusInput as (typeof EQUIPMENT_STATUS_VALUES)[number],
    )
  ) {
    redirect(
      toAdminError(
        `지원하지 않는 상태 값입니다. (${EQUIPMENT_STATUS_VALUES.join(", ")})`,
      ),
    );
  }

  if (imageFiles.length === 0) {
    redirect(toAdminError("이미지 파일을 1장 이상 업로드해 주세요."));
  }

  if (imageFiles.length > 5) {
    redirect(toAdminError("이미지는 최대 5장까지 업로드할 수 있습니다."));
  }

  const uploadedUrls = await uploadImageFiles(
    imageFiles,
    session.user.id,
    supabase,
    "createError",
  );

  const type = normalizeType(typeInput);
  if (!type) {
    redirect(toAdminError("지원하지 않는 장비 타입입니다."));
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/equipments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        name,
        description,
        code: modelCode || undefined,
        type,
        status: normalizeStatus(statusInput),
        saleEnabled: type !== "rental",
        rentalEnabled: type !== "sale",
        imageUrl: uploadedUrls[0],
      }),
      cache: "no-store",
    });
  } catch {
    redirect(toAdminError("백엔드 연결에 실패했습니다. 서버 상태를 확인해 주세요."));
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirect(toAdminError(`등록 실패: ${message}`));
  }

  revalidatePath("/admin");
  revalidatePath("/equipment");
  redirect("/admin?created=1");
}

export async function updateEquipmentAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      toAdminError(
        "Supabase 환경 설정이 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.",
        "updateError",
      ),
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token || !session.user) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요.", "updateError"));
  }

  const equipmentId = String(formData.get("equipment_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const modelCode = String(formData.get("model_code") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const typeInput = String(formData.get("type") ?? "").trim();
  const statusInput = String(formData.get("status") ?? "").trim();
  const keepImageUrls = formData
    .getAll("keep_image_urls")
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.trim());
  const newImageFiles = [1, 2, 3, 4, 5]
    .map((index) => formData.get(`new_image_file_${index}`))
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (!equipmentId) {
    redirect(toAdminError("수정할 장비를 찾을 수 없습니다.", "updateError"));
  }

  if (!name) {
    redirect(toAdminError("장비명을 입력해 주세요.", "updateError"));
  }

  if (!typeInput) {
    redirect(toAdminError("장비 타입을 입력해 주세요.", "updateError"));
  }

  if (
    !EQUIPMENT_TYPE_VALUES.includes(
      typeInput as (typeof EQUIPMENT_TYPE_VALUES)[number],
    )
  ) {
    redirect(
      toAdminError(
        `지원하지 않는 장비 타입입니다. (${EQUIPMENT_TYPE_VALUES.join(", ")})`,
        "updateError",
      ),
    );
  }

  if (
    statusInput &&
    !EQUIPMENT_STATUS_VALUES.includes(
      statusInput as (typeof EQUIPMENT_STATUS_VALUES)[number],
    )
  ) {
    redirect(
      toAdminError(
        `지원하지 않는 상태 값입니다. (${EQUIPMENT_STATUS_VALUES.join(", ")})`,
        "updateError",
      ),
    );
  }

  if (newImageFiles.length > 5) {
    redirect(toAdminError("새 이미지는 최대 5장까지 업로드할 수 있습니다.", "updateError"));
  }

  const uploadedUrls = await uploadImageFiles(
    newImageFiles,
    session.user.id,
    supabase,
    "updateError",
  );
  const nextImageUrls = [...keepImageUrls, ...uploadedUrls];

  if (nextImageUrls.length === 0) {
    redirect(
      toAdminError(
        "최소 1장 이상의 이미지를 유지하거나 업로드해 주세요.",
        "updateError",
      ),
    );
  }

  const type = normalizeType(typeInput);
  if (!type) {
    redirect(toAdminError("지원하지 않는 장비 타입입니다.", "updateError"));
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/equipments/${equipmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        name,
        description,
        code: modelCode || undefined,
        type,
        status: normalizeStatus(statusInput),
        saleEnabled: type !== "rental",
        rentalEnabled: type !== "sale",
        imageUrl: nextImageUrls[0],
      }),
      cache: "no-store",
    });
  } catch {
    redirect(toAdminError("백엔드 연결에 실패했습니다. 서버 상태를 확인해 주세요.", "updateError"));
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirect(toAdminError(`수정 실패: ${message}`, "updateError"));
  }

  revalidatePath("/admin");
  revalidatePath("/equipment");
  redirect("/admin?updated=1");
}

export async function deleteEquipmentAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      toAdminError(
        "Supabase 환경 설정이 없습니다. NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인해 주세요.",
        "deleteError",
      ),
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요.", "deleteError"));
  }

  const equipmentId = String(formData.get("equipment_id") ?? "").trim();
  if (!equipmentId) {
    redirect(toAdminError("삭제할 장비를 찾을 수 없습니다.", "deleteError"));
  }

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl()}/equipments/${equipmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      cache: "no-store",
    });
  } catch {
    redirect(toAdminError("백엔드 연결에 실패했습니다. 서버 상태를 확인해 주세요.", "deleteError"));
  }

  if (!response.ok) {
    const message = await readApiError(response);
    redirect(toAdminError(`삭제 실패: ${message}`, "deleteError"));
  }

  revalidatePath("/admin");
  revalidatePath("/equipment");
  redirect("/admin?deleted=1");
}
