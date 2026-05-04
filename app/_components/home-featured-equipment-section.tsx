import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import type { EquipmentItem } from "../equipment/data";
import { HomeIcon } from "./home-icon";

export function HomeFeaturedEquipmentSection({
  featuredEquipment,
}: {
  featuredEquipment: EquipmentItem[];
}) {
  return (
    <section id="equipment" className="bg-surface py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 text-4xl font-black tracking-[-0.06em] text-primary">
              Featured Equipment
            </h2>
            <p className="text-on-surface-variant">
              신뢰할 수 있는 데이터의 시작, 프리미엄 시험 장비 라인업
            </p>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-secondary"
          >
            전체 장비 보기
            <HomeIcon icon={ArrowUpRight} className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredEquipment.map((item) => (
            <article
              key={item.slug}
              className="group overflow-hidden border border-outline-variant/20 bg-surface-container-lowest"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.badge ? (
                  <span className="absolute right-4 top-4 rounded-sm bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mb-4 text-sm text-on-surface-variant">
                  {item.description}
                </p>
                <div className="flex items-center justify-between border-t border-outline-variant/10 pt-4">
                  <span className="text-xs font-bold text-secondary">
                    문의 후 안내
                  </span>
                  <Link
                    href={`/equipment/${item.slug}`}
                    aria-label={`${item.title} 상세보기`}
                    className="inline-flex text-outline transition-colors hover:text-secondary"
                  >
                    <HomeIcon icon={PlusCircle} className="size-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
