// Single source of truth for every piece of company/contact information on the
// site. Footer, Navbar, contact form, WhatsApp button, JSON-LD schema, sitemap
// and metadata all read from here — change a value once, it updates everywhere.
//
// Anything still carrying a `TODO(içerik)` marker is placeholder data. Before
// going live, list everything that still needs a real value with:
//
//   grep -rn "TODO(içerik)" app components lib
//
// See PUBLISH_CHECKLIST.md for the full pre-launch pass.

/**
 * Production origin, no trailing slash. Drives metadataBase, the sitemap,
 * robots.txt and the JSON-LD `url` — set NEXT_PUBLIC_SITE_URL in the hosting
 * provider's env vars and this follows automatically.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.ankaradrone.com";

export const SITE_NAME = "AnkaraDrone";

export const SITE_TITLE = "AnkaraDrone – Profesyonel Drone Çekimleri";

export const SITE_DESCRIPTION =
  "İnşaat, gayrimenkul ve kurumsal projeleriniz için profesyonel drone çekimleri, 3D modelleme ve animasyonlu videolar. Ankara merkezli.";

/** Digits only, international format — the form wa.me and tel: links are built from this. */
const PHONE_E164 = "905545480697";

export const CONTACT = {
  email: "info@ankaradrone.com",
  /** Human-readable, used as link text. */
  phoneDisplay: "+90 554 548 06 97",
  phoneHref: `tel:+${PHONE_E164}`,
  whatsappHref: `https://wa.me/${PHONE_E164}`,
  city: "Ankara",
  country: "TR",
  // TODO(içerik): tam açık adres (cadde, no, ilçe) — JSON-LD ve footer için.
  addressLine: "Ankara, Türkiye",
} as const;

export const SOCIAL_LINKS = [
  // TODO(içerik): gerçek Instagram profil adresi.
  { href: "https://www.instagram.com/", label: "Instagram", key: "instagram" },
  // TODO(içerik): gerçek YouTube kanal adresi.
  { href: "https://www.youtube.com/", label: "YouTube", key: "youtube" },
] as const;

/**
 * Feeds the contact form's "proje tipi" dropdown. Keeping the ids in sync with
 * components/sections/Packages.tsx means an incoming lead already tells you
 * which package it's about.
 */
export const PROJECT_TYPES = [
  { id: "3d-modelleme", label: "3D Modelleme & Animasyonlu Video" },
  { id: "ilerleme-takip", label: "İlerleme Takip Çekimleri" },
  { id: "konut-tanitim", label: "Konut & Site Tanıtım Filmi" },
  { id: "kurumsal-etkinlik", label: "Kurumsal & Etkinlik Çekimi" },
  { id: "diger", label: "Diğer / Emin değilim" },
] as const;
