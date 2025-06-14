"use client";
import { NavbarAccount } from "./NavbarAccount";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "../store/cart-store";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

function useFocusTrap(active: boolean, ref: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!active || !ref.current) return;
    
    const currentRef = ref.current; // FIXED: Capture ref.current in variable
    
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableEls = currentRef.querySelectorAll(focusableSelectors.join(","));
    if (focusableEls.length === 0) return;

    const firstEl = focusableEls[0] as HTMLElement;
    const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === "Escape") {
        (currentRef as any)?.closeMobile?.();
      }
    }

    currentRef.addEventListener("keydown", handleKeyDown);
    firstEl.focus();

    return () => {
      // FIXED: Use captured currentRef instead of ref.current
      currentRef.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, ref]);
}

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const { items } = useCartStore();
  const cartCount = hydrated ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    
    const currentRef = mobileMenuRef.current;
    
    function handleClick(e: MouseEvent) {
      if (currentRef && !currentRef.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  useFocusTrap(mobileOpen, mobileMenuRef);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-neutral-200 shadow-sm transition-all">
      <nav
        className="flex w-full items-center justify-between px-6 py-3 max-w-[1400px] mx-auto"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center space-x-1 group"
          aria-label="WEARHOUSE Home"
        >
          <span className="text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-blue-700 transition-colors">
            WEAR
          </span>
          <span className="text-xl font-light tracking-tight text-neutral-600 group-hover:text-blue-500 transition-colors">
            HOUSE
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <NavLink href="/" label="Home" active={pathname === "/"} />
          <NavLink href="/products" label="Products" active={pathname?.startsWith("/products")} />
          <NavLink href="/checkout" label="Checkout" active={pathname === "/checkout"} />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            className="relative group flex items-center"
            aria-label={`Cart${cartCount > 0 ? `, ${cartCount} item${cartCount > 1 ? "s" : ""}` : ""}`}
          >
            <ShoppingCartIcon className="h-6 w-6 text-neutral-700 group-hover:text-blue-700 transition-colors" />
            {hydrated && cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white border-2 border-white shadow"
                aria-live="polite"
                aria-label={`${cartCount} item${cartCount > 1 ? "s" : ""} in cart`}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <div className="hidden lg:flex">
            <NavbarAccount />
          </div>
          <Button
            variant="ghost"
            className="lg:hidden ring-0 focus-visible:ring-2 focus-visible:ring-blue-600 p-2"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            <span
              className={`transition-transform duration-300 block ${mobileOpen ? "rotate-90 opacity-0" : "opacity-100"}`}
              aria-hidden={mobileOpen}
            >
              <Bars3Icon className="h-6 w-6 text-neutral-700" />
            </span>
            <span
              className={`transition-transform duration-300 block absolute inset-0 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-hidden={!mobileOpen}
            >
              <XMarkIcon className="h-6 w-6 text-neutral-700" />
            </span>
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-neutral-200 animate-in slide-in-from-top duration-200"
            style={{ outline: "none" }}
            tabIndex={-1}
          >
            <ul className="flex flex-col p-6 space-y-5 text-base">
              <li>
                <NavLink href="/" label="Home" active={pathname === "/"} onClick={() => setMobileOpen(false)} />
              </li>
              <li>
                <NavLink href="/products" label="Products" active={pathname?.startsWith("/products")} onClick={() => setMobileOpen(false)} />
              </li>
              <li>
                <NavLink href="/checkout" label="Checkout" active={pathname === "/checkout"} onClick={() => setMobileOpen(false)} />
              </li>
              <li>
                <div>
                  <NavbarAccount />
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-2.5 py-1 text-base font-medium transition-colors rounded
        ${active
          ? "text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-700 after:rounded-full after:scale-x-100"
          : "text-neutral-700 hover:text-blue-700 focus-visible:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-700 after:rounded-full after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100"
        } after:transition-transform after:duration-200 after:origin-left`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}