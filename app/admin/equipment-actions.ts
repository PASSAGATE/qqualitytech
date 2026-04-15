"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  EQUIPMENT_STATUS_VALUES,
  EQUIPMENT_TYPE_VALUES,
} from "./equipment-enums";

function toAdminError(message: string, key: "createError" | "updateError" | "deleteError" = "createError") {
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

function extractStoragePathFromPublicUrl(url: string, bucket: string) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const path = url.slice(markerIndex + marker.length);
  return path ? decodeURIComponent(path) : null;
}

type EquipmentImageRow = {
  image_urls?: unknown;
};

function isMissingColumnError(message: string, column: string) {
  const normalized = message.toLowerCase();
  return normalized.includes(column.toLowerCase()) && normalized.includes("column");
}

async function runEquipmentUpdateWithImageFallback(
  supabase: SupabaseClient,
  equipmentId: string,
  payload: Record<string, unknown>,
) {
  const attemptPayload: Record<string, unknown> = { ...payload };
  const { error } = await supabase
    .from("equipment")
    .update(attemptPayload)
    .eq("id", equipmentId);

  return error ?? null;
}

async function runEquipmentInsertWithImageFallback(
  supabase: SupabaseClient,
  payload: Record<string, unknown>,
) {
  const attemptPayload: Record<string, unknown> = { ...payload };
  let { error } = await supabase.from("equipment").insert(attemptPayload);

  if (error && "image_urls" in attemptPayload) {
    const message = error.message ?? "";
    if (isMissingColumnError(message, "image_urls")) {
      delete attemptPayload.image_urls;
      ({ error } = await supabase.from("equipment").insert(attemptPayload));
    }
  }

  return error ?? null;
}

