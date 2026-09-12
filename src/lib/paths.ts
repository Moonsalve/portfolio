/**
 * Antepone el prefijo de ruta del despliegue a una ruta absoluta del sitio.
 *
 * Next lo aplica solo a lo que pasa por sus componentes (`next/link`, y por el
 * optimizador de imágenes cuando está activo). Un `<a href="/cv.pdf">` o un
 * `next/image` con `unoptimized` se sirven tal cual, así que bajo un sitio de
 * proyecto como `/portfolio/` apuntan a la raíz del dominio y dan 404.
 *
 * Pasó en producción con el enlace del CV, que es el que más importa.
 */
export function withBasePath(
  path: string,
  base: string | undefined = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  const prefix = (base ?? "").replace(/\/$/, "");
  if (!prefix) return path;
  if (!path.startsWith("/")) return `${prefix}/${path}`;
  return `${prefix}${path}`;
}
