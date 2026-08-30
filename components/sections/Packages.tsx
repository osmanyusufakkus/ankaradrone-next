import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import VideoCard from "@/components/ui/VideoCard";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

type Package = {
  id: string;
  num: string;
  tag: string;
  /** Plain-text version of `title`, for aria labels — `title` carries layout markup. */
  label: string;
  title: React.ReactNode;
  desc: string;
  features: string[];
  gradient: string;
  icon: React.ReactNode;
  /**
   * Yalnızca henüz YouTube'a yüklenmemiş işler için geçici yerel klip.
   * `youtubeId` verildiğinde buna hiç gerek yok.
   */
  videoSrc?: string;
  /**
   * İşin YouTube id'si. Verildiğinde üç şey birden bundan türer: kart kapağı,
   * hover önizlemesi ve lightbox. Yani yeni bir iş eklemek için tek gereken bu.
   */
  youtubeId?: string;
  /** Set true if that YouTube upload is a 9:16 Shorts clip rather than 16:9. */
  youtubeVertical?: boolean;
  /**
   * Hover önizlemesinin başlayacağı saniye. Klibin girişindeki logo/yavaş
   * açılışı atlayıp doğrudan "vitrin anından" başlatmak için.
   */
  previewStart?: number;
};

const PACKAGES: Package[] = [
  {
    id: "3d-modelleme",
    num: "01",
    tag: "En Popüler",
    label: "3D Modelleme & Animasyonlu Video",
    youtubeId: "V_-NrZUmLfM",
    youtubeVertical: true,
    // TODO(içerik): her iş için klibin en iyi anının saniyesini yazın.
    previewStart: 3,
    title: (
      <>
        3D Modelleme &amp;
        <br />
        Animasyonlu Video
      </>
    ),
    desc: "Yapı ve inşaat projeleriniz için foto-gerçekçi 3D modeller ve etkileyici fly-through animasyonları. Müşterilerinize projeyi henüz bitmeden gösterin.",
    features: [
      "Fotogrametri ile 3D model üretimi",
      "4K animasyonlu fly-through videosu",
      "Mimari görselleştirme & render",
      "Proje tamamlanma animasyonu",
    ],
    gradient:
      "bg-[linear-gradient(160deg,#0a1628_0%,#0d2040_40%,#0a3060_100%)]",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.843v6.314a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
  {
    id: "ilerleme-takip",
    num: "02",
    tag: "İnşaat & Şantiye",
    label: "İlerleme Takip Çekimleri",
    youtubeId: "V_-NrZUmLfM",
    youtubeVertical: true,
    previewStart: 3,
    title: (
      <>
        İlerleme Takip
        <br />
        Çekimleri
      </>
    ),
    desc: "Şantiye süreçlerini periyodik drone çekimleriyle belgelleyin. Yatırımcılara ve paydaşlara görsel raporlar sunun, proje ilerleyişini adım adım kayıt altına alın.",
    features: [
      "Haftalık / aylık düzenli çekimler",
      "Ortofoto & harita üretimi",
      "Hacim & alan hesaplama",
      "Termal kamera seçeneği",
    ],
    gradient:
      "bg-[linear-gradient(160deg,#0c1a10_0%,#0d2a18_40%,#0a4025_100%)]",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    id: "konut-tanitim",
    num: "03",
    tag: "Gayrimenkul",
    label: "Konut & Site Tanıtım Filmi",
    youtubeId: "vF0Psg_Hsm4",
    youtubeVertical: true,
    previewStart: 3,
    title: (
      <>
        Konut &amp; Site
        <br />
        Tanıtım Filmi
      </>
    ),
    desc: "Konut projeleri, villalar ve siteler için sinematik hava çekimleri. Yaşam alanlarını en iyi açıdan tanıtın, potansiyel alıcılarda ilk izlenimi güçlendirin.",
    features: [
      "Profesyonel sinematik çekim",
      "Drone + yer çekimi kombinasyonu",
      "Renk düzeltme & post prodüksiyon",
      "Müzik & ses tasarımı dahil",
    ],
    gradient:
      "bg-[linear-gradient(160deg,#1a0a28_0%,#250d40_40%,#300a60_100%)]",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "kurumsal-etkinlik",
    num: "04",
    tag: "Kurumsal",
    label: "Kurumsal & Etkinlik Çekimi",
    youtubeId: "V_-NrZUmLfM",
    youtubeVertical: true,
    previewStart: 3,
    title: (
      <>
        Kurumsal &amp;
        <br />
        Etkinlik Çekimi
      </>
    ),
    desc: "Fabrikalar, sanayi tesisleri, AVM'ler ve kurumsal etkinlikler için profesyonel hava çekimi. Markanızı ve tesislerinizi en iyi ışıkta yansıtın.",
    features: [
      "Tesis & fabrika dokümantasyonu",
      "Etkinlik & açılış çekimleri",
      "360° sanal tur seçeneği",
      "Sosyal medya versiyonları dahil",
    ],
    gradient:
      "bg-[linear-gradient(160deg,#1a0f0a_0%,#2a1a0d_40%,#40280a_100%)]",
    icon: (
      <svg
        width="28"
        height="28"
        fill="none"
        stroke="#2196F3"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

export default function Packages() {
  return (
    <section id="packages" className="section-black-to-dark scroll-mt-24 py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-20">
          <Eyebrow>Çekim Paketleri</Eyebrow>
          <h2 className="section-title-glow mb-4 font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
            HİZMET <span className="section-title-glow-accent text-brand-blue">PAKETLERİMİZ</span>
          </h2>
          <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
            Her proje için özelleştirilmiş drone çekim paketleri. Örnek videoyu
            izlemek için kartlara tıklayın.
          </p>
        </FadeUp>

        {PACKAGES.map((pkg, i) => {
          const reverse = i % 2 === 1;
          return (
            <FadeUp
              key={pkg.id}
              className="mb-20 grid grid-cols-2 items-center gap-0 last:mb-0 max-md:grid-cols-1">
              <div
                className={`mx-auto w-full max-w-85 ${reverse ? "md:order-2" : "md:order-1"}`}>
                <VideoCard
                  videoSrc={pkg.videoSrc}
                  youtubeId={pkg.youtubeId}
                  youtubeVertical={pkg.youtubeVertical}
                  previewStart={pkg.previewStart}
                  label={pkg.label}
                  posterSizes="(max-width: 768px) 100vw, 340px"
                  // Gradyan artık kartın arka planı değil, kapağın ÜSTÜNDEKİ
                  // renk katmanı — önizleme oynarken saydamlaşıyor.
                  tintClassName={pkg.gradient}
                  className="aspect-9/16 rounded-drone border-1.5 border-brand-blue/15 bg-brand-dark shadow-[0_24px_60px_rgba(0,0,0,.5)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-101.5 hover:border-brand-blue hover:shadow-[0_32px_80px_rgba(33,150,243,.25)]"
                  hoverHint="▶ Önizle"
                  pulseHint={i === 0}
                  placeholder={
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-black/35 px-5 py-4 backdrop-blur-sm">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-1.5 border-brand-blue/30 bg-brand-blue/12">
                        {pkg.icon}
                      </div>
                      <span className="text-[11px] font-semibold tracking-[2px] text-white/70 uppercase">
                        {pkg.tag}
                      </span>
                    </div>
                  }
                />
              </div>

              <div
                className={`px-14 py-10 max-md:px-4 max-md:py-8 ${reverse ? "md:order-1" : "md:order-2"}`}>
                <div className="-mb-4 font-display text-7xl leading-none text-brand-blue/10">
                  {pkg.num}
                </div>
                <span className="mb-3.5 inline-block rounded-pill border border-brand-blue/20 bg-brand-blue/8 px-3.5 py-1.25 text-[10px] font-bold tracking-[3px] text-brand-blue uppercase">
                  {pkg.tag}
                </span>
                <h3 className="mb-4 font-display text-4xl leading-tight tracking-wide text-brand-white">
                  {pkg.title}
                </h3>
                <p className="mb-7 max-w-105 text-[15px] leading-loose font-light text-brand-offwhite">
                  {pkg.desc}
                </p>
                <ul className="mb-8 flex flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-brand-offwhite before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-brand-blue">
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* "Daha Fazla Örnek Gör" butonu dört pakette de aynıydı, yani
                    /projeler'e giden dört özdeş link. Bölümün sonundaki tek
                    "Tüm Projeler" kartında birleştirildi. */}
                <Button href="#contact">Fiyat Al</Button>
              </div>
            </FadeUp>
          );
        })}

        {/* Bölümü kapatan portföy kartı: dört paketi gezdikten sonra doğal
            sonraki adım tüm işleri görmek. */}
        <FadeUp className="mt-20">
          <Link
            href="/projeler"
            className="group relative flex items-center justify-between gap-8 overflow-hidden rounded-drone border-1.5 border-brand-blue/20 bg-[linear-gradient(135deg,#0d1a2e_0%,#0a2040_55%,#0d1a2e_100%)] px-12 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-[0_28px_70px_rgba(33,150,243,.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue max-md:flex-col max-md:items-start max-md:gap-6 max-md:px-8 max-md:py-8">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_120%_at_80%_50%,rgba(33,150,243,.14)_0%,transparent_70%)]"
            />
            <span className="relative">
              <span className="mb-2 block text-[11px] font-bold tracking-[4px] text-brand-blue uppercase">
                Portföy
              </span>
              <span className="block font-display text-[clamp(28px,3.5vw,44px)] leading-none tracking-wide text-brand-white">
                TÜM PROJELERİMİZİ GÖRÜN
              </span>
              <span className="mt-3 block max-w-125 text-sm leading-relaxed font-light text-brand-offwhite">
                Paketlerin dışında kalan işler, farklı sektörlerden çekimler ve
                proje detayları burada.
              </span>
            </span>
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-1.5 border-brand-blue/40 bg-brand-blue/12 text-brand-blue transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
