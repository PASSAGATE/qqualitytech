import { Handshake, Rocket, Scale, ShieldCheck, Target } from "lucide-react";
import { AboutIcon } from "./about-icon";

export function PhilosophySection() {
  const values = [
    {
      description: "원칙은 상황에 따라 바뀌지 않습니다.",
      icon: Scale,
      label: "Integrity",
    },
    {
      description: "작은 오차도 놓치지 않는 정확함.",
      icon: Target,
      label: "Precision",
    },
    {
      description: "끝까지 책임지는 실행력.",
      icon: ShieldCheck,
      label: "Responsibility",
    },
    {
      description: "한 번의 거래보다 오래가는 신뢰.",
      icon: Handshake,
      label: "Trust",
    },
    {
      description: "오늘의 성과보다 지속 가능한 성장.",
      icon: Rocket,
      label: "Growth",
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
              key={value.label}
              className="group relative overflow-hidden rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-secondary/10 transition-transform group-hover:scale-125" />
              <div className="relative flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-[0_12px_26px_rgba(255,107,44,0.26)]">
                  <AboutIcon icon={value.icon} className="size-7" />
                </div>
              </div>
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
