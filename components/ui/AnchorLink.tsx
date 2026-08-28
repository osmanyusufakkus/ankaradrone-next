"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type AnchorLinkProps = {
  /** Hedef, çapa dahil: "/#contact", "/#services", "/projeler" ... */
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Sayfa içi çapalara giden bağlantı.
 *
 * NEDEN VAR: `next/link` ile "/#contact" adresine gitmek, adres çubuğunda zaten
 * "#contact" varken **hiçbir şey yapmaz** — router hedefi mevcut adresle aynı
 * görüp çıkar, sayfa kaydırılmaz. Kullanıcı açısından buton bozuk görünür:
 * bir kez çalışır, sonraki her tıklamada ölü kalır. Düz bir `<a>` ise tarayıcının
 * fragment davranışını kullandığı için aynı çapaya tekrar tıklandığında da
 * kaydırır.
 *
 * Bu bileşen ikisi arasında duruma göre seçim yapar:
 * - Hedef çapa ZATEN bulunduğumuz sayfadaysa → düz `<a href="#capa">`
 *   (her tıklamada kaydırır)
 * - Hedef başka bir sayfadaysa → `next/link`
 *   (sayfa yenilenmeden geçiş yapar)
 */
export default function AnchorLink({ href, children, ...rest }: AnchorLinkProps) {
  const pathname = usePathname();

  const hashIndex = href.indexOf("#");
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex + 1);
  // "/#contact" → "/", "#contact" → "" (yani bulunduğumuz sayfa)
  const targetPath = hashIndex === -1 ? href : href.slice(0, hashIndex) || pathname;

  if (hash && targetPath === pathname) {
    return (
      <a href={`#${hash}`} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
