import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#packages", label: "Paketler" },
  { href: "#services", label: "Hizmetler" },
  { href: "#references", label: "Referanslar" },
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-100 flex items-center justify-between border-b border-brand-blue/12 bg-brand-black/88 px-12 py-4.5 backdrop-blur-lg max-md:px-6 max-md:py-3.5">
      <Link href="#hero">
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
            <a
              href={link.href}
              className="text-[13px] font-semibold tracking-wider text-brand-offwhite uppercase transition-colors duration-250 hover:text-brand-blue"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="rounded-pill bg-brand-blue px-6.5 py-2.5 text-[13px] font-bold tracking-wider text-white uppercase transition-all duration-250 hover:-translate-y-0.5 hover:bg-brand-blue-dark"
          >
            Teklif Al
          </a>
        </li>
      </ul>
    </nav>
  );
}
