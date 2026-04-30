import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  FileSearch,
  HardHat,
  ListChecks,
  MessageSquareText,
  TriangleAlert,
} from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "건설 품질 관리 및 컨설팅 | 큐품질관리기술",
  description:
    "큐품질관리기술의 건설 품질 관리 및 컨설팅 서비스 범위, 진행 절차, 산출물을 안내합니다.",
};

const serviceScopes: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: ClipboardCheck,
    title: "품질관리 체계 진단",
    description:
      "현장 품질관리 조직, 검사 기준, 문서 흐름을 점검하여 개선 우선순위를 도출합니다.",
  },
  {
    icon: HardHat,
    title: "현장 중심 품질 점검",
    description:
      "시공 단계별 품질 리스크를 확인하고 자재, 공정, 시험 항목을 현장 조건에 맞게 관리합니다.",
  },
  {
    icon: FileSearch,
    title: "문서 및 대관감사 대응",
    description:
      "품질관리계획서, 시험성적서, 점검 기록 등 감사 대응에 필요한 자료를 체계화합니다.",
  },
  {
    icon: TriangleAlert,
    title: "하자 예방 컨설팅",
    description:
      "반복 하자와 품질 불량 원인을 분석하고 사전 예방 중심의 개선안을 제시합니다.",
  },
];

const processSteps = [
  "현장 현황 및 요구사항 진단",
  "품질관리 기준과 점검 계획 수립",
  "현장 방문 점검 및 리스크 확인",
  "개선 리포트와 실행 가이드 제공",
  "후속 점검 및 문서 관리 지원",
] as const;

const deliverables = [
  "현장 품질 점검 체크리스트",
  "품질 리스크 진단 리포트",
  "시험·검사 관리 기준표",
  "대관감사 대응 자료 목록",
  "개선 조치 및 사후관리 가이드",
] as const;

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

export default function QualityManagementConsultingPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/business/quality-management-consulting" />

      <main>
        <section className="relative min-h-[620px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB"
              alt="Construction quality inspection equipment"
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-35 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.9)_55%,rgba(0,21,42,0.28)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1600px] items-center px-5 py-24 sm:px-8 lg:px-12">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-secondary">
                Business Area
              </p>
              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                건설 품질 관리 및 컨설팅
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                착공부터 준공까지 현장의 품질 리스크를 사전에 점검하고, 문서와
                검사 체계를 표준화하여 하자 없는 시공 품질을 지원합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-outline-variant/20 bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-5">
                <h2 className="text-3xl font-black text-primary">
                  현장의 품질 문제를 사전에 줄이는 실무형 컨설팅
                </h2>
                <div className="mt-6 h-1.5 w-16 bg-secondary" />
                <p className="mt-6 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  품질 관리는 서류만 맞추는 일이 아니라 현장의 흐름을 정확히
                  읽고, 검사 기준과 개선 조치를 실행 가능한 형태로 만드는
                  과정입니다. 큐품질관리기술은 현장 조건에 맞는 점검 체계와
                  문서 대응을 함께 설계합니다.
                </p>
              </article>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
                {serviceScopes.map((scope) => (
                  <article
                    key={scope.title}
                    className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <Icon icon={scope.icon} className="size-5" />
                    </div>
                    <h3 className="text-base font-black text-primary">
                      {scope.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {scope.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#dfe8f1] py-24">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
            <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                <Icon icon={ListChecks} className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-primary">진행 절차</h2>
              <ol className="mt-6 space-y-3">
                {processSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-sm bg-surface-container-low px-4 py-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
              <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                <Icon icon={MessageSquareText} className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-primary">주요 산출물</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border border-outline-variant/15 bg-white px-4 py-3 text-sm font-semibold text-primary"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-outline-variant/20 bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="rounded-sm bg-primary p-10 text-white shadow-sm md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">
                Consulting Focus
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
                하자 대응보다 중요한 것은 하자가 생기기 전의 품질 체계입니다.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-on-primary-container md:text-base">
                현장 점검, 시험 기준, 문서 관리, 감사 대응이 따로 움직이면
                품질 리스크가 커집니다. 큐품질관리기술은 이 흐름을 하나의 관리
                체계로 묶어 프로젝트가 흔들리지 않도록 지원합니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
