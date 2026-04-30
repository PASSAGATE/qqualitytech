import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpenCheck,
  ClipboardCheck,
  ExternalLink,
  FileText,
  HelpCircle,
  MessagesSquare,
  Newspaper,
  Play,
  SearchCheck,
  Users,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

type PromotionDetail = {
  description: string;
  icon: LucideIcon;
  title: string;
};

type PromotionChannel = {
  activeHref: string;
  body: string;
  ctaClassName: string;
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
  guideDescription: string;
  guideItems: readonly string[];
  guideTitle: string;
  highlights: readonly PromotionDetail[];
  icon: LucideIcon;
  label: string;
  title: string;
  videoEmbedUrl?: string;
};

export const promotionChannels = {
  youtube: {
    activeHref: "/blog/youtube",
    body: "현장에서 자주 쓰이는 시험 장비, 품질검사 흐름, 관리 포인트를 영상 콘텐츠로 정리합니다. 실제 사용 장면을 보면서 장비와 품질관리 내용을 더 쉽게 이해할 수 있습니다.",
    ctaClassName: "bg-[#e62117]",
    ctaHref: "https://www.youtube.com/channel/UC3y7kzZc2szmtO_LYMhXw6w",
    ctaLabel: "유튜브 바로가기",
    description:
      "시험 장비 소개 영상과 현장 실무 팁을 영상으로 확인할 수 있는 공식 채널입니다.",
    eyebrow: "Video Channel",
    guideDescription:
      "영상은 장비를 처음 접하는 담당자 교육이나 현장 점검 전 사전 확인 자료로 활용하기 좋습니다.",
    guideItems: [
      "장비 사용 전 기본 구성과 작동 흐름을 먼저 확인합니다.",
      "현장 점검 전에 품질검사 절차와 주의사항을 영상으로 공유합니다.",
      "신규 담당자 교육 시 반복 설명이 필요한 부분을 영상 자료로 보완합니다.",
      "문의 전 관련 영상을 확인하면 증상 설명과 상담이 더 빨라집니다.",
    ],
    guideTitle: "영상을 이렇게 활용하세요",
    highlights: [
      {
        description:
          "시험장비의 구성, 사용 목적, 현장 적용 방식을 영상으로 쉽게 확인합니다.",
        icon: Play,
        title: "장비 소개 영상",
      },
      {
        description:
          "품질검사 흐름과 사전 점검 포인트를 현장 담당자 눈높이로 정리합니다.",
        icon: ClipboardCheck,
        title: "검사 절차 안내",
      },
      {
        description:
          "장비 운용 중 자주 발생하는 상황과 확인해야 할 항목을 소개합니다.",
        icon: SearchCheck,
        title: "실무 체크포인트",
      },
      {
        description:
          "담당자 교육과 내부 공유에 활용할 수 있는 짧은 콘텐츠를 제공합니다.",
        icon: BookOpenCheck,
        title: "교육 자료 활용",
      },
    ],
    icon: Play,
    label: "유튜브",
    title: "유튜브 채널",
    videoEmbedUrl: "https://www.youtube.com/embed/xt5rY9FDFPE",
  },
  naverBlog: {
    activeHref: "/blog/naver-blog",
    body: "품질관리 기준, 장비 관리 방법, 현장 사례 등 업무에 바로 참고할 수 있는 글을 제공합니다. 최신 소식과 실무 자료를 정리해 고객이 필요한 정보를 빠르게 찾을 수 있도록 운영합니다.",
    ctaClassName: "bg-[#1b7cff]",
    ctaHref: "https://blog.naver.com/qualityms",
    ctaLabel: "블로그 바로가기",
    description:
      "품질관리 트렌드, 시험 장비 운용 팁, 현장 적용 사례를 정리하는 공식 블로그입니다.",
    eyebrow: "Official Channel",
    guideDescription:
      "블로그는 품질관리 문서 작성, 시험장비 운용, 현장 대응 흐름을 차근차근 확인하는 실무형 자료실입니다.",
    guideItems: [
      "공정 시작 전 품질관리계획서와 시험·검사 준비 항목을 확인합니다.",
      "시험 기준이나 장비 운용 방법이 헷갈릴 때 관련 글로 흐름을 먼저 파악합니다.",
      "현장 사례를 참고해 반복되는 품질 리스크와 예방 포인트를 정리합니다.",
      "팀 내부 교육 자료나 고객 안내 자료로 필요한 글을 공유합니다.",
    ],
    guideTitle: "블로그를 이렇게 활용하세요",
    highlights: [
      {
        description:
          "건설 품질관리 기준과 업무 흐름을 실무자가 이해하기 쉬운 언어로 풀어냅니다.",
        icon: BookOpenCheck,
        title: "품질관리 기준 해설",
      },
      {
        description:
          "시험장비 점검, 보관, 운용 시 놓치기 쉬운 관리 포인트를 정리합니다.",
        icon: Wrench,
        title: "시험장비 운용 팁",
      },
      {
        description:
          "현장에서 자주 마주치는 품질 이슈와 대응 방향을 사례 중심으로 소개합니다.",
        icon: FileText,
        title: "현장 사례 정리",
      },
      {
        description:
          "착공부터 준공까지 필요한 품질 문서와 준비 항목을 체크할 수 있습니다.",
        icon: ClipboardCheck,
        title: "서류 준비 체크",
      },
    ],
    icon: Newspaper,
    label: "블로그",
    title: "네이버 블로그",
  },
  cafe: {
    activeHref: "/blog/cafe",
    body: "장비 사용 문의, 업데이트, 공지사항 등 고객과의 소통이 필요한 내용을 카페에서 확인할 수 있습니다. 현장 담당자와 사용자가 함께 정보를 공유하는 커뮤니티 공간입니다.",
    ctaClassName: "bg-[#00b17a]",
    ctaHref: "https://cafe.naver.com/qqualitymanagement",
    ctaLabel: "카페 바로가기",
    description:
      "사용자 문의, 공지사항, 커뮤니티 소식을 확인할 수 있는 네이버 카페 채널입니다.",
    eyebrow: "Community",
    guideDescription:
      "카페는 고객 문의와 공지, 장비 사용 경험을 한곳에서 확인하는 소통 중심 채널입니다.",
    guideItems: [
      "문의 전 장비명, 모델명, 현장 상황, 증상을 간단히 정리합니다.",
      "가능하면 사진이나 영상 자료를 함께 준비해 상담 정확도를 높입니다.",
      "공지사항과 업데이트 글을 확인해 최신 안내를 놓치지 않습니다.",
      "자주 올라오는 질문을 참고해 비슷한 사례의 해결 방향을 먼저 확인합니다.",
    ],
    guideTitle: "카페를 이렇게 활용하세요",
    highlights: [
      {
        description:
          "장비 사용 중 궁금한 점이나 현장 상황에 대한 문의를 남길 수 있습니다.",
        icon: HelpCircle,
        title: "사용 문의 공유",
      },
      {
        description:
          "운영 안내, 서비스 공지, 채널 업데이트를 빠르게 확인할 수 있습니다.",
        icon: Bell,
        title: "공지 및 업데이트",
      },
      {
        description:
          "현장 담당자와 사용자들이 필요한 정보를 공유하는 커뮤니티 공간입니다.",
        icon: Users,
        title: "고객 소통 공간",
      },
      {
        description:
          "장비 점검이나 A/S 상담 전 필요한 정보를 정리하는 데 도움을 줍니다.",
        icon: Wrench,
        title: "점검 상담 연결",
      },
    ],
    icon: MessagesSquare,
    label: "카페",
    title: "네이버 카페",
  },
} satisfies Record<string, PromotionChannel>;

