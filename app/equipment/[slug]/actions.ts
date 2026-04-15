"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function buildErrorRedirect(slug: string, message: string) {
  return `/equipment/${slug}?inquiryError=${encodeURIComponent(message)}`;
}

function buildSuccessRedirect(slug: string) {
  return `/equipment/${slug}?inquirySuccess=1`;
}

export async function createEquipmentInquiryAction(formData: FormData) {
  const equipmentSlug = String(formData.get("equipment_slug") ?? "").trim();
  const equipmentTitle = String(formData.get("equipment_title") ?? "").trim();
  const customerName = String(formData.get("customer_name") ?? "").trim();
  const customerPhone = String(formData.get("customer_phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!equipmentSlug) {
    redirect("/equipment");
  }

  if (!customerName || !customerPhone || !message) {
    redirect(
      buildErrorRedirect(equipmentSlug, "필수 항목을 모두 입력해 주세요."),
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      buildErrorRedirect(
        equipmentSlug,
        "서버 설정 오류로 문의를 저장하지 못했습니다.",
      ),
    );
  }

  const { error } = await supabase.from("equipment_inquiries").insert({
    equipment_slug: equipmentSlug,
    equipment_title: equipmentTitle || null,
    customer_name: customerName,
    customer_phone: customerPhone,
    message,
  });

  if (error) {
    redirect(
      buildErrorRedirect(
        equipmentSlug,
        `문의 저장 실패: ${error.message}`,
      ),
    );
  }

  revalidatePath(`/equipment/${equipmentSlug}`);
  redirect(buildSuccessRedirect(equipmentSlug));
}
