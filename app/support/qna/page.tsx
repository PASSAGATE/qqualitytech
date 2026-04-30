import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, CircleHelp, MessageSquare } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

export const metadata: Metadata = {
  title: "질문/답변 | 큐품질관리기술",
  description:
    "큐품질관리기술의 품질관리, 시험장비, A/S 관련 자주 묻는 질문과 답변을 확인하세요.",
};

const qnaItems = [
  {
    question: "품질관리 컨설팅은 어떤 현장에 필요한가요?",
    answer:
      "품질관리계획 수립, 시험·검사 기준 정리, 대관감사 대응, 하자 예방이 필요한 건설 현장에 적합합니다.",
  },
  {
    question: "시험장비 구매와 임대 상담은 어떻게 진행되나요?",
    answer:
      "현장 조건, 사용 목적, 필요 기간을 확인한 뒤 적합한 장비 구성과 견적을 안내합니다.",
  },
  {
    question: "A/S 접수 후 처리 절차는 어떻게 되나요?",
    answer:
      "문의 접수 후 장비 증상과 사용 환경을 확인하고, 점검 방법 또는 방문·입고 절차를 안내합니다.",
  },
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

export default function SupportQnaPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/support/qna" />

      <main>
        <header className="relative min-h-[520px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxMhT1zT29SgWveNZtgi3hBnPbNYF1YBLJaZaAdqpj7FhEF6J3ITydPbcJ_gXWWIcZODHm-7HyEoiaCv-RX5J0N8wUHAAFHoE4WB-MNNPqaAQoClczB0cxcoHqt4Qd8LFAbjIq6RY1GI6xTRjCMH8ghshDDkgfDOy9meC2t9yPgBrCC12HjmsTee6rPEYI1BGGXdKz6XcgM_oM1MetBavcfkFQyFk05VJaGlVtQDFpfA-mQZMtS0UZKTYeL2BFxuE_RcN_FQVWy2m"
              alt="Customer support question and answer background"
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
                질문/답변
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                품질관리, 시험장비, A/S와 관련해 자주 묻는 내용을 빠르게
                확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        <section className="bg-[#dfe8f1] py-24">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
            <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-4">
              <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                <Icon icon={CircleHelp} className="size-5" />
              </div>
              <h2 className="text-3xl font-black text-primary">FAQ</h2>
              <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                원하는 답변을 찾기 어렵다면 문의 양식을 통해 내용을 남겨주세요.
                담당자가 확인 후 안내드립니다.
              </p>
              <Link
                href="/contact#inquiry"
                className="mt-7 inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                문의 남기기
                <Icon icon={ArrowRight} className="size-4" />
              </Link>
            </article>

            <div className="space-y-4 lg:col-span-8">
              {qnaItems.map((item) => (
                <article
                  key={item.question}
                  className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <Icon icon={MessageSquare} className="mt-1 size-5 text-secondary" />
                    <div>
                      <h3 className="text-lg font-black text-primary">
                        {item.question}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                        {item.answer}
                      </p>
                    </div>
                    <Icon icon={CheckCircle2} className="ml-auto size-5 shrink-0 text-secondary" />
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
