"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCcw, Save } from "lucide-react";

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

type RegionDraft = {
  fee: string;
  isActive: boolean;
};

const KOREA_TOP_LEVEL_REGIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전북특별자치도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
] as const;

export function DeliveryFeesManagementPanel() {
  const [rows, setRows] = useState<DeliveryFeeRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, RegionDraft>>({});
  const [loading, setLoading] = useState(true);
  const [savingAll, setSavingAll] = useState(false);
  const [savingProgressRegion, setSavingProgressRegion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const rowsByRegion = useMemo(
    () => new Map(rows.map((row) => [row.region, row])),
    [rows],
  );

  const configuredCount = useMemo(
    () => KOREA_TOP_LEVEL_REGIONS.filter((region) => rowsByRegion.has(region)).length,
    [rowsByRegion],
  );

  const activeCount = useMemo(
    () =>
      KOREA_TOP_LEVEL_REGIONS.filter((region) => rowsByRegion.get(region)?.isActive)
        .length,
    [rowsByRegion],
  );

  const hydrateDrafts = (fetchedRows: DeliveryFeeRow[]) => {
    const nextDrafts: Record<string, RegionDraft> = {};
    for (const region of KOREA_TOP_LEVEL_REGIONS) {
      const existing = fetchedRows.find((row) => row.region === region);
      nextDrafts[region] = {
        fee: existing ? String(existing.fee) : "",
        isActive: existing?.isActive ?? true,
      };
    }
    setDrafts(nextDrafts);
  };

  const isChangedRegion = useCallback(
    (region: string) => {
      const draft = drafts[region];
      if (!draft) {
        return false;
      }

      const fee = Number(draft.fee);
      const existing = rowsByRegion.get(region);
      if (!existing) {
        return draft.fee.trim().length > 0;
      }

      return existing.fee !== fee || existing.isActive !== draft.isActive;
    },
    [drafts, rowsByRegion],
  );

  const changedRegionCount = useMemo(
    () => KOREA_TOP_LEVEL_REGIONS.filter((region) => isChangedRegion(region)).length,
    [isChangedRegion],
  );

  const loadRows = useCallback(async () => {
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
      const safeRows = Array.isArray(data) ? data : [];
      setRows(safeRows);
      hydrateDrafts(safeRows);
    } catch {
      setError("백엔드 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRows();
  }, [loadRows]);

  const saveAllRegions = async () => {
    setError(null);
    setSuccess(null);

    for (const region of KOREA_TOP_LEVEL_REGIONS) {
      const draft = drafts[region];
      if (!draft || draft.fee.trim().length === 0) {
        setError(`${region}: 배송비를 입력해 주세요.`);
        return;
      }
      const fee = Number(draft.fee);
      if (!Number.isFinite(fee) || fee < 0) {
        setError(`${region}: 배송비는 0 이상의 숫자로 입력해 주세요.`);
        return;
      }
    }

    const targetRegions = KOREA_TOP_LEVEL_REGIONS.filter((region) =>
      isChangedRegion(region),
    );

    if (targetRegions.length === 0) {
      setSuccess("변경된 내용이 없습니다.");
      return;
    }

    setSavingAll(true);
    try {
      for (const region of targetRegions) {
        setSavingProgressRegion(region);

        const draft = drafts[region];
        if (!draft) {
          continue;
        }

        const fee = Number(draft.fee);
        const existing = rowsByRegion.get(region);
        const endpoint = existing
          ? `/api/admin/delivery-fees/${existing.id}`
          : "/api/admin/delivery-fees";
        const method = existing ? "PATCH" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            region,
            fee,
            isActive: draft.isActive,
          }),
        });

        if (!response.ok) {
          let message = `${region} 저장에 실패했습니다. (${response.status})`;
          try {
            const data = (await response.json()) as ApiError;
            message = data.message ?? data.error ?? message;
          } catch {
            // ignore parse errors
          }
          throw new Error(message);
        }
      }

      await loadRows();
      setSuccess(`${targetRegions.length}개 지역 배송비가 저장되었습니다.`);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "백엔드 연결에 실패했습니다.",
      );
    } finally {
      setSavingProgressRegion(null);
      setSavingAll(false);
    }
  };

  return (
    <section className="mb-10 overflow-hidden rounded-sm bg-surface-container-lowest shadow-sm">
      <div className="border-b border-outline-variant/10 px-6 py-4">
        <h3 className="text-lg font-bold text-primary">배송비 관리 (시/도 17개)</h3>
        <p className="mt-1 text-sm text-on-surface-variant">
          주소 시작 시/도 기준으로 배송비를 설정합니다. 저장 시 해당 지역 fee가 즉시
          checkout 계산에 반영됩니다.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/10 bg-surface-container-low px-6 py-3">
        <p className="text-xs font-semibold text-on-surface-variant">
          설정됨 {configuredCount}/17 · 활성 {activeCount}/17 · 변경됨 {changedRegionCount}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading || savingAll}
            onClick={() => void loadRows()}
            className="inline-flex items-center gap-2 rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw className="size-3.5" />
            새로고침
          </button>
          <button
            type="button"
            disabled={loading || savingAll}
            onClick={() => void saveAllRegions()}
            className="inline-flex items-center gap-2 rounded-sm bg-secondary px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="size-3.5" />
            {savingAll ? "전체 저장 중..." : "전체 저장"}
          </button>
        </div>
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

      <div className="overflow-x-auto">
        <table className="min-w-[960px] w-full border-collapse text-left">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                지역
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                배송비(원)
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                활성
              </th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                현재 상태
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {KOREA_TOP_LEVEL_REGIONS.map((region) => {
              const existing = rowsByRegion.get(region);
              const draft = drafts[region] ?? { fee: "", isActive: true };
              const isChanged = isChangedRegion(region);
              const isSavingCurrent = savingAll && savingProgressRegion === region;

              return (
                <tr key={region}>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">
                    {region}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min={0}
                      value={draft.fee}
                      onChange={(event) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [region]: {
                            ...draft,
                            fee: event.target.value,
                          },
                        }))
                      }
                      placeholder="예: 15000"
                      className="w-40 rounded-sm border border-outline-variant/35 bg-white px-3 py-1.5 text-sm outline-none focus:border-secondary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <label className="inline-flex items-center gap-2 text-sm text-on-surface">
                      <input
                        type="checkbox"
                        checked={draft.isActive}
                        onChange={(event) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [region]: {
                              ...draft,
                              isActive: event.target.checked,
                            },
                          }))
                        }
                      />
                      활성
                    </label>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-on-surface-variant">
                    {isSavingCurrent
                      ? "저장 중..."
                      : isChanged
                        ? "수정됨 (전체 저장 필요)"
                        : existing
                          ? `저장됨 (${existing.isActive ? "활성" : "비활성"})`
                          : "미설정"}
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
