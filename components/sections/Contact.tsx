import FadeUp from "@/components/ui/FadeUp";
import ContactForm from "@/components/ui/ContactForm";
import Eyebrow from "@/components/ui/Eyebrow";
import { CONTACT } from "@/lib/site";

// Replaces the old CtaStrip: same gradient band, but the "Teklif Al" call now
// resolves into an actual form instead of a second row of buttons. The `id` sits
// on the <section> so /#contact scrolls to the whole block, not to a single link.

const DIRECT_CHANNELS = [
  {
    key: "whatsapp",
    href: CONTACT.whatsappHref,
    label: "WhatsApp",
    value: CONTACT.phoneDisplay,
    external: true,
    icon: (
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.5 15.3L2 22l4.8-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8 8 0 1112 20z" />
    ),
  },
  {
    key: "email",
    href: `mailto:${CONTACT.email}`,
    label: "E-posta",
    value: CONTACT.email,
    external: false,
    icon: (
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2 8 6 8-6" />
    ),
  },
  {
    key: "phone",
    href: CONTACT.phoneHref,
    label: "Telefon",
    value: CONTACT.phoneDisplay,
    external: false,
    icon: (
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
    ),
  },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-y border-brand-blue/15 bg-[linear-gradient(135deg,#0d1a2e_0%,#0a2040_50%,#0d1a2e_100%)] py-25 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(33,150,243,.08)_0%,transparent_70%)]"
    >
      <div className="relative mx-auto max-w-[1240px] px-8">
        <FadeUp className="mb-12 text-center">
          <Eyebrow className="justify-center">İletişim</Eyebrow>
          <h2 className="mb-4.5 font-display text-[clamp(40px,5.5vw,76px)] leading-[0.95] tracking-wide text-brand-white">
            PROJENİZ İÇİN <span className="text-brand-blue">TEKLİF</span> ALIN
          </h2>
          <p className="text-[17px] font-light text-brand-offwhite">
            24 saat içinde size özel fiyat teklifi hazırlıyoruz.
          </p>
        </FadeUp>

        <div className="grid grid-cols-[1.5fr_1fr] gap-10 max-md:grid-cols-1">
          <FadeUp className="rounded-3xl border-1.5 border-white/8 bg-brand-card/60 p-8 max-sm:p-6 backdrop-blur-sm">
            <ContactForm />
          </FadeUp>

          <FadeUp delay="0.1s" className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed font-light text-brand-offwhite">
              Form doldurmak istemiyorsanız doğrudan da ulaşabilirsiniz — en hızlı yanıtı
              WhatsApp&apos;tan alırsınız.
            </p>

            {DIRECT_CHANNELS.map((channel) => (
              <a
                key={channel.key}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center gap-4 rounded-2xl border-1.5 border-white/8 bg-brand-black/30 px-5 py-4 transition-all duration-250 hover:-translate-y-0.5 hover:border-brand-blue/50 hover:bg-brand-black/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blue transition-transform duration-250 group-hover:scale-110">
                  <svg
                    width="18"
                    height="18"
                    fill={channel.key === "whatsapp" ? "currentColor" : "none"}
                    stroke={channel.key === "whatsapp" ? "none" : "currentColor"}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    {channel.icon}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold tracking-[2px] text-white/40 uppercase">
                    {channel.label}
                  </span>
                  <span className="block truncate text-sm text-brand-white">
                    {channel.value}
                  </span>
                </span>
              </a>
            ))}

            <p className="mt-1 text-xs tracking-wide text-white/35 uppercase">
              Ortalama yanıt süresi: 2 saat
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
