import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "../admin-shell";
import { requireAdminSession } from "../admin-auth";
import { fetchAdminOrders } from "@/lib/backend/orders";
import { OrderManagementPanel } from "../order-management-panel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "주문 관리 | 관리자",
  description: "관리자 주문 관리 페이지",
};

type OrdersPageProps = {
  searchParams: Promise<{
    paymentUpdated?: string;
    paymentError?: string;
    paymentOrderId?: string;
    page?: string;
  }>;
};

export default async function AdminOrdersPage({ searchParams }: OrdersPageProps) {
  const { paymentUpdated, paymentError, paymentOrderId, page } =
    await searchParams;
  const { session } = await requireAdminSession();
  const parsedPage = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const pageSize = 10;

  const adminOrders = session?.access_token
    ? await fetchAdminOrders(session.access_token, {
        page: currentPage,
        limit: pageSize,
      })
    : null;
  const total = adminOrders?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const prevPage = Math.max(1, safePage - 1);
  const nextPage = Math.min(totalPages, safePage + 1);

  return (
    <AdminShell activeNav="orders">
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
          주문 관리
        </h2>
        <p className="mt-2 max-w-2xl text-on-surface-variant">
          주문 상태/결제 상태를 확인하고 결제대기 건을 처리합니다.
        </p>
      </section>

      <OrderManagementPanel
        orders={adminOrders?.items ?? []}
        total={total}
        currentPage={safePage}
        paymentUpdated={paymentUpdated === "1"}
        paymentError={paymentError ?? null}
        paymentOrderId={paymentOrderId ?? null}
      />

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-medium text-on-surface-variant">
          총 {total}건, {safePage}/{totalPages} 페이지
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/orders?page=${prevPage}`}
            aria-disabled={safePage <= 1}
            className={`rounded-sm px-3 py-1.5 text-xs font-bold transition-colors ${
              safePage <= 1
                ? "pointer-events-none bg-surface-container-high text-on-surface-variant/50"
                : "bg-surface-container-high text-primary hover:bg-surface-container-highest"
            }`}
          >
            이전
          </Link>
          <span className="text-xs font-semibold text-on-surface-variant">
            {safePage} / {totalPages}
          </span>
          <Link
            href={`/admin/orders?page=${nextPage}`}
            aria-disabled={safePage >= totalPages}
            className={`rounded-sm px-3 py-1.5 text-xs font-bold transition-colors ${
              safePage >= totalPages
                ? "pointer-events-none bg-surface-container-high text-on-surface-variant/50"
                : "bg-surface-container-high text-primary hover:bg-surface-container-highest"
            }`}
          >
            다음
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
