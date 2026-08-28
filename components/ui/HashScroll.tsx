"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sayfalar arası çapa kaydırmasını tamamlar.
 *
 * NEDEN VAR: App Router başka bir rotaya geçerken sayfayı başa alıyor ve
 * adresteki çapayı dikkate almıyor. Yani `/projeler` sayfasından "Teklif Al"a
 * basıldığında adres `/#contact` oluyor, ana sayfa açılıyor, ama iletişim
 * bölümüne inilmiyor — kullanıcı en tepede kalıyor. (Ölçüldü: hedef 7967px'te,
 * geçişten 3 saniye sonra bile scroll 0.)
 *
 * Bu bileşen rota değiştikten sonra çapayı arayıp oraya kaydırır. Aynı sayfa
 * içindeki çapa tıklamaları rotayı değiştirmediği için buraya hiç uğramaz —
 * onları tarayıcı zaten doğru şekilde hallediyor (bkz. AnchorLink.tsx).
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window.location;
    if (!hash || hash.length < 2) return;

    let target: Element | null = null;
    try {
      target = document.querySelector(hash);
    } catch {
      // Geçersiz seçici üreten bir çapa (ör. "#1-bolum") sayfayı çökertmesin.
      return;
    }
    if (!target) return;

    // Bölümlerdeki `scroll-mt-*` sayesinde sabit menünün altında kalmaz.
    target.scrollIntoView();
  }, [pathname]);

  return null;
}
