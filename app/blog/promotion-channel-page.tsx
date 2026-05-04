import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { PromotionChannelGuide } from "./_components/promotion-channel-guide";
import { PromotionChannelHero } from "./_components/promotion-channel-hero";
import { PromotionChannelHighlights } from "./_components/promotion-channel-highlights";
import { PromotionChannelOverview } from "./_components/promotion-channel-overview";
import { PromotionChannelTabs } from "./_components/promotion-channel-tabs";
import type { PromotionChannel } from "./_lib/promotion-channel-types";

export { promotionChannels } from "./_lib/promotion-channel-data";
export type { PromotionChannel } from "./_lib/promotion-channel-types";

export function PromotionChannelPage({
  channel,
}: {
  channel: PromotionChannel;
}) {
  return (
    <div className="bg-surface text-on-surface">
      <SiteHeader activeHref={channel.activeHref} />

      <main>
        <PromotionChannelHero channel={channel} />

        <section className="bg-surface py-24">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <PromotionChannelTabs activeHref={channel.activeHref} />
            <PromotionChannelOverview channel={channel} />
            <PromotionChannelHighlights channel={channel} />
            <PromotionChannelGuide channel={channel} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
