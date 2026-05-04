"use client";

import Image from "next/image";
import Link from "next/link";
import type { DraftItem } from "./cart-live-panel-utils";
import { getDraftLineTotal } from "./cart-live-panel-utils";

type CartItemCardProps = {
  defaultImage: string;
  error?: string;
  isSaving: boolean;
  item: DraftItem;
  onDeleteItem: (itemId: string) => void | Promise<void>;
  onSwitchMode: (itemId: string, nextMode: "buy" | "rent") => void;
  onUpdateBuyCount: (itemId: string, nextCount: number) => void;
  onUpdateRentCount: (itemId: string, nextCount: number) => void;
  onUpdateRentMonths: (itemId: string, nextMonths: number) => void;
};

export function CartItemCard({
  defaultImage,
  error,
  isSaving,
  item,
  onDeleteItem,
  onSwitchMode,
  onUpdateBuyCount,
  onUpdateRentCount,
  onUpdateRentMonths,
}: CartItemCardProps) {
  const liveLineTotal = getDraftLineTotal(item);
  const detailHref = item.equipmentSlug
    ? `/equipment/${item.equipmentSlug}?id=${item.equipmentId}`
    : null;

  return (
    <article className="overflow-hidden rounded-md border border-outline-variant/20 bg-white shadow-sm">
      <div className="grid gap-4 p-4 sm:grid-cols-[128px_1fr] sm:p-5">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-outline-variant/20 bg-surface-container-low">
          {detailHref ? (
            <Link href={detailHref} className="block h-full w-full">
              <Image
                src={item.imageUrl || defaultImage}
                alt={item.equipmentName}
                fill
                sizes="128px"
                className="object-cover"
              />
            </Link>
          ) : (
            <Image
              src={item.imageUrl || defaultImage}
              alt={item.equipmentName}
              fill
              sizes="128px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {item.equipmentType === "sale_and_rental" ? (
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-on-surface-variant">
                    {item.mode === "buy"
                      ? "구매 항목"
                      : `임대 ${item.draftRentalMonths}개월`}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onSwitchMode(
                        item.id,
                        item.mode === "buy" ? "rent" : "buy",
                      )
                    }
                    className="rounded-md border border-outline-variant/35 bg-white px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low"
                  >
                    {item.mode === "buy" ? "임대로 변경" : "구매로 변경"}
                  </button>
                </div>
              ) : item.mode === "rent" ? (
                <span className="text-[11px] font-semibold text-on-surface-variant">
                  임대 {item.draftRentalMonths}개월
                </span>
              ) : null}
              <span className="text-xs font-semibold text-secondary">
                단가 {item.unitPrice.toLocaleString("ko-KR")}원
              </span>
            </div>
            {detailHref ? (
              <Link
                href={detailHref}
                className="text-lg font-bold text-primary transition-colors hover:text-secondary"
              >
                {item.equipmentName}
              </Link>
            ) : (
              <p className="text-lg font-bold text-primary">
                {item.equipmentName}
              </p>
            )}
            <p className="mt-1 text-sm font-black text-primary-container">
              합계 {liveLineTotal.toLocaleString("ko-KR")}원
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {item.mode === "buy" ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-on-surface-variant">
                  수량
                </span>
                <input
                  type="number"
                  min={1}
                  value={item.draftCount}
                  onChange={(event) => {
                    onUpdateBuyCount(item.id, Number(event.target.value));
                  }}
                  className="w-20 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                />
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-on-surface-variant">
                  수량
                </span>
                <input
                  type="number"
                  min={1}
                  value={item.draftCount}
                  onChange={(event) => {
                    onUpdateRentCount(item.id, Number(event.target.value));
                  }}
                  className="w-20 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                />
                <input
                  type="number"
                  min={6}
                  max={36}
                  value={item.draftRentalMonths}
                  onChange={(event) => {
                    onUpdateRentMonths(item.id, Number(event.target.value));
                  }}
                  className="w-24 rounded-md border border-outline-variant/40 px-2 py-1.5 text-sm"
                />
                <span className="text-xs font-semibold text-on-surface-variant">
                  개월
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => void onDeleteItem(item.id)}
              className="rounded-md border border-[#f2b8b5] px-3 py-1.5 text-xs font-semibold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8]"
            >
              삭제
            </button>

            {isSaving ? (
              <span className="text-xs font-semibold text-secondary">
                저장 중...
              </span>
            ) : null}
          </div>
          {error ? (
            <p className="text-xs font-semibold text-[#b42318]">{error}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
