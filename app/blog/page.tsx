import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, MessagesSquare, Newspaper, Play } from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "블로그 | 큐품질관리기술",
  description:
    "큐품질관리기술의 공식 네이버 블로그, 카페, 유튜브 채널에서 최신 기술 인사이트를 확인하세요.",
};

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

function YoutubeChannelSection() {
  return (
    <section id="youtube" className="scroll-mt-28 bg-[#dfe8f1] py-20">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#e62117] text-white">
            <Icon icon={Play} className="size-5" />
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Video Channel
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-primary">
            유튜브 채널
          </h2>
          <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
            시험 장비 소개 영상과 현장 실무 팁을 영상으로 확인할 수 있는
            공식 채널입니다.
          </p>
        </div>
        <div className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-7">
          <h3 className="text-2xl font-black text-primary">
            장비와 품질관리 내용을 더 쉽게 이해하세요
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
            현장에서 자주 쓰이는 시험 장비, 품질검사 흐름, 관리 포인트를 영상
            콘텐츠로 정리합니다.
          </p>
          <div className="mt-6 aspect-video overflow-hidden rounded-sm bg-primary shadow-sm">
            <iframe
              title="큐품질관리기술 유튜브 영상"
              src="https://www.youtube.com/embed/xt5rY9FDFPE"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <Link
            href="https://www.youtube.com/channel/UC3y7kzZc2szmtO_LYMhXw6w"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#e62117] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            유튜브 바로가기
            <Icon icon={ExternalLink} className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NaverBlogSection() {
  return (
    <section id="naver-blog" className="scroll-mt-28 bg-surface py-20">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#1b7cff] text-white">
            <Icon icon={Newspaper} className="size-5" />
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Official Channel
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-primary">
            네이버 블로그
          </h2>
          <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
            품질관리 트렌드, 시험 장비 운용 팁, 현장 적용 사례를 정리하는
            공식 블로그입니다.
          </p>
        </div>
        <div className="rounded-sm border border-outline-variant/15 bg-surface-container-lowest p-8 shadow-sm lg:col-span-7">
          <h3 className="text-2xl font-black text-primary">
            실무 자료와 최신 소식을 확인하세요
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
            품질관리 기준, 장비 관리 방법, 현장 사례 등 업무에 바로 참고할 수
            있는 글을 제공합니다.
          </p>
          <Link
            href="https://blog.naver.com/qualityms"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#1b7cff] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            블로그 바로가기
            <Icon icon={ExternalLink} className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NaverCafeSection() {
  return (
    <section id="cafe" className="scroll-mt-28 bg-[#dfe8f1] py-20">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-[#00b17a] text-white">
            <Icon icon={MessagesSquare} className="size-5" />
          </span>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Community
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-primary">
            네이버 카페
          </h2>
          <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
            사용자 문의, 공지사항, 커뮤니티 소식을 확인할 수 있는 네이버 카페
            채널입니다.
          </p>
        </div>
        <div className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-7">
          <h3 className="text-2xl font-black text-primary">
            고객과 소통하는 커뮤니티 공간
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
            장비 사용 문의, 업데이트, 공지사항 등 고객과의 소통이 필요한
            내용을 카페에서 확인할 수 있습니다.
          </p>
          <Link
            href="https://cafe.naver.com/qqualitymanagement"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-sm bg-[#00b17a] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            카페 바로가기
            <Icon icon={ExternalLink} className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/blog" />

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
              블로그 & 기술 인사이트
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-on-primary-container md:text-xl">
                공식 네이버 채널과 유튜브에서 최신 장비 소식, 품질관리 가이드,
                실무 사례를 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </header>

        <YoutubeChannelSection />
        <NaverBlogSection />
        <NaverCafeSection />
      </main>

      <SiteFooter />
    </div>
  );
}
