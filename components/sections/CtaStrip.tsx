import FadeUp from "@/components/ui/FadeUp";
import Button from "@/components/ui/Button";

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
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              id="contact"
              href="mailto:info@ankaradrone.com"
              icon={
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
            >
              info@ankaradrone.com
            </Button>
            <Button
              href="https://wa.me/905545480697"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              icon={
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
                  <path d="M12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1112 20z" />
                </svg>
              }
            >
              +90 554 548 06 97
            </Button>
          </div>
          <p className="mt-6 text-xs tracking-wide text-white/35 uppercase">
            Ortalama yanıt süresi: 2 saat
          </p>
        </FadeUp>
      </div>
    </div>
  );
}
