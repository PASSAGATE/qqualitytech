import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="" />

      <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,rgba(16,42,67,0.95)_100%)]" />

        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-secondary">
            404 Error
          </p>
          <h1 className="mb-6 text-8xl font-black leading-none tracking-[-0.04em] text-white md:text-[10rem]">
            404
          </h1>
          <p className="mb-4 text-2xl font-black text-white md:text-3xl">
            페이지를 찾을 수 없습니다
          </p>
          <p className="mb-12 text-base leading-relaxed text-on-primary-container">
            요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-4 text-base font-bold text-primary transition-all hover:bg-white/90 active:scale-95"
            >
              <ArrowLeft className="size-5" strokeWidth={1.8} />
              홈으로 돌아가기
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/20 active:scale-95"
            >
              문의하기
              <ArrowRight className="size-5" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm font-semibold text-on-primary-container">
            {[
              { label: "회사소개", href: "/about/greeting" },
              { label: "시험장비", href: "/equipment" },
              { label: "사업분야", href: "/business/quality-management-consulting" },
              { label: "고객센터", href: "/support/notices" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="absolute bottom-8 text-xs font-medium tracking-[0.2em] text-white/20 uppercase">
          큐품질관리기술
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
