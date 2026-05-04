import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { PromotionChannel } from "../_lib/promotion-channel-types";
import { PromotionChannelIcon } from "./promotion-channel-icon";

export function PromotionChannelOverview({
  channel,
}: {
  channel: PromotionChannel;
}) {
  const isYoutube = Boolean(channel.videoEmbedUrl);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <aside className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-4">
        <span
          className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm text-white ${channel.ctaClassName}`}
        >
          <PromotionChannelIcon icon={channel.icon} className="size-5" />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          {channel.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-primary">
          {channel.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
          {channel.description}
        </p>
      </aside>

      <article className="rounded-sm border border-outline-variant/15 bg-white p-8 shadow-sm lg:col-span-8">
        <h3 className="text-3xl font-black text-primary">
          {isYoutube
            ? "장비와 품질관리 내용을 더 쉽게 이해하세요"
            : "실무 자료와 최신 소식을 확인하세요"}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
          {channel.body}
        </p>

        {channel.videoEmbedUrl ? (
          <div className="mt-8 aspect-video overflow-hidden rounded-sm bg-primary shadow-sm">
            <iframe
              title="큐품질관리기술 유튜브 영상"
              src={channel.videoEmbedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        ) : null}

        <Link
          href={channel.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 ${channel.ctaClassName}`}
        >
          {channel.ctaLabel}
          <PromotionChannelIcon icon={ExternalLink} className="size-4" />
        </Link>
      </article>
    </div>
  );
}
