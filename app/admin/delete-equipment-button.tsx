"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteEquipmentAction } from "./equipment-actions";

type DeleteEquipmentButtonProps = {
  equipmentId: string;
  title: string;
};

export function DeleteEquipmentButton({
  equipmentId,
  title,
}: DeleteEquipmentButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="inline-flex items-center gap-1 rounded-sm border border-[#f2b8b5] px-2.5 py-1.5 text-xs font-semibold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8]"
      >
        <Trash2 className="size-3.5" />
        삭제
      </button>

      {confirmOpen ? (
        <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-md border border-outline-variant/25 bg-white p-3 text-left shadow-xl">
          <p className="text-xs font-semibold text-primary">
            정말 삭제하시겠습니까?
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-on-surface-variant">
            {title}
          </p>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmOpen(false)}
              className="rounded-sm border border-outline-variant/35 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-low"
            >
              취소
            </button>
            <form action={deleteEquipmentAction}>
              <input type="hidden" name="equipment_id" value={equipmentId} />
              <button
                type="submit"
                className="rounded-sm bg-[#ba1a1a] px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90"
              >
                삭제 확인
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
