import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  /**
   * Bu hizmet bir paketin içinde de varsa o paket. Kartta "Paket 02'de"
   * etiketi olarak görünür ve Paketler bölümündeki satıra (#paket-<id>) gider.
   * Paketler bütün hizmetleri kapsamadığı için alan isteğe bağlı.
   */
  inPackage?: { num: string; id: string };
};

// TODO(içerik): inPackage eşleşmeleri Packages.tsx'teki mevcut (yer tutucu)
// özellik listelerinden çıkarıldı. Paket içerikleri kesinleşince güncelleyin.
const SERVICES: Service[] = [
  {
    id: "hava-fotografciligi",
    title: "Hava Fotoğrafçılığı",
    desc: "4K RAW formatında profesyonel hava fotoğrafları. Emlak ilanları, mimari ve peyzaj için ideal.",
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  },
  {
    id: "sinematik-video",
    inPackage: { num: "03", id: "konut-tanitim" },
    title: "Sinematik Video",
    desc: "Profesyonel renk düzeltme ve post prodüksiyon dahil sinematik drone video prodüksiyon.",
    icon: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  {
    id: "3d-modelleme",
    inPackage: { num: "01", id: "3d-modelleme" },
    title: "3D Modelleme",
    desc: "Fotogrametri ile yüksek doğruluklu 3D model üretimi. Yapı kontrolü ve arşivleme için.",
    icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />,
  },
  {
    id: "360-sanal-tur",
    inPackage: { num: "04", id: "kurumsal-etkinlik" },
    title: "360° Sanal Tur",
    desc: "Gayrimenkul ve otel projeleriniz için interaktif 360° sanal gezinti deneyimleri.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </>
    ),
  },
  {
    id: "termal-goruntuleme",
    inPackage: { num: "02", id: "ilerleme-takip" },
    title: "Termal Görüntüleme",
    desc: "Binalarda ısı kaybı tespiti, çatı kontrolleri ve enerji verimliliği analizleri.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    id: "ortofoto-harita",
    inPackage: { num: "02", id: "ilerleme-takip" },
    title: "Ortofoto & Harita",
    desc: "Arazi ve yapı envanterleri için yüksek çözünürlüklü ortofoto ve CAD uyumlu haritalar.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
  },
];

/**
 * Bulunma eki, sayının okunuşuna göre: 01'de, 02'de, 03'te, 04'te, 06'da…
 * Son rakamın Türkçe okunuşundaki son ünlü ve ünsüz belirliyor (bir, iki, üç,
 * dört, beş, altı, yedi, sekiz, dokuz; 0 için "on/sıfır" → "da").
 */
function locativeSuffix(num: string) {
  const suffixes = ["da", "de", "de", "te", "te", "te", "da", "de", "de", "da"];
  return suffixes[Number(num.at(-1))] ?? "de";
}

export default function Services() {
  return (
    <section id="services" className="section-dark-to-black scroll-mt-24 py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-20">
          <Eyebrow>Neler Yapıyoruz</Eyebrow>
          <h2 className="section-title-glow mb-4 font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
            TÜM <span className="section-title-glow-accent text-brand-blue">HİZMETLER</span>
          </h2>
          <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
            Proje başlangıcından son teslimata kadar kapsamlı drone çekim hizmetleri.
          </p>
        </FadeUp>

        {/* Mobilde de iki sütun: tek sütunda altı kart ~2,2 ekran tutuyordu.
            Dar sütuna sığsın diye kartın iç boşlukları ve yazıları küçülüyor. */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:gap-3">
          {SERVICES.map((service, i) => (
            <FadeUp
              key={service.id}
              delay={`${i * 0.1}s`}
              className="group flex flex-col rounded-3xl border-[1.5px] border-white/6 bg-brand-card p-9 px-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/35 hover:shadow-[0_20px_50px_rgba(33,150,243,.12)] max-sm:rounded-2xl max-sm:p-4"
            >
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-brand-blue/20 bg-brand-blue/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 max-sm:mb-3 max-sm:h-10 max-sm:w-10 max-sm:rounded-xl">
                <svg width="24" height="24" fill="none" stroke="#2196F3" strokeWidth="2" viewBox="0 0 24 24" className="max-sm:h-5 max-sm:w-5">
                  {service.icon}
                </svg>
              </div>
              <h3 className="mb-2.5 font-display text-xl tracking-wide text-brand-white max-sm:mb-1.5 max-sm:text-lg max-sm:leading-tight">
                {service.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed font-light text-brand-offwhite max-sm:mb-3 max-sm:text-[13px] max-sm:leading-snug">
                {service.desc}
              </p>
              {service.inPackage && (
                <a
                  href={`#paket-${service.inPackage.id}`}
                  className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-pill border border-brand-blue/25 bg-brand-blue/8 px-2.5 py-1 text-[10px] font-bold tracking-[1.5px] text-brand-blue-light uppercase transition-colors duration-200 hover:border-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  Paket {service.inPackage.num}&apos;{locativeSuffix(service.inPackage.num)}
                  <span className="sr-only"> — {service.title} bu pakete dahil</span>
                </a>
              )}
              {/* Every card used to read "Detaylı Bilgi →" while pointing at the
                  contact form — six identical links to a page that isn't a detail
                  page. The label now says where it actually goes, and names the
                  service so screen-reader users hear six distinct links. */}
              <a
                href="#contact"
                className="mt-auto inline-block w-fit rounded text-xs font-semibold tracking-wide text-brand-blue uppercase decoration-brand-blue underline-offset-4 [text-decoration-line:underline] [text-decoration-color:transparent] transition-[text-decoration-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue group-hover:[text-decoration-color:var(--color-brand-blue)]"
              >
                Teklif Al
                <span className="sr-only"> — {service.title}</span> →
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
