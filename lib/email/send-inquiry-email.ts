type InquiryEmailPayload = {
  subject: string;
  html: string;
  text: string;
};

function getRequiredEnv(name: string): string | null {
  const value = process.env[name];
  if (!value || !value.trim()) {
    return null;
  }
  return value.trim();
}

export async function sendInquiryEmail(payload: InquiryEmailPayload) {
  const apiKey = getRequiredEnv("RESEND_API_KEY");
  const toEmail = getRequiredEnv("INQUIRY_TO_EMAIL");
  const fromEmail =
    getRequiredEnv("INQUIRY_FROM_EMAIL") ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    throw new Error(
      "이메일 환경 설정이 없습니다. RESEND_API_KEY, INQUIRY_TO_EMAIL을 확인해 주세요.",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const raw = await response.text();
    throw new Error(`이메일 전송 실패 (${response.status}): ${raw}`);
  }
}
