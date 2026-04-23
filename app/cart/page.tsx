import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fetchMyCart } from "@/lib/backend/cart";
import { CartLivePanel } from "./cart-live-panel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "장바구니 | 큐품질관리기술",
  description: "선택한 장비를 확인하고 주문을 준비할 수 있는 장바구니 페이지입니다.",
};

type CartPageProps = {
  searchParams: Promise<{
    error?: string;
    updated?: string;
    deleted?: string;
    confirmed?: string;
  }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const { error, updated, deleted, confirmed } = await searchParams;
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = supabase
    ? await supabase.auth.getSession()
    : { data: { session: null } };

  const cart = session?.access_token ? await fetchMyCart(session.access_token) : null;
  const defaultImage = "/window.svg";

  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/cart" />
      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <section className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight text-primary">
            장바구니
          </h1>
          <p className="mt-3 text-on-surface-variant">장바구니 품목을 확인하고 주문을 준비해 주세요.</p>

          {updated === "1" ? (
            <p className="mt-4 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장바구니 항목이 업데이트되었습니다.
            </p>
          ) : null}
          {deleted === "1" ? (
            <p className="mt-4 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장바구니 항목이 삭제되었습니다.
            </p>
          ) : null}
          {confirmed === "1" ? (
            <p className="mt-4 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              주문이 생성되었습니다. 결제를 진행해 주세요.
            </p>
          ) : null}
          {error ? (
            <p className="mt-4 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
              {error}
            </p>
          ) : null}

          {!session?.access_token ? (
            <div className="mt-6 rounded-md border border-outline-variant/20 bg-surface-container-low p-6">
              <p className="text-sm text-on-surface-variant">
                장바구니를 사용하려면 먼저 로그인해 주세요.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                로그인하기
              </Link>
            </div>
          ) : null}

          {session?.access_token && cart ? (
            <CartLivePanel cart={cart} defaultImage={defaultImage} />
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
