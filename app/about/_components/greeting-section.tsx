import Image from "next/image";

export function GreetingSection() {
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
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-secondary" />
              <span className="text-sm font-bold uppercase tracking-[0.28em] text-secondary">
                CEO Message
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-black leading-[1.08] tracking-[-0.02em] text-white md:text-7xl">
              품질은 타협의 대상이 아니라,
              <br />
              반드시 지켜야 할 기준입니다.
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
              현장은 속도로 움직이지만, 결과는 기준으로 완성됩니다.
              큐품질관리기술은 시험, 검증, 문서, 대응, 관리 전 과정을 체계적으로
              운영합니다.
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
                쉬운 길보다 옳은 길을 선택하겠습니다. 형식보다 본질을
                보겠습니다. 말보다 결과로 증명하겠습니다.
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
                num: "01",
                label: "기준",
                text: "품질은 결과가 아니라 처음부터 지켜야 할 기준입니다.",
              },
              {
                num: "02",
                label: "책임",
                text: "고객의 시간, 비용, 리스크를 함께 책임지는 관리 체계를 만듭니다.",
              },
              {
                num: "03",
                label: "결과",
                text: "형식보다 본질을 보고, 말보다 결과로 증명합니다.",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="relative overflow-hidden rounded-sm border border-outline-variant/15 bg-white p-6 pt-5 shadow-sm"
              >
                <div className="absolute left-0 right-0 top-0 h-1 bg-secondary" />
                <p className="text-5xl font-black leading-none text-primary/[0.06] select-none">
                  {item.num}
                </p>
                <p className="mt-2 text-base font-black text-secondary">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-primary">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-outline-variant/15 bg-white px-10 py-8 shadow-sm">
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                큐품질관리기술 대표이사
              </p>
              <div className="mt-4 h-px w-40 bg-outline-variant/30" />
              <p className="mt-3 text-4xl font-black tracking-[0.06em] text-primary">
                이민희
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