const channelLinks = [
  promotionChannels.youtube,
  promotionChannels.naverBlog,
  promotionChannels.cafe,
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

export function PromotionChannelPage({
  channel,
}: {
  channel: PromotionChannel;
}) {
  const isYoutube = Boolean(channel.videoEmbedUrl);

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={channel.activeHref} />

      <main>
        <header className="relative min-h-[520px] overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKxMhT1zT29SgWveNZtgi3hBnPbNYF1YBLJaZaAdqpj7FhEF6J3ITydPbcJ_gXWWIcZODHm-7HyEoiaCv-RX5J0N8wUHAAFHoE4WB-MNNPqaAQoClczB0cxcoHqt4Qd8LFAbjIq6RY1GI6xTRjCMH8ghshDDkgfDOy9meC2t9yPgBrCC12HjmsTee6rPEYI1BGGXdKz6XcgM_oM1MetBavcfkFQyFk05VJaGlVtQDFpfA-mQZMtS0UZKTYeL2BFxuE_RcN_FQVWy2m"
              alt="Construction site and technical communication"
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
                Promotion Center
              </p>
              <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                {channel.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                {channel.description}
              </p>
            </div>
          </div>
        </header>

        <section className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <nav className="mb-10 flex flex-wrap gap-3" aria-label="홍보센터 채널">
              {channelLinks.map((item) => {
                const isActive = item.activeHref === channel.activeHref;

                return (
                  <Link
                    key={item.activeHref}
                    href={item.activeHref}
                    className={
                      isActive
                        ? "rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white shadow-sm"
                        : "rounded-md border border-outline-variant/20 bg-white px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-secondary hover:text-secondary"
                    }
                    style={
                      isActive
                        ? {
                            background:
                              "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                            boxShadow:
                              "0 12px 24px rgba(255, 107, 44, 0.25)",
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <aside className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-4">
                <span
                  className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm text-white ${channel.ctaClassName}`}
                >
                  <Icon icon={channel.icon} className="size-5" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  {channel.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-primary">
                  {channel.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                  {channel.description}
                </p>
              </aside>

              <article className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-8">
                <h3 className="text-3xl font-black text-primary">
                  {isYoutube
                    ? "장비와 품질관리 내용을 더 쉽게 이해하세요"
                    : "실무 자료와 최신 소식을 확인하세요"}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
                  {channel.body}
                </p>

                {channel.videoEmbedUrl ? (
                  <div className="mt-8 aspect-video overflow-hidden rounded-sm bg-primary shadow-sm">
                    <iframe
                      title="큐품질관리기술 유튜브 영상"
                      src={channel.videoEmbedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                ) : null}

                <Link
                  href={channel.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 ${channel.ctaClassName}`}
                >
                  {channel.ctaLabel}
                  <Icon icon={ExternalLink} className="size-4" />
                </Link>
              </article>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {channel.highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-colors hover:border-secondary/50"
                >
                  <span
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm text-white ${channel.ctaClassName}`}
                  >
                    <Icon icon={highlight.icon} className="size-5" />
                  </span>
                  <h3 className="text-xl font-black text-primary">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <article className="rounded-sm bg-primary p-8 text-white shadow-sm lg:col-span-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Channel Guide
                </p>
                <h3 className="mt-3 text-3xl font-black leading-tight">
                  {channel.guideTitle}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-on-primary-container">
                  {channel.guideDescription}
                </p>
              </article>

              <div className="space-y-3 lg:col-span-7">
                {channel.guideItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 rounded-sm border border-outline-variant/15 bg-white p-5 shadow-sm"
                  >
                    <span className="shrink-0 text-sm font-black text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
