import type { Metadata } from "next";
import { Bebas_Neue, Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import {
  CONTACT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/site";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  // 900 dropped: the only `font-black` on the site sat on an element that also
  // set `font-display` (Bebas Neue, which ships weight 400 only), so the
  // Raleway black file was downloaded on every visit and applied to nothing.
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Driven by NEXT_PUBLIC_SITE_URL so staging and production each describe
  // themselves correctly — see .env.example.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    url: SITE_URL,
    // Images come from app/opengraph-image.tsx (1200x630), not the square logo.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

/**
 * Tells Google this is a real business in Ankara with a phone number and a
 * service area — the single highest-leverage SEO addition for a local company,
 * and what powers the business panel in local search results.
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: CONTACT.phoneHref.replace("tel:", ""),
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: CONTACT.city,
    addressCountry: CONTACT.country,
  },
  areaServed: { "@type": "AdministrativeArea", name: "Ankara" },
  // TODO(içerik): gerçek Instagram/YouTube adresleri lib/site.ts içinde doldurulunca
  // Google bu hesapları işletmeyle ilişkilendirir.
  sameAs: SOCIAL_LINKS.map((social) => social.href),
  knowsLanguage: ["tr"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${bebasNeue.variable} ${raleway.variable}`}>
      <body>
        {/* Escaping "<" keeps a stray HTML tag in any of the values above from
            breaking out of the script element. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />
        <div aria-hidden className="vignette-overlay" />
        <div aria-hidden className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppFab />

        {/* Deliberately cookieless analytics. Google Analytics would drop
            identifying cookies, which under KVKK means a consent banner on
            every first visit — a banner that costs conversions on the exact
            page we're trying to convert on. These two set no cookies and build
            no cross-site profile, so no banner is required.

            Both only report when the site is deployed on Vercel; on any other
            host they're inert. If you deploy elsewhere, swap these two lines
            for Plausible or Umami (also cookieless) — nothing else changes.

            Analytics = who visits and which pages/packages draw interest.
            SpeedInsights = real-device Core Web Vitals, which is how you'll
            actually find out whether the hero video or the grain overlay is
            hurting phones, instead of guessing. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
