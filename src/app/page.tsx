import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Principles } from "@/components/Principles";
import { Projects } from "@/components/Projects";
import { SkipLink } from "@/components/SkipLink";
import { Thesis } from "@/components/Thesis";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main">
        <Thesis />
        <Projects />
        <Principles />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
