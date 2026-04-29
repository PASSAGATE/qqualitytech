/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { UserRound } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { resolveUserRoleFromBackend } from "@/lib/backend/user-role";
import { logoutAction } from "@/app/admin/actions";
import { fetchMyCart } from "@/lib/backend/cart";
import { HeaderCartButton } from "./header-cart-button";

type NavigationItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

const navigation: readonly NavigationItem[] = [
  {
    label: "회사소개",
    href: "/about",
    children: [
      { label: "인사말", href: "/about" },
      { label: "회사 개요", href: "/about" },
      { label: "경영 이념", href: "/about" },
      { label: "조직도", href: "/about" },
      { label: "오시는 길", href: "/about" },
    ],
  },
  {
    label: "품질 경영",
    href: "/",
    children: [
      { label: "품질 방침", href: "/" },
      { label: "품질 인증", href: "/" },
    ],
  },
  {
    label: "사업분야",
    href: "/",
    children: [
      { label: "건설 품질 관리 및 컨설팅", href: "/" },
      { label: "품질 (시험,관리)계획서 작성 대행", href: "/" },
      { label: "건설 재료 시험 및 검사", href: "/" },
      { label: "콘크리트 균열 및 재료 분리 관리", href: "/" },
    ],
  },
  { label: "시험장비", href: "/equipment" },
  {
    label: "홍보센터",
    href: "/blog",
    children: [
      { label: "유튜브", href: "/blog" },
      { label: "블로그", href: "/blog" },
      { label: "카페", href: "/blog" },
    ],
  },
   {
    label: "고객센터",
    href: "/",
    children: [
      { label: "공지사항", href: "/" },
      { label: "질문/답변", href: "/" },
      { label: "기술자료실", href: "/" },
      { label: "인재채용", href: "/" },
      { label: "A/S문의", href: "/" }
    ],
  },
  {
    label: "문의하기",
    href: "/contact",
    children: [
      { label: "오시는 길", href: "/contact#directions" },
      { label: "고객 문의", href: "/contact#inquiry" },
    ],
  },
] as const;

const adminOnlyNavigationItem: NavigationItem = {
  label: "성적서 진위확인",
  href: "/",
};

export async function SiteHeader({ activeHref }: { activeHref: string }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const role = session?.access_token
    ? await resolveUserRoleFromBackend(session.access_token)
    : null;
  const cart = session?.access_token
    ? await fetchMyCart(session.access_token)
    : null;
  const cartCount = cart?.summary.totalQuantity ?? 0;
  const avatarUrl =
    typeof user?.user_metadata?.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : null;
  const userName =
    (typeof user?.user_metadata?.full_name === "string" &&
      user.user_metadata.full_name.trim()) ||
    (typeof user?.user_metadata?.name === "string" &&
      user.user_metadata.name.trim()) ||
    (user?.email ? user.email.split("@")[0] : "");

  const dashboardHref = role === "admin" ? "/admin" : "/my-page";
  const dashboardLabel = role === "admin" ? "관리자 페이지" : "마이페이지";
  const navigationItems =
    role === "admin" ? [...navigation, adminOnlyNavigationItem] : navigation;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/30 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="flex h-24 items-center justify-between">
          <Link
            href="/"
            className="text-[2rem] font-black tracking-[-0.08em] text-primary"
          >
            큐품질관리기술
          </Link>

          <NavMenu navigation={navigationItems} activeHref={activeHref} />

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="hidden items-center gap-1.5 rounded-md border border-outline-variant/60 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary sm:inline-flex"
                >
                  <UserRound className="size-4" />
                  {dashboardLabel}
                </Link>
                <HeaderCartButton initialCartCount={cartCount} />
                <details className="relative">
                  <summary
                    className="inline-flex list-none cursor-pointer items-center rounded-full border border-outline-variant/60 p-1 transition-colors hover:border-secondary [&::-webkit-details-marker]:hidden"
                    aria-label={`${dashboardLabel} 메뉴`}
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt="사용자 프로필 이미지"
                        className="h-8 w-8 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">
                        {userName ? userName.slice(0, 1).toUpperCase() : "U"}
                      </span>
                    )}
                  </summary>
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-56 rounded-lg border border-outline-variant/60 bg-white p-3 shadow-xl">
                    <p className="truncate text-sm font-semibold text-primary">
                      {userName || "사용자"}
                    </p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {dashboardLabel}
                    </p>
                    <form action={logoutAction} className="mt-3">
                      <button
                        type="submit"
                        className="w-full rounded-md bg-primary-container px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        로그아웃
                      </button>
                    </form>
                  </div>
                </details>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-md border border-outline-variant/70 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary"
                >
                  로그인
                </Link>
                <Link
                  href="/contact"
                  className="hidden rounded-md bg-secondary px-6 py-2.5 text-sm font-serif text-white transition-all duration-200 hover:opacity-85 active:scale-95 sm:inline-flex"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                    boxShadow: "0 12px 24px rgba(255, 107, 44, 0.35)",
                  }}
                >
                  상담 및 견적 요청
                </Link>
              </div>
            )}
            <details className="group lg:hidden">
              <summary className="inline-flex list-none items-center rounded-md border border-outline-variant/80 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary [&::-webkit-details-marker]:hidden">
                메뉴
              </summary>

              <div className="absolute left-0 right-0 top-full border-t border-slate-200/30 bg-white/95 px-5 pb-5 shadow-xl backdrop-blur-xl sm:px-8">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 pt-4">
                  {navigationItems.map((item) => (
                    <div key={item.label}>
                      <Link
                        href={item.href}
                        className={
                          item.href === activeHref
                            ? "rounded-md bg-secondary/10 px-4 py-3 text-sm font-semibold tracking-tight text-secondary"
                            : "rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                        }
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
                        <div className="ml-3 flex flex-col">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="rounded-md px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-secondary"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {user ? (
                    <>
                      <Link
                        href={dashboardHref}
                        className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                      >
                        {dashboardLabel}
                      </Link>
                      <Link
                        href="/cart"
                        className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                      >
                        장바구니
                        {cartCount > 0 ? ` (${cartCount})` : ""}
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                    >
                      로그인
                    </Link>
                  )}

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
