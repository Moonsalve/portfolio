export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/** Una entrada por idioma, cada una declarando la otra como alternativa. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: site.url, en: `${site.url}/en` };
  const lastModified = new Date();

  return [
    {
      url: languages.es,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: languages.en,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
