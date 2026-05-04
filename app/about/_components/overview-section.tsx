export function OverviewSection() {
  const proofPoints = [
    {
      description:
        "현장 조건과 기준을 명확히 해석하여 흔들리지 않는 판단 기준을 세웁니다.",
      label: "정확한 기준",
    },
    {
      description: "시험·검사·문서·현장관리 전 과정을 체계적으로 수행합니다.",
      label: "철저한 검증",
    },
    {
      description:
        "고객이 안심하고 선택할 수 있도록 데이터와 책임 있는 대응으로 증명합니다.",
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
                시험·검사·품질문서·현장관리 전 과정을 체계적으로 수행하여 공정
                리스크를 최소화하고, 안전성과 신뢰성을 높이는 솔루션을
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
              010-8941-4628 / qqstart@naver.com
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
