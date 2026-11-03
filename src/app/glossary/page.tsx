import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookMarked, Check } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { GlossaryBrowser } from "@/features/reference/glossary-browser";
import { glossaryTerms } from "@/features/reference/glossary";

export const metadata: Metadata = {
  title: "Science glossary",
  description:
    "The language of chemistry, biology, physics and medicine, explained clearly and connected to the Learning Lab simulations.",
};

export default function GlossaryPage() {
  const counts = ["Chemistry", "Biology", "Physics", "Medicine"].map((category) => ({
    category,
    count: glossaryTerms.filter((term) => term.category === category).length,
  }));

  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Science glossary"
          title={
            <>
              Half the battle is{" "}
              <span className="text-flare">knowing what to call it.</span>
            </>
          }
          description="A working glossary for the terms that show up in the lab. Search a word, jump to a letter and read the version that connects to a model you can actually see."
          aside={
            <div className="rounded-[22px] border border-paper/12 bg-paper/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/35">
                  In this glossary
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flare text-ink">
                  <BookMarked className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-4 font-display text-[44px] font-extrabold leading-none tracking-[-0.06em]">
                {glossaryTerms.length}
                <span className="ml-1.5 text-[13px] font-semibold text-paper/30">terms</span>
              </p>
              <div className="mt-4 space-y-2 border-t border-paper/10 pt-3">
                {counts.map((item) => (
                  <div key={item.category} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[9px] text-paper/42">
                      <span className="h-1 w-1 rounded-full bg-flare" />
                      {item.category}
                    </span>
                    <span className="font-mono text-[8px] text-paper/28">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          }
          meta={
            <>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Written for the course
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Linked to the simulations
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> No jargon without a reason
              </span>
              <Link
                href="/demo/periodic-table"
                className="ml-auto hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/28 transition-colors hover:text-paper sm:flex"
              >
                Try the periodic table
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </>
          }
        />

        <section className="py-10 sm:py-14">
          <div className="shell">
            <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <span className="eyebrow text-ink/40">From A to W</span>
                <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.04] tracking-[-0.05em] text-ink">
                  Read the word. Then see it happen.
                </h2>
              </div>
              <p className="max-w-[540px] text-[11.5px] leading-relaxed text-ink/42 lg:ml-auto">
                These definitions are deliberately short enough to use mid-session. Expand a
                term for the longer explanation and the ideas it connects to.
              </p>
            </div>

            <GlossaryBrowser />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
