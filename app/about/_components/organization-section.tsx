import { Building2, Handshake, Lightbulb, ShieldCheck } from "lucide-react";
import { AboutIcon } from "./about-icon";

export function OrganizationSection() {
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
                      <AboutIcon icon={department.icon} className="size-10" />
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
                  <AboutIcon icon={ShieldCheck} className="size-10" />
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
