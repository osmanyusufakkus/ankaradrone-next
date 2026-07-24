import FadeUp from "@/components/ui/FadeUp";

export default function CtaStrip() {
  return (
    <div className="relative overflow-hidden border-y border-brand-blue/15 bg-[linear-gradient(135deg,#0d1a2e_0%,#0a2040_50%,#0d1a2e_100%)] py-20 text-center before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(33,150,243,.08)_0%,transparent_70%)]">
      <div className="relative mx-auto max-w-[1240px] px-8">
        <FadeUp>
          <h2 className="mb-4.5 font-display text-[clamp(36px,5vw,68px)] tracking-wide text-brand-white">
            PROJENİZ İÇİN <span className="text-brand-blue">TEKLIF</span> ALIN
          </h2>
          <p className="mb-10 text-[17px] font-light text-brand-offwhite">
            24 saat içinde size özel fiyat teklifi hazırlıyoruz.
          </p>
          <a
            id="contact"
            href="mailto:info@ankaradrone.com"
            className="inline-flex items-center gap-2 rounded-pill bg-brand-blue px-10 py-4 text-sm font-bold tracking-wide text-white transition-all duration-250 hover:-translate-y-0.75 hover:bg-brand-blue-dark hover:shadow-[0_12px_36px_rgba(33,150,243,.35)]"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@ankaradrone.com
          </a>
        </FadeUp>
      </div>
    </div>
  );
}
