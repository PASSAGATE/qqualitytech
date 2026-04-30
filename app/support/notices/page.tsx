import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bell, CalendarDays, Megaphone, Wrench } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "공지사항 | 큐품질관리기술",
  description:
    "큐품질관리기술의 공지사항, 서비스 안내, 장비 운영 및 품질관리 소식을 확인하세요.",
};

const notices: Array<{
  icon: LucideIcon;
  category: string;
  title: string;
  description: string;
  date: string;
  important?: boolean;
}> = [
  {
    icon: Megaphone,
    category: "공지",
    title: "큐품질관리기술 공식 고객센터 운영 안내",
    description:
      "품질관리 상담, 시험장비 문의, A/S 접수는 고객센터와 문의 양식을 통해 접수하실 수 있습니다.",
    date: "2026.04.30",
    important: true,
  },
  {
    icon: Wrench,
    category: "장비",
    title: "시험장비 구매 및 임대 상담 절차 안내",
    description:
      "현장 조건과 사용 목적을 확인한 뒤 적합한 장비 구성, 납품 일정, 견적을 순차적으로 안내합니다.",
    date: "2026.04.30",
  },
  {
    icon: CalendarDays,
    category: "품질관리",
    title: "건설 품질관리 컨설팅 사전 준비 자료 안내",
    description:
      "현장 개요, 공정표, 품질관리계획서, 시험·검사 기록을 준비해 주시면 더 정확한 진단이 가능합니다.",
    date: "2026.04.30",
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

export default function SupportNoticesPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/support/notices" />

      <main>
        <header className="relative min-h-[520px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxMhT1zT29SgWveNZtgi3hBnPbNYF1YBLJaZaAdqpj7FhEF6J3ITydPbcJ_gXWWIcZODHm-7HyEoiaCv-RX5J0N8wUHAAFHoE4WB-MNNPqaAQoClczB0cxcoHqt4Qd8LFAbjIq6RY1GI6xTRjCMH8ghshDDkgfDOy9meC2t9yPgBrCC12HjmsTee6rPEYI1BGGXdKz6XcgM_oM1MetBavcfkFQyFk05VJaGlVtQDFpfA-mQZMtS0UZKTYeL2BFxuE_RcN_FQVWy2m"
              alt="Construction site announcement background"
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
                공지사항
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                큐품질관리기술의 서비스 안내, 시험장비 운영 소식, 품질관리 관련
                주요 공지사항을 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        <section className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-4xl font-black text-primary">Notice List</h2>
                <p className="mt-3 text-base text-on-surface-variant">
                  최신 공지와 고객 안내를 빠르게 확인하세요.
                </p>
              </div>
              <Link
                href="/contact#inquiry"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-85 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                  boxShadow: "0 12px 24px rgba(255, 107, 44, 0.35)",
                }}
              >
                문의하기
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <article
                  key={notice.title}
                  className="grid grid-cols-1 gap-5 rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-colors hover:border-secondary/50 md:grid-cols-12 md:items-center"
                >
                  <div className="flex items-center gap-4 md:col-span-8">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-secondary/15 text-secondary">
                      <Icon icon={notice.icon} className="size-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-sm bg-surface-container-low px-2 py-1 text-xs font-bold text-primary">
                          {notice.category}
                        </span>
                        {notice.important ? (
                          <span className="rounded-sm bg-secondary px-2 py-1 text-xs font-bold text-white">
                            중요
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 text-xl font-black text-primary">
                        {notice.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                        {notice.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 md:col-span-4 md:justify-end">
                    <span className="text-sm font-semibold text-on-surface-variant">
                      {notice.date}
                    </span>
                    <Icon icon={Bell} className="size-5 text-secondary" />
                  </div>
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
