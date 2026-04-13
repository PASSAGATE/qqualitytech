import type { Metadata } from "next";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "문의 및 견적 | QqualityTech",
  description:
    "QqualityTech의 문의 및 견적 페이지에서 서비스 상담, 장비 구매 및 임대, 상세 견적 요청을 남겨보세요.",
};

const inquiryTypes = [
  "서비스 문의",
  "장비 구매/임대",
  "상세 견적 요청",
] as const;

const contactCards: Array<{
  icon: LucideIcon;
  label: string;
  value: string;
  tone: string;
  iconClassName: string;
}> = [
  {
    icon: Phone,
    label: "Direct Call",
    value: "02-1234-5678",
    tone: "bg-primary text-white group-hover:bg-secondary",
    iconClassName: "text-white",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "contact@qqualitytech.com",
    tone: "bg-primary text-white group-hover:bg-secondary",
    iconClassName: "text-white",
  },
  {
    icon: MessageCircle,
    label: "KakaoTalk",
    value: "@큐퀄리티테크",
    tone: "bg-[#FEE500] text-on-surface",
    iconClassName: "text-on-surface",
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
    <IconComponent
      aria-hidden="true"
      className={className}
      strokeWidth={1.8}
    />
  );
}

export default function ContactPage() {
  return (
    <div className="bg-surface text-on-surface antialiased">
      <SiteHeader activeHref="/contact" />

      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <section className="mb-20 text-center md:text-left">
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-[-0.08em] text-primary md:text-6xl">
            귀하의 프로젝트를 위한
            <br />
            <span className="text-secondary">정밀한 기술 솔루션</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            QqualityTech는 산업 현장의 안전과 정밀함을 최우선으로 생각합니다.
            전문가의 도움이 필요하신가요? 지금 문의해 주세요. 24시간 이내에
            최적의 견적과 솔루션을 제안해 드립니다.
          </p>
        </section>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <section className="rounded-sm border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-sm lg:col-span-7 md:p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                    업체명
                  </label>
                  <input
                    type="text"
                    placeholder="예: (주)퀄리티테크"
                    className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all placeholder:text-outline/50 focus:border-secondary focus:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                    담당자 성함
                  </label>
                  <input
                    type="text"
                    placeholder="홍길동"
                    className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                    이메일
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                  문의 유형
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {inquiryTypes.map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center justify-center gap-2 border border-outline-variant/20 bg-surface-container p-3 transition-colors hover:bg-surface-container-high"
                    >
                      <input
                        type="radio"
                        name="type"
                        className="border-outline-variant text-secondary focus:ring-secondary"
                      />
                      <span className="text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold tracking-tight text-on-surface-variant">
                  상세 내용
                </label>
                <textarea
                  rows={6}
                  placeholder="문의하실 내용을 상세히 적어주시면 더 정확한 상담이 가능합니다."
                  className="w-full resize-none border-0 border-b-2 border-transparent bg-surface-container-highest px-4 py-3 text-on-surface transition-all focus:border-secondary focus:ring-0"
                />
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-sm border-outline-variant text-secondary focus:ring-secondary"
                />
                <span className="text-sm text-on-surface-variant">
                  개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-sm bg-primary py-5 text-lg font-bold text-white transition-all hover:bg-primary-container"
              >
                문의 제출하기
                <Icon icon={Send} className="size-5" />
              </button>
            </form>
          </section>

          <aside className="space-y-8 lg:col-span-5">
            <div className="grid grid-cols-1 gap-4">
              {contactCards.map((card) => (
                <article
                  key={card.label}
                  className="group flex items-center gap-6 bg-surface-container-low p-6 transition-all"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-sm transition-colors ${card.tone}`}
                  >
                    <Icon
                      icon={card.icon}
                      className={`size-6 ${card.iconClassName}`}
                    />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                      {card.label}
                    </p>
                    <p className="text-xl font-black text-primary">
                      {card.value}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-primary">
                <Icon icon={MapPin} className="size-5 text-secondary" />
                오시는 길
              </h3>
              <div className="group relative aspect-video w-full overflow-hidden rounded-sm bg-surface-container-highest">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-NbmRQpjZTjI9ukngIWKJ4V71Zb2HT8WyWQnCYUvWsdLzdExVtbGYuKNE_qYLFfAhK6-sFwlVV4gSeeX3CUBn7Noy6znXtkXhQ4sL4hVNxMfVc68HCbZ3cm1podHK2yOTvvOn7gSt0Jj-bFkK01ZOyTONzJq1RVMrHttUDRzp9tU5HoE06xedebCEAbHRYgT4YYArOM4uZ3ElFICKR_NfH684YS4uEpDQ-C2xrVlHo-9B8vkxjtr0MHBzygbS_Qkefm5cA0ZINXbL"
                  alt="Modern architectural map view showing industrial district in Seoul"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 transition-all group-hover:bg-transparent" />
                <div className="absolute bottom-4 left-4 border-l-4 border-secondary bg-white p-4 shadow-lg">
                  <p className="text-sm font-bold text-primary">
                    서울특별시 성동구 아차산로 123
                  </p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    QqualityTech 테크노 타워 15층
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm bg-primary p-8 text-white">
              <p className="mb-4 text-2xl font-black">
                전문가가 대기 중입니다
              </p>
              <p className="text-sm leading-relaxed text-on-primary-container">
                현장 상황을 고려한 맞춤형 컨설팅을 제공합니다. 문의 사항을
                남겨주시면 평균 4시간 이내에 담당 엔지니어가 직접 검토 후
                회신 드립니다.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
