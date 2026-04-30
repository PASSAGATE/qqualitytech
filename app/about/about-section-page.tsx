import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Building2, Handshake, Lightbulb, MapPin, ShieldCheck } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export type AboutSectionSlug =
  | "greeting"
  | "overview"
  | "philosophy"
  | "organization"
  | "directions";

type AboutSection = {
  slug: AboutSectionSlug;
  href: `/about/${AboutSectionSlug}`;
  title: string;
  description: string;
};

export const aboutSections = {
  greeting: {
    slug: "greeting",
    href: "/about/greeting",
    title: "인사말 | 큐품질관리기술",
    description:
      "큐품질관리기술의 인사말과 품질관리 서비스에 대한 약속을 소개합니다.",
  },
  overview: {
    slug: "overview",
    href: "/about/overview",
    title: "회사 개요 | 큐품질관리기술",
    description:
      "큐품질관리기술의 회사 개요, 운영 철학, 핵심 서비스와 본사 정보를 소개합니다.",
  },
  philosophy: {
    slug: "philosophy",
    href: "/about/philosophy",
    title: "경영 이념 | 큐품질관리기술",
    description:
      "큐품질관리기술의 미션, 비전, 핵심 가치와 실행 원칙을 소개합니다.",
  },
  organization: {
    slug: "organization",
    href: "/about/organization",
    title: "조직도 | 큐품질관리기술",
    description:
      "큐품질관리기술의 조직 구조와 문의 라우팅 체계를 소개합니다.",
  },
  directions: {
    slug: "directions",
    href: "/about/directions",
    title: "오시는 길 | 큐품질관리기술",
    description:
      "큐품질관리기술 본사 위치와 방문 안내 정보를 소개합니다.",
  },
} satisfies Record<AboutSectionSlug, AboutSection>;

export function getAboutSectionMetadata(section: AboutSectionSlug): Metadata {
  const { title, description } = aboutSections[section];

  return {
    title,
    description,
  };
}

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

