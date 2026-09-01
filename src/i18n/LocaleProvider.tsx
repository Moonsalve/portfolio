"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getSnapshot,
  primeLocale,
  setLocale as writeLocale,
  subscribe,
} from "./localeStore";
import { copy, type Dictionary, type Locale } from "./index";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  /** Idioma que el servidor ya resolvió y con el que renderizó el HTML. */
  initialLocale: Locale;
  children: ReactNode;
}) {
  // Solo en el navegador: en el servidor, mutar el módulo filtra entre peticiones.
  if (typeof window !== "undefined") {
    primeLocale(initialLocale);
  }

  const getServerSnapshot = useCallback(() => initialLocale, [initialLocale]);
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sincroniza el DOM con el estado de React: para esto sí existen los efectos.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: copy[locale], setLocale: writeLocale }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale debe usarse dentro de <LocaleProvider>.");
  }
  return context;
}
