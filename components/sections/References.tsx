import Image from "next/image";
import FadeUp from "@/components/ui/FadeUp";
import VideoCard from "@/components/ui/VideoCard";
import { PLACEHOLDER_VIDEO_SRC } from "@/lib/media";

// Drop a logo file in public/images/references/ and set `logoUrl` (e.g. "/images/references/ictas.png")
// to swap a card's initials badge for the real company logo — no other code changes needed.
// Same goes for `videoSrc`: each reference owns its own clip, point it at the real
// hover-preview footage per client once it's ready.
type Reference = {
  id: string;
  code: string;
  name: string;
  sector: string;
  color: string;
  label: string;
  videoSrc: string;
  logoUrl?: string;
};

const REFERENCES: Reference[] = [
  {
    id: "ictas-insaat",
    code: "İÇ",
    name: "İÇTAŞ İNŞAAT",
    sector: "İnşaat",
    color: "rgba(33,150,243,.25)",
    label: "İçtaş İnşaat – Şantiye Çekimi",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    logoUrl: "/images/references/toki.png",
  },
  {
    id: "emlak-konut",
    code: "EM",
    name: "EMLAK KONUT",
    sector: "Gayrimenkul",
    color: "rgba(255,150,0,.2)",
    label: "Emlak Konut – Proje Tanıtım",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
    logoUrl: "/images/references/emlakkonut.png",
  },
  {
    id: "toki",
    code: "TO",
    name: "TOKİ",
    sector: "Konut",
    color: "rgba(76,175,80,.2)",
    label: "TOKİ – Hava Belgeleme",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "ankamall",
    code: "AN",
    name: "ANKAMall",
    sector: "Ticaret",
    color: "rgba(233,30,99,.2)",
    label: "ANKAmall – Etkinlik Çekimi",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "aeropark",
    code: "AE",
    name: "AEROPARK",
    sector: "Sanayi",
    color: "rgba(255,87,34,.2)",
    label: "Aeropark – Tesis Dokümantasyonu",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "kaya-yapi",
    code: "KY",
    name: "KAYA YAPI",
    sector: "İnşaat",
    color: "rgba(33,150,243,.2)",
    label: "Kaya Yapı – 3D Modelleme",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "akfen",
    code: "AK",
    name: "AKFEN",
    sector: "Altyapı",
    color: "rgba(156,39,176,.2)",
    label: "Akfen – Proje Belgeleme",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "ozak-gyo",
    code: "OZ",
    name: "ÖZAK GYO",
    sector: "Gayrimenkul",
    color: "rgba(0,188,212,.2)",
    label: "Özak GYO – Satış Filmi",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "setur",
    code: "ST",
    name: "SETUR",
    sector: "Turizm",
    color: "rgba(255,193,7,.2)",
    label: "Setur – Tanıtım Filmi",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
  {
    id: "meb",
    code: "MB",
    name: "MEB",
    sector: "Kamu",
    color: "rgba(33,150,243,.2)",
    label: "MEB – Kampüs Çekimi",
    videoSrc: PLACEHOLDER_VIDEO_SRC,
  },
];

export default function References() {
  return (
    <section id="references" className="bg-brand-dark py-20">
      <div className="mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-14">
          <span className="mb-3.5 inline-block rounded-pill border border-brand-blue/18 bg-brand-blue/8 px-4 py-1.5 text-[10px] font-bold tracking-[4px] text-brand-blue uppercase">
            Referanslarımız
          </span>
          <h2 className="mb-3.5 font-display text-[clamp(38px,5vw,64px)] leading-none text-brand-white">
            BİZE <span className="text-brand-blue">GÜVENENLER</span>
          </h2>
          <p className="max-w-[580px] text-base leading-relaxed font-light text-brand-offwhite">
            Fare ile üzerine gelin — markayla ilgili çekimimizi izleyin.
          </p>
        </FadeUp>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 md:grid-cols-5 [&::-webkit-scrollbar]:hidden">
          {REFERENCES.map((ref, i) => (
            <FadeUp
              key={ref.id}
              delay={`${i * 0.05}s`}
              className="w-[72%] shrink-0 snap-center sm:w-auto sm:shrink">
              <VideoCard
                videoSrc={ref.videoSrc}
                className="aspect-square rounded-xl border-1.5 border-white/8 bg-white/4 transition-all duration-300 hover:z-10 hover:scale-108 hover:border-brand-blue hover:shadow-[0_16px_48px_rgba(33,150,243,.25)]"
                placeholder={
                  <>
                    {ref.logoUrl ? (
                      <div className="relative h-16 w-32 max-w-[75%] shrink-0">
                        <Image
                          src={ref.logoUrl}
                          alt={ref.name}
                          fill
                          sizes="128px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl font-display text-3xl font-black text-white"
                        style={{ background: ref.color }}>
                        {ref.code}
                      </div>
                    )}
                    <div className="text-center font-display text-lg tracking-wide text-white/70">
                      {ref.name}
                    </div>
                    <div className="text-[10px] tracking-[2px] text-white/30 uppercase">
                      {ref.sector}
                    </div>
                  </>
                }
                overlayContent={
                  <span className="absolute right-2.5 bottom-2.5 left-2.5 text-[11px] font-bold tracking-wide text-white [text-shadow:0_2px_8px_rgba(0,0,0,.8)]">
                    {ref.label}
                  </span>
                }
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
