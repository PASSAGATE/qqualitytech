import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  FileCheck2,
  Gauge,
  ListChecks,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "품질 경영 | 큐품질관리기술",
  description:
    "큐품질관리기술의 품질 방침, 품질관리 기준, 인증 및 대관감사 대응 체계를 소개합니다.",
};

const policyPrinciples: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: SearchCheck,
    title: "고객 요구사항의 정확한 이해",
    description:
      "프로젝트의 조건과 품질 목표를 명확히 파악하고 신속하게 대응합니다.",
  },
  {
    icon: ShieldCheck,
    title: "법규와 기준 준수",
    description:
      "관련 법규, 품질 기준, 절차를 준수하여 현장 품질 신뢰를 확보합니다.",
  },
  {
    icon: TriangleAlert,
    title: "사전 예방 품질",
    description:
      "현장 점검과 품질검사를 통해 문제를 조기에 발견하고 손실을 예방합니다.",
  },
  {
    icon: FileCheck2,
    title: "문서 및 감사 대응 표준화",
    description:
      "품질관리 문서와 대관감사 대응 체계를 표준화하여 업무 누락을 줄입니다.",
  },
];

const certificationItems: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: ClipboardCheck,
    title: "품질관리계획서 기준 검토",
    description:
      "현장 조건에 맞는 품질관리 계획과 검사 항목을 검토하고 보완합니다.",
  },
  {
    icon: ListChecks,
    title: "시험·검사 기준 관리",
    description:
      "자재, 공정, 시공 단계별 시험 및 검사 기준을 체계적으로 관리합니다.",
  },
  {
    icon: Gauge,
    title: "대관감사 대응 체계",
    description:
      "필요 서류와 점검 기록을 정리하여 감사 대응의 정확도를 높입니다.",
  },
  {
    icon: RefreshCcw,
    title: "지속 개선 활동",
    description:
      "점검 결과와 피드백을 바탕으로 서비스 품질을 지속적으로 개선합니다.",
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

export default function QualityPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/quality" />

      <main>
        <section className="border-b border-outline-variant/20 bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-secondary">
              Quality Management
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-tight text-primary md:text-6xl">
              현장 품질을 기준으로 만들고,
              <br />
              데이터로 신뢰를 증명합니다.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-on-surface-variant">
              큐품질관리기술은 건설 현장의 시공 품질을 최우선 가치로 삼고,
              고객의 신뢰를 바탕으로 정확하고 체계적인 품질관리 서비스를
              제공합니다.
            </p>
          </div>
        </section>

        <section id="policy" className="bg-[#dfe8f1] py-24 scroll-mt-28">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-5">
                <h2 className="mb-5 text-3xl font-black text-primary">
                  품질 방침
                </h2>
                <div className="h-1.5 w-16 bg-secondary" />
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  <p>
                    우리는 관련 법규와 품질 기준을 준수하며, 착공부터 준공까지
                    전 과정에서 품질 리스크를 사전에 점검하고 개선합니다.
                  </p>
                  <p>
                    현장 중심의 기술 컨설팅과 꼼꼼한 문서 관리, 투명한 보고
                    체계를 통해 고객의 경제적 손실을 예방하고 하자 없는 표준
                    시공 품질을 실현하겠습니다.
                  </p>
                </div>
              </article>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
                {policyPrinciples.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-4 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                      <Icon icon={item.icon} className="size-5" />
                    </div>
                    <h3 className="text-base font-black text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="certifications"
          className="border-y border-outline-variant/20 bg-surface py-24 scroll-mt-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-primary">
                품질 인증 및 기준 관리
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
                인증과 기준은 보여주기 위한 문서가 아니라 현장 품질을 유지하는
                운영 체계입니다. 큐품질관리기술은 프로젝트별 요구사항에 맞춰
                필요한 기준과 대응 자료를 체계적으로 관리합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {certificationItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm"
                >
                  <div className="mb-4 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                    <Icon icon={item.icon} className="size-5" />
                  </div>
                  <h3 className="text-base font-black text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
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
