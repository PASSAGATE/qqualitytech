import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Box,
  Building2,
  Check,
  Gauge,
  SearchCheck,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "서비스 소개 | QqualityTech",
  description:
    "QqualityTech의 품질관리 지원, 시험 장비 판매 및 임대, 전문 기술 컨설팅, 현장 시험 및 검사 서비스를 소개합니다.",
};

const qualityChecks = [
  {
    title: "시공 품질 관리 계획서 검토",
    description: "법적 기준 및 프로젝트 특성에 최적화된 계획 수립 지원",
  },
  {
    title: "현장 상시 모니터링 시스템",
    description: "실시간 데이터 수집을 통한 즉각적인 품질 이상 감지",
  },
];

const siteTests: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Building2,
    title: "파일 재하 시험",
    description:
      "기초 말뚝의 지지력을 확인하기 위한 정재하 및 동재하 시험을 완벽하게 수행합니다.",
  },
  {
    icon: Wrench,
    title: "도장 및 방수 검사",
    description:
      "도막 두께 측정, 부착력 시험 등을 통해 마감재의 시공 품질을 정밀 검증합니다.",
  },
  {
    icon: Gauge,
    title: "콘크리트 압축 강도",
    description:
      "슈미트 해머법 및 코어 채취를 통한 현장 구조체 강도 확인 시험을 제공합니다.",
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
    <IconComponent
      aria-hidden="true"
      className={className}
      strokeWidth={1.8}
    />
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/services" />

      <header className="relative flex h-[614px] items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMhWU6eH-5nxgxSg4QbQ2KmXTdW8teexXILeh1dCoWB2wjz9sAv_R0_vd4Go4_KNtemsf9GNNNoPxgkHY77Q5ODs_9LnP_LjFVSORwRfVBqoW1OgFrC1xNa9HezbvsgGAA51mlwoNQEynAwIxMjaBUaJmNoMo-7Ig1cMqO4WFldJDdz1ui_Uv7XIvfs6YXV1Q0UPdEic8z493dWa0TSnVpx5rMw-AVke3i5p7lHpDtA-r3NAISuVc0FwqSxbo2DX-i5w19VgN62qm4"
            alt="Modern construction site with geometric steel structures"
            fill
            preload
            sizes="100vw"
            className="object-cover grayscale contrast-125 opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(58deg,var(--color-primary)_8%,rgba(0,21,42,0.82)_48%,rgba(0,21,42,0.2)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Quality Solutions
            </span>
            <h1 className="mb-8 text-6xl font-black leading-[1.08] tracking-[-0.08em] text-white md:text-7xl">
              정밀한 측정,
              <br />
              완벽한 건설의 시작.
            </h1>
            <p className="text-xl font-medium leading-relaxed text-on-primary-container">
              QqualityTech은 건설 현장의 안전과 품질을 최우선으로 생각합니다.
              <br />
              국제 표준을 준수하는 첨단 장비와 전문 인력으로 귀사의 프로젝트를
              지원합니다.
            </p>
          </div>
        </div>
      </header>

      <main className="space-y-32 py-24">
        <section id="quality-control" className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-5">
              <div className="mb-4 flex items-center gap-3">
                <Icon icon={ShieldCheck} className="size-10 text-secondary" />
                <h2 className="text-3xl font-black tracking-[-0.05em] text-primary">
                  품질 관리 지원 서비스
                </h2>
              </div>
              <p className="mb-8 text-lg leading-relaxed text-on-surface-variant">
                건설 프로젝트의 모든 단계에서 엄격한 품질 기준을 유지할 수
                있도록 밀착 지원합니다. 시공 품질 관리 계획 수립부터 현장
                점검까지, 불필요한 리스크를 최소화합니다.
              </p>
              <ul className="mb-10 space-y-4">
                {qualityChecks.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-4 rounded-sm bg-surface-container-low p-4"
                  >
                    <Icon icon={Check} className="mt-1 size-5 text-secondary" />
                    <div>
                      <span className="block font-bold text-primary">
                        {item.title}
                      </span>
                      <span className="text-sm text-on-surface-variant">
                        {item.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm bg-surface-container-high px-8 py-4 text-sm font-bold text-primary transition-colors hover:bg-surface-container-highest"
              >
                상세 컨설팅 문의
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </div>

            <div className="order-1 md:order-2 md:col-span-7">
              <div className="group relative">
                <div className="absolute -inset-4 -z-10 rounded-xl bg-surface-container-high transition-transform group-hover:scale-105" />
                <div className="relative h-[500px] overflow-hidden rounded-sm shadow-2xl">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGM8gNsHLLTOZg4h4lHIn8jtxzqMltKVM-kM4xTAvKqumGvWEsi02Q-RT7BS-t4VjmJg_ZXGa1AtoP-wzmFclranlEOtPi394p8P6tFuIB_i_xPvTr6AZTALxwaDto9Edrf0XOQDh8WWW4b49fDyJLoLGR_qdtLtf3E2TzfMCHEWF1aV5uLJjMllBntom2pgKMPvX0I-X0d8yn8bldJuu83XJymNTBXE_t9uTt_9qKE6iAUtIqTLTG2zd89llBZI8SRlEqjRdwA0m"
                    alt="Engineer using a digital tablet for site quality inspection"
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment-supply" className="bg-surface-container-low py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-16">
              <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-primary">
                시험 장비 판매 및 임대
              </h2>
              <p className="max-w-2xl text-on-surface-variant">
                업계 최고 사양의 정밀 시험 장비를 제공합니다. 구매부터
                단기/장기 임대까지 비즈니스 상황에 맞는 유연한 솔루션을
                선택하세요.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <article className="flex flex-col justify-between border-l-4 border-secondary bg-surface-container-lowest p-10 shadow-sm md:col-span-2 md:row-span-2">
                <div>
                  <Icon icon={SearchCheck} className="mb-6 size-12 text-secondary" />
                  <h3 className="mb-4 text-2xl font-bold text-primary">
                    비파괴 검사 장비
                  </h3>
                  <p className="leading-relaxed text-on-surface-variant">
                    초음파, 방사선 투과, 자분 탐상 등 구조물의 손상 없이 내부
                    결함을 완벽하게 진단하는 최신 비파괴 검사 솔루션을
                    제공합니다.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <span className="bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">
                    Top Rated
                  </span>
                  <span className="bg-surface-container-high px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Rental Available
                  </span>
                </div>
              </article>

              <article className="flex flex-col justify-center bg-primary p-8 text-white md:col-span-2">
                <h3 className="mb-2 text-xl font-bold">토질 및 기초 시험기</h3>
                <p className="text-sm text-on-primary-container">
                  지반의 안정성을 분석하기 위한 시추 및 투수 시험 장비
                  라인업
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-black">200+ Items</span>
                  <Link
                    href="/equipment"
                    className="inline-flex border border-outline p-2 text-white transition-colors hover:bg-white hover:text-primary"
                  >
                    <Icon icon={ArrowRight} className="size-5" />
                  </Link>
                </div>
              </article>

              <article className="bg-surface-container-lowest p-8 shadow-sm">
                <Icon icon={Building2} className="mb-4 size-6 text-primary" />
                <h4 className="mb-2 font-bold text-primary">측량 및 GPS</h4>
                <p className="text-xs text-on-surface-variant">
                  고정밀 위치 데이터를 위한 위성 측량 시스템
                </p>
              </article>

              <article className="bg-surface-container-lowest p-8 shadow-sm">
                <Icon icon={Box} className="mb-4 size-6 text-primary" />
                <h4 className="mb-2 font-bold text-primary">화학 분석기</h4>
                <p className="text-xs text-on-surface-variant">
                  콘크리트 및 철강 재료 성분 분석
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="consulting" className="mx-auto w-full max-w-[1600px] overflow-hidden px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="relative h-[600px] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwLxDq-eGG4VwDkQJsoussxU0VE5_085ZrgSOgT04emZqdTRd_tO_DCc1ls0Czd-In1jGBSIkVfnva7lAQGhMLIgAiqQhnN0_FLmCmU96qPNoCuDTEK424jyI97WS3Hae7SCL6WTKIo3-PxOb-f2evwWPk0suS0Vs70mvq4NyQijwf11gY9PYSdiJFv0FhEr2YQ_zZJJAjiEtDT_AwMn5y3E78zaMM_VPFkPA1jx5vtaTTP3T1gdCpz_gmCxefMj2LTDRlMYvgHIDB"
                  alt="Blueprints and professional technical drawing tools"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative w-full md:w-1/2">
              <div className="pointer-events-none absolute -left-12 -top-12 -z-10 select-none text-[120px] font-black text-surface-container-high">
                03
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-[-0.06em] text-primary">
                전문 기술 컨설팅
              </h2>
              <p className="mb-10 text-lg leading-relaxed text-on-surface-variant">
                복잡한 기술적 난제를 해결하기 위해 QqualityTech의 전문가 그룹이
                투입됩니다. 수십 년간의 현장 경험과 최신 학술 트렌드를 결합하여
                최적의 공법과 해결책을 제시합니다.
              </p>
              <div className="space-y-8">
                {[
                  {
                    letter: "A",
                    title: "하자 원인 분석 및 대책 수립",
                    description:
                      "발생한 결함의 근본 원인을 공학적으로 규명하고 재발 방지책을 제안합니다.",
                  },
                  {
                    letter: "B",
                    title: "해외 프로젝트 기술 지원",
                    description:
                      "글로벌 규격(ASTM, ISO 등)에 부합하는 품질 체계 구축 및 영문 기술 보고서 작성을 지원합니다.",
                  },
                  {
                    letter: "C",
                    title: "스마트 건설 기술 도입 자문",
                    description:
                      "BIM, IoT 센서 활용 등 현장의 디지털 전환을 위한 로드맵을 설계합니다.",
                  },
                ].map((item) => (
                  <article key={item.letter} className="flex items-start gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-primary font-bold text-white">
                      {item.letter}
                    </div>
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-primary">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="field-testing" className="relative bg-primary py-32">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2gVE3-hmrE5rvcAo3lYDvNv2blL56sTQnwvwQjAjQQT3jCls9XyKg9p1u6jTdGRDotiffpXhs0nS6f75ZGUqYMu7aRXe6cGG76Hw843RFt_XhmcvIIS8wkudQz0oj0TO5QQuAbTvdVd-XLzPDFdyeZwEHqRzz4cOjDUuqsQWj_nKZBtxmZXg8fwfZTIRYw5JfSl3OJDHEcRWkAH18irQp86hlRL_AgYQ7eGPHjliqa3Zjwratx3L1NZfP9YHres3fPXGzutPGuSZG"
              alt="Civil engineer working on site with surveying equipment"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-white">
                현장 시험 및 검사
              </h2>
              <p className="mx-auto max-w-xl text-on-primary-container">
                전국 어디든 QqualityTech의 검사팀이 방문하여 정확하고 객관적인
                시험 데이터를 산출합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {siteTests.map((item) => (
                <article
                  key={item.title}
                  className="border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition-all hover:bg-white/20"
                >
                  <Icon icon={item.icon} className="mb-6 size-10 text-secondary" />
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {item.description}
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
