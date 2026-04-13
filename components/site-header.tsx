import Link from "next/link";

const navigation = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "시험장비", href: "/equipment" },
  { label: "시공사례", href: "/cases" },
  { label: "블로그", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "문의하기", href: "/contact" },
] as const;

export function SiteHeader({ activeHref }: { activeHref: string }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/30 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-[1.75rem] font-black tracking-[-0.08em] text-primary"
        >
          QqualityTech
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.href === activeHref
                  ? "border-b-2 border-secondary pb-1 text-sm font-semibold tracking-tight text-secondary"
                  : "text-sm font-semibold tracking-tight text-primary transition-colors hover:text-secondary"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-md bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 active:scale-95 sm:inline-flex"
          >
            상담 및 견적 요청
          </Link>
          <button
            type="button"
            aria-label="메뉴 열기"
            className="inline-flex rounded-md border border-outline-variant/80 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary lg:hidden"
          >
            메뉴
          </button>
        </div>
      </div>
    </nav>
  );
}
