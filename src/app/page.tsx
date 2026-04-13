import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Currently } from "@/components/Currently";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SocialProof } from "@/components/SocialProof";
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
        <About />
        <SocialProof />
        <Expertise />
        <Work />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
