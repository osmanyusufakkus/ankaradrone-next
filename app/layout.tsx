import type { Metadata } from "next";
import { Bebas_Neue, Raleway } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  weight: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const TITLE = "AnkaraDrone – Profesyonel Drone Çekimleri";
const DESCRIPTION =
  "İnşaat, gayrimenkul ve kurumsal projeleriniz için profesyonel drone çekimleri, 3D modelleme ve animasyonlu videolar.";

export const metadata: Metadata = {
  // TODO: swap for the real production domain once the site is deployed.
  metadataBase: new URL("https://www.ankaradrone.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    locale: "tr_TR",
    type: "website",
    images: ["/images/logo.jpg"],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${bebasNeue.variable} ${raleway.variable}`}>
      <body>
        <div aria-hidden className="vignette-overlay" />
        <div aria-hidden className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
