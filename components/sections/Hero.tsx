export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-35 pb-20 text-center before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(33,150,243,0.13)_0%,transparent_70%)]"
    >
      <div className="pointer-events-none absolute top-[30%] right-[6%] animate-float-drone opacity-6">
        <svg width="380" height="380" viewBox="0 0 380 380" fill="white" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="190" cy="190" rx="185" ry="185" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="190" cy="190" r="60" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="82" cy="82" r="48" fill="none" stroke="white" strokeWidth="2.5" />
          <circle cx="298" cy="82" r="48" fill="none" stroke="white" strokeWidth="2.5" />
          <circle cx="82" cy="298" r="48" fill="none" stroke="white" strokeWidth="2.5" />
          <circle cx="298" cy="298" r="48" fill="none" stroke="white" strokeWidth="2.5" />
          <line x1="120" y1="120" x2="160" y2="160" stroke="white" strokeWidth="3" />
          <line x1="260" y1="120" x2="220" y2="160" stroke="white" strokeWidth="3" />
          <line x1="120" y1="260" x2="160" y2="220" stroke="white" strokeWidth="3" />
          <line x1="260" y1="260" x2="220" y2="220" stroke="white" strokeWidth="3" />
        </svg>
      </div>

      <div className="mb-5 text-[11px] font-bold tracking-[4px] text-brand-blue uppercase">
        Ankara · Türkiye · Hava Çekimleri
      </div>

      <h1 className="mb-7 font-display text-[clamp(60px,9vw,130px)] leading-[0.9] tracking-[2px] text-brand-white">
        ANKARA
        <br />
        <span className="text-brand-blue">DRONE</span>
      </h1>

      <p className="mb-11 max-w-[560px] text-[17px] leading-relaxed font-light text-brand-offwhite">
        İnşaat, gayrimenkul ve kurumsal projeleriniz için profesyonel drone çekimleri, 3D
        modelleme ve animasyonlu videolar.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="#packages"
          className="inline-flex items-center gap-2 rounded-pill bg-brand-blue px-10 py-4 text-sm font-bold tracking-wide text-white transition-all duration-250 hover:-translate-y-0.75 hover:bg-brand-blue-dark hover:shadow-[0_12px_36px_rgba(33,150,243,.35)]"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
          </svg>
          Paketleri İncele
        </a>
        <a
          href="#contact"
          className="rounded-pill border-1.5 border-white/25 px-10 py-4 text-sm font-semibold tracking-wide text-brand-offwhite transition-all duration-250 hover:-translate-y-0.75 hover:border-brand-blue hover:text-brand-blue"
        >
          Teklif Al
        </a>
      </div>

      <div className="absolute bottom-9.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[2px] text-white/30 uppercase">
        <div className="h-9 w-0.5 animate-scroll-pulse rounded-full bg-gradient-to-b from-brand-blue/60 to-transparent" />
        <span>Kaydır</span>
      </div>
    </section>
  );
}
