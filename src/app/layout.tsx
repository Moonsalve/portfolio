import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { resolveLocale } from "@/i18n/server";
import { copy } from "@/i18n";
import { site } from "@/site.config";
import "./globals.css";

/**
 * `display: "optional"` en las tres familias, no `swap`.
 *
 * Medido: con `swap`, el intercambio de fuente reflowaba el encabezado y movía
 * la página entera — 0.282 de CLS. `optional` da una ventana corta y, si la
 * fuente no llegó, no la aplica en esa carga: la deja en caché para la
 * siguiente. El costo es que una primera visita por una conexión mala ve las
 * fuentes del sistema. El beneficio es que la página nunca salta bajo el cursor
 * de quien la está leyendo. Con las fuentes precargadas y en 73 KB, la ventana
 * se cumple en cualquier conexión razonable.
 */

/**
 * Un solo peso, dos estilos: dos archivos estáticos de ~23 KB. El archivo
 * variable de Newsreader cubre todo el rango de pesos pero cuesta 60 KB por
 * estilo, y en una página cuyo LCP es texto esos 70 KB de más se pagan en la
 * primera pintura. Los títulos van en 400: la jerarquía la da el tamaño.
 */
const newsreader = Newsreader({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-newsreader",
  weight: ["400"],
  style: ["normal", "italic"],
});

/** Plex no es variable en Google Fonts: solo el peso que la hoja usa de verdad. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-plex-sans",
  weight: ["400"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-plex-mono",
  weight: ["400"],
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
    { media: "(prefers-color-scheme: light)", color: "#f2f3f5" },
    { media: "(prefers-color-scheme: dark)", color: "#11151b" },
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
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
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
