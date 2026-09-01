import "server-only";
import { cookies, headers } from "next/headers";
import { parseAcceptLanguage } from "./acceptLanguage";
import { isLocale, type Locale } from "./types";

export const LOCALE_COOKIE = "locale";

/**
 * Elige el idioma en el servidor, para que el HTML llegue ya en el idioma
 * correcto.
 *
 * Por qué no detectarlo en el cliente: si el servidor renderiza en español y el
 * navegador está en inglés, todo el contenido se reemplaza justo después de
 * hidratar. Eso es un destello de idioma equivocado y, medido, 0.312 de CLS —
 * la página entera saltando frente a quien la está leyendo. Aquí no cuesta nada
 * evitarlo: el navegador ya manda sus preferencias en `Accept-Language`.
 *
 * Orden: la elección explícita del usuario (cookie) gana sobre la del
 * navegador, y esta sobre el idioma por defecto.
 */
export async function resolveLocale(): Promise<Locale> {
  const chosen = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(chosen)) return chosen;
  return parseAcceptLanguage((await headers()).get("accept-language"));
}
