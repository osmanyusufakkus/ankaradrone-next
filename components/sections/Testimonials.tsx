import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

// ⚠️ TODO(içerik): AŞAĞIDAKİ ÜÇ YORUM UYDURMADIR — düzenin çalıştığını görmek
// için konuldu, YAYINA ÇIKMAMALI. Sahte müşteri yorumu, sitedeki tüm yer
// tutucular içinde en riskli olanı: gerçek bir kişiye/firmaya atfedilmiş sahte
// bir övgü haksız rekabet ve itibar davası konusu olabilir.
//
// Bu yüzden atıflar bilerek anonim ve sektör bazlı tutuldu (gerçek bir firma
// adına bağlanmadı) ve uzunlukları kasten farklı — üç sütunlu ızgaranın
// eşit olmayan kart yüksekliklerini nasıl taşıdığını test etmek için.
//
// Gerçek yorum toplarken: müşteriden adının ve firmasının yayımlanmasına dair
// yazılı onay alın; onay vermezse "Proje Müdürü · İnşaat Firması" gibi anonim
// biçimde yayımlayın.
//
// Diziyi boşaltırsanız bölüm otomatik olarak "çok yakında" durumuna döner.
const TESTIMONIALS: Testimonial[] = [
  {
    id: "ornek-1",
    quote:
      "Projeyi henüz temel aşamasındayken hazırladıkları animasyonlu videoyu satış ofisimizde kullandık. Müşteriler bitmiş hâlini gördüğü için karar süreci belirgin şekilde kısaldı. Görselleştirmenin bu kadar iş yapacağını açıkçası beklemiyorduk.",
    name: "M. A.",
    role: "Proje Müdürü · Konut Yatırım Firması",
  },
  {
    id: "ornek-2",
    quote:
      "Şantiyenin aylık hava çekimlerini yatırımcı sunumlarımıza koyuyoruz. İlerlemeyi anlatmak yerine göstermek, toplantıların havasını tamamen değiştirdi.",
    name: "E. K.",
    role: "Şantiye Şefi · İnşaat Taahhüt",
  },
  {
    id: "ornek-3",
    quote:
      "Çekim de teslim de söz verilen tarihte oldu. Sosyal medya versiyonlarını ayrıca hazırlamaları büyük kolaylık.",
    name: "S. D.",
    role: "Pazarlama Direktörü · Gayrimenkul Geliştirme",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-dark py-25">
      <div className="mx-auto max-w-[1240px] px-8 text-center">
        <FadeUp className="flex flex-col items-center">
          <Eyebrow>Müşteri Deneyimleri</Eyebrow>
          {/* Bir üstteki References bölümünün başlığı "BİZE GÜVENENLER" —
              ikisi arka arkaya gelince neredeyse aynı başlık iki kez okunuyordu. */}
          <h2 className="section-title-glow mb-12 font-display text-[clamp(32px,4vw,52px)] leading-none text-brand-white">
            MÜŞTERİLERİMİZ <span className="section-title-glow-accent text-brand-blue">NE DİYOR</span>
          </h2>
        </FadeUp>

        {TESTIMONIALS.length === 0 ? (
          <FadeUp className="mx-auto max-w-165" delay="0.1s">
            <svg
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="mx-auto mb-6 text-brand-blue/40"
            >
              <path d="M7 8.5C5 9.5 4 11 4 13.5S5.5 18 8 18s4-1.8 4-4.2c0-2-1.3-3.5-3-3.8.3-1.5 1.4-2.6 3-3.3L11 5c-2 .6-3.4 1.7-4 3.5zM16 8.5c-2 1-3 2.5-3 5s1.5 4.5 4 4.5 4-1.8 4-4.2c0-2-1.3-3.5-3-3.8.3-1.5 1.4-2.6 3-3.3L20 5c-2 .6-3.4 1.7-4 3.5z" />
            </svg>
            <p className="font-display text-2xl leading-snug tracking-wide text-brand-offwhite">
              Müşteri yorumları çok yakında burada yer alacak.
            </p>
          </FadeUp>
        ) : (
          <div className="grid grid-cols-3 gap-6 text-left max-md:grid-cols-1">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp
                key={t.id}
                delay={`${i * 0.1}s`}
                className="rounded-3xl border-1.5 border-white/6 bg-brand-card p-8"
              >
                <p className="mb-6 text-[15px] leading-relaxed font-light text-brand-offwhite">
                  “{t.quote}”
                </p>
                <div className="text-sm font-semibold text-brand-white">{t.name}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
