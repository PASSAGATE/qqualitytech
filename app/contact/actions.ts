"use server";

import { redirect } from "next/navigation";
import { sendInquiryEmail } from "@/lib/email/send-inquiry-email";

function buildContactErrorRedirect(message: string) {
  return `/contact?error=${encodeURIComponent(message)}`;
}

export async function createContactInquiryAction(formData: FormData) {
  const companyName = String(formData.get("company_name") ?? "").trim();
  const customerName = String(formData.get("customer_name") ?? "").trim();
  const customerPhone = String(formData.get("customer_phone") ?? "").trim();
  const customerEmail = String(formData.get("customer_email") ?? "").trim();
  const inquiryType = String(formData.get("inquiry_type") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();
  const consentChecked = formData.get("consent") === "on";

  if (
    !companyName ||
    !customerName ||
    !customerPhone ||
    !customerEmail ||
    !inquiryType ||
    !detail
  ) {
    redirect(buildContactErrorRedirect("필수 항목을 모두 입력해 주세요."));
  }

  if (!consentChecked) {
    redirect(
      buildContactErrorRedirect("개인정보 수집 및 이용 동의가 필요합니다."),
    );
  }

  try {
    await sendInquiryEmail({
      subject: `[홈페이지 문의] ${inquiryType} - ${companyName}`,
      html: `
        <h2>홈페이지 문의가 접수되었습니다.</h2>
        <p><strong>문의 유형:</strong> ${inquiryType}</p>
        <p><strong>업체명:</strong> ${companyName}</p>
        <p><strong>담당자:</strong> ${customerName}</p>
        <p><strong>연락처:</strong> ${customerPhone}</p>
        <p><strong>이메일:</strong> ${customerEmail}</p>
        <p><strong>문의 내용:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${detail}</pre>
      `,
      text: [
        "홈페이지 문의가 접수되었습니다.",
        `문의 유형: ${inquiryType}`,
        `업체명: ${companyName}`,
        `담당자: ${customerName}`,
        `연락처: ${customerPhone}`,
        `이메일: ${customerEmail}`,
        "문의 내용:",
        detail,
      ].join("\n"),
    });
  } catch (error) {
    const messageText =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류로 이메일 전송에 실패했습니다.";
    redirect(buildContactErrorRedirect(messageText));
  }

  redirect("/contact?sent=1");
}
