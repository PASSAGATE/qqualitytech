"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type NavigationItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

export function NavMenu({
  navigation,
  activeHref,
}: {
  navigation: readonly NavigationItem[];
  activeHref: string;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scheduleClose() {
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function cancelClose() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  const activeItem = navigation.find((item) => item.label === openMenu);

  return (
    <div className="hidden items-center gap-10 lg:flex">
      {navigation.map((item) => (
        <div
          key={item.label}
          className="relative flex h-full items-center"
          onMouseEnter={() => {
            cancelClose();
            setOpenMenu(item.children ? item.label : null);
          }}
          onMouseLeave={scheduleClose}
        >
          <Link
            href={item.href}
            className={
              item.href === activeHref
                ? "border-b-2 border-secondary pb-1 text-base font-semibold tracking-tight text-secondary"
                : "text-base font-semibold tracking-tight text-primary transition-colors hover:text-secondary"
            }
          >
            {item.label}
          </Link>
        </div>
      ))}

      <div
        className={`fixed inset-x-0 top-[calc(6rem-1px)] z-50 transition-all duration-300 ease-out ${
          openMenu && activeItem?.children
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="w-full border-t border-slate-200/50 bg-white shadow-md">
          <div className="mx-auto flex h-40 w-full max-w-[1600px] items-center justify-center gap-2 px-5 sm:px-8 lg:px-12">
            {activeItem?.children?.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                onClick={() => setOpenMenu(null)}
                className="rounded-sm px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
