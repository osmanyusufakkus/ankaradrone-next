import FadeUp from "@/components/ui/FadeUp";
import Eyebrow from "@/components/ui/Eyebrow";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

// No fabricated quotes — add real client testimonials here as they come in;
// the section renders its placeholder state below until then.
const TESTIMONIALS: Testimonial[] = [];

export default function Testimonials() {
  return (
    <section className="bg-brand-dark py-25">
      <div className="mx-auto max-w-[1240px] px-8 text-center">
        <FadeUp className="flex flex-col items-center">
          <Eyebrow>Müşteri Deneyimleri</Eyebrow>
          <h2 className="mb-12 font-display text-[clamp(32px,4vw,52px)] leading-none text-brand-white">
            BİZE <span className="text-brand-blue">GÜVENENLER NE DİYOR</span>
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
