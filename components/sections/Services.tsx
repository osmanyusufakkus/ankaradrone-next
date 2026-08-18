import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";

type Service = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    id: "hava-fotografciligi",
    title: "Hava Fotoğrafçılığı",
    desc: "4K RAW formatında profesyonel hava fotoğrafları. Emlak ilanları, mimari ve peyzaj için ideal.",
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  },
  {
    id: "sinematik-video",
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
    title: "3D Modelleme",
    desc: "Fotogrametri ile yüksek doğruluklu 3D model üretimi. Yapı kontrolü ve arşivleme için.",
    icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />,
  },
  {
    id: "360-sanal-tur",
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
    title: "Termal Görüntüleme",
    desc: "Binalarda ısı kaybı tespiti, çatı kontrolleri ve enerji verimliliği analizleri.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    id: "ortofoto-harita",
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

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-brand-black py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-20">
          <Eyebrow>Neler Yapıyoruz</Eyebrow>
          <h2 className="mb-4 font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
            TÜM <span className="text-brand-blue">HİZMETLER</span>
          </h2>
          <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
            Proje başlangıcından son teslimata kadar kapsamlı drone çekim hizmetleri.
          </p>
        </FadeUp>

        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
          {SERVICES.map((service, i) => (
            <FadeUp
              key={service.id}
              delay={`${i * 0.1}s`}
              className="group rounded-3xl border-1.5 border-white/6 bg-brand-card p-9 px-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/35 hover:shadow-[0_20px_50px_rgba(33,150,243,.12)]"
            >
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-brand-blue/20 bg-brand-blue/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <svg width="24" height="24" fill="none" stroke="#2196F3" strokeWidth="2" viewBox="0 0 24 24">
                  {service.icon}
                </svg>
              </div>
              <h3 className="mb-2.5 font-display text-xl tracking-wide text-brand-white">
                {service.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed font-light text-brand-offwhite">
                {service.desc}
              </p>
              {/* Every card used to read "Detaylı Bilgi →" while pointing at the
                  contact form — six identical links to a page that isn't a detail
                  page. The label now says where it actually goes, and names the
                  service so screen-reader users hear six distinct links. */}
              <a
                href="#contact"
                className="inline-block rounded text-xs font-semibold tracking-wide text-brand-blue uppercase decoration-brand-blue underline-offset-4 [text-decoration-line:underline] [text-decoration-color:transparent] transition-[text-decoration-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue group-hover:[text-decoration-color:var(--color-brand-blue)]"
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
