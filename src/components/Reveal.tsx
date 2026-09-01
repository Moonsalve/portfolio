"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Etiqueta a renderizar; por defecto un `div` neutro. */
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Revelación única al entrar en viewport. Si el navegador no trae
 * IntersectionObserver, o el usuario pide menos movimiento, el contenido
 * aparece visible desde el primer render: la animación nunca puede ocultar algo.
 */
export function Reveal({ children, as, className, id }: RevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={["reveal", className].filter(Boolean).join(" ")}
      data-visible={visible}
    >
      {children}
    </Tag>
  );
}
