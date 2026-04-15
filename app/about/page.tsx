import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Box,
  Building2,
  Lightbulb,
  MessageSquare,
  SearchCheck,
  Shield,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "회사소개 | QqualityTech",
  description:
    "QqualityTech의 비전, 핵심 가치, 사업 분야, 주요 연혁과 인증 현황을 소개합니다.",
};

const values: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  iconColor: string;
}> = [
  {
    icon: Wrench,
    title: "Professionalism",
    description:
      "독보적인 기술 전문성과 다년간의 현장 경험으로 완벽한 품질을 보증합니다.",
    accent: "border-secondary",
    iconColor: "text-secondary",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "데이터의 정직함을 최우선 가치로 삼아 고객과의 신뢰를 구축합니다.",
    accent: "border-primary",
    iconColor: "text-primary",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "최첨단 IoT 기술과 AI 분석을 도입하여 검사 프로세스를 혁신합니다.",
    accent: "border-outline",
    iconColor: "text-outline",
  },
];

const journey = [
  {
    year: "2024",
    yearTone: "text-secondary",
    title: "차세대 AI 품질 분석 시스템 런칭",
    description: "스마트 건설 기술 대상을 수상하며 업계 표준으로 자리매김",
  },
  {
    year: "2022",
    yearTone: "text-primary/30",
    title: "연구소 확장 및 국제 인증 획득",
    description: "ISO 9001 및 KOLAS 국제공인시험기관 인정 획득",
  },
  {
    year: "2018",
    yearTone: "text-primary/30",
    title: "QqualityTech 설립",
    description: "건설 엔지니어링 전문 기술 자문 그룹으로 시작",
  },
] as const;

