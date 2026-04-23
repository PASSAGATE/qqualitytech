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
            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
              <div className="space-y-4">
                {cart.items.length === 0 ? (
                  <div className="rounded-md border border-outline-variant/20 bg-surface-container-low p-10 text-center text-sm text-on-surface-variant">
                    장바구니가 비어 있습니다.
                  </div>
                ) : null}

                {cart.items.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-md border border-outline-variant/20 bg-white shadow-sm"
                  >
                    <div className="grid gap-4 p-4 sm:grid-cols-[128px_1fr] sm:p-5">
                      <div className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-low">
                        <img
                          src={item.imageUrl || defaultImage}
                          alt={item.equipmentName}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex flex-col justify-between gap-4">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-bold text-on-surface-variant">
                              {item.mode === "buy"
                                ? "구매"
                                : `임대 ${item.rentalMonths ?? 0}개월`}
                            </span>
                            <span className="text-xs font-semibold text-secondary">
                              단가 {item.unitPrice.toLocaleString("ko-KR")}원
                            </span>
                          </div>
                          <p className="text-lg font-bold text-primary">{item.equipmentName}</p>
                          <p className="mt-1 text-sm font-black text-primary-container">
                            합계 {item.lineTotal.toLocaleString("ko-KR")}원
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <form
                            action={updateCartItemCountAction}
                            className="flex items-center gap-2"
                          >
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
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {cart.items.length > 0 ? (
                <aside className="xl:sticky xl:top-28 xl:self-start">
                  <section className="rounded-md border border-outline-variant/20 bg-surface-container-low p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-primary">주문 요약</h2>
                    <div className="mt-4 space-y-2 text-sm text-on-surface-variant">
                      <div className="flex items-center justify-between">
                        <span>품목 수</span>
                        <span className="font-semibold text-primary">
                          {cart.summary.itemCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>총 수량</span>
                        <span className="font-semibold text-primary">
                          {cart.summary.totalQuantity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>구매 소계</span>
                        <span className="font-semibold text-primary">
                          {cart.summary.buySubtotal.toLocaleString("ko-KR")}원
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>임대 소계</span>
                        <span className="font-semibold text-primary">
                          {cart.summary.rentSubtotal.toLocaleString("ko-KR")}원
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 border-t border-outline-variant/20 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                        Total
                      </p>
                      <p className="mt-1 text-2xl font-black text-primary">
                        {cart.summary.totalAmount.toLocaleString("ko-KR")}원
                      </p>
                    </div>
                  </section>
                </aside>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
