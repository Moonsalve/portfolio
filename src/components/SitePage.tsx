import { getActivity } from "@/lib/github";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Principles } from "@/components/Principles";
import { Projects } from "@/components/Projects";
import { SkipLink } from "@/components/SkipLink";
import { Thesis } from "@/components/Thesis";
import { TopBar } from "@/components/TopBar";

/**
 * La página entera, en un idioma.
 *
 * Existe una ruta prerenderizada por idioma (`/` en español, `/en` en inglés)
 * en vez de una sola que negocia por cabecera. Es lo que permite exportar el
 * sitio como HTML estático, y de paso le da a cada idioma una URL propia que
 * el buscador puede indexar y que se puede escribir en un CV.
 */
export async function SitePage({ locale }: { locale: Locale }) {
  const activity = await getActivity();

  return (
    <LocaleProvider locale={locale}>
      <SkipLink />
      <TopBar />
      <main id="main">
        <Hero activity={activity} />
        <Thesis />
        <Projects />
        <Principles />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
