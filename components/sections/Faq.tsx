import AnchorLink from "@/components/ui/AnchorLink";
import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";
import { FAQ_ITEMS } from "@/lib/faq";

/**
 * SSS bölümü — yerel `<details>/<summary>` üzerine kurulu, sıfır JavaScript.
 *
 * Açılıp kapanma, klavye desteği (Enter/Space), ekran okuyucunun "genişletildi/
 * daraltıldı" duyurusu ve JS kapalıyken çalışma: hepsi tarayıcıdan hazır geliyor.
 * Bu yüzden bölüm bir sunucu bileşeni olarak kalabiliyor ve sayfaya hiç JS
 * eklemiyor — ayrıca sonradan bozulacak bir state mantığı da yok.
 *
 * `name="sss"` aynı anda tek sorunun açık kalmasını sağlar (yine tarayıcının
 * kendi özelliği). Birden fazla sorunun aynı anda açılabilmesini isterseniz
 * o tek özniteliği silmek yeterli.
 */
export default function Faq() {
  // Google, 2023'te SSS zengin sonuçlarını yalnızca resmî kurum ve sağlık
  // sitelerine daraltmıştı; yani buradan arama sonucunda açılır cevaplar
  // beklemeyin. Yapısal veri yine de doğru ve ücretsiz: arama motorlarının ve
  // yapay zekâ tabanlı asistanların sayfayı doğru anlamasına yarıyor.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="sss" className="section-dark-to-black scroll-mt-24 py-25">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] gap-16 px-8 max-md:grid-cols-1 max-md:gap-10">
        {/* Sol sütun masaüstünde sabitleniyor: sorular uzadıkça başlık ekranda
            kalıyor, kullanıcı nerede olduğunu kaybetmiyor. */}
        <FadeUp className="md:sticky md:top-28 md:self-start">
          <Eyebrow>Sık Sorulan Sorular</Eyebrow>
          <h2 className="mb-5 font-display text-[clamp(38px,4.5vw,60px)] leading-[0.95] text-brand-white">
            AKLINIZDA <span className="text-brand-blue">SORU MU VAR</span>
          </h2>
          <p className="mb-8 max-w-95 text-base leading-relaxed font-light text-brand-offwhite">
            En sık aldığımız soruları burada topladık. Aradığınız cevabı
            bulamazsanız yazın, aynı gün dönüş yapalım.
          </p>
          {/* AnchorLink: next/link ile giderken adres zaten #contact ise sayfa
              kaydırılmıyordu — buton bir kez çalışıp sonra ölüyordu. */}
          <AnchorLink
            href="/#contact"
            className="inline-flex items-center gap-2.5 rounded-pill border-1.5 border-white/25 px-7 py-3.5 text-sm font-bold tracking-wide text-brand-offwhite transition-all duration-250 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            Sorunuzu Sorun
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </AnchorLink>
        </FadeUp>

        <FadeUp delay="0.1s" className="flex flex-col">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={item.id}
              id={item.id}
              name="sss"
              className="faq-item group border-b border-white/8 first:border-t"
            >
              <summary className="flex cursor-pointer list-none items-start gap-5 py-6 transition-colors duration-200 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue [&::-webkit-details-marker]:hidden">
                {/* Numaralandırma dizinin sırasından geliyor — soru ekleyince
                    kendiliğinden güncellenir. */}
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 font-display text-lg leading-none text-brand-blue/45 transition-colors duration-200 group-open:text-brand-blue"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-xl leading-snug tracking-wide text-brand-white transition-colors duration-200 group-hover:text-brand-blue group-open:text-brand-blue">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 group-hover:border-brand-blue/50 group-hover:text-brand-blue group-open:rotate-180 group-open:border-brand-blue group-open:text-brand-blue"
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>

              <div className="flex flex-col gap-4 pr-12 pb-7 pl-11 max-sm:pr-0 max-sm:pl-0">
                {item.answer.split("\n\n").map((paragraph, p) => (
                  <p
                    key={p}
                    className="text-[15px] leading-loose font-light text-brand-offwhite"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
