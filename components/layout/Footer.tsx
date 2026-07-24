import Image from "next/image";

const SERVICE_LINKS = [
  "Hava Fotoğrafçılığı",
  "Sinematik Video",
  "3D Modelleme",
  "360° Sanal Tur",
  "Termal Görüntüleme",
];

const CONTACT_LINKS = [
  { href: "mailto:info@ankaradrone.com", label: "info@ankaradrone.com" },
  { href: "tel:+905001234567", label: "+90 500 123 45 67" },
  { href: "#", label: "Ankara, Türkiye" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#050810] pt-15 pb-8">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-12 grid grid-cols-[1.6fr_1fr_1fr] gap-12 max-md:grid-cols-1">
          <div>
            <Image
              src="/images/logo.jpg"
              alt="AnkaraDrone"
              width={1563}
              height={1563}
              className="mb-4 block h-12 w-12"
            />
            <p className="max-w-[280px] text-sm leading-relaxed text-white/40">
              Ankara merkezli profesyonel drone çekim hizmetleri. İnşaat, gayrimenkul ve
              kurumsal projeler.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              Hizmetler
            </h4>
            <ul className="flex flex-col gap-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-brand-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[11px] font-bold tracking-widest text-brand-blue uppercase">
              İletişim
            </h4>
            <ul className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-brand-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/6 pt-7 text-[13px] text-white/30 max-md:flex-col max-md:items-start max-md:gap-2">
          <span>© 2024 AnkaraDrone. Tüm hakları saklıdır.</span>
          <span>Profesyonel Drone Çekimleri · Ankara</span>
        </div>
      </div>
    </footer>
  );
}
