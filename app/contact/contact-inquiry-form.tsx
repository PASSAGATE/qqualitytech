import { Send } from "lucide-react";
import { createContactInquiryAction } from "./actions";

type ContactInquiryFormProps = {
  error?: string;
  inquiryTypes?: readonly string[];
  redirectPath?: "/contact" | "/support/contact";
  sent?: string;
  submitLabel?: string;
  title?: string;
};

const defaultInquiryTypes = [
  "서비스 문의",
  "장비 구매/임대",
  "상세 견적 요청",
] as const;

export function ContactInquiryForm({
  error,
  inquiryTypes = defaultInquiryTypes,
  redirectPath = "/contact",
  sent,
  submitLabel = "문의 제출하기",
  title = "고객 문의",
}: ContactInquiryFormProps) {
  return (
    <section
      id="inquiry"
      className="scroll-mt-28 rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12"
    >
      <h2 className="mb-6 text-2xl font-black tracking-tight text-primary">
        {title}
      </h2>

      {sent === "1" ? (
        <p className="mb-5 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
          문의가 정상적으로 접수되었습니다. 빠르게 연락드리겠습니다.
        </p>
      ) : null}
      {error ? (
        <p className="mb-5 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
          {error}
        </p>
      ) : null}

      <form action={createContactInquiryAction} className="space-y-8">
        <input type="hidden" name="redirect_path" value={redirectPath} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
              업체명
            </label>
            <input
              type="text"
              name="company_name"
              placeholder="예: (주)큐품질관리기술"
              required
              className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all placeholder:text-outline/50 focus:border-secondary focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
              담당자 성함
            </label>
            <input
              type="text"
              name="customer_name"
              placeholder="홍길동"
              required
              className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
              연락처
            </label>
            <input
              type="tel"
              name="customer_phone"
              placeholder="010-0000-0000"
              required
              className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
              이메일
            </label>
            <input
              type="email"
              name="customer_email"
              placeholder="example@email.com"
              required
              className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
            문의 유형
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {inquiryTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center justify-center gap-2 border border-outline-variant/20 bg-surface-container p-3 transition-colors hover:bg-surface-container-high"
              >
                <input
                  type="radio"
                  name="inquiry_type"
                  value={type}
                  required
                  className="border-outline-variant text-secondary focus:ring-secondary"
                />
                <span className="text-sm font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
            상세 내용
          </label>
          <textarea
            rows={6}
            name="detail"
            placeholder="문의하실 내용을 상세히 적어주시면 더 정확한 상담이 가능합니다."
            required
            className="w-full resize-none border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="h-4 w-4 rounded-sm border-outline-variant text-secondary focus:ring-secondary"
          />
          <span className="text-sm text-on-surface-variant">
            개인정보 수집 및 이용에 동의합니다.
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-secondary py-5 text-lg font-bold text-white transition-all duration-200 hover:opacity-85 active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
            boxShadow: "0 12px 24px rgba(255, 107, 44, 0.35)",
          }}
        >
          {submitLabel}
          <Send aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </button>
      </form>
    </section>
  );
}
