import { getActivity } from "@/lib/github";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TopBar } from "@/components/TopBar";
import { Principles } from "@/components/Principles";
import { Projects } from "@/components/Projects";
import { SkipLink } from "@/components/SkipLink";
import { Thesis } from "@/components/Thesis";

export default async function HomePage() {
  const activity = await getActivity();

  return (
    <>
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
    </>
  );
}
