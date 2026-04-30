import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarDays,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "회사소개 | 큐품질관리기술",
  description:
    "큐품질관리기술의 비전, 핵심 가치, 사업 분야, 주요 연혁과 인증 현황을 소개합니다.",
};

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

        <section id="certifications" className="scroll-mt-28" />

        <section
          id="organization"
          className="bg-surface py-24 scroll-mt-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold tracking-[-0.06em] text-primary">
                조직도
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-on-surface-variant">
                전문 부서 간 협업 구조를 기반으로, 현장 품질관리부터 기술지원,
                문서·감사 대응까지 빠르고 체계적으로 운영합니다.
              </p>
            </div>

            <div className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm md:p-10">
              <div className="mx-auto flex max-w-5xl flex-col items-center">
                <div className="rounded-sm bg-[linear-gradient(135deg,#102a43_0%,#00152a_100%)] px-10 py-5 text-center text-white shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-primary-container">
                    Executive
                  </p>
                  <p className="mt-1 text-2xl font-black">대표이사</p>
                </div>

                <div className="h-10 w-px bg-outline-variant/50" />

                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                  <article className="rounded-sm border border-[#d4e5f7] bg-[#f3f8ff] p-6 shadow-sm">
                    <p className="text-base font-black text-primary">품질기술본부</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                      Quality Tech
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                      <li>현장 품질 점검 및 검사 기준 운영</li>
                      <li>품질 리스크 사전 진단 및 개선</li>
                    </ul>
                  </article>
                  <article className="rounded-sm border border-[#ffe0c6] bg-[#fff7ee] p-6 shadow-sm">
                    <p className="text-base font-black text-primary">컨설팅본부</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                      Consulting
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                      <li>시공 품질 컨설팅 및 개선안 도출</li>
                      <li>프로젝트별 맞춤 품질 전략 수립</li>
                    </ul>
                  </article>
                  <article className="rounded-sm border border-[#d8eadf] bg-[#f2fbf5] p-6 shadow-sm">
                    <p className="text-base font-black text-primary">경영지원본부</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                      Operations
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                      <li>문서 체계화 및 대관감사 대응</li>
                      <li>고객 커뮤니케이션 및 운영 지원</li>
                    </ul>
                  </article>
                </div>

                <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <article className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-4 text-center">
                    <p className="text-xs font-bold text-primary">품질검사팀</p>
                  </article>
                  <article className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-4 text-center">
                    <p className="text-xs font-bold text-primary">시험·분석팀</p>
                  </article>
                  <article className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-4 text-center">
                    <p className="text-xs font-bold text-primary">프로젝트 PM팀</p>
                  </article>
                  <article className="rounded-sm border border-outline-variant/20 bg-surface-container-low p-4 text-center">
                    <p className="text-xs font-bold text-primary">고객지원팀</p>
                  </article>
                </div>
              </div>

              <div className="mt-8 rounded-sm border border-outline-variant/20 bg-white p-5">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                  문의 라우팅
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-sm bg-surface-container-low px-4 py-3">
                    <p className="text-xs font-bold text-on-surface-variant">품질 점검·검사</p>
                    <p className="mt-1 text-sm font-semibold text-primary">품질기술본부</p>
                  </div>
                  <div className="rounded-sm bg-surface-container-low px-4 py-3">
                    <p className="text-xs font-bold text-on-surface-variant">시공 개선·자문</p>
                    <p className="mt-1 text-sm font-semibold text-primary">컨설팅본부</p>
                  </div>
                  <div className="rounded-sm bg-surface-container-low px-4 py-3">
                    <p className="text-xs font-bold text-on-surface-variant">문서·대관감사</p>
                    <p className="mt-1 text-sm font-semibold text-primary">경영지원본부</p>
                  </div>
                  <div className="rounded-sm bg-surface-container-low px-4 py-3">
                    <p className="text-xs font-bold text-on-surface-variant">A/S 및 일반 문의</p>
                    <p className="mt-1 text-sm font-semibold text-primary">고객지원팀</p>
                  </div>
                </div>
              </div>
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
