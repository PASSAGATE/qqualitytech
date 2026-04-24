import type { Metadata } from "next";
import { AdminShell } from "../admin-shell";
import { requireAdminSession } from "../admin-auth";
import { DeliveryFeesManagementPanel } from "../delivery-fees-management-panel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "배송비 관리 | 관리자",
  description: "관리자 배송비 관리 페이지",
};

export default async function AdminDeliveryFeesPage() {
  await requireAdminSession();

  return (
    <AdminShell activeNav="deliveryFees">
      <section className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-primary">
          배송비 관리 (시/도 17개)
        </h2>
        <p className="mt-2 max-w-2xl text-on-surface-variant">
          시/도 17개 기준으로 배송비를 입력/활성화할 수 있습니다.
        </p>
      </section>

      <DeliveryFeesManagementPanel />
    </AdminShell>
  );
}

