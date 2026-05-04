import { UserRound } from "lucide-react";
import type { UserProfile } from "../my-page-data";

export function ProfileSummary({
  createdAt,
  displayName,
  profile,
  roleLabel,
}: {
  createdAt: string;
  displayName: string;
  profile: UserProfile;
  roleLabel: string;
}) {
  return (
    <div className="rounded-sm border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-low">
          <UserRound className="size-6 text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-primary">{displayName}</p>
          <p className="text-sm text-on-surface-variant">{profile.email}</p>
        </div>
      </div>

      <div className="grid gap-4 text-sm md:grid-cols-3">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            계정 유형
          </p>
          <p className="font-medium text-primary">{roleLabel}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            계정 생성일
          </p>
          <p className="font-medium text-primary">{createdAt}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            사용자 ID
          </p>
          <p className="truncate font-medium text-primary">{profile.id}</p>
        </div>
      </div>
    </div>
  );
}
