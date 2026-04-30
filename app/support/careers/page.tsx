import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Building2, ShieldCheck, UserRound, Wrench } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "인재채용 | 큐품질관리기술",
  description:
    "큐품질관리기술의 인재상, 채용 분야, 지원 안내를 확인하세요.",
};

const roles: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Wrench,
    title: "품질관리 기술 인재",
    description:
      "현장 품질 점검, 시험·검사 기준 관리, 품질 리스크 개선에 관심 있는 인재를 찾습니다.",
  },
  {
    icon: Building2,
    title: "현장 컨설팅 인재",
    description:
      "건설 현장의 문제를 분석하고 고객에게 실행 가능한 품질 개선안을 제안하는 역할입니다.",
  },
  {
    icon: ShieldCheck,
    title: "문서·감사 대응 인재",
    description:
      "품질관리 문서, 대관감사 자료, 프로젝트 기록을 체계적으로 관리하는 역할입니다.",
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

export default function SupportCareersPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/support/careers" />

      <main>
        <header className="relative min-h-[520px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgUO24FinZdvbpQ5eVLHoNl3cwCsL4K0VZ0_WDEsQ9Eg488mFw22koYYE4Kqconat4H7DKdH0W3nfdGmuAOuNLgksRX2Nm16rB44UJSjOsupgppLtIACjauFl9T8mlWGtS_Xqn4jlUl39rV0mfb3GaPFD7L-UIQ4xa2wEU-HrKcMBx9D7JGYZavYFTgBJoICpd9Tb6iLw8NiPmeuSV1JMpvvFcWbiQnkUum3qwnX3IG8y7Sn6rKQK0kku32f7rRFX2oIg5PMS8CTTJ"
              alt="Careers and construction engineering background"
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-35 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.9)_55%,rgba(0,21,42,0.28)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-[1600px] items-center px-5 py-20 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-secondary">
                Customer Center
              </p>
              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                인재채용
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                품질 기술과 현장 실행력을 바탕으로 함께 성장할 인재를 기다립니다.
              </p>
            </div>
          </div>
        </header>

        <section className="bg-[#dfe8f1] py-24">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-4">
              <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                <Icon icon={UserRound} className="size-5" />
              </div>
              <h2 className="text-3xl font-black text-primary">채용 안내</h2>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                현재 공개 채용 공고는 준비 중입니다. 지원 문의 또는 인재 등록은
                문의 양식을 통해 남겨주세요.
              </p>
              <Link
                href="/contact#inquiry"
                className="mt-7 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                지원 문의하기
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </article>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-8">
              {roles.map((role) => (
                <article
                  key={role.title}
                  className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                    <Icon icon={role.icon} className="size-5" />
                  </div>
                  <h3 className="text-xl font-black text-primary">{role.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {role.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
