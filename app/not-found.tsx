import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-8 py-40 text-center">
      <Eyebrow className="justify-center">404</Eyebrow>
      <h1 className="mb-5 font-display text-[clamp(48px,8vw,110px)] leading-[0.9] text-brand-white">
        SAYFA <span className="text-brand-blue">BULUNAMADI</span>
      </h1>
      <p className="mb-10 max-w-105 text-[15px] leading-relaxed font-light text-brand-offwhite">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Projelerimize göz
        atabilir ya da doğrudan bize ulaşabilirsiniz.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/">Ana Sayfa</Button>
        <Button href="/projeler" variant="outline">
          Projeler
        </Button>
      </div>
    </main>
  );
}
