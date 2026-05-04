import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Mail, Phone } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { ContactInquiryForm } from "./contact-inquiry-form";

export const metadata: Metadata = {
  title: "문의 및 견적 | 큐품질관리기술",
  description:
    "큐품질관리기술의 문의 및 견적 페이지에서 서비스 상담, 장비 구매 및 임대, 상세 견적 요청을 남겨보세요.",
};

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

      <main>
        <header className="relative flex min-h-[420px] items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.92)_56%,rgba(0,21,42,0.24)_100%)]" />
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-secondary" />
              <span className="text-sm font-bold uppercase tracking-[0.28em] text-secondary">
                Contact
              </span>
            </div>
            <h1 className="mb-5 text-5xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-6xl">
              귀하의 프로젝트를 위한
              <br />
              정밀한 기술 솔루션
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-on-primary-container">
              전문가의 도움이 필요하신가요? 지금 문의해 주세요.
              24시간 이내에 최적의 견적과 솔루션을 제안해 드립니다.
            </p>
          </div>
        </header>

        <section className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          </div>

          <ContactInquiryForm error={error} sent={sent} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
