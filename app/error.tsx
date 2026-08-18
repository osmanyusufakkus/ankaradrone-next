"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { CONTACT } from "@/lib/site";

// Catches render-time crashes anywhere below the root layout so a visitor never
// lands on a blank page. Must be a Client Component — React needs the error
// boundary to live on the client.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Beklenmeyen hata:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-black px-8 py-40 text-center">
      <Eyebrow className="justify-center">Bir sorun oluştu</Eyebrow>
      <h1 className="mb-5 font-display text-[clamp(40px,6vw,84px)] leading-[0.9] text-brand-white">
        BEKLENMEYEN <span className="text-brand-blue">BİR HATA</span>
      </h1>
      <p className="mb-10 max-w-115 text-[15px] leading-relaxed font-light text-brand-offwhite">
        Sayfa yüklenirken bir sorunla karşılaştık. Tekrar denemek işe yaramazsa bize{" "}
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded text-brand-blue underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          WhatsApp
        </a>{" "}
        veya{" "}
        <a
          href={`mailto:${CONTACT.email}`}
          className="rounded text-brand-blue underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {CONTACT.email}
        </a>{" "}
        üzerinden ulaşabilirsiniz.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Tekrar Dene</Button>
        <Button href="/" variant="outline">
          Ana Sayfa
        </Button>
      </div>
    </main>
  );
}
