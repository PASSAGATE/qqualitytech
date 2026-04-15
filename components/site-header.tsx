import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const navigation = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "시험장비", href: "/equipment" },
  { label: "시공사례", href: "/cases" },
  { label: "블로그", href: "/blog" },
  { label: "문의하기", href: "/contact" },
] as const;

export async function SiteHeader({ activeHref }: { activeHref: string }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  const navigationItems = user
    ? [...navigation, { label: "관리자", href: "/admin" as const }]
    : navigation;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/30 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="text-[1.75rem] font-black tracking-[-0.08em] text-primary"
          >
            큐품질관리기술
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navigationItems.map((item) => (
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
              className="hidden rounded-md bg-secondary px-6 py-2.5 text-sm font-serif text-white transition-all duration-200 hover:opacity-85 active:scale-95 sm:inline-flex"
              style={{
                background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                boxShadow: "0 12px 24px rgba(255, 107, 44, 0.35)",
              }}
            >
              상담 및 견적 요청
            </Link>
            <details className="group lg:hidden">
              <summary className="inline-flex list-none items-center rounded-md border border-outline-variant/80 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary [&::-webkit-details-marker]:hidden">
                메뉴
              </summary>

              <div className="absolute left-0 right-0 top-full border-t border-slate-200/30 bg-white/95 px-5 pb-5 shadow-xl backdrop-blur-xl sm:px-8">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 pt-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={
                        item.href === activeHref
                          ? "rounded-md bg-secondary/10 px-4 py-3 text-sm font-semibold tracking-tight text-secondary"
                          : "rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                      }
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link
                    href="/contact"
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-secondary px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 active:scale-95 sm:hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                      boxShadow: "0 10px 22px rgba(255, 107, 44, 0.35)",
                    }}
                  >
                    상담 및 견적 요청
                  </Link>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
