import Link from "next/link";
import { channelLinks } from "../_lib/promotion-channel-data";

export function PromotionChannelTabs({ activeHref }: { activeHref: string }) {
  return (
    <nav className="mb-10 flex flex-wrap gap-3" aria-label="홍보센터 채널">
      {channelLinks.map((item) => {
        const isActive = item.activeHref === activeHref;

        return (
          <Link
            key={item.activeHref}
            href={item.activeHref}
            className={
              isActive
                ? "rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white shadow-sm"
                : "rounded-md border border-outline-variant/20 bg-white px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-secondary hover:text-secondary"
            }
            style={
              isActive
                ? {
                    background:
                      "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                    boxShadow: "0 12px 24px rgba(255, 107, 44, 0.25)",
                  }
                : undefined
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
