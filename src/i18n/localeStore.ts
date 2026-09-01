import { defaultLocale, isLocale, type Locale } from "./types";

/** Un año: la elección de idioma no caduca en una sesión. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const LOCALE_COOKIE = "locale";

/**
 * Store externo del idioma, consumido con `useSyncExternalStore`.
 *
 * Por qué una cookie y no `localStorage`: el servidor tiene que renderizar en
 * el idioma correcto, y solo puede leer lo que el navegador le manda. Una
 * preferencia guardada donde el servidor no la ve garantiza que el primer
 * render esté equivocado y se corrija a la vista del usuario.
 *
 * Por qué un store y no estado en un efecto: la preferencia vive fuera de
 * React, así que React debe leerla, no poseerla; además evita el patrón de
 * "renderizar por defecto y corregir en un efecto", que encadena renders.
 */

let cached: Locale | null = null;
const listeners = new Set<() => void>();

function readCookie(): Locale | null {
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  const value = match?.[1] ? decodeURIComponent(match[1]) : null;
  return isLocale(value) ? value : null;
}

/**
 * Alinea el cliente con lo que el servidor ya decidió. Solo debe llamarse en el
 * navegador: este módulo se evalúa una vez por proceso, y mutar su estado
 * durante el render del servidor lo filtraría entre peticiones concurrentes.
 */
export function primeLocale(locale: Locale): void {
  cached ??= locale;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Devuelve siempre la misma referencia mientras nada cambie, o entra en bucle. */
export function getSnapshot(): Locale {
  cached ??= readCookie() ?? defaultLocale;
  return cached;
}

export function setLocale(next: Locale): void {
  if (cached === next) return;
  cached = next;
  // `SameSite=Lax` basta: la cookie solo la lee este mismo sitio al renderizar.
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  for (const listener of listeners) listener();
}
