import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Gauge,
  HardHat,
  Mail,
  MessageSquare,
  Newspaper,
  Phone,
  Plus,
  PlusCircle,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import { blogPreviewPosts } from "./blog/data";
import { homeFieldCasePreview } from "./cases/data";
import { fetchFeaturedEquipment } from "./equipment/repository";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const services: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  tone: string;
}> = [
  {
    icon: Wrench,
    title: "품질관리 지원",
    description:
      "건설 현장의 전반적인 품질 시험 및 관리 체계 수립을 전문 엔지니어가 직접 지원합니다.",
    tone: "bg-surface-container-low",
  },
  {
    icon: ShoppingCart,
    title: "시험장비 판매",
    description:
      "KS 규격에 부합하는 정밀 건설 시험 장비를 합리적인 가격과 정식 라이선스로 공급합니다.",
    tone: "bg-surface-container",
  },
  {
    icon: Clock3,
    title: "시험장비 임대",
    description:
      "단기 현장 및 특정 프로젝트를 위한 최신 사양의 시험 장비 렌탈 서비스를 운영합니다.",
    tone: "bg-surface-container-high",
  },
  {
    icon: MessageSquare,
    title: "기술 상담",
    description:
      "각종 품질 시험 방법 및 현장 애로사항에 대한 기술적 솔루션을 제공해 드립니다.",
    tone: "bg-surface-container-high",
  },
  {
    icon: HardHat,
    title: "현장 시험 지원",
    description:
      "실시간 대응이 필요한 현장에서 직접 시험을 수행하고 정확한 데이터를 리포팅합니다.",
    tone: "bg-surface-container",
  },
  {
    icon: SearchCheck,
    title: "검사 솔루션",
    description:
      "구조물 진단 및 특수 검사를 위한 고도화된 검사 프로토콜과 장비를 제안합니다.",
    tone: "bg-surface-container-low",
  },
] as const;

