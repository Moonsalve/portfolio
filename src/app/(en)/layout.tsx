import type { Metadata } from "next";
import { Shell, metadataFor } from "../shell";
import "../globals.css";

export const metadata: Metadata = metadataFor("en");
export { viewport } from "../shell";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
