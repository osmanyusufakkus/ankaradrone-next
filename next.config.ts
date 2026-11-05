import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF önce, desteklemeyen tarayıcıya WebP. Varsayılan yalnızca WebP'ydi;
    // mobilde sayfanın en büyük öğesi olan hero logosu (düz renkli, saydam
    // PNG) WebP'de 54 KB, AVIF'te ~27 KB. YouTube kapakları da ~%35 küçülüyor.
    // AVIF'e dönüştürme daha yavaş olduğu için her görselin İLK isteği biraz
    // gecikebilir; sonrakiler önbellekten gelir.
    formats: ["image/avif", "image/webp"],
    // Video kapakları YouTube'un thumbnail sunucusundan geliyor (bkz. lib/youtube.ts).
    // Yalnızca /vi/** yolu ve sorgu dizesi olmayan istekler kabul edilir; başka
    // hiçbir dış görsel optimize edilmez.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
