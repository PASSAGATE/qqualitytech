import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { fetchMyCart } from "@/lib/backend/cart";
import { deleteCartItemAction, updateCartItemCountAction } from "./actions";

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
  }>;
};

export default async function CartPage({ searchParams }: CartPageProps) {
  const { error, updated, deleted } = await searchParams;
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = supabase
    ? await supabase.auth.getSession()
    : { data: { session: null } };

  const cart = session?.access_token ? await fetchMyCart(session.access_token) : null;

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
              장바구니 수량이 업데이트되었습니다.
            </p>
          ) : null}
          {deleted === "1" ? (
            <p className="mt-4 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
              장바구니 항목이 삭제되었습니다.
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
            <div className="mt-6 space-y-4">
              {cart.items.length === 0 ? (
                <div className="rounded-md border border-outline-variant/20 bg-surface-container-low p-6 text-sm text-on-surface-variant">
                  장바구니가 비어 있습니다.
                </div>
              ) : null}

              {cart.items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-md border border-outline-variant/20 bg-white p-4 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <p className="text-lg font-bold text-primary">{item.equipmentName}</p>
                    <p className="mt-1 text-xs text-on-surface-variant">
                      {item.mode === "buy" ? "구매" : `임대 ${item.rentalMonths ?? 0}개월`}
                      {" · "}
                      단가 {item.unitPrice.toLocaleString("ko-KR")}원
                    </p>
                    <p className="mt-1 text-sm font-semibold text-secondary">
                      합계 {item.lineTotal.toLocaleString("ko-KR")}원
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <form action={updateCartItemCountAction} className="flex items-center gap-2">
                      <input type="hidden" name="itemId" value={item.id} />
                      <input
                        type="number"
                        name="count"
                        min={1}
                        defaultValue={item.count}
                        className="w-20 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                      />
                      <button
                        type="submit"
                        className="rounded-md border border-outline-variant/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-low"
                      >
                        수량 변경
                      </button>
                    </form>
                    <form action={deleteCartItemAction}>
                      <input type="hidden" name="itemId" value={item.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-[#f2b8b5] px-3 py-1.5 text-xs font-semibold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8]"
                      >
                        삭제
                      </button>
                    </form>
                  </div>
                </article>
              ))}

              {cart.items.length > 0 ? (
                <section className="rounded-md border border-outline-variant/20 bg-surface-container-low p-6">
                  <h2 className="text-lg font-bold text-primary">요약</h2>
                  <div className="mt-3 grid gap-2 text-sm text-on-surface-variant md:grid-cols-2">
                    <p>품목 수: {cart.summary.itemCount}</p>
                    <p>총 수량: {cart.summary.totalQuantity}</p>
                    <p>구매 소계: {cart.summary.buySubtotal.toLocaleString("ko-KR")}원</p>
                    <p>임대 소계: {cart.summary.rentSubtotal.toLocaleString("ko-KR")}원</p>
                  </div>
                  <p className="mt-4 text-xl font-black text-primary">
                    총액 {cart.summary.totalAmount.toLocaleString("ko-KR")}원
                  </p>
                </section>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
