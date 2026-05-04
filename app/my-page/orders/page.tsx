import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MyPageShell } from "../_components/my-page-shell";
import { MyPageStats } from "../_components/my-page-stats";
import {
  fetchMyOrders,
  getMyOrderStats,
  type MyOrderListResponse,
} from "./my-orders-data";
import { MyOrdersSummary } from "./my-orders-summary";
import { MyOrdersTable } from "./my-orders-table";

export const metadata: Metadata = {
  title: "내 주문 내역 | 큐품질관리기술",
  description: "사용자 주문 내역을 확인하는 페이지입니다.",
};

export default async function MyOrdersPage() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect(
      "/login?error=Supabase%20환경%20설정이%20없습니다.%20관리자에게%20문의해%20주세요.",
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    redirect("/login?error=로그인이%20필요합니다.");
  }

  if (!session?.access_token) {
    redirect("/login?error=세션이%20유효하지%20않습니다.");
  }

  let myOrders: MyOrderListResponse | null = null;
  try {
    myOrders = await fetchMyOrders(session.access_token);
  } catch (fetchError) {
    await supabase.auth.signOut();
    const message =
      fetchError instanceof Error
        ? fetchError.message === "Invalid or expired token"
          ? "세션이 만료되었습니다. 다시 로그인해 주세요."
          : fetchError.message
        : "주문 정보를 불러오지 못했습니다.";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  const stats = getMyOrderStats(myOrders);

  return (
    <MyPageShell activeNav="orders">
      <div className="w-full space-y-6">
        <div className="border-b border-outline-variant/10 pb-6">
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
            내 주문 내역
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            최근 주문 및 결제 상태를 확인할 수 있습니다.
          </p>
        </div>

        <MyPageStats stats={stats} />
        <MyOrdersSummary myOrders={myOrders} />
        <MyOrdersTable myOrders={myOrders} />
      </div>
    </MyPageShell>
  );
}
