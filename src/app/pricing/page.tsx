import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingTable } from "@/features/marketing/pricing-table";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple Learning Lab pricing for learners, scholars and science departments. Start free, no card required.",
};

const included = [
  "Runs in a modern browser",
  "No installation",
  "Progress you can see",
  "Teacher reviewed sources",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Pricing"
          title={
            <>
              Serious science,{" "}
              <span className="text-flare">without the serious invoice.</span>
            </>
          }
          description="Start with the free lab. Add the practical library and planning tools when you need them. Bring the department in when the whole class is ready."
          aside={
            <div className="rounded-[22px] border border-paper/12 bg-paper/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/35">
                  The learning lab pass
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flare text-ink">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-4 font-display text-[32px] font-extrabold leading-none tracking-[-0.05em]">
                Start free.
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-paper/40">
                Every demo is open without a card. Upgrade only when the lab is already part
                of your week.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-paper/10 pt-3">
                {included.map((item) => (
                  <span key={item} className="flex items-start gap-1.5 text-[8.5px] leading-snug text-paper/45">
                    <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-flare" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          }
          meta={
            <>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Free plan available
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> No card for demos
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Cancel any time
              </span>
              <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/22 sm:block">
                Learner / scholar / department
              </span>
            </>
          }
        />

        <section className="py-10 sm:py-16">
          <div className="shell">
            <PricingTable />
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[28px] bg-[#0b0a08] px-5 py-8 text-paper sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="dot-grid absolute inset-0 opacity-25" />
              <div className="relative max-w-[590px]">
                <span className="eyebrow text-paper/40">Not sure yet?</span>
                <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.05em]">
                  Take the free route first.
                </h2>
                <p className="mt-3 max-w-[470px] text-[11.5px] leading-relaxed text-paper/42">
                  Open a working demo without signing up. If the lab makes a concept click,
                  come back and keep the progress.
                </p>
              </div>
              <div className="relative mt-6 flex flex-wrap items-center gap-4 lg:mt-0 lg:shrink-0">
                <Link
                  href="/demo"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-flare px-5 text-[11px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
                >
                  Open the demo lab
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/for-educators"
                  className="text-[11px] font-semibold text-paper/55 transition-colors hover:text-paper"
                >
                  See the educator tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
