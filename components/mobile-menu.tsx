"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

type NavigationItem = {
  disabled?: boolean;
  label: string;
  href: string;
  children?: readonly { disabled?: boolean; label: string; href: string }[];
};

type MobileMenuProps = {
  navigation: readonly NavigationItem[];
  activeHref: string;
  user: boolean;
  dashboardHref: string;
  dashboardLabel: string;
  cartCount: number;
};

export function MobileMenu({
  navigation,
  activeHref,
  user,
  dashboardHref,
  dashboardLabel,
  cartCount,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    setOpenSubmenu(null);
  }

  function toggleSubmenu(label: string) {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-md border border-outline-variant/80 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-secondary hover:text-secondary"
      >
        메뉴
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={close}
          />

          <div className="absolute left-0 right-0 top-full z-50 border-t border-slate-200/30 bg-white/95 shadow-xl backdrop-blur-xl">
            <div className="mx-auto w-full max-w-[1600px] px-5 pb-5 sm:px-8">
              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-semibold text-on-surface-variant">
                  메뉴
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-md border border-outline-variant/60 p-2 text-primary transition-colors hover:border-secondary hover:text-secondary"
                >
                  <X className="size-4" strokeWidth={1.8} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const isActive =
                    !item.disabled &&
                    (item.href === activeHref ||
                      item.children?.some(
                        (child) => !child.disabled && child.href === activeHref,
                      ));

                  return (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleSubmenu(item.label)}
                            className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-semibold tracking-tight transition-colors ${
                              isActive
                                ? "bg-secondary/10 text-secondary"
                                : "text-primary hover:bg-surface-container-low hover:text-secondary"
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              className={`size-4 transition-transform duration-200 ${
                                openSubmenu === item.label ? "rotate-180" : ""
                              }`}
                              strokeWidth={1.8}
                            />
                          </button>

                          {openSubmenu === item.label && (
                            <div className="ml-3 flex flex-col">
                              {item.children.map((child) =>
                                child.disabled ? (
                                  <button
                                    key={child.label}
                                    type="button"
                                    aria-disabled="true"
                                    className="cursor-default rounded-md px-4 py-2 text-left text-sm font-medium text-on-surface-variant"
                                  >
                                    {child.label}
                                  </button>
                                ) : (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={close}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-secondary"
                                  >
                                    {child.label}
                                  </Link>
                                ),
                              )}
                            </div>
                          )}
                        </>
                      ) : item.disabled ? (
                        <button
                          type="button"
                          aria-disabled="true"
                          className="cursor-default rounded-md px-4 py-3 text-left text-sm font-semibold tracking-tight text-primary"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={close}
                          className={
                            isActive
                              ? "block rounded-md bg-secondary/10 px-4 py-3 text-sm font-semibold tracking-tight text-secondary"
                              : "block rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                          }
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {user ? (
                  <>
                    <Link
                      href={dashboardHref}
                      onClick={close}
                      className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                    >
                      {dashboardLabel}
                    </Link>
                    <Link
                      href="/cart"
                      onClick={close}
                      className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                    >
                      장바구니{cartCount > 0 ? ` (${cartCount})` : ""}
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={close}
                    className="rounded-md px-4 py-3 text-sm font-semibold tracking-tight text-primary transition-colors hover:bg-surface-container-low hover:text-secondary"
                  >
                    로그인
                  </Link>
                )}

                <Link
                  href="/contact"
                  onClick={close}
                  className="mt-2 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-85 active:scale-95 sm:hidden"
                  style={{
                    background: "linear-gradient(135deg, #ff9a3c 0%, #ff6b2c 100%)",
                    boxShadow: "0 10px 22px rgba(255, 107, 44, 0.35)",
                  }}
                >
                  상담 및 견적 요청
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
