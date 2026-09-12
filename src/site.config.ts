/**
 * Datos no traducibles del sitio. Todo lo que cambia entre idiomas vive en
 * `src/i18n`; aquí solo van identidad, enlaces y banderas de configuración.
 */

export const site = {
  name: "Juan Monsalve",
  /** Dominio definitivo. Actualizar tras comprar el dominio (ver README). */
  url: "https://jmonsalve.dev",
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
    src: "/sleeve.jpg",
    width: 320,
    height: 320,
  } as { src: string; width: number; height: number } | null,
  cv: "/cv-juan-monsalve.pdf",
  /**
   * ID del formulario de Formspree (`https://formspree.io/f/<id>`), inyectado
   * en build por `NEXT_PUBLIC_FORMSPREE_ID`. Sin él, el formulario se degrada
   * a un enlace `mailto:` en vez de fingir un envío que nadie recibiría.
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? null,
} as const;

export type Site = typeof site;
