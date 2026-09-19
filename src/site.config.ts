import { withBasePath } from "@/lib/paths";

/**
 * Datos no traducibles del sitio. Todo lo que cambia entre idiomas vive en
 * `src/i18n`; aquí solo van identidad, enlaces y banderas de configuración.
 */

export const site = {
  name: "Juan Monsalve",
  /** Dominio definitivo. Actualizar tras comprar el dominio (ver README). */
  /**
   * Origen público. El valor por defecto es el dominio definitivo; la variable
   * permite apuntar a la URL temporal de GitHub Pages sin tocar código, para
   * que canonical, sitemap y Open Graph no mientan mientras tanto.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jmonsalve.dev",
  email: "JuanMonsalve.23@hotmail.com",
  githubUser: "Moonsalve",
  github: "https://github.com/Moonsalve",
  /**
   * Sin verificar: el handle de GitHub asumido resultó estar equivocado, así
   * que este no se publica hasta confirmarlo. Poner la URL para que aparezca.
   */
  linkedin: null as string | null,
  location: { city: "Bucaramanga", country: "Colombia", utcOffset: "GMT−5" },
  /**
   * Foto profesional en `/public`. `null` hasta tenerla: el encabezado cae a un
   * monograma tipográfico en vez de romper el build con un `next/image` vacío.
   */
  photo: null as { src: string; width: number; height: number } | null,
  /**
   * Marcador de posición del retrato, hasta que haya una foto profesional.
   * Se mantiene separado de `photo` a propósito: no es un retrato, así que su
   * texto alternativo describe la carátula y no a una persona. En cuanto
   * `photo` deje de ser `null`, esta imagen desaparece sola.
   * Obra de un tercero, incluida a petición del autor.
   */
  sleeve: {
    src: withBasePath("/sleeve.jpg"),
    width: 320,
    height: 320,
  } as { src: string; width: number; height: number } | null,
  /** Un PDF por idioma; la página enlaza el que corresponde y ofrece el otro. */
  cv: {
    es: withBasePath("/cv-juan-monsalve-es.pdf"),
    en: withBasePath("/cv-juan-monsalve-en.pdf"),
  } as Record<"es" | "en", string>,
  /**
   * Clave pública de Web3Forms, inyectada en build por
   * `NEXT_PUBLIC_WEB3FORMS_KEY`. Es pública por diseño: el sitio es estático y
   * el envío sale del navegador, así que la clave viaja en el bundle. Lo que
   * protege el buzón es el honeypot y el filtro de dominio del servicio, no el
   * secreto de esta cadena.
   *
   * Sin clave el formulario se degrada a un aviso con el correo directo, en vez
   * de fingir un envío que nadie recibiría.
   */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? null,
} as const;

export type Site = typeof site;
