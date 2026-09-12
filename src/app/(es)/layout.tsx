import type { Metadata } from "next";
import { Shell, metadataFor } from "../shell";
import "../globals.css";

export const metadata: Metadata = metadataFor("es");
export { viewport } from "../shell";

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="es">{children}</Shell>;
}
