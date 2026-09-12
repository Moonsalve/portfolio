import { Archivo, JetBrains_Mono } from "next/font/google";

/**
 * `display: "optional"` en ambas familias, no `swap`.
 *
 * Medido en una iteración anterior: con `swap`, el intercambio de fuente
 * reflowaba el encabezado y movía la página entera, 0.282 de CLS. `optional`
 * da una ventana corta y, si la fuente no llegó, no la aplica en esa carga: la
 * deja en caché para la siguiente. La página nunca salta bajo el cursor.
 *
 * Archivo variable en vez de Archivo Black: el eje de peso llega a 900, así que
 * un solo archivo cubre el cuerpo (400) y la macrotipografía (900).
 */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-archivo",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-jetbrains",
});

export const fontClass = `${archivo.variable} ${jetbrains.variable}`;
