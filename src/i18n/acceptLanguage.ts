import { defaultLocale, locales, type Locale } from "./types.ts";

/**
 * Elige el idioma soportado que el visitante prefiere.
 *
 * Acepta tanto una cabecera `Accept-Language` ("en-US,en;q=0.9,es;q=0.8") como
 * la lista de `navigator.languages`, porque son el mismo dato en dos formatos.
 * Es lógica pura y sin dependencias del entorno: por eso se puede probar sin
 * levantar un navegador ni una petición.
 *
 * No se usa `Intl.LocaleMatcher` porque no existe en runtime; con dos idiomas,
 * esto es todo lo que hace falta.
 */
export function preferredLocale(input: string | readonly string[] | null | undefined): Locale {
  const header = Array.isArray(input) ? input.join(",") : (input as string | null | undefined);
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const quality = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="));
      const parsed = quality ? Number.parseFloat(quality.slice(2)) : 1;
      return {
        base: tag.trim().toLowerCase().split("-")[0] ?? "",
        q: Number.isFinite(parsed) ? parsed : 0,
      };
    })
    .filter((entry) => entry.base.length > 0 && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const entry of ranked) {
    const match = locales.find((locale) => locale === entry.base);
    if (match) return match;
  }
  return defaultLocale;
}
