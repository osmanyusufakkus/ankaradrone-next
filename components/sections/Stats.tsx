import FadeUp from "@/components/ui/FadeUp";

const STATS = [
  { num: "200+", label: "Tamamlanan Proje" },
  { num: "50+", label: "Kurumsal Referans" },
  { num: "4K", label: "Ultra HD Çözünürlük" },
  { num: "48h", label: "Teslimat Süresi" },
];

export default function Stats() {
  return (
    <div className="bg-brand-black py-20">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="grid grid-cols-4 gap-8 text-center max-md:grid-cols-2">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={`${i * 0.1}s`} className="px-4 py-8">
              <div className="mb-2 font-display text-6xl text-brand-blue">{stat.num}</div>
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
