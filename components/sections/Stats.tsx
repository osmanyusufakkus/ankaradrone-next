import FadeUp from "@/components/ui/FadeUp";
import CountUp from "@/components/ui/CountUp";

type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
};

// TODO(içerik): "200+" ve "50+" rakamları yer tutucudur. Doğrulanabilir gerçek
// sayılarla değiştirin — abartılı bir rakam, müşteri kontrol ettiğinde güveni
// kazandırmak yerine kaybettirir. Emin olunamayan bir metrik yerine hiç
// göstermemek daha iyidir.
const STATS: Stat[] = [
  {
    id: "tamamlanan-proje",
    value: 200,
    suffix: "+",
    label: "Tamamlanan Proje",
    icon: (
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    ),
  },
  {
    id: "kurumsal-referans",
    value: 50,
    suffix: "+",
    label: "Kurumsal Referans",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </>
    ),
  },
  {
    id: "cozunurluk",
    value: 4,
    suffix: "K",
    label: "Ultra HD Çözünürlük",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M2 15l5-5 4 4 6-6 3 3" />
      </>
    ),
  },
  {
    id: "teslimat-suresi",
    value: 48,
    suffix: "h",
    label: "Teslimat Süresi",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
];

export default function Stats() {
  return (
    <div className="bg-brand-black py-20">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-4 gap-8 text-center max-md:grid-cols-2">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.id} delay={`${i * 0.1}s`} className="px-4 py-8">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue/10">
                <svg width="20" height="20" fill="none" stroke="#2196F3" strokeWidth="2" viewBox="0 0 24 24">
                  {stat.icon}
                </svg>
              </div>
              <div className="mb-2 font-display text-6xl text-brand-blue">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-semibold tracking-[2px] text-white/45 uppercase">
                {stat.label}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
