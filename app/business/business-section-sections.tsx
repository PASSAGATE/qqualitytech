import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ListChecks, MessageSquareText } from "lucide-react";
import type { BusinessSection } from "./business-section-data";

type BusinessSectionProps = {
  business: BusinessSection;
};

function SectionIcon({
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

export function BusinessHeroSection({ business }: BusinessSectionProps) {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={business.heroImage}
          alt={business.heroAlt}
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
            {business.title.replace(" | 큐품질관리기술", "")}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
            {business.lead}
          </p>
        </div>
      </div>
    </section>
  );
}

export function BusinessOverviewSection({ business }: BusinessSectionProps) {
  return (
    <section className="border-b border-outline-variant/20 bg-surface py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-5">
            <h2 className="text-3xl font-black text-primary">
              {business.introTitle}
            </h2>
            <div className="mt-6 h-1.5 w-16 bg-secondary" />
            <p className="mt-6 text-sm leading-relaxed text-on-surface-variant md:text-base">
              {business.introBody}
            </p>
          </article>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
            {business.scopes.map((scope) => (
              <article
                key={scope.title}
                className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                  <SectionIcon icon={scope.icon} className="size-5" />
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
  );
}

export function BusinessProcessDeliverablesSection({
  business,
}: BusinessSectionProps) {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
          <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
            <SectionIcon icon={ListChecks} className="size-5" />
          </div>
          <h2 className="text-2xl font-black text-primary">진행 절차</h2>
          <ol className="mt-6 space-y-3">
            {business.processSteps.map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-sm bg-surface-container-low px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-primary">{step}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm">
          <div className="mb-5 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
            <SectionIcon icon={MessageSquareText} className="size-5" />
          </div>
          <h2 className="text-2xl font-black text-primary">주요 산출물</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {business.deliverables.map((item) => (
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
  );
}

export function BusinessFocusSection({ business }: BusinessSectionProps) {
  return (
    <section className="border-t border-outline-variant/20 bg-surface py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="rounded-sm bg-primary p-10 text-white shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-secondary">
            Consulting Focus
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight md:text-4xl">
            {business.focusTitle}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-on-primary-container md:text-base">
            {business.focusBody}
          </p>
        </div>
      </div>
    </section>
  );
}
