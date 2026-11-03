import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, FlaskConical, Sparkles } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { SimulationCatalog } from "@/features/marketing/simulation-catalog";
import { simulations } from "@/features/dashboard/data";

export const metadata: Metadata = {
  title: "Simulation library",
  description:
    "Browse Learning Lab simulations across chemistry, biology, physics and medicine. Open the live 2D demos or see what is in review.",
};

export default function SimulationsPage() {
  const live = simulations.filter((simulation) => simulation.status === "live").length;
  const inReview = simulations.length - live;

  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Simulation library"
          title={
            <>
              Every science worth seeing,{" "}
              <span className="text-flare">made visible.</span>
            </>
          }
          description="Chemistry, biology, physics and medicine, built as working 2D models. Change a variable, check the reading and ask the tutor why the result moved."
          aside={
            <div className="rounded-[22px] border border-paper/12 bg-paper/[0.04] p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/35">
                  Library status
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-flare">
                  <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                  Open
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-paper/10 bg-paper/[0.03] p-3">
                  <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.05em]">
                    {live}
                  </p>
                  <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/30">
                    Live demos
                  </p>
                </div>
                <div className="rounded-xl border border-paper/10 bg-paper/[0.03] p-3">
                  <p className="font-display text-[28px] font-extrabold leading-none tracking-[-0.05em]">
                    {inReview}
                  </p>
                  <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/30">
                    In review
                  </p>
                </div>
              </div>
              <Link
                href="/demo/titration"
                className="mt-3 flex items-center justify-between rounded-xl bg-flare px-3 py-2.5 text-[10px] font-bold text-ink"
              >
                New: titration bench
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          }
          meta={
            <>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Runs in your browser
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> No account needed for demos
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Teacher reviewed explanations
              </span>
              <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/22 sm:block">
                Chemistry / Biology / Physics / Medicine
              </span>
            </>
          }
        />

        <section className="py-10 sm:py-14">
          <div className="shell">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow text-ink/40">Browse the lab</span>
                <h2 className="mt-3 max-w-[600px] text-[clamp(1.8rem,3.2vw,2.7rem)] font-extrabold leading-[1.04] tracking-[-0.05em] text-ink">
                  Start with the question you cannot shake.
                </h2>
              </div>
              <p className="max-w-[330px] text-[11.5px] leading-relaxed text-ink/42 sm:text-right">
                Filter by discipline or search for a topic. Live cards open immediately.
              </p>
            </div>

            <SimulationCatalog />
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="shell">
            <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative overflow-hidden rounded-[26px] bg-[#0b0a08] p-5 text-paper sm:p-7">
                <div className="dot-grid absolute inset-0 opacity-25" />
                <div className="relative">
                  <span className="eyebrow text-paper/40">How a session runs</span>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {[
                      ["01", "Choose a model", "Open a structure, apparatus or body system."],
                      ["02", "Change one thing", "Move a slider, switch a molecule or add a drop."],
                      ["03", "Ask why", "The tutor reads the same model and cites the source."],
                    ].map(([number, title, copy]) => (
                      <div key={number} className="border-t border-paper/12 pt-3">
                        <span className="font-mono text-[8px] text-flare">{number}</span>
                        <p className="mt-2 text-[11.5px] font-semibold">{title}</p>
                        <p className="mt-1 text-[9.5px] leading-relaxed text-paper/38">{copy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-[26px] bg-flare p-5 text-ink sm:p-7">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/45">
                    For a whole class
                  </span>
                  <h2 className="mt-3 max-w-[360px] text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
                    Set the practical. See who is moving.
                  </h2>
                  <p className="mt-2.5 max-w-[380px] text-[11px] leading-relaxed text-ink/58">
                    Assign a simulation, watch progress and review the explanations before
                    they count.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/for-educators"
                    className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[10.5px] font-bold text-paper"
                  >
                    Explore educator tools
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-ink/60 hover:text-ink"
                  >
                    <FlaskConical className="h-3 w-3" />
                    Create a free account
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-line bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-[10px] text-ink/40">
                <Sparkles className="h-3 w-3 text-flare" />
                The library is built with demo data. Every simulation is educational, not a
                diagnostic tool.
              </p>
              <Link
                href="/glossary"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/45 transition-colors hover:text-ink"
              >
                Study the language first
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
