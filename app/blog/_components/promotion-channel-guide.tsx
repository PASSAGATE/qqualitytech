import type { PromotionChannel } from "../_lib/promotion-channel-types";

export function PromotionChannelGuide({
  channel,
}: {
  channel: PromotionChannel;
}) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <article className="rounded-sm bg-primary p-8 text-white shadow-sm lg:col-span-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          Channel Guide
        </p>
        <h3 className="mt-3 text-3xl font-black leading-tight">
          {channel.guideTitle}
        </h3>
        <p className="mt-5 text-sm leading-relaxed text-on-primary-container">
          {channel.guideDescription}
        </p>
      </article>

      <div className="space-y-3 lg:col-span-7">
        {channel.guideItems.map((item, index) => (
          <div
            key={item}
            className="flex gap-5 rounded-sm border border-outline-variant/15 bg-white p-5 shadow-sm"
          >
            <span className="shrink-0 text-sm font-black text-secondary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
