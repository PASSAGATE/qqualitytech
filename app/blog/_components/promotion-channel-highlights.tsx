import type { PromotionChannel } from "../_lib/promotion-channel-types";
import { PromotionChannelIcon } from "./promotion-channel-icon";

export function PromotionChannelHighlights({
  channel,
}: {
  channel: PromotionChannel;
}) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {channel.highlights.map((highlight) => (
        <article
          key={highlight.title}
          className="rounded-sm border border-outline-variant/15 bg-white p-6 shadow-sm transition-colors hover:border-secondary/50"
        >
          <span
            className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm text-white ${channel.ctaClassName}`}
          >
            <PromotionChannelIcon icon={highlight.icon} className="size-5" />
          </span>
          <h3 className="text-xl font-black text-primary">{highlight.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
            {highlight.description}
          </p>
        </article>
      ))}
    </div>
  );
}
