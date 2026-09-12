import type { Metadata, Viewport } from "next";
import { copy, type Locale } from "@/i18n";
import { site } from "@/site.config";
import { fontClass } from "./fonts";

/** Ruta pública de cada idioma. El español vive en la raíz. */
export const localePath: Record<Locale, string> = { es: "/", en: "/en" };

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Metadatos de un idioma, con `hreflang` hacia el otro.
 *
 * Cada idioma tiene su URL, así que el buscador puede indexar las dos y
 * mostrarle a cada visitante la que le corresponde. `x-default` apunta al
 * español, que es la raíz.
 */
export function metadataFor(locale: Locale): Metadata {
  const t = copy[locale];
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: localePath[locale],
      languages: {
        es: localePath.es,
        en: localePath.en,
        "x-default": localePath.es,
      },
    },
    openGraph: {
      type: "profile",
      title: t.meta.title,
      description: t.meta.description,
      url: localePath[locale],
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

/** Datos estructurados: quién es, qué hace y dónde, para el buscador. */
function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: copy[locale].header.role,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin].filter((v): v is string => Boolean(v)),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
    knowsLanguage: ["es", "en"],
  };
}

/**
 * Envoltura común de los dos layouts raíz.
 *
 * Las variables de fuente van en `<html>`, no en `<body>`: los tokens
 * `--font-display/mono` se declaran en `:root`, y un `var()` dentro de otra
 * custom property se resuelve en el elemento donde está declarada. Un nivel más
 * abajo, `:root` no las ve y toda la tipografía cae a Times sin fallar.
 */
export function Shell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale} className={fontClass}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
        />
        {children}
      </body>
    </html>
  );
}
