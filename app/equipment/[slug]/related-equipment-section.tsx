import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RelatedEquipmentCard } from "./equipment-detail-helpers";

function RelatedEquipmentCardLink({
  card,
  mobile = false,
}: {
  card: RelatedEquipmentCard;
  mobile?: boolean;
}) {
  const { href, item } = card;

  return (
    <Link
      href={href}
      className={
        mobile
          ? "group block min-w-[78%] snap-start rounded-sm bg-surface-container-lowest p-2"
          : "group block"
      }
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm bg-surface-container">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={mobile ? "80vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mb-1 text-xs font-bold text-secondary">{item.itemCode}</p>
      <h4 className="text-lg font-bold text-primary transition-colors group-hover:text-secondary">
        {item.title}
      </h4>
      <p className="mt-2 line-clamp-2 text-sm text-on-surface-variant">
        {item.relatedDescription}
      </p>
    </Link>
  );
}

export function RelatedEquipmentSection({
  relatedCards,
}: {
  relatedCards: RelatedEquipmentCard[];
}) {
  return (
    <section className="mt-24 border-t border-surface-container-high pt-16">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">
            관련 시험 장비
          </h2>
          <p className="mt-2 text-on-surface-variant">
            함께 검토하기 좋은 추천 솔루션입니다.
          </p>
        </div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-1 font-bold text-secondary transition-colors hover:underline"
        >
          모든 장비 보기
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </Link>
      </div>

      <div className="-mx-5 overflow-x-auto px-5 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 pb-2">
          {relatedCards.map((card) => (
            <RelatedEquipmentCardLink
              key={card.item.slug}
              card={card}
              mobile
            />
          ))}
        </div>
      </div>

      <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-3">
        {relatedCards.map((card) => (
          <RelatedEquipmentCardLink key={card.item.slug} card={card} />
        ))}
      </div>
    </section>
  );
}
