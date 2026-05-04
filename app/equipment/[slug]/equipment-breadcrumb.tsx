import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { EquipmentItem } from "../data";

export function EquipmentBreadcrumb({ item }: { item: EquipmentItem }) {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
      <Link href="/equipment" className="transition-colors hover:text-secondary">
        장비 카탈로그
      </Link>
      <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
      <Link href="/equipment" className="transition-colors hover:text-secondary">
        {item.categoryLabel}
      </Link>
      <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
      <span className="font-medium text-primary">{item.title}</span>
    </nav>
  );
}
