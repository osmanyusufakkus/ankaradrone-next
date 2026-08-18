import Image from "next/image";
import Link from "next/link";
import { CONTACT, SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const SERVICE_LINKS = [
  "Hava Fotoğrafçılığı",
  "Sinematik Video",
  "3D Modelleme",
  "360° Sanal Tur",
  "Termal Görüntüleme",
];

const CONTACT_LINKS = [
  { href: `mailto:${CONTACT.email}`, label: CONTACT.email },
  { href: CONTACT.phoneHref, label: CONTACT.phoneDisplay },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function Footer() {
  // Hardcoding the year means the site starts advertising its own staleness the
  // moment January rolls around.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 bg-[#050810] pt-15 pb-8">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-12 grid grid-cols-[1.6fr_1fr_1fr] gap-12 max-md:grid-cols-1">
          <div>
            <Image
              src="/images/logo.jpg"
              alt={SITE_NAME}
              width={1563}
              height={1563}
              className="mb-4 block h-12 w-12"
            />
            <p className="mb-5 max-w-[280px] text-sm leading-relaxed text-white/40">
              Ankara merkezli profesyonel drone çekim hizmetleri. İnşaat, gayrimenkul ve
              kurumsal projeler.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE_NAME} ${social.label} sayfası`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden>
                    {SOCIAL_ICONS[social.key]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              Hizmetler
            </h2>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="rounded text-sm text-white/50 transition-colors duration-200 hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              İletişim
            </h2>
            <ul className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded text-sm text-white/50 transition-colors duration-200 hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* An address is not a link — it used to be an <a href="#"> that
                  went nowhere. */}
              <li className="text-sm text-white/50">{CONTACT.addressLine}</li>
              <li>
                <Link
                  href="/kvkk"
                  className="rounded text-sm text-white/50 transition-colors duration-200 hover:text-brand-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/6 pt-7 text-[13px] text-white/30 max-md:flex-col max-md:items-start max-md:gap-2">
          <span>
            © {year} {SITE_NAME}. Tüm hakları saklıdır.
          </span>
          <span>Profesyonel Drone Çekimleri · Ankara</span>
        </div>
      </div>
    </footer>
  );
}
