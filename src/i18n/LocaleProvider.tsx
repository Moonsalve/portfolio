"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { copy, type Dictionary, type Locale } from "./index";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * El idioma ya no se negocia ni se guarda: lo determina la ruta, y el servidor
 * prerenderiza una página por idioma. Esto es lo que permite exportar el sitio
 * como HTML estático, y elimina de raíz el desajuste que antes había entre lo
 * que el servidor rendía y lo que el cliente corregía tras hidratar.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => ({ locale, t: copy[locale] }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale debe usarse dentro de <LocaleProvider>.");
  }
  return context;
}
