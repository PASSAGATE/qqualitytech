import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "장바구니 | 큐품질관리기술",
  description: "선택한 장비를 확인하고 주문을 준비할 수 있는 장바구니 페이지입니다.",
};

export default function CartPage() {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref="/cart" />
      <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <section className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight text-primary">
            장바구니
          </h1>
          <p className="mt-3 text-on-surface-variant">
            장바구니 기능은 현재 연결 중입니다. 다음 단계에서 주문 플로우와 함께
            완성됩니다.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
