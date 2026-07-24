import FadeUp from "@/components/ui/FadeUp";
import VideoCard from "@/components/ui/VideoCard";

const VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";

const REFERENCES = [
  { code: "İÇ", name: "İÇTAŞ İNŞAAT", sector: "İnşaat", color: "rgba(33,150,243,.25)", label: "İçtaş İnşaat – Şantiye Çekimi" },
  { code: "EM", name: "EMLAK KONUT", sector: "Gayrimenkul", color: "rgba(255,150,0,.2)", label: "Emlak Konut – Proje Tanıtım" },
  { code: "TO", name: "TOKİ", sector: "Konut", color: "rgba(76,175,80,.2)", label: "TOKİ – Hava Belgeleme" },
  { code: "AN", name: "ANKAMall", sector: "Ticaret", color: "rgba(233,30,99,.2)", label: "ANKAmall – Etkinlik Çekimi" },
  { code: "AE", name: "AEROPARK", sector: "Sanayi", color: "rgba(255,87,34,.2)", label: "Aeropark – Tesis Dokümantasyonu" },
  { code: "KY", name: "KAYA YAPI", sector: "İnşaat", color: "rgba(33,150,243,.2)", label: "Kaya Yapı – 3D Modelleme" },
  { code: "AK", name: "AKFEN", sector: "Altyapı", color: "rgba(156,39,176,.2)", label: "Akfen – Proje Belgeleme" },
  { code: "OZ", name: "ÖZAK GYO", sector: "Gayrimenkul", color: "rgba(0,188,212,.2)", label: "Özak GYO – Satış Filmi" },
  { code: "ST", name: "SETUR", sector: "Turizm", color: "rgba(255,193,7,.2)", label: "Setur – Tanıtım Filmi" },
  { code: "MB", name: "MEB", sector: "Kamu", color: "rgba(33,150,243,.2)", label: "MEB – Kampüs Çekimi" },
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

        <div className="grid grid-cols-5 gap-5 max-md:grid-cols-3 max-sm:grid-cols-2">
          {REFERENCES.map((ref, i) => (
            <FadeUp key={ref.name} delay={`${i * 0.05}s`}>
              <VideoCard
                videoSrc={VIDEO_SRC}
                className="aspect-16/9 rounded-xl border-1.5 border-white/8 bg-white/4 transition-all duration-300 hover:z-10 hover:scale-108 hover:border-brand-blue hover:shadow-[0_16px_48px_rgba(33,150,243,.25)]"
                placeholder={
                  <>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-2xl font-black text-white"
                      style={{ background: ref.color }}
                    >
                      {ref.code}
                    </div>
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