const faqs = [
  {
    question: "장비 임대 시 현장 배송이 가능한가요?",
    answer:
      "네, 전국 모든 건설 현장으로 전문 물류팀이 안전하게 배송 및 설치를 지원해 드립니다. 반납 시에도 방문 회수 서비스를 제공합니다.",
    open: true,
  },
  {
    question: "품질 시험 성적서 대행 발급이 되나요?",
    answer: "",
    open: false,
  },
  {
    question: "장비 고장 시 A/S 처리 기간은 얼마나 걸리나요?",
    answer: "",
    open: false,
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

export default async function Home() {
  const featuredEquipment = await fetchFeaturedEquipment(4);

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="" />

      <main>
        <header
          id="home"
          className="relative flex min-h-[920px] items-center overflow-hidden bg-primary"
        >
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk1sGSYNm31Ao0kd9nV4JBiGmX2P2gFkQ0tz-dDpTRs-KOg-ztj_7eLUAWCf_eP8wKbcJbrHGY2DDhnw4vsGledJIYLqaJ7ZdAS4UjaHMTZvbiWViJnQDHhEfmx76c9I9zQ_u3GFez-NcGREGBFOf_CflP0XKGAc3NEfs_5mnGHBVXWSLebmLDcisnZNoGC8XyqZSns03jS15y0oViDn1IxVPEjgUecx_YcmneaynutkjnAEwhA4UgiE7gJ5RLFMLB-6sUfAabZSyD"
              alt="Modern construction site with architectural scaffolding at dusk"
              fill
              preload
              sizes="100vw"
              className="object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[linear-gradient(65deg,var(--color-primary)_18%,rgba(0,21,42,0.86)_52%,rgba(0,21,42,0.24)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-24 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="mb-6 inline-flex rounded-sm border border-secondary/30 bg-secondary/20 px-4 py-1.5 text-sm font-bold tracking-[0.28em] text-secondary">
                INDUSTRIAL PRECISION
              </span>
              <h1 className="mb-7 text-5xl font-black leading-[1.05] tracking-[0.09em] text-white md:text-6xl">
                건설 품질관리와 시험장비,
                <br />
                신뢰할 수 있는 전문 솔루션
              </h1>
              <p className="mb-10 max-w-2xl text-xl font-medium leading-relaxed text-on-primary-container md:text-2xl">
                현장에 필요한 최적의 품질관리 기술과 정밀 시험장비를 제공하여
                안전하고 견고한 건축의 기초를 다집니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-10 py-5 text-lg font-bold text-white transition-all hover:opacity-90 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                    boxShadow: "0 16px 30px rgba(255, 107, 44, 0.35)",
                  }}
                >
                  상담 문의하기
                  <Icon icon={ArrowRight} className="size-5" />
                </Link>
                <Link
                  href="/equipment"
                  className="inline-flex rounded-md border border-white/20 bg-surface-container-highest px-10 py-5 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white active:scale-95"
                >
                  시험장비 보기
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section id="services" className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-20">
              <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-primary">
                Core Services
              </h2>
              <div className="h-1.5 w-20 bg-secondary" />
            </div>

            <div className="grid grid-cols-1 gap-px md:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className={`group p-10 transition-colors duration-500 hover:bg-primary ${service.tone}`}
                >
                  <Icon
                    icon={service.icon}
                    className="mb-8 size-10 text-secondary transition-colors duration-500 group-hover:text-white"
                  />
                  <h3 className="mb-4 text-2xl font-bold tracking-[-0.04em] text-primary transition-colors duration-500 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-on-surface-variant transition-colors duration-500 group-hover:text-on-primary-container">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-surface-container-low py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-4 text-4xl font-black tracking-[-0.06em] text-primary">
                  왜 큐품질관리기술?
                </h2>
                <p className="text-lg text-on-surface-variant">
                  우리가 제공하는 품질의 차이가 고객의 신뢰를 만듭니다.
                </p>
              </div>
              <div className="h-px w-full bg-outline-variant/30 md:w-1/3" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <article className="relative col-span-12 flex min-h-[400px] flex-col justify-end overflow-hidden bg-primary p-12 md:col-span-8">
                <Icon
                  icon={HardHat}
                  className="absolute left-12 top-12 size-14 text-secondary"
                />
                <div className="relative z-10">
                  <h3 className="mb-4 text-3xl font-bold text-white">
                    풍부한 현장 경험
                  </h3>
                  <p className="max-w-xl text-lg text-on-primary-container">
                    수많은 대형 프로젝트를 통해 축적된 노하우로 어떠한 변수에도
                    신속하고 정확한 해답을 제시합니다.
                  </p>
                </div>
                <Icon
                  icon={Building2}
                  className="absolute right-0 bottom-0 size-[260px] -translate-y-2 text-white/10"
                />
              </article>

              <article className="col-span-12 bg-surface-container-highest p-12 md:col-span-4">
                <Icon
                  icon={ShieldCheck}
                  className="mb-8 size-12 text-secondary"
                />
                <h3 className="mb-4 text-2xl font-bold text-primary">
                  전문 기술력
                </h3>
                <p className="text-on-surface-variant">
                  국가 공인 자격과 지속적인 기술 연마를 통해 최상위 수준의 품질
                  관리 서비스를 보장합니다.
                </p>
              </article>

              <article className="col-span-12 bg-secondary p-12 md:col-span-4">
                <Icon icon={Gauge} className="mb-8 size-12 text-white" />
                <h3 className="mb-4 text-2xl font-bold text-white">
                  빠른 대응
                </h3>
                <p className="text-white/80">
                  현장의 긴박함을 이해하기에 실시간 소통 채널과 신속한 장비 수급
                  시스템을 가동합니다.
                </p>
              </article>

              <article className="col-span-12 flex items-center gap-12 border border-outline-variant/10 bg-surface-container-lowest p-12 md:col-span-8">
                <div className="flex-1">
                  <Icon icon={Box} className="mb-8 size-12 text-secondary" />
                  <h3 className="mb-4 text-2xl font-bold text-primary">
                    안정적인 장비 공급
                  </h3>
                  <p className="text-on-surface-variant">
                    자체 물류 시스템과 철저한 장비 점검을 통해 현장에서 즉시
                    사용 가능한 최상의 장비만을 출고합니다.
                  </p>
                </div>
                <div className="relative hidden h-48 w-48 overflow-hidden rounded-sm bg-surface-container lg:block">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB"
                    alt="High-tech material testing sensor with metallic textures"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="equipment" className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-2 text-4xl font-black tracking-[-0.06em] text-primary">
                  Featured Equipment
                </h2>
                <p className="text-on-surface-variant">
                  신뢰할 수 있는 데이터의 시작, 프리미엄 시험 장비 라인업
                </p>
              </div>
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-secondary"
              >
                전체 장비 보기
                <Icon icon={ArrowUpRight} className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featuredEquipment.map((item) => (
                <article
                  key={item.slug}
                  className="group overflow-hidden border border-outline-variant/20 bg-surface-container-lowest"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.badge ? (
                      <span className="absolute right-4 top-4 rounded-sm bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-lg font-bold text-primary">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-on-surface-variant">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                      <span className="text-xs font-bold text-secondary">
                        문의 후 안내
                      </span>
                      <Link
                        href={`/equipment/${item.slug}`}
                        aria-label={`${item.title} 상세보기`}
                        className="inline-flex text-outline transition-colors hover:text-secondary"
                      >
                        <Icon icon={PlusCircle} className="size-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="bg-primary py-24 text-white">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h2 className="mb-6 text-4xl font-black tracking-[-0.06em]">
                  Field Cases
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-on-primary-container">
                  전국 각지의 현장에서 큐품질관리기술의 기술력이 프로젝트의
                  완성도를 높이고 있습니다.
                </p>
                <Link
                  href="/#cases"
                  className="mb-10 inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-secondary"
                >
                  전체 사례 보기
                  <Icon icon={ArrowUpRight} className="size-4" />
                </Link>
                <div className="space-y-4">
                  <article className="border-l-4 border-secondary bg-white/5 p-6">
                    <div className="mb-1 text-sm font-bold text-secondary">
                      진행중
                    </div>
                    <h3 className="text-xl font-bold">
                      인천국제공항 4단계 확장 현장
                    </h3>
                  </article>
                  <article className="border-l-4 border-outline-variant/30 bg-white/5 p-6 opacity-60">
                    <div className="mb-1 text-sm font-bold text-outline">
                      완료
                    </div>
                    <h3 className="text-xl font-bold">
                      서울 세종로 정부종합청사 정밀진단
                    </h3>
                  </article>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {homeFieldCasePreview.map((item) => (
                    <Link
                      key={item.slug}
                      id={item.slug}
                      href={`/#${item.slug}`}
                      className="group relative aspect-video overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-8">
                        <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                        <p className="text-sm text-on-primary-container">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24">
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-24 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div id="insights">
              <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-3 text-3xl font-black tracking-[-0.05em] text-primary">
                  <Icon icon={Newspaper} className="size-7 text-secondary" />
                  Latest Insights
                </h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
                >
                  전체 글 보기
                  <Icon icon={ArrowUpRight} className="size-4" />
                </Link>
              </div>
              <div className="space-y-8">
                {blogPreviewPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog#${item.slug}`}
                    className="group flex cursor-pointer flex-col gap-6 sm:flex-row"
                  >
                    <div className="relative h-32 w-full overflow-hidden rounded-sm bg-surface-container sm:w-32 sm:shrink-0">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <div className="mb-2 text-xs font-bold text-secondary">
                        {item.category}
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-primary transition-colors group-hover:text-secondary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div id="faq">
              <h2 className="mb-12 flex items-center gap-3 text-3xl font-black tracking-[-0.05em] text-primary">
                <Icon icon={CircleHelp} className="size-7 text-secondary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((item) => (
                  <article
                    key={item.question}
                    className="border border-outline-variant/10 bg-surface-container-lowest p-6"
                  >
                    <div className="flex items-center justify-between gap-4 text-left font-bold text-primary">
                      <span>{item.question}</span>
                      <Icon
                        icon={item.open ? ChevronDown : Plus}
                        className="size-5 shrink-0"
                      />
                    </div>
                    {item.open ? (
                      <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                        {item.answer}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-primary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(160,65,0,0.95)_0%,transparent_50%)] opacity-30" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 text-center sm:px-8 lg:px-12">
            <h2 className="mb-8 text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">
              신속하고 정확한 상담, 지금 바로 문의하세요
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-on-primary-container">
              고객님의 현장에 가장 적합한 품질 관리 솔루션을 제안해 드립니다.
              <br />
              전문가와 직접 통화하여 궁금증을 해결하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="tel:01012345678"
                className="inline-flex items-center gap-3 rounded-md bg-secondary px-12 py-5 text-xl font-bold text-white transition-transform hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                  boxShadow: "0 16px 30px rgba(255, 107, 44, 0.35)",
                }}
              >
                <Icon icon={Phone} className="size-6" />
                010-1234-5678
              </a>
              <a
                href="mailto:qqstart@naver.com"
                className="inline-flex items-center gap-3 rounded-md border border-white/20 bg-white px-12 py-5 text-xl font-bold text-white backdrop-blur-xl transition-all hover:bg-white/20"
              >
                <Icon icon={Mail} className="size-6" />
                온라인 문의 작성
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
