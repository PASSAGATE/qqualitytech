import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, MessagesSquare, Newspaper, Play } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

type PromotionChannel = {
  activeHref: string;
  body: string;
  ctaClassName: string;
  ctaHref: string;
  ctaLabel: string;
  description: string;
  eyebrow: string;
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
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
