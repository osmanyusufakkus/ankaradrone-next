import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
