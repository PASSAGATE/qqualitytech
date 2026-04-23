"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

type DeliveryFeeRow = {
  id: string;
  region: string;
  fee: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiError = {
  message?: string;
  error?: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DeliveryFeesManagementPanel() {
  const [rows, setRows] = useState<DeliveryFeeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRegion, setNewRegion] = useState("");
  const [newFee, setNewFee] = useState("");
  const [newIsActive, setNewIsActive] = useState(true);
  const [editRegion, setEditRegion] = useState("");
  const [editFee, setEditFee] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);

  const activeCount = useMemo(
    () => rows.filter((row) => row.isActive).length,
    [rows],
  );

  const loadRows = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/delivery-fees", {
        cache: "no-store",
      });

      if (!response.ok) {
        let message = `배송비 목록을 불러오지 못했습니다. (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse errors
        }
        setError(message);
        return;
      }

      const data = (await response.json()) as DeliveryFeeRow[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRows();
  }, []);

  const createFee = async () => {
    const region = newRegion.trim().toLowerCase();
    const fee = Number(newFee);

    if (!region) {
      setError("지역명을 입력해 주세요.");
      return;
    }
    if (!Number.isFinite(fee) || fee < 0) {
      setError("배송비는 0 이상의 숫자로 입력해 주세요.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/admin/delivery-fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          fee,
          isActive: newIsActive,
        }),
      });

      if (!response.ok) {
        let message = `배송비 생성에 실패했습니다. (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse errors
        }
        setError(message);
        return;
      }

      setSuccess("배송비가 등록되었습니다.");
      setNewRegion("");
      setNewFee("");
      setNewIsActive(true);
      await loadRows();
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (row: DeliveryFeeRow) => {
    setEditingId(row.id);
    setEditRegion(row.region);
    setEditFee(String(row.fee));
    setEditIsActive(row.isActive);
    setError(null);
    setSuccess(null);
  };

  const saveEdit = async () => {
    if (!editingId) {
      return;
    }

    const region = editRegion.trim().toLowerCase();
    const fee = Number(editFee);

    if (!region) {
      setError("지역명을 입력해 주세요.");
      return;
    }
    if (!Number.isFinite(fee) || fee < 0) {
      setError("배송비는 0 이상의 숫자로 입력해 주세요.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/admin/delivery-fees/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          fee,
          isActive: editIsActive,
        }),
      });

      if (!response.ok) {
        let message = `배송비 수정에 실패했습니다. (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse errors
        }
        setError(message);
        return;
      }

      setSuccess("배송비가 수정되었습니다.");
      setEditingId(null);
      await loadRows();
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const removeFee = async (row: DeliveryFeeRow) => {
    const ok = window.confirm(
      `${row.region} 지역 배송비를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!ok) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/admin/delivery-fees/${row.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        let message = `배송비 삭제에 실패했습니다. (${response.status})`;
        try {
          const data = (await response.json()) as ApiError;
          message = data.message ?? data.error ?? message;
        } catch {
          // ignore parse errors
        }
        setError(message);
        return;
      }

      setSuccess("배송비가 삭제되었습니다.");
      if (editingId === row.id) {
        setEditingId(null);
      }
      await loadRows();
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mb-10 overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
      <div className="border-b border-outline-variant/10 px-6 py-4">
        <h3 className="text-lg font-bold text-primary">배송비 관리</h3>
        <p className="mt-1 text-sm text-on-surface-variant">
          사용자 결제 단계에서 선택할 지역 배송비를 관리합니다.
        </p>
      </div>

      <div className="grid gap-3 border-b border-outline-variant/10 bg-surface-container-low px-6 py-4 md:grid-cols-[1fr_200px_auto_auto]">
        <input
          value={newRegion}
          onChange={(event) => setNewRegion(event.target.value)}
          placeholder="지역명 (예: seoul)"
          className="rounded-sm border border-outline-variant/35 bg-white px-3 py-2 text-sm outline-none focus:border-secondary"
        />
        <input
          value={newFee}
          onChange={(event) => setNewFee(event.target.value)}
          type="number"
          min={0}
          placeholder="배송비 (원)"
          className="rounded-sm border border-outline-variant/35 bg-white px-3 py-2 text-sm outline-none focus:border-secondary"
        />
        <label className="inline-flex items-center gap-2 rounded-sm border border-outline-variant/30 bg-white px-3 py-2 text-sm font-medium text-on-surface">
          <input
            type="checkbox"
            checked={newIsActive}
            onChange={(event) => setNewIsActive(event.target.checked)}
          />
          활성
        </label>
        <button
          type="button"
          disabled={saving}
          onClick={() => void createFee()}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus className="size-4" />
          추가
        </button>
      </div>

      {error ? (
        <p className="mx-6 mt-4 rounded-sm bg-[#fde8e8] px-4 py-3 text-sm font-semibold text-[#b42318]">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mx-6 mt-4 rounded-sm bg-[#e7f6ec] px-4 py-3 text-sm font-semibold text-[#1d7a3a]">
          {success}
        </p>
      ) : null}

      <div className="px-6 pb-2 pt-4 text-xs font-semibold text-on-surface-variant">
        총 {rows.length}개 / 활성 {activeCount}개
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                지역
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                배송비
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                활성
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                수정일
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-[0.2em]">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {!loading && rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm font-medium text-on-surface-variant"
                >
                  등록된 배송비가 없습니다.
                </td>
              </tr>
            ) : null}
            {rows.map((row) => {
              const isEditing = editingId === row.id;
              return (
                <tr key={row.id}>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        value={editRegion}
                        onChange={(event) => setEditRegion(event.target.value)}
                        className="w-full rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-sm outline-none focus:border-secondary"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-primary">{row.region}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        value={editFee}
                        onChange={(event) => setEditFee(event.target.value)}
                        type="number"
                        min={0}
                        className="w-36 rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-sm outline-none focus:border-secondary"
                      />
                    ) : (
                      <span className="text-sm text-on-surface">
                        {row.fee.toLocaleString("ko-KR")}원
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={editIsActive}
                          onChange={(event) => setEditIsActive(event.target.checked)}
                        />
                        활성
                      </label>
                    ) : (
                      <span
                        className={
                          row.isActive
                            ? "text-sm font-semibold text-[#1d7a3a]"
                            : "text-sm font-semibold text-on-surface-variant"
                        }
                      >
                        {row.isActive ? "활성" : "비활성"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">
                    {formatDateTime(row.updatedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => void saveEdit()}
                            className="rounded-sm bg-primary px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            저장
                          </button>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => setEditingId(null)}
                            className="rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => startEdit(row)}
                            className="rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => void removeFee(row)}
                            className="rounded-sm border border-[#f2b8b5] bg-white px-3 py-1.5 text-xs font-bold text-[#ba1a1a] transition-colors hover:bg-[#fde8e8] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
