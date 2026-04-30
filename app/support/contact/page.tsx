import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Mail, Phone, Wrench } from "lucide-react";
import { ContactInquiryForm } from "../../contact/contact-inquiry-form";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "A/S문의 | 큐품질관리기술",
  description:
    "큐품질관리기술의 시험장비 A/S 문의, 점검 요청, 사용 상담을 접수하는 페이지입니다.",
};

const inquiryTypes = ["A/S 문의", "장비 점검 요청", "사용 상담"] as const;

const contactCards: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
}> = [
  {
    icon: Phone,
    label: "A/S Direct Call",
    value: "010-6666-5269",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "qqstart@naver.com",
  },
  {
    icon: Wrench,
    label: "Service Scope",
    value: "점검 · 수리 · 사용 상담",
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

type SupportContactPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function SupportContactPage({
  searchParams,
}: SupportContactPageProps) {
  const { sent, error } = await searchParams;

  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/support/contact" />

      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <section className="mb-20 text-center md:text-left">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-secondary">
            Customer Center
          </p>
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-[-0.02em] text-primary md:text-6xl">
            A/S문의
            <br />
            <span className="text-secondary">빠른 점검과 상담 접수</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            시험장비 고장 증상, 점검 요청, 사용 중 문의사항을 남겨주시면
            담당자가 확인 후 신속하게 안내드립니다.
          </p>
        </section>

        <section className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.label}
              className="group flex items-center gap-6 bg-surface-container-low p-6 transition-all"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-primary text-white transition-colors group-hover:bg-secondary">
                <Icon icon={card.icon} className="size-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  {card.label}
                </p>
                <p className="text-lg font-black text-primary">{card.value}</p>
              </div>
            </article>
          ))}
        </section>

        <ContactInquiryForm
          error={error}
          inquiryTypes={inquiryTypes}
          redirectPath="/support/contact"
          sent={sent}
          submitLabel="A/S 문의 제출하기"
          title="A/S 문의 접수"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
