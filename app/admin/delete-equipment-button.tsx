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
    <div className="inline-flex">
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        className="inline-flex items-center gap-1 rounded-sm border border-[#f2b8b5] px-2.5 py-1.5 text-xs font-semibold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8]"
      >
        <Trash2 className="size-3.5" />
        삭제
      </button>

      {confirmOpen ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-sm rounded-md border border-outline-variant/25 bg-white p-4 text-left shadow-2xl">
            <p className="text-sm font-bold text-primary">정말 삭제하시겠습니까?</p>
            <p className="mt-2 line-clamp-3 text-sm text-on-surface-variant">
              {title}
            </p>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-sm border border-outline-variant/35 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-low"
              >
                취소
              </button>
              <form action={deleteEquipmentAction}>
                <input type="hidden" name="equipment_id" value={equipmentId} />
                <button
                  type="submit"
                  className="rounded-sm bg-[#ba1a1a] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:opacity-90"
                >
                  삭제 확인
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
