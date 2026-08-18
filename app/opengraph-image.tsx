import { ImageResponse } from "next/og";
import { CONTACT, SITE_DESCRIPTION } from "@/lib/site";

// Generated at build time into the 1200x630 card that WhatsApp, Instagram DMs,
// LinkedIn and X show when someone shares the link. The old setup pointed at the
// 1563x1563 square logo, which every one of those platforms crops.
//
// Next picks this file up automatically — no `openGraph.images` entry needed in
// layout.tsx, and it fills in the twitter:image tag too.

export const alt = "AnkaraDrone – Profesyonel Drone Çekimleri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #080c10 0%, #0d1a2e 45%, #0a2040 100%)",
          color: "#f0f4f8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar echoing the site's Eyebrow component */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background: "#2196F3",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "8px",
              textTransform: "uppercase",
              color: "#2196F3",
              fontWeight: 700,
            }}
          >
            {/* One string, not `{value} · Türkiye` — Satori counts JSX
                expression + text as two children and demands display:flex. */}
            {`${CONTACT.city} · Türkiye`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "132px",
            fontWeight: 900,
            lineHeight: 1,
            marginTop: "28px",
            letterSpacing: "-2px",
          }}
        >
          <span>ANKARA</span>
          <span style={{ color: "#2196F3", marginLeft: "24px" }}>DRONE</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "30px",
            lineHeight: 1.45,
            marginTop: "32px",
            maxWidth: "900px",
            color: "#d0dae6",
          }}
        >
          {SITE_DESCRIPTION}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "26px",
            marginTop: "44px",
            color: "rgba(240,244,248,0.55)",
          }}
        >
          {`${CONTACT.phoneDisplay} · ${CONTACT.email}`}
        </div>
      </div>
    ),
    size,
  );
}
