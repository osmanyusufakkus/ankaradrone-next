"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRafScroll } from "@/hooks/useRafScroll";

const NAV_LINKS = [
  { href: "/#packages", label: "Paketler" },
  { href: "/#services", label: "Hizmetler" },
  { href: "/#references", label: "Referanslar" },
  { href: "/projeler", label: "Projeler" },
];

const MENU_ID = "mobile-nav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [menuPathname, setMenuPathname] = useState(pathname);

  useRafScroll(() => setScrolled(window.scrollY > 20));

  // Close the panel when the route changes — mainly the browser's back/forward
  // buttons, since tapping a link inside the panel closes it via onClick.
  // Adjusting during render (rather than in an effect) is React's documented
  // way to reset state on a changed value: it re-renders immediately, before
  // the browser paints the stale open panel.
  if (pathname !== menuPathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    // Stop the page behind the full-height panel from scrolling under it.
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 border-b backdrop-blur-lg transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-brand-blue/25 bg-brand-black/95 shadow-[0_8px_30px_rgba(0,0,0,.35)]"
          : "border-brand-blue/12 bg-brand-black/88"
      }`}
    >
      <div className="flex items-center justify-between px-12 py-4.5 max-md:px-6 max-md:py-3.5">
        <Link
          href="/"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <Image
            src="/images/logo.jpg"
            alt="AnkaraDrone"
            width={1563}
            height={1563}
            priority
            className="h-13 w-13"
          />
        </Link>

        <ul className="flex list-none items-center gap-9 max-md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded text-[13px] font-semibold tracking-wider text-brand-offwhite uppercase transition-colors duration-250 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="rounded-pill bg-brand-blue px-6.5 py-2.5 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-250 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Teklif Al
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls={MENU_ID}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-brand-white transition-colors duration-200 hover:border-brand-blue/50 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue max-md:flex"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden>
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Kept mounted but `hidden` when closed so the toggle's aria-controls
          always points at a real element. */}
      <div
        id={MENU_ID}
        hidden={!menuOpen}
        className="border-t border-white/8 px-6 pt-2 pb-6 md:hidden"
      >
        <ul className="flex list-none flex-col">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg border-b border-white/6 py-4 text-sm font-semibold tracking-wider text-brand-offwhite uppercase transition-colors duration-200 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-5 block rounded-pill bg-brand-blue px-6 py-3.5 text-center text-sm font-bold tracking-wider text-white uppercase transition-colors duration-250 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Teklif Al
        </Link>
      </div>
    </nav>
  );
}
