import { Save } from "lucide-react";
import { updateMyPageProfileAction } from "../actions";
import type { UserProfile } from "../my-page-data";

export function ProfileForm({ profile }: { profile: UserProfile }) {
  return (
    <form
      action={updateMyPageProfileAction}
      className="space-y-6 rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary" htmlFor="fullName">
            이름
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={profile.fullName ?? ""}
            maxLength={120}
            className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-primary" htmlFor="phone">
            연락처
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={profile.phone ?? ""}
            maxLength={30}
            className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-primary" htmlFor="companyName">
          소속 회사명
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          defaultValue={profile.companyName ?? ""}
          maxLength={150}
          className="w-full rounded-sm border border-outline-variant/40 bg-surface-container-low px-3 py-2 text-sm outline-none transition-all focus:border-secondary"
        />
      </div>

      <div className="flex justify-end border-t border-outline-variant/20 pt-5">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-sm bg-secondary px-6 py-2.5 font-bold text-white transition-all hover:opacity-90"
        >
          <Save className="size-4" />
          저장
        </button>
      </div>
    </form>
  );
}
