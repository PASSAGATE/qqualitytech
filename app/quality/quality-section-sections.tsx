import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  certificationItems,
  policyPrinciples,
  qualityHeroImage,
  type QualitySectionSlug,
} from "./quality-section-data";

function QualityIcon({
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

export function QualityHero({ section }: { section: QualitySectionSlug }) {
  const isPolicy = section === "policy";

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <Image
          src={qualityHeroImage}
          alt="Construction quality management background"
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
            Quality Management
          </p>
          <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
            {isPolicy ? (
              <>
                현장 품질을 기준으로 만들고,
                <br />
                데이터로 신뢰를 증명합니다.
              </>
            ) : (
              <>
                품질 기준을 체계화하고,
                <br />
                문서로 신뢰를 증명합니다.
              </>
            )}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
            {isPolicy
              ? "큐품질관리기술은 건설 현장의 시공 품질을 최우선 가치로 삼고, 고객의 신뢰를 바탕으로 정확하고 체계적인 품질관리 서비스를 제공합니다."
              : "인증과 기준은 보여주기 위한 문서가 아니라 현장 품질을 유지하는 운영 체계입니다. 프로젝트별 요구사항에 맞춰 필요한 기준과 대응 자료를 체계적으로 관리합니다."}
          </p>
        </div>
      </div>
    </section>
  );
}

export function PolicySection() {
  return (
    <section id="policy" className="bg-surface py-24 scroll-mt-28">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <article className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-10 shadow-sm lg:col-span-5">
            <h2 className="mb-5 text-3xl font-black text-primary">
              품질 방침
            </h2>
            <div className="h-1.5 w-16 bg-secondary" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
              <p>
                우리는 관련 법규와 품질 기준을 준수하며, 착공부터 준공까지 전
                과정에서 품질 리스크를 사전에 점검하고 개선합니다.
              </p>
              <p>
                현장 중심의 기술 컨설팅과 꼼꼼한 문서 관리, 투명한 보고 체계를
                통해 고객의 경제적 손실을 예방하고 하자 없는 표준 시공 품질을
                실현하겠습니다.
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
                  <QualityIcon icon={item.icon} className="size-5" />
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
  );
}

export function CertificationsSection() {
  return (
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
            인증과 기준은 보여주기 위한 문서가 아니라 현장 품질을 유지하는 운영
            체계입니다. 큐품질관리기술은 프로젝트별 요구사항에 맞춰 필요한
            기준과 대응 자료를 체계적으로 관리합니다.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 overflow-hidden rounded-[28px] border border-outline-variant/15 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)] lg:grid-cols-12">
          <article className="flex flex-col justify-center bg-[linear-gradient(135deg,#00152a_0%,#123f7b_100%)] p-8 text-white md:p-10 lg:col-span-5 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-secondary">
              Certification
            </p>
            <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.05em] md:text-4xl">
              ISO 9001 품질경영시스템
              <br />
              전문 심사원 교육 수료
            </h3>
            <p className="mt-6 text-base leading-relaxed text-on-primary-container">
              큐품질관리기술은 품질 기준과 검증 절차를 문서로만 관리하지 않고,
              전문성과 책임 있는 실행으로 현장 품질의 신뢰를 증명합니다.
            </p>
            <dl className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-sm border border-white/15 bg-white/10 p-4">
                <dt className="font-bold text-white/65">Course</dt>
                <dd className="mt-1 font-black text-white">ISO 9001:2015</dd>
              </div>
              <div className="rounded-sm border border-white/15 bg-white/10 p-4">
                <dt className="font-bold text-white/65">Certified</dt>
                <dd className="mt-1 font-black text-white">Quality Management</dd>
              </div>
            </dl>
          </article>

          <div className="relative bg-[radial-gradient(circle_at_top,#fff8ef_0%,#ffffff_42%,#eef3f8_100%)] p-5 md:p-8 lg:col-span-7 lg:p-10">
            <div className="pointer-events-none absolute inset-x-10 top-8 h-24 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative mx-auto max-w-[640px] rounded-[18px] border border-[#ead6c3] bg-white p-3 shadow-[0_24px_65px_rgba(15,23,42,0.22)]">
              <Image
                src="/certifications/qquality-iso-certificate.png"
                alt="ISO 9001 quality management system auditor certificate"
                width={625}
                height={886}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-[12px] object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {certificationItems.map((item) => (
            <article
              key={item.title}
              className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-full bg-secondary/15 p-2 text-secondary">
                <QualityIcon icon={item.icon} className="size-5" />
              </div>
              <h3 className="text-base font-black text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualitySectionContent({
  section,
}: {
  section: QualitySectionSlug;
}) {
  switch (section) {
    case "policy":
      return <PolicySection />;
    case "certifications":
      return <CertificationsSection />;
  }
}