const certifications: Array<{
  icon: LucideIcon;
  title: string;
  subtitle: string;
}> = [
  {
    icon: ShieldCheck,
    title: "ISO 9001",
    subtitle: "품질경영시스템 인증",
  },
  {
    icon: Award,
    title: "KOLAS",
    subtitle: "국제공인시험기관인정",
  },
  {
    icon: Shield,
    title: "Venture Biz",
    subtitle: "혁신성장형 벤처기업",
  },
  {
    icon: Building2,
    title: "Smart Tech",
    subtitle: "스마트 건설 기술 인증",
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

export default function AboutPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/about" />

      <main>
        <section className="relative flex min-h-[716px] items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgUO24FinZdvbpQ5eVLHoNl3cwCsL4K0VZ0_WDEsQ9Eg488mFw22koYYE4Kqconat4H7DKdH0W3nfdGmuAOuNLgksRX2Nm16rB44UJSjOsupgppLtIACjauFl9T8mlWGtS_Xqn4jlUl39rV0mfb3GaPFD7L-UIQ4xa2wEU-HrKcMBx9D7JGYZavYFTgBJoICpd9Tb6iLw8NiPmeuSV1JMpvvFcWbiQnkUum3qwnX3IG8y7Sn6rKQK0kku32f7rRFX2oIg5PMS8CTTJ"
              alt="Modern construction site with scaffolding and cranes"
              fill
              preload
              sizes="100vw"
              className="object-cover grayscale opacity-20"
            />
            <div className="absolute inset-0 bg-[linear-gradient(60deg,var(--color-primary)_8%,rgba(0,21,42,0.95)_48%,rgba(0,21,42,0.18)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="mb-4 block text-sm font-bold uppercase tracking-[0.28em] text-secondary">
                Innovation in Engineering
              </span>
              <h1 className="mb-8 text-5xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-7xl">
                신뢰와 기술로
                <br />
                미래를 짓습니다
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                QqualityTech은 정밀한 시험장비와 고도화된 품질 관리 시스템을
                통해 건설 현장의 안전과 가치를 혁신하는 엔지니어링 파트너입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-32">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="mb-6 text-4xl font-extrabold tracking-[-0.07em] text-primary">
                  Our Vision
                </h2>
                <p className="text-lg leading-relaxed text-on-surface-variant">
                  우리는 단순한 검사를 넘어, 데이터에 기반한 의사결정을
                  지원함으로써 건설 산업의 새로운 표준을 제시하고자 합니다.
                  기술적 전문성을 바탕으로 안전한 사회를 만드는 것이 우리의
                  소명입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:col-span-8">
                {values.map((value) => (
                  <article
                    key={value.title}
                    className={`border-l-4 bg-surface-container-lowest p-10 shadow-sm ${value.accent}`}
                  >
                    <Icon
                      icon={value.icon}
                      className={`mb-6 size-10 ${value.iconColor}`}
                    />
                    <h3 className="mb-4 text-xl font-bold text-primary">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      {value.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-32">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-4 text-4xl font-extrabold tracking-[-0.07em] text-primary">
                  Business Areas
                </h2>
                <p className="text-lg text-on-surface-variant">
                  최고의 정밀도를 자랑하는 QqualityTech의 핵심 사업 분야입니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr md:min-h-[600px]">
              <article className="group relative overflow-hidden bg-primary-container p-12 md:col-span-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQC15VmPqlflBaK4hMkNqiBeC6eNKJ0SBK5WqZxnkPLo5nhg7z-BJQ9o6p91d-uYUjtqdBBstVsltUQFoDYZanTpZNUD6wNowW7ZCoVfX1OJwhAUnX8VYzDJlxktrAKOdFBwgq39IEKTObbn9AQkTn8Y_nM7bkXpaGV43MA6bDRG6UHMIGbnvotbzmkrCORkXkeo6VBXrKMn42mVL1zPWSxphgZ-4adI49-fMJ8zGLnSX1rn0Z5f6fFI4qnACEbq7F0yZVYm1d1NXN"
                  alt="Precision industrial sensor measuring a steel beam"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <Icon
                    icon={SearchCheck}
                    className="mb-8 size-12 text-secondary"
                  />
                  <h3 className="mb-4 text-3xl font-bold text-white">
                    Quality Control
                  </h3>
                  <p className="max-w-md text-on-primary-container">
                    건축물 및 토목 구조물의 정밀 안전 진단과 실시간 품질
                    모니터링 서비스를 제공합니다. 철저한 분석을 통해 잠재적
                    위험을 사전에 방지합니다.
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 font-bold text-white"
                    >
                      더 알아보기
                      <Icon
                        icon={ArrowRight}
                        className="size-5 transition-transform group-hover:translate-x-2"
                      />
                    </Link>
                  </div>
                </div>
              </article>

              <div className="grid grid-rows-2 gap-4">
                <article className="flex flex-col justify-between bg-secondary p-10">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-white">
                      Equipment Supply
                    </h3>
                    <p className="text-sm text-white/80">
                      글로벌 규격을 준수하는 최첨단 시험 장비 및 측정 기기 공급
                    </p>
                  </div>
                  <Icon icon={Box} className="size-12 self-end text-white" />
                </article>

                <article className="flex flex-col justify-between bg-white p-10">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-primary">
                      Engineering Support
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      현장별 맞춤형 기술 컨설팅 및 전문 엔지니어 교육 서비스
                    </p>
                  </div>
                  <Icon
                    icon={MessageSquare}
                    className="size-12 self-end text-primary"
                  />
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-32">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
              <section>
                <h2 className="mb-12 text-3xl font-extrabold tracking-[-0.06em] text-primary">
                  Our Journey
                </h2>
                <div className="space-y-12">
                  {journey.map((item) => (
                    <article key={item.year} className="flex gap-8">
                      <div
                        className={`shrink-0 pt-1 text-2xl font-black ${item.yearTone}`}
                      >
                        {item.year}
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-bold text-primary">
                          {item.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="certifications"
                className="bg-surface-container p-12"
              >
                <h2 className="mb-8 text-3xl font-extrabold tracking-[-0.06em] text-primary">
                  Certifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((item) => (
                    <article
                      key={item.title}
                      className="flex flex-col items-center bg-white p-6 text-center"
                    >
                      <div className="mb-4 flex h-16 w-16 items-center justify-center bg-surface-container-low">
                        <Icon
                          icon={item.icon}
                          className="size-8 text-secondary"
                        />
                      </div>
                      <span className="text-xs font-bold text-primary">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {item.subtitle}
                      </span>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
