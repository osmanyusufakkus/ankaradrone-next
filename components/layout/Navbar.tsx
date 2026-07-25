"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#packages", label: "Paketler" },
  { href: "#services", label: "Hizmetler" },
  { href: "#references", label: "Referanslar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 flex items-center justify-between border-b px-12 py-4.5 backdrop-blur-lg transition-all duration-300 max-md:px-6 max-md:py-3.5 ${
        scrolled
          ? "border-brand-blue/25 bg-brand-black/95 shadow-[0_8px_30px_rgba(0,0,0,.35)]"
          : "border-brand-blue/12 bg-brand-black/88"
      }`}
    >
      <a href="#hero" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
        <Image
          src="/images/logo.jpg"
          alt="AnkaraDrone"
          width={1563}
          height={1563}
          priority
          className="h-13 w-13"
        />
      </a>
      <ul className="flex list-none items-center gap-9 max-md:hidden">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="rounded text-[13px] font-semibold tracking-wider text-brand-offwhite uppercase transition-colors duration-250 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="rounded-pill bg-brand-blue px-6.5 py-2.5 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-250 hover:-translate-y-0.5 hover:bg-brand-blue-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Teklif Al
          </a>
        </li>
      </ul>
    </nav>
  );
}
