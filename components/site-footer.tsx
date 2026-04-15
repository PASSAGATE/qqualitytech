import Link from "next/link";
import { Globe, Send, Share2 } from "lucide-react";

const footerMutedTextClass = "text-slate-400";

function FooterIcon({
  icon: Icon,
  className = "",
}: {
  icon: typeof Globe;
  className?: string;
}) {
  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-800 bg-primary pt-16 pb-8">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-5 text-sm leading-relaxed sm:px-8 md:grid-cols-4 lg:px-12">
        <div className="md:col-span-1">
          <span className="mb-4 block text-xl font-bold text-white">
            큐품질관리기술
          </span>
          <p className={`mb-6 ${footerMutedTextClass}`}>
            최고의 정밀도와 신뢰성을 바탕으로 산업의 미래를 함께 설계하는 시험
            장비 전문 파트너입니다.
          </p>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-secondary"
            >
              <FooterIcon icon={Share2} className="size-4 text-white" />
            </Link>
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-secondary"
            >
              <FooterIcon icon={Globe} className="size-4 text-white" />
            </Link>
          </div>
        </div>

        <div className={footerMutedTextClass}>
          <h4 className="mb-6 font-bold text-white">메뉴</h4>
          <ul className="space-y-4">
            {[
              { label: "회사소개", href: "/about" },
              { label: "장비 카탈로그", href: "/equipment" },
              { label: "시공 사례", href: "/cases" },
              { label: "온라인 문의", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-block text-inherit transition-transform hover:translate-x-1 hover:text-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={footerMutedTextClass}>
          <h4 className="mb-6 font-bold text-white">고객지원</h4>
          <ul className="space-y-4">
            {[
              { label: "이용약관", href: "#" },
              { label: "개인정보처리방침", href: "#" },
              { label: "자주 묻는 질문", href: "/#faq" },
              { label: "A/S 신청", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                {item.href === "#" ? (
                  <a
                    href={item.href}
                    className="inline-block text-inherit transition-transform hover:translate-x-1 hover:text-secondary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-block text-inherit transition-transform hover:translate-x-1 hover:text-secondary"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-bold text-white">연락처</h4>
          <p className={`mb-2 ${footerMutedTextClass}`}>T. 010-6666-5269</p>
          <p className={`mb-2 ${footerMutedTextClass}`}>F. 02-1234-5679</p>
          <p className={footerMutedTextClass}>E. qqstart@naver.com</p>

          <div className="mt-6 rounded-sm bg-slate-900 p-4">
            <p className="mb-2 text-xs font-bold text-slate-500">NEWSLETTER</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 rounded-l-sm border-none bg-slate-800 p-2 text-xs text-white outline-none focus:ring-1 focus:ring-secondary"
              />
              <button
                type="button"
                className="rounded-r-sm bg-secondary p-2 text-white"
              >
                <FooterIcon icon={Send} className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1600px] border-t border-slate-800 px-5 pt-8 text-center sm:px-8">
        <p className="text-xs text-slate-500">
          © 2024 큐품질관리기술. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
