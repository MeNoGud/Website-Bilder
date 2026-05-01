import { CallToAction } from "@/components/CallToAction";
import { Contact } from "@/components/Contact";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Stats } from "@/components/Stats";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Expertise />
        <Process />
        <Work />
        <LogoStrip />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
}
