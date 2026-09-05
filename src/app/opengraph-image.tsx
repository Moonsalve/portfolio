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
          background: "#f4f4f0",
          color: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#4a4a46" }}>
            {place}
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, letterSpacing: -4 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#a11010" }}>{t.header.role}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            color: "#4a4a46",
            maxWidth: 900,
            borderLeft: "8px solid #e61919",
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
