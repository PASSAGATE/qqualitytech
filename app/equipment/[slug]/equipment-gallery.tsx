"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = {
  image: string;
  alt: string;
};

type EquipmentGalleryProps = {
  title: string;
  images: GalleryImage[];
};

export function EquipmentGallery({ title, images }: EquipmentGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-sm bg-surface-container">
        <Image
          src={activeImage.image}
          alt={activeImage.alt || title}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={`${image.image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-sm border transition-all ${
                activeIndex === index
                  ? "border-secondary"
                  : "border-outline-variant/20 hover:border-secondary/60"
              }`}
            >
              <Image
                src={image.image}
                alt={image.alt || `${title} 썸네일 ${index + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 18vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