function GreetingSection() {
  return (
    <>
      <section
        id="greeting"
        className="relative flex min-h-[716px] items-center overflow-hidden scroll-mt-28 bg-primary"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgUO24FinZdvbpQ5eVLHoNl3cwCsL4K0VZ0_WDEsQ9Eg488mFw22koYYE4Kqconat4H7DKdH0W3nfdGmuAOuNLgksRX2Nm16rB44UJSjOsupgppLtIACjauFl9T8mlWGtS_Xqn4jlUl39rV0mfb3GaPFD7L-UIQ4xa2wEU-HrKcMBx9D7JGYZavYFTgBJoICpd9Tb6iLw8NiPmeuSV1JMpvvFcWbiQnkUum3qwnX3IG8y7Sn6rKQK0kku32f7rRFX2oIg5PMS8CTTJ"
            alt="Modern construction site with scaffolding and cranes"
            fill
            preload
            sizes="100vw"
            className="object-cover grayscale opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.92)_56%,rgba(0,21,42,0.24)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-5xl">
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.28em] text-secondary">
              CEO Message
            </span>
            <h1 className="mb-8 text-5xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-7xl">
              품질은 타협의 대상이 아니라,
              <br />
              반드시 지켜야 할 기준입니다.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
              현장은 속도로 움직이지만, 결과는 기준으로 완성됩니다. 큐품질관리기술은
              시험, 검증, 문서, 대응, 관리 전 과정을 체계적으로 운영합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/20 bg-surface py-24">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <aside className="rounded-sm bg-primary p-8 text-white shadow-sm lg:col-span-4 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
                Greeting
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight">
                안녕하십니까.
                <br />
                큐품질관리기술 대표이사입니다.
              </h2>
              <div className="mt-8 h-1.5 w-16 bg-secondary" />
              <p className="mt-8 text-sm leading-relaxed text-on-primary-container">
                쉬운 길보다 옳은 길을 선택하겠습니다. 형식보다 본질을 보겠습니다.
                말보다 결과로 증명하겠습니다.
              </p>
            </aside>

            <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-8 lg:p-12">
              <div className="space-y-6 text-base leading-[1.9] text-on-surface-variant">
                <p>
                  현장은 속도로 움직이지만, 결과는 기준으로 완성됩니다. 일정은
                  앞당길 수 있어도 품질은 건너뛸 수 없습니다. 보이지 않는 작은
                  오차 하나가 큰 손실이 되고, 느슨한 관리 하나가 기업의 신뢰를
                  무너뜨립니다.
                </p>
                <p>
                  큐품질관리기술은 이러한 현실을 누구보다 잘 알고 있습니다.
                  그래서 우리는 단순한 검사 업무에 머물지 않습니다. 시험, 검증,
                  문서, 대응, 관리 전 과정을 체계적으로 운영하며 고객의
                  시간·비용·리스크를 함께 책임집니다.
                </p>
                <p className="border-l-4 border-secondary bg-white px-6 py-5 text-xl font-black leading-relaxed text-primary shadow-sm">
                  저희가 지키는 것은 단순한 규정이 아닙니다.
                  <br />
                  고객의 사업 일정이며, 현장의 안전이며, 기업의 신뢰입니다.
                </p>
                <p>
                  큐품질관리기술은 앞으로도 높은 기준과 강한 책임감으로 고객이
                  가장 먼저 찾는 품질관리 전문기업이 되겠습니다.
                </p>
                <p>감사합니다.</p>
              </div>
            </article>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                label: "기준",
                text: "품질은 결과가 아니라 처음부터 지켜야 할 기준입니다.",
              },
              {
                label: "책임",
                text: "고객의 시간, 비용, 리스크를 함께 책임지는 관리 체계를 만듭니다.",
              },
              {
                label: "결과",
                text: "형식보다 본질을 보고, 말보다 결과로 증명합니다.",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-black text-secondary">{item.label}</p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-primary">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-outline-variant/15 bg-white p-8 text-right shadow-sm">
            <p className="text-sm font-semibold text-on-surface-variant">
              큐품질관리기술 대표이사
            </p>
            <div className="mt-3 flex flex-col items-end gap-2 sm:flex-row sm:items-end sm:justify-end">
              <p className="text-3xl font-black tracking-[0.08em] text-primary">
                이민희
              </p>
              <p className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-bold text-on-surface-variant">
                사인
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OverviewSection() {
  const proofPoints = [
    {
      description: "현장 조건과 기준을 명확히 해석하여 흔들리지 않는 판단 기준을 세웁니다.",
      label: "정확한 기준",
    },
    {
      description: "시험·검사·문서·현장관리 전 과정을 체계적으로 수행합니다.",
      label: "철저한 검증",
    },
    {
      description: "고객이 안심하고 선택할 수 있도록 데이터와 책임 있는 대응으로 증명합니다.",
      label: "확실한 신뢰",
    },
  ] as const;

  return (
    <section id="overview" className="bg-surface py-24 scroll-mt-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="rounded-sm bg-primary p-8 text-white shadow-sm lg:col-span-5 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              Company Overview
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              큐품질관리기술은
              <br />
              품질을 관리하는 회사가 아닙니다.
              <br />
              결과를 증명하는 회사입니다.
            </h1>
            <div className="mt-8 h-1.5 w-16 bg-secondary" />
            <p className="mt-8 text-sm leading-relaxed text-on-primary-container md:text-base">
              정확한 기준, 철저한 검증, 확실한 신뢰. 축적된 기술력과 실무 경험을
              바탕으로 고객의 프로젝트 성공을 지원합니다.
            </p>
          </article>

          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-7 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Quality Proven By Process
            </p>
            <div className="mt-6 space-y-5 text-base leading-[1.9] text-on-surface-variant">
              <p>
                큐품질관리기술은 건설·산업 현장의 품질관리 전문기업으로서,
                축적된 기술력과 실무 경험을 바탕으로 고객의 프로젝트 성공을
                지원합니다.
              </p>
              <p>
                품질은 결과가 아니라 과정에서 결정됩니다. 당사는
                시험·검사·품질문서·현장관리 전 과정을 체계적으로 수행하여
                공정 리스크를 최소화하고, 안전성과 신뢰성을 높이는 솔루션을
                제공합니다.
              </p>
              <p>
                빠르게 변하는 산업 환경 속에서도 원칙은 변하지 않습니다.
                큐품질관리기술은 정확한 데이터, 엄격한 기준, 책임 있는 대응으로
                고객이 안심하고 선택할 수 있는 파트너가 되겠습니다.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article
              key={point.label}
              className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-colors hover:border-secondary/50"
            >
              <p className="text-xl font-black text-primary">{point.label}</p>
              <div className="mt-4 h-1 w-12 bg-secondary" />
              <p className="mt-4 text-sm font-medium leading-relaxed text-on-surface-variant">
                {point.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
              Main Office
            </p>
            <p className="mt-2 text-lg font-black text-primary">
              경기도 구리시 갈매동 545, 휴밸나인 9층
            </p>
          </article>
          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
              Contact
            </p>
            <p className="mt-2 text-lg font-black text-primary">
              010-6666-5269 / qqstart@naver.com
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const values = [
    {
      description: "원칙은 상황에 따라 바뀌지 않습니다.",
      label: "Integrity",
      number: "01",
    },
    {
      description: "작은 오차도 놓치지 않는 정확함.",
      label: "Precision",
      number: "02",
    },
    {
      description: "끝까지 책임지는 실행력.",
      label: "Responsibility",
      number: "03",
    },
    {
      description: "한 번의 거래보다 오래가는 신뢰.",
      label: "Trust",
      number: "04",
    },
    {
      description: "오늘의 성과보다 지속 가능한 성장.",
      label: "Growth",
      number: "05",
    },
  ] as const;

  return (
    <section
      id="philosophy"
      className="border-y border-outline-variant/20 bg-surface py-24 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="rounded-sm bg-primary p-8 text-white shadow-sm lg:col-span-5 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              Management Philosophy
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
              기준은 높게,
              <br />
              실행은 정확하게,
              <br />
              신뢰는 오래가게.
            </h1>
            <p className="mt-8 text-sm leading-relaxed text-on-primary-container md:text-base">
              큐품질관리기술은 품질관리의 본질이 단순한 점검이 아니라 고객의
              시간, 비용, 안전, 신뢰를 지키는 일이라고 믿습니다.
            </p>
          </article>

          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-7 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
              Philosophy Statement
            </p>
            <div className="mt-6 space-y-5 text-base leading-[1.9] text-on-surface-variant">
              <p>
                우리는 원칙을 지키기 위해 타협하지 않으며, 결과로 증명하기 위해
                책임 있게 행동합니다.
              </p>
              <p>
                정확한 기준과 체계적인 실행으로 고객에게는 신뢰를, 현장에는
                안정성을, 조직에는 지속 성장을 만들어갑니다.
              </p>
            </div>
            <div className="mt-8 border-l-4 border-secondary bg-white px-6 py-5 shadow-sm">
              <p className="text-xl font-black leading-relaxed text-primary">
                품질관리의 본질은 고객의 시간, 비용, 안전, 신뢰를 지키는
                일입니다.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {values.map((value) => (
            <article
              key={value.number}
              className="group rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-colors hover:border-secondary/50"
            >
              <p className="text-xs font-black tracking-[0.2em] text-secondary">
                {value.number}
              </p>
              <h2 className="mt-5 text-2xl font-black text-primary">
                {value.label}
              </h2>
              <div className="mt-5 h-1 w-10 bg-secondary transition-all group-hover:w-16" />
              <p className="mt-5 text-sm font-semibold leading-relaxed text-on-surface-variant">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationSection() {
  const departments = [
    {
      borderClassName: "border-[#123f7b]",
      colorClassName: "text-[#123f7b]",
      duties: [
        "시장 분석 및 영업 전략 수립",
        "고객 관리 및 파트너십 구축",
        "사업 기획 및 성과 관리",
      ],
      headerClassName: "bg-[#123f7b]",
      icon: Handshake,
      teams: ["마케팅 부서", "관리부서"],
      title: "영업지원부서",
      subtitle: "Business Support",
    },
    {
      borderClassName: "border-[#ff6b1a]",
      colorClassName: "text-[#ff6b1a]",
      duties: [
        "시험·검사 기술 개발 및 관리",
        "품질 시스템 운영 및 기술 지원",
        "데이터 분석 및 품질 혁신",
      ],
      headerClassName: "bg-[#ff6b1a]",
      icon: Lightbulb,
      teams: ["기술지원", "CSI 기술관리"],
      title: "기술지원부서",
      subtitle: "Technical Solution",
    },
    {
      borderClassName: "border-[#5d8f3d]",
      colorClassName: "text-[#5d8f3d]",
      duties: [
        "현장 품질관리 및 검사 수행",
        "공정 점검 및 문제 개선 지원",
        "안전 및 품질 준수 관리",
      ],
      headerClassName: "bg-[#5d8f3d]",
      icon: Building2,
      teams: ["현장 컨설팅", "현장 시험"],
      title: "현장관리부서",
      subtitle: "Field Management",
    },
  ] as const;

  return (
    <section id="organization" className="bg-surface py-24 scroll-mt-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">
            Organization
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-primary md:text-5xl">
            조직도
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant">
            전문 부서 간 협업 구조를 기반으로, 현장 품질관리부터 기술지원,
            문서·감사 대응까지 빠르고 체계적으로 운영합니다.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-outline-variant/15 bg-white px-5 py-10 shadow-sm md:px-10 lg:px-14">
          <div className="relative mx-auto max-w-7xl">
            <div className="relative z-10 mx-auto max-w-[470px] rounded-xl bg-[radial-gradient(circle_at_30%_20%,#143a63_0%,#00152a_62%)] px-8 py-7 text-center text-white shadow-[0_18px_40px_rgba(0,21,42,0.24)]">
              <p className="text-sm font-black uppercase tracking-[0.32em] text-white/70">
                Executive
              </p>
              <p className="mt-3 text-4xl font-black tracking-[-0.04em]">
                대표이사
              </p>
              <div className="mx-auto mt-5 h-px w-4/5 bg-white/55" />
              <p className="mt-5 text-base font-bold text-white md:text-lg">
                전략 수립 · 의사 결정 · 경영 총괄
              </p>
            </div>

            <div className="relative hidden h-24 lg:block">
              <div className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-[#bfc8d5]" />
              <div className="absolute left-[14.3%] right-[14.3%] top-10 h-px bg-[#bfc8d5]" />
              <div className="absolute left-[14.3%] top-10 h-14 w-px bg-[#bfc8d5]" />
              <div className="absolute left-1/2 top-10 h-14 w-px -translate-x-1/2 bg-[#bfc8d5]" />
              <div className="absolute right-[14.3%] top-10 h-14 w-px bg-[#bfc8d5]" />
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {departments.map((department) => (
                <div key={department.title} className="flex h-full flex-col">
                  <article
                    className={`relative flex-1 rounded-xl border bg-white pt-14 shadow-[0_14px_34px_rgba(15,23,42,0.08)] ${department.borderClassName}`}
                  >
                    <div
                      className={`absolute left-0 right-0 top-0 h-6 rounded-t-[11px] ${department.headerClassName}`}
                    />
                    <div
                      className={`absolute left-1/2 top-[-34px] flex h-[86px] w-[86px] -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white shadow-md ${department.borderClassName} ${department.colorClassName}`}
                    >
                      <Icon icon={department.icon} className="size-10" />
                    </div>

                    <div className="px-6 pb-7 text-center md:px-8">
                      <h2
                        className={`text-3xl font-black tracking-[-0.04em] ${department.colorClassName}`}
                      >
                        {department.title}
                      </h2>
                      <p className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-slate-400">
                        {department.subtitle}
                      </p>
                      <div
                        className={`mx-auto mt-5 h-px w-4/5 ${department.headerClassName}`}
                      />
                      <ul className="mt-6 space-y-2 text-base font-semibold leading-relaxed text-primary">
                        {department.duties.map((duty) => (
                          <li key={duty}>{duty}</li>
                        ))}
                      </ul>
                    </div>
                  </article>

                  <div className="relative hidden h-16 lg:block">
                    <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#cbd2dd]" />
                    <div className="absolute left-1/4 right-1/4 top-8 h-px bg-[#cbd2dd]" />
                    <div className="absolute left-1/4 top-8 h-8 w-px bg-[#cbd2dd]" />
                    <div className="absolute right-1/4 top-8 h-8 w-px bg-[#cbd2dd]" />
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0">
                    {department.teams.map((team) => (
                      <article
                        key={team}
                        className={`rounded-md border bg-[linear-gradient(180deg,#ffffff_0%,#f3f6f9_100%)] px-5 py-5 text-center shadow-sm ${department.borderClassName}`}
                      >
                        <p className="text-lg font-black text-primary">
                          {team}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-[#dbe2eb] bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-center md:text-left">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-primary/20 text-primary">
                  <Icon icon={ShieldCheck} className="size-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.03em] text-primary md:text-3xl">
                    정확한 기준 · 철저한 검증 · 책임 있는 실행
                  </h2>
                  <p className="mt-2 text-base font-medium leading-relaxed text-on-surface-variant">
                    큐품질관리기술은 각 부서의 전문성과 협업을 통해 고객의
                    성공과 신뢰를 완성합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectionsSection() {
  return (
    <section
      id="directions"
      className="border-t border-outline-variant/20 bg-surface py-24 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm md:p-12">
          <h1 className="mb-6 flex items-center gap-2 text-2xl font-black tracking-tight text-primary">
            <Icon icon={MapPin} className="size-5 text-secondary" />
            오시는 길
          </h1>
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
                  남겨주시면 평균 4시간 이내에 담당 엔지니어가 직접 검토 후 회신
                  드립니다.
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
  );
}

function AboutSectionContent({ section }: { section: AboutSectionSlug }) {
  switch (section) {
    case "greeting":
      return <GreetingSection />;
    case "overview":
      return <OverviewSection />;
    case "philosophy":
      return <PhilosophySection />;
    case "organization":
      return <OrganizationSection />;
    case "directions":
      return <DirectionsSection />;
  }
}

export function AboutSectionPage({
  section,
}: {
  section: AboutSectionSlug;
}) {
  const { href } = aboutSections[section];

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={href} />
      <main>
        <AboutSectionContent section={section} />
      </main>
      <SiteFooter />
    </div>
  );
}
