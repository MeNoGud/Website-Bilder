import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Expertise } from "@/components/Expertise";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
