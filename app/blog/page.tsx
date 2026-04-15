import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "블로그 | QqualityTech",
  description:
    "QqualityTech의 공식 네이버 블로그와 카페에서 최신 기술 인사이트를 확인하세요.",
};

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

export default function BlogPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/blog" />

      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <header className="mb-12">
          <h1 className="mb-4 text-5xl font-black tracking-[-0.02em] text-primary">
            블로그 & 기술 인사이트
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            공식 네이버 채널에서 최신 장비 소식, 품질관리 가이드, 실무 사례를
            확인하실 수 있습니다.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-secondary uppercase">
              Official Channel
            </p>
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-primary">
              네이버 블로그
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              품질관리 트렌드, 시험 장비 운용 팁, 현장 적용 사례를 확인하세요.
            </p>
            <Link
              href="https://blog.naver.com/qualityms"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
              style={{
                background: "linear-gradient(135deg, #1b7cff 0%, #00a2ff 100%)",
                boxShadow: "0 12px 24px rgba(0, 130, 255, 0.3)",
              }}
            >
              블로그 바로가기
              <Icon icon={ExternalLink} className="size-4" />
            </Link>
          </article>

          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-secondary uppercase">
              Community
            </p>
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-primary">
              네이버 카페
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
              사용자 Q&A, 공지사항, 업데이트 소식을 커뮤니티에서 확인하세요.
            </p>
            <Link
              href="https://cafe.naver.com/qqualitymanagement"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-secondary px-5 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #00b17a 0%, #00d084 100%)",
                boxShadow: "0 12px 24px rgba(0, 190, 120, 0.3)",
              }}
            >
              카페 바로가기
              <Icon icon={ArrowRight} className="size-4" />
            </Link>
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
