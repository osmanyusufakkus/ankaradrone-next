import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";
import VideoCard from "@/components/ui/VideoCard";
import { PROJECTS, REFERENCE_PROJECTS } from "@/lib/projects";

/**
 * "Bize Güvenenler" — her müşteri firma için işin kendi dikey video kartı.
 *
 * Eskiden logo/baş harf ızgarası + yan vitrin panosuydu; logo olmadan kartlar
 * yalnızca iki harf gösteriyor, pano ile ızgara arasındaki bağı anlatmak için
 * "üzerine gelin, yandaki panoda" açıklaması gerekiyordu. Artık kartın kendisi
 * işi gösteriyor: üzerine gelince önizleme oynar, tıklayınca büyür, oradan
 * projenin sayfasına geçilir (bkz. VideoCard).
 *
 * Veri lib/projects.tsx → REFERENCE_PROJECTS'ten gelir (firma başına bir iş).
 * Masaüstünde ilk MAX_CARDS iş + "tamamı" kartı; mobilde aynı liste yana
 * kaydırılan tek sıra. Logolar gelince kart üstündeki firma adının yerine ya
 * da yanına konabilir (client.logoUrl).
 */
const MAX_CARDS = 11;

export default function References() {
  const shown = REFERENCE_PROJECTS.slice(0, MAX_CARDS);
  const total = PROJECTS.length;

  return (
    <section id="references" className="section-black-to-dark scroll-mt-24 py-25">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-12 flex items-end justify-between gap-6 max-md:mb-8">
          <div>
            <Eyebrow>Referanslarımız</Eyebrow>
            <h2 className="section-title-glow mb-4 font-display text-[clamp(42px,5.5vw,72px)] leading-[0.95] text-brand-white">
              BİZE <span className="section-title-glow-accent text-brand-blue">GÜVENENLER</span>
            </h2>
            <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
              Birlikte çalıştığımız firmalar ve onlar için çektiğimiz işler.{" "}
              <span className="max-md:hidden">
                Bir karta tıklayın, video açılsın; oradan projenin tamamına geçin.
              </span>
              <span className="md:hidden">Kaydırın, dokunun, izleyin.</span>
            </p>
          </div>
          <Link
            href="/projeler"
            className="shrink-0 rounded-pill border-[1.5px] border-white/25 px-6 py-3 text-sm font-bold tracking-wide text-brand-offwhite transition-all duration-250 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue max-md:hidden"
          >
            Tüm projeler ({total}) →
          </Link>
        </FadeUp>

        <FadeUp delay="0.1s">
          {/* Masaüstü/tablet: ızgara. Mobil: kaydırma şeridi (kenara taşan,
              sıradaki kartın ucu görünür; snap ile kart kart durur). */}
          <ul className="grid list-none grid-cols-6 gap-3.5 max-lg:grid-cols-4 max-md:-mx-8 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-3 max-md:overflow-x-auto max-md:scroll-px-8 max-md:px-8 max-md:pb-2 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {shown.map((project) => (
              <li key={project.slug} className="max-md:w-[58%] max-md:shrink-0 max-md:snap-start">
                <VideoCard
                  youtubeId={project.youtubeId}
                  youtubeVertical={project.youtubeVertical}
                  posterSrc={project.coverImage}
                  previewStart={project.previewStart}
                  videoSrc={project.videoSrc}
                  label={`${project.client?.name} — ${project.title}`}
                  posterSizes="(max-width: 768px) 58vw, (max-width: 1024px) 25vw, 200px"
                  // Dar kartta YouTube önizlemesi tutarsız biçimde Shorts
                  // arayüzü/altyazı gösteriyor; kartlar kapakla duruyor,
                  // tıklayınca büyük oynatıcı açılıyor (bkz. VideoCard).
                  hoverPreview={false}
                  projectHref={`/projeler/${project.slug}`}
                  caption={project.title}
                  meta={project.client?.name}
                  className="aspect-9/16 rounded-[18px] border-[1.5px] border-white/6 bg-brand-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue hover:shadow-[0_24px_60px_rgba(33,150,243,.25)]"
                  placeholder={
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,.05)_35%,rgba(8,12,16,.92)_100%)]"
                      />
                      {/* Fareyle gezenlere izlenebilir olduğunu gösteren simge;
                          dokunmatikte VideoCard kendi simgesini sağ altta gösteriyor. */}
                      <span
                        aria-hidden
                        className="absolute top-3 right-3 hidden h-7.5 w-7.5 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-black/60 text-brand-blue-light backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white [@media(hover:hover)_and_(pointer:fine)]:flex"
                      >
                        <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      {project.client?.sector && (
                        <span className="absolute top-3 left-3 rounded-pill border border-brand-blue/30 bg-brand-black/60 px-2.5 py-1 text-[9px] font-bold tracking-[2px] text-brand-blue-light uppercase backdrop-blur-sm">
                          {project.client.sector}
                        </span>
                      )}
                      <span className="absolute inset-x-0 bottom-0 p-3.5 pr-12 text-left">
                        <span className="block font-display text-[21px] leading-none tracking-wide text-brand-white">
                          {project.client?.name}
                        </span>
                        <span className="mt-1.5 block text-[11px] leading-snug text-white/65">
                          {/* Kartta proje adı; tür ve konum proje sayfasında. */}
                          {project.title.split(" – ")[0]}
                        </span>
                      </span>
                    </>
                  }
                />
              </li>
            ))}
            <li className="max-md:w-[58%] max-md:shrink-0 max-md:snap-start">
              <Link
                href="/projeler"
                className="flex aspect-9/16 flex-col items-center justify-center gap-3 rounded-[18px] border-[1.5px] border-brand-blue/25 bg-[linear-gradient(160deg,#0d1a2e,#0a2040)] text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue hover:shadow-[0_24px_60px_rgba(33,150,243,.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span className="font-display text-5xl leading-none text-brand-blue">{total}</span>
                <span className="text-xs font-semibold tracking-wider text-brand-offwhite uppercase">
                  Projenin tamamı
                </span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-brand-blue/50 text-brand-blue"
                >
                  →
                </span>
              </Link>
            </li>
          </ul>

          <p className="mt-3 text-xs text-white/45 md:hidden">
            ← kaydırın
          </p>
          <Link
            href="/projeler"
            className="mt-5 block rounded-pill border-[1.5px] border-white/25 py-3.5 text-center text-sm font-bold tracking-wide text-brand-offwhite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:hidden"
          >
            Tüm projeler ({total}) →
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
