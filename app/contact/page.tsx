import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Mail, Phone, Send } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { createContactInquiryAction } from "./actions";

export const metadata: Metadata = {
  title: "문의 및 견적 | 큐품질관리기술",
  description:
    "큐품질관리기술의 문의 및 견적 페이지에서 서비스 상담, 장비 구매 및 임대, 상세 견적 요청을 남겨보세요.",
};

const inquiryTypes = [
  "서비스 문의",
  "장비 구매/임대",
  "상세 견적 요청",
] as const;

const contactCards: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  tone: string;
  iconClassName: string;
}> = [
  {
    icon: Phone,
    label: "Direct Call",
    value: "010-6666-5269",
    tone: "bg-primary text-white group-hover:bg-secondary",
    iconClassName: "text-white",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "qqstart@naver.com",
    tone: "bg-primary text-white group-hover:bg-secondary",
    iconClassName: "text-white",
  },
];

function Icon({
  icon: IconComponent,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <IconComponent aria-hidden="true" className={className} strokeWidth={1.8} />
  );
}

type ContactPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { sent, error } = await searchParams;

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/contact" />

      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <section className="mb-20 text-center md:text-left">
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-[-0.02em] text-primary md:text-6xl">
            귀하의 프로젝트를 위한
            <br />
            <span className="text-secondary">정밀한 기술 솔루션</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            큐품질관리기술는 산업 현장의 안전과 정밀함을 최우선으로 생각합니다.
            전문가의 도움이 필요하신가요? 지금 문의해 주세요. 24시간 이내에
            최적의 견적과 솔루션을 제안해 드립니다.
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactCards.map((card) => (
            <article
              key={card.label}
              className="group flex items-center gap-6 bg-surface-container-low p-6 transition-all"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-sm transition-colors ${card.tone}`}
              >
                <Icon
                  icon={card.icon}
                  className={`size-6 ${card.iconClassName}`}
                />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  {card.label}
                </p>
                <p className="text-xl font-black text-primary">{card.value}</p>
              </div>
            </article>
          ))}
        </section>

        <section
          id="inquiry"
          className="scroll-mt-28 rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12"
        >
          <h2 className="mb-6 text-2xl font-black tracking-tight text-primary">
            고객 문의
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
              className="inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary py-5 text-lg font-bold text-white transition-all hover:bg-primary-container"
            >
              문의 제출하기
              <Icon icon={Send} className="size-5" />
            </button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
