import type { EquipmentItem } from "../data";
import { AddToCartPanel } from "./add-to-cart-panel";

type CartTarget = {
  equipmentId: string;
  rentalEnabled: boolean;
  saleEnabled: boolean;
};

type EquipmentHeroProps = {
  cartTarget: CartTarget | null;
  item: EquipmentItem;
};

export function EquipmentHero({ cartTarget, item }: EquipmentHeroProps) {
  return (
    <section>
      <div className="mb-2 flex flex-wrap items-center gap-4">
        <span className="rounded-sm bg-primary-container px-3 py-1 text-xs font-bold tracking-[0.2em] text-on-primary-container uppercase">
          {item.itemCode}
        </span>
        <span className="text-sm font-bold text-secondary">
          CAT: {item.catalogCategory}
        </span>
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-[-0.08em] text-primary md:text-5xl">
        {item.title}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
        {item.description}
      </p>

      {cartTarget ? (
        <div className="mt-6 max-w-md">
          <AddToCartPanel
            equipmentId={cartTarget.equipmentId}
            saleEnabled={cartTarget.saleEnabled}
            rentalEnabled={cartTarget.rentalEnabled}
          />
        </div>
      ) : null}
    </section>
  );
}
