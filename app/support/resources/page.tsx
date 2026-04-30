import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ClipboardList, Newspaper, SearchCheck, Wrench } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "기술자료실 | 큐품질관리기술",
  description:
    "큐품질관리기술의 품질관리 기준, 시험장비 운용, 현장 점검 관련 기술자료를 확인하세요.",
};

const resources: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  type: string;
}> = [
  {
    icon: ClipboardList,
    type: "Guide",
    title: "품질관리계획서 사전 점검 체크리스트",
    description:
      "착공 전 검토해야 할 품질관리 조직, 시험·검사 항목, 문서 준비 기준을 정리합니다.",
  },
  {
    icon: SearchCheck,
    type: "Checklist",
    title: "현장 품질 점검 주요 항목",
    description:
      "자재 반입, 공정별 검사, 시험 기록 관리 등 반복 점검이 필요한 항목을 안내합니다.",
  },
  {
    icon: Wrench,
    type: "Equipment",
    title: "시험장비 운용 및 관리 기본 안내",
    description:
      "장비 사용 전 점검, 보관, 교정 주기 등 데이터 신뢰도를 위한 기본 관리 기준입니다.",
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

export default function SupportResourcesPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/support/resources" />

      <main>
        <header className="relative min-h-[520px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2528NEttkRKktwlYB2ZQ6VozY6sqKcIZlHvGZq85LgwGTrGYAymf_kVa9J6ChTO3iexUtH4X4GpfX-PWM1uvMLRgbt82EzJ5MgNX3S13BxaKXAWGCVA0GxtaZAbsXu51ojhTKzlzDRX1Jes6rWSZc6y8vLn5xLWdnzCJvekNe2ANJ7UkUYz1h62LY1OeuYrzZhQ7wnMCYg9L8u6JMTYMYpW1M19F6SAq7VycOIECFNidMiEm6REN8sK_Fia-zp79eBHbYBrdg1i5l"
              alt="Technical resources and testing equipment background"
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
                기술자료실
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                품질관리 기준, 시험장비 운용, 현장 점검에 필요한 자료를
                확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        <section className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-4xl font-black text-primary">
                  Resource Library
                </h2>
                <p className="mt-3 text-base text-on-surface-variant">
                  현장에서 바로 참고할 수 있는 자료를 정리했습니다.
                </p>
              </div>
              <Link
                href="/blog/naver-blog"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-85 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                  boxShadow: "0 12px 24px rgba(255, 107, 44, 0.35)",
                }}
              >
                블로그 자료 보기
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {resources.map((resource) => (
                <article
                  key={resource.title}
                  className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                    <Icon icon={resource.icon} className="size-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                    {resource.type}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-primary">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {resource.description}
                  </p>
                  <Icon icon={Newspaper} className="mt-6 size-5 text-secondary" />
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
