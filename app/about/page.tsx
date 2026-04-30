import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  Box,
  Building2,
  CalendarDays,
  Lightbulb,
  MapPin,
  MessageSquare,
  Phone,
  SearchCheck,
  Shield,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "회사소개 | 큐품질관리기술",
  description:
    "큐품질관리기술의 비전, 핵심 가치, 사업 분야, 주요 연혁과 인증 현황을 소개합니다.",
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
    title: "큐품질관리기술 설립",
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
        <section
          id="greeting"
          className="relative flex min-h-[716px] items-center overflow-hidden scroll-mt-28"
        >
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
                CEO Message
              </span>
              <h1 className="mb-8 text-5xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-7xl">
                기술력과 창의력을 보유한
                <br />
                진취적인 기업, 큐품질관리기술
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                큐품질관리기술을 방문해주신 여러분을 응원하고 진심으로
                환영합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <article className="rounded-sm border-l-4 border-secondary bg-surface-container-lowest p-10 shadow-sm">
              <h2 className="mb-6 text-3xl font-black tracking-tight text-primary">
                인사말
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                <p>
                  큐품질관리기술은 건설공사의 필수적인 시공품질을 중점적으로
                  최고의 건설품질관리 서비스를 제공하는 회사로써 지속적으로
                  계획하고, 실행하며, 평가하고, 개선하고있으며 품질향상을
                  목적으로 하자없는 표준 건축물이 되도록 만들어 보겠습니다.
                </p>
                <p>
                  회사의 기술전문가들의 컨설팅을 통해 유능한 인재를 선별 및
                  교육을 통하여 인재양성과 최상의 품질서비스를 만족 드리며
                  착공부터 준공까지 전반적인 품질관리업무, 서류 및 대관감사로
                  체계적인 품질관리를 보다 꼼꼼하고 디테일하게 품질검사를
                  통하여 경제적 손실을 예방하는 서비스를 제공합니다.
                </p>
                <p>
                  저희 큐품질관리기술은 회사의 경영진들과 임직원들이
                  품질경영시스템 및 전문성을 바탕으로 지속적인 품질솔루션을
                  받고있으며 각 분야의 전문가들을 통하여 품질 컨설팅을 바탕으로
                  주요 업무인 건설 품질 뿐만이 아닌 다른분야의 품질 전문성을
                  키우는 회사로 성장했습니다.
                </p>
                <p>
                  여러분들과 저희 큐품질관리기술과 함께 국내 최고의 품질기술과
                  믿음과 신뢰를 기본으로 유능한 인재양성과 적극적인
                  품질지도관리를 실천하겠습니다.
                </p>
                <p>
                  저희가 가진 모든 노하우와 전문성을 다해서 고객님의 품질관리 및
                  경영에 동참하여 큰 힘을 보태 드리겠습니다.
                </p>
              </div>
            </article>

            <div className="mt-8 rounded-sm bg-primary px-8 py-6 text-right text-white shadow-sm">
              <p className="text-lg font-semibold text-on-primary-container">
                꿈과 목표를 가지고 성장하는 기업
              </p>
              <p className="mt-2 text-2xl font-black tracking-[0.03em]">
                큐품질관리기술 임직원 일동
              </p>
            </div>
          </div>
        </section>

        <section
          id="overview"
          className="bg-surface-container-low py-24 scroll-mt-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-5">
                <h2 className="mb-4 text-3xl font-black tracking-tight text-primary">
                  회사 개요
                </h2>
                <p className="text-xl font-bold leading-relaxed text-primary">
                  큐품질관리기술은 건설 현장의 시공 품질을
                  <br />
                  데이터와 전문성으로 완성하는
                  <br />
                  품질관리 전문 파트너입니다.
                </p>
                <div className="mt-6 h-1.5 w-16 bg-secondary" />
                <p className="mt-6 text-sm leading-relaxed text-on-surface-variant">
                  착공부터 준공까지 전 과정에서 품질관리 업무, 서류 체계화,
                  대관감사 대응, 현장 점검을 통합 지원합니다. 고객의 시간과 비용
                  손실을 줄이고, 하자 없는 표준 시공 품질을 목표로 실행과 개선을
                  반복합니다.
                </p>
              </article>

              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-7">
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <CalendarDays className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        운영 철학
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        계획 · 실행 · 평가 · 개선의 품질 사이클 정착
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <Building2 className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        핵심 서비스
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        건설 품질관리 컨설팅, 품질검사, 문서 및 대관감사 지원
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <Wrench className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        전문 역량
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        기술 전문가 중심의 현장 진단 및 디테일 품질 점검 체계
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <MapPin className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        본사
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        경기도 구리시 갈매동 545, 휴밸나인 9층
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-1 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <Phone className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                        대표 문의
                      </p>
                      <p className="mt-1 text-base font-semibold text-primary">
                        010-6666-5269 / qqstart@naver.com
                      </p>
                    </div>
                  </li>
                </ul>
              </article>
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

        <section
          id="philosophy"
          className="bg-surface py-24 scroll-mt-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold tracking-[-0.06em] text-primary">
                경영 이념
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
                큐품질관리기술은 품질을 단순한 결과가 아닌 과정의 신뢰로
                정의합니다. 모든 프로젝트에서 고객의 시간과 비용을 보호하고,
                현장의 안전과 품질 기준을 높이는 것을 최우선 가치로 삼습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Mission
                </p>
                <h3 className="mt-3 text-2xl font-black text-primary">
                  하자 없는 표준 시공 품질 실현
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                  건설 품질관리의 전 과정을 체계화하여 고객의 경제적 손실을
                  줄이고, 현장 중심의 실질적인 품질 향상을 완성합니다.
                </p>
              </article>

              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Vision
                </p>
                <h3 className="mt-3 text-2xl font-black text-primary">
                  데이터 기반 품질기술 선도 기업
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                  기술 전문성과 실행력을 기반으로 국내 건설 품질관리의 기준을
                  높이고, 신뢰받는 장기 파트너로 성장합니다.
                </p>
              </article>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Core Values
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold text-primary">
                  <li className="rounded-sm bg-surface-container-low px-3 py-2">신뢰</li>
                  <li className="rounded-sm bg-surface-container-low px-3 py-2">전문성</li>
                  <li className="rounded-sm bg-surface-container-low px-3 py-2">책임</li>
                  <li className="rounded-sm bg-surface-container-low px-3 py-2">안전</li>
                  <li className="rounded-sm bg-surface-container-low px-3 py-2">지속개선</li>
                </ul>
              </article>

              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Execution Principles
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-on-surface-variant">
                  <li>PDCA 기반의 계획 · 실행 · 평가 · 개선 사이클 운영</li>
                  <li>착공부터 준공까지 단계별 품질 점검과 리스크 사전 통제</li>
                  <li>문서·대관감사 대응 표준화로 프로젝트 신뢰도 강화</li>
                  <li>투명한 보고와 빠른 피드백으로 고객 의사결정 지원</li>
                </ul>
              </article>
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
                  최고의 정밀도를 자랑하는 큐품질관리기술의 핵심 사업
                  분야입니다.
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

        <section
          id="directions"
          className="bg-surface-container-low py-24 scroll-mt-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-black tracking-tight text-primary">
                <Icon icon={MapPin} className="size-5 text-secondary" />
                오시는 길
              </h2>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="group relative aspect-video w-full overflow-hidden rounded-sm bg-surface-container-highest lg:col-span-8">
                  <iframe
                    title="큐품질관리기술 위치"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.4877855487384!2d127.12421107629939!3d37.63773472004149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb7621349b89f%3A0xe0c929cda93757a8!2z6rK96riw64-EIOq1rOumrOyLnCDqsIjrp6Trj5kgNTQ1!5e0!3m2!1sko!2skr!4v1777271349533!5m2!1sko!2skr"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                  <div className="absolute inset-0 bg-primary/20 transition-all group-hover:bg-transparent" />
                  <div className="absolute bottom-4 left-4 border-l-4 border-secondary bg-white p-4 shadow-lg">
                    <p className="text-sm font-bold text-primary">
                      경기도 구리시 갈매동 545
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      휴밸나인 9층 C동9051호, C동9052호
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 lg:col-span-4">
                  <div className="rounded-sm bg-primary p-8 text-white">
                    <p className="mb-4 text-2xl font-black">
                      전문가가 대기 중입니다
                    </p>
                    <p className="text-sm leading-relaxed text-on-primary-container">
                      현장 상황을 고려한 맞춤형 컨설팅을 제공합니다. 문의 사항을
                      남겨주시면 평균 4시간 이내에 담당 엔지니어가 직접 검토 후
                      회신 드립니다.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    방문 전 연락주시면 담당자가 더 빠르게 안내해 드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
