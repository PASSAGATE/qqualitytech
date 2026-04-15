"use server";

import { redirect } from "next/navigation";
import { sendInquiryEmail } from "@/lib/email/send-inquiry-email";

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

  try {
    await sendInquiryEmail({
      subject: `[장비 견적 문의] ${equipmentTitle || equipmentSlug}`,
      html: `
        <h2>장비 견적 문의가 접수되었습니다.</h2>
        <p><strong>장비:</strong> ${equipmentTitle || "-"}</p>
        <p><strong>슬러그:</strong> ${equipmentSlug}</p>
        <p><strong>고객명:</strong> ${customerName}</p>
        <p><strong>연락처:</strong> ${customerPhone}</p>
        <p><strong>문의 내용:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${message}</pre>
      `,
      text: [
        "장비 견적 문의가 접수되었습니다.",
        `장비: ${equipmentTitle || "-"}`,
        `슬러그: ${equipmentSlug}`,
        `고객명: ${customerName}`,
        `연락처: ${customerPhone}`,
        "문의 내용:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    const messageText =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류로 이메일 전송에 실패했습니다.";
    redirect(buildErrorRedirect(equipmentSlug, messageText));
  }

  redirect(buildSuccessRedirect(equipmentSlug));
}
