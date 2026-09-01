import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export const copy: Record<Locale, Dictionary> = { es, en };

export { defaultLocale, isLocale, locales } from "./types";
export type { Dictionary, Locale } from "./types";
