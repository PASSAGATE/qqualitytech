"use client";

import { useFormStatus } from "react-dom";

export function StatusUpdateSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm bg-secondary px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "업데이트 중..." : "상태 업데이트"}
    </button>
  );
}
