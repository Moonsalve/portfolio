import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { resolveLocale } from "@/i18n/server";
import { copy } from "@/i18n";
import { site } from "@/site.config";
import "./globals.css";

/**
 * `display: "optional"` en ambas familias, no `swap`.
 *
 * Medido en una iteración anterior: con `swap`, el intercambio de fuente
 * reflowaba el encabezado y movía la página entera, 0.282 de CLS. `optional`
 * da una ventana corta y, si la fuente no llegó, no la aplica en esa carga: la
 * deja en caché para la siguiente. La página nunca salta bajo el cursor.
 *
 * Archivo variable en vez de Archivo Black: el eje de peso llega a 900, así que
 * un solo archivo cubre el cuerpo (400) y la macrotipografía (900). Archivo
 * Black es una familia aparte y habría sido una descarga más antes del LCP,
 * a cambio de una diferencia de diseño que a 6 rem no se nota.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-archivo",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-jetbrains",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const t = copy[locale];

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      title: t.meta.title,
      description: t.meta.description,
      url: site.url,
      siteName: site.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Las variables de fuente van en `<html>`, no en `<body>`: los tokens
 * `--font-display/body/mono` se declaran en `:root`, y un `var()` dentro de otra
 * custom property se resuelve en el elemento donde está declarada. Con las
 * variables un nivel más abajo, `:root` no las ve y toda la tipografía cae
 * silenciosamente a Times sin que nada falle de forma visible.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  const t = copy[locale];

  /** Datos estructurados: quién es, qué hace y dónde, para el buscador. */
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: t.header.role,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin].filter((value): value is string => Boolean(value)),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    knowsLanguage: ["es", "en"],
  };

  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