async function loadEquipmentImageUrls(
  supabase: SupabaseClient,
  equipmentId: string,
) {
  let dataRow: EquipmentImageRow | null = null;
  let errorMessage: string | null = null;

  const selectCandidates = ["image_urls"];

  for (const candidate of selectCandidates) {
    const result = await supabase
      .from("equipment")
      .select(candidate)
      .eq("id", equipmentId)
      .single();

    if (!result.error) {
      dataRow = result.data as EquipmentImageRow | null;
      errorMessage = null;
      break;
    }

    const message = result.error.message.toLowerCase();
    const missingImageUrls = message.includes("image_urls") && message.includes("column");

    if (missingImageUrls) {
      continue;
    }

    errorMessage = result.error.message;
    break;
  }

  if (errorMessage || !dataRow) {
    return {
      imageUrls: [] as string[],
      errorMessage: errorMessage ?? "장비 정보를 찾을 수 없습니다.",
    };
  }

  const imageUrls = Array.isArray(dataRow.image_urls)
    ? dataRow.image_urls.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      )
    : [];

  return {
    imageUrls,
    errorMessage: null as string | null,
  };
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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요."));
  }

  const name = String(formData.get("name") ?? "").trim();
  const modelCode = String(formData.get("model_code") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageFiles = [1, 2, 3, 4, 5]
    .map((index) => formData.get(`image_file_${index}`))
    .filter((value): value is File => value instanceof File && value.size > 0);
  const type = String(formData.get("type") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const isVisible = formData.get("is_visible") === "on";
  const isFeatured = formData.get("is_featured") === "on";

  if (!name) {
    redirect(toAdminError("장비명을 입력해 주세요."));
  }

  if (!type) {
    redirect(toAdminError("장비 타입을 입력해 주세요."));
  }

  if (!EQUIPMENT_TYPE_VALUES.includes(type as (typeof EQUIPMENT_TYPE_VALUES)[number])) {
    redirect(
      toAdminError(
        `지원하지 않는 장비 타입입니다. (${EQUIPMENT_TYPE_VALUES.join(", ")})`,
      ),
    );
  }

  if (
    status &&
    !EQUIPMENT_STATUS_VALUES.includes(
      status as (typeof EQUIPMENT_STATUS_VALUES)[number],
    )
  ) {
    redirect(
      toAdminError(
        `지원하지 않는 상태 값입니다. (${EQUIPMENT_STATUS_VALUES.join(", ")})`,
      ),
    );
  }

  let resolvedImageUrl = "";
  let resolvedImageUrls: string[] = [];
  const hasImageFiles = imageFiles.length > 0;

  if (hasImageFiles) {
    if (imageFiles.length > 5) {
      redirect(toAdminError("이미지는 최대 5장까지 업로드할 수 있습니다."));
    }

    if (imageFiles.some((file) => !file.type.startsWith("image/"))) {
      redirect(toAdminError("이미지 파일만 업로드할 수 있습니다."));
    }

    const bucket = process.env.SUPABASE_EQUIPMENT_BUCKET ?? "equipment-images";
    const uploadedUrls: string[] = [];

    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const safeName = sanitizeFileName(file.name);
      const filePath = `${user.id}/${Date.now()}-${index + 1}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        redirect(toAdminError(`이미지 업로드 실패: ${uploadError.message}`));
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      uploadedUrls.push(data.publicUrl);
    }

    if (uploadedUrls.length > 0) {
      resolvedImageUrl = uploadedUrls[0];
      resolvedImageUrls = uploadedUrls;
    }
  }

  if (!resolvedImageUrl) {
    redirect(toAdminError("이미지 파일을 1장 이상 업로드해 주세요."));
  }

  const payload: Record<string, unknown> = {
    name,
    type,
    is_visible: isVisible,
    is_featured: isFeatured,
    created_by: user.id,
  };

  if (modelCode) payload.model_code = modelCode;
  if (description) payload.description = description;
  if (resolvedImageUrls.length > 0) payload.image_urls = resolvedImageUrls;
  if (status) payload.status = status;

  const error = await runEquipmentInsertWithImageFallback(supabase, payload);

  if (error) {
    redirect(toAdminError(`등록 실패: ${error.message}`));
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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요.", "updateError"));
  }

  const equipmentId = String(formData.get("equipment_id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const modelCode = String(formData.get("model_code") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const keepImageUrls = formData
    .getAll("keep_image_urls")
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.trim());
  const newImageFiles = [1, 2, 3, 4, 5]
    .map((index) => formData.get(`new_image_file_${index}`))
    .filter((value): value is File => value instanceof File && value.size > 0);
  const type = String(formData.get("type") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const isVisible = formData.get("is_visible") === "on";
  const isFeatured = formData.get("is_featured") === "on";

  if (!equipmentId) {
    redirect(toAdminError("수정할 장비를 찾을 수 없습니다.", "updateError"));
  }

  if (!name) {
    redirect(toAdminError("장비명을 입력해 주세요.", "updateError"));
  }

  if (!type) {
    redirect(toAdminError("장비 타입을 입력해 주세요.", "updateError"));
  }

  if (!EQUIPMENT_TYPE_VALUES.includes(type as (typeof EQUIPMENT_TYPE_VALUES)[number])) {
    redirect(
      toAdminError(
        `지원하지 않는 장비 타입입니다. (${EQUIPMENT_TYPE_VALUES.join(", ")})`,
        "updateError",
      ),
    );
  }

  if (
    status &&
    !EQUIPMENT_STATUS_VALUES.includes(
      status as (typeof EQUIPMENT_STATUS_VALUES)[number],
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

  if (newImageFiles.some((file) => !file.type.startsWith("image/"))) {
    redirect(toAdminError("이미지 파일만 업로드할 수 있습니다.", "updateError"));
  }

  const { imageUrls: currentImageUrls, errorMessage } =
    await loadEquipmentImageUrls(supabase, equipmentId);
  const shouldSkipOldImageCleanup = Boolean(errorMessage);

  const bucket = process.env.SUPABASE_EQUIPMENT_BUCKET ?? "equipment-images";
  const uploadedUrls: string[] = [];

  for (let index = 0; index < newImageFiles.length; index += 1) {
    const file = newImageFiles[index];
    const safeName = sanitizeFileName(file.name);
    const filePath = `${user.id}/${Date.now()}-${index + 1}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      redirect(toAdminError(`이미지 업로드 실패: ${uploadError.message}`, "updateError"));
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    uploadedUrls.push(data.publicUrl);
  }

  const nextImageUrls = [...keepImageUrls, ...uploadedUrls];

  if (nextImageUrls.length === 0) {
    redirect(
      toAdminError(
        "최소 1장 이상의 이미지를 유지하거나 업로드해 주세요.",
        "updateError",
      ),
    );
  }

  if (!shouldSkipOldImageCleanup) {
    const removedImageUrls = currentImageUrls.filter(
      (url) => !keepImageUrls.includes(url),
    );
    const removePaths = removedImageUrls
      .map((url) => extractStoragePathFromPublicUrl(url, bucket))
      .filter((value): value is string => Boolean(value));

    if (removePaths.length > 0) {
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove(removePaths);
      if (removeError) {
        redirect(toAdminError(`기존 이미지 삭제 실패: ${removeError.message}`, "updateError"));
      }
    }
  }

  const payload: Record<string, unknown> = {
    name,
    type,
    is_visible: isVisible,
    is_featured: isFeatured,
    image_urls: nextImageUrls,
  };

  if (modelCode) payload.model_code = modelCode;
  else payload.model_code = null;
  if (description) payload.description = description;
  else payload.description = null;
  if (status) payload.status = status;

  const error = await runEquipmentUpdateWithImageFallback(
    supabase,
    equipmentId,
    payload,
  );

  if (error) {
    redirect(toAdminError(`수정 실패: ${error.message}`, "updateError"));
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
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(toAdminError("로그인이 만료되었습니다. 다시 로그인해 주세요.", "deleteError"));
  }

  const equipmentId = String(formData.get("equipment_id") ?? "").trim();
  if (!equipmentId) {
    redirect(toAdminError("삭제할 장비를 찾을 수 없습니다.", "deleteError"));
  }

  const { imageUrls: currentImageUrls, errorMessage } =
    await loadEquipmentImageUrls(supabase, equipmentId);
  const shouldSkipStorageImageDelete = Boolean(errorMessage);

  const bucket = process.env.SUPABASE_EQUIPMENT_BUCKET ?? "equipment-images";
  if (!shouldSkipStorageImageDelete) {
    const removePaths = currentImageUrls
      .map((url) => extractStoragePathFromPublicUrl(url, bucket))
      .filter((value): value is string => Boolean(value));

    if (removePaths.length > 0) {
      const { error: removeError } = await supabase.storage
        .from(bucket)
        .remove(removePaths);
      if (removeError) {
        redirect(toAdminError(`이미지 삭제 실패: ${removeError.message}`, "deleteError"));
      }
    }
  }

  const { error: deleteError } = await supabase
    .from("equipment")
    .delete()
    .eq("id", equipmentId);

  if (deleteError) {
    redirect(toAdminError(`삭제 실패: ${deleteError.message}`, "deleteError"));
  }

  revalidatePath("/admin");
  revalidatePath("/equipment");

  redirect("/admin?deleted=1");
}
