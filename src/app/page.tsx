import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/marketing/hero";
import { DisciplineMarquee } from "@/components/marketing/marquee";
import { Platform } from "@/components/marketing/platform";
import { Simulations } from "@/components/marketing/simulations";
import { Tutor } from "@/components/marketing/tutor";
import { Anatomy } from "@/components/marketing/anatomy";
import { Educators } from "@/components/marketing/educators";
import { Proof } from "@/components/marketing/proof";
import { Faq } from "@/components/marketing/faq";
import { Closing } from "@/components/marketing/closing";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <DisciplineMarquee />
        <Platform />
        <Simulations />
        <Tutor />
        <Anatomy />
        <Educators />
        <Proof />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
