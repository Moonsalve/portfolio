import { ImageResponse } from "next/og";
import { copy, defaultLocale } from "@/i18n";
import { site } from "@/site.config";

export const alt = `${site.name} — ${copy[defaultLocale].header.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen de previsualización al compartir el enlace. Se genera en build con los
 * mismos tokens de la paleta oscura, para que el link se vea como la página.
 */
export default function OpenGraphImage() {
  const t = copy[defaultLocale];
  const place = `${site.location.city.toUpperCase()} · ${site.location.utcOffset}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#11151b",
          color: "#e6e9ed",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#8a94a3" }}>
            {place}
          </div>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#e4a13c" }}>{t.header.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: "#8a94a3",
            maxWidth: 900,
            borderLeft: "4px solid #e4a13c",
            paddingLeft: 28,
          }}
        >
          {t.meta.description}
        </div>
      </div>
    ),
    size,
  );
}
