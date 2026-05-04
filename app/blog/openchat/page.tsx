import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteFooter } from "../../../components/site-footer";
import { SiteHeader } from "../../../components/site-header";

const OPENCHAT_URL = "https://open.kakao.com/o/pIyRJnti";

export const metadata: Metadata = {
  title: "점검자료 오픈채팅 | 큐품질관리기술",
  description:
    "큐품질관리기술 점검자료 오픈채팅으로 이동할 수 있는 안내 페이지입니다.",
};

export default function OpenChatPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/blog/openchat" />

      <main className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <section className="mx-auto max-w-4xl space-y-6">
          <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-sm font-bold text-secondary">
              <MessageCircle className="size-4" />
              점검자료 오픈채팅
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl">
              실무 점검자료를 빠르게 확인하세요
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
              큐품질관리기술 오픈채팅에서는 현장에서 자주 필요한 점검자료,
              문의 포인트, 업데이트 정보를 빠르게 확인할 수 있습니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={OPENCHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-secondary px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                오픈채팅 바로가기
                <ExternalLink className="size-4" />
              </Link>
              <span className="text-xs font-semibold text-on-surface-variant">
                새 창으로 열립니다
              </span>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                <ShieldCheck className="size-4 text-secondary" />
                참여 전 확인
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                <li>채팅방 입장 후 공지사항을 먼저 확인해 주세요.</li>
                <li>문의 시 장비명, 모델명, 현장 상황을 함께 남겨 주세요.</li>
                <li>사진이나 영상이 있으면 더 빠르게 안내가 가능합니다.</li>
              </ul>
            </article>

            <article className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                <CheckCircle2 className="size-4 text-secondary" />
                이렇게 활용하세요
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-on-surface-variant">
                <li>점검 전 체크리스트를 공유해 작업 누락을 줄일 수 있습니다.</li>
                <li>유사 사례를 참고해 초기 대응 시간을 단축할 수 있습니다.</li>
                <li>필요 시 상담 페이지와 함께 연계해 문의를 이어가세요.</li>
              </ul>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
