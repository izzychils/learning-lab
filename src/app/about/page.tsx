import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  Dna,
  FlaskConical,
  HeartPulse,
  Microscope,
  Sparkles,
  Waves,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learning Lab is a scientific simulation workspace built on one belief: the ideas that are hardest to see are often the ones worth understanding most.",
};

const disciplines = [
  {
    icon: FlaskConical,
    label: "Chemistry",
    copy: "Atoms, bonds, shape and the reactions that connect them.",
  },
  {
    icon: Dna,
    label: "Biology",
    copy: "Cells, inheritance and the systems that keep a body running.",
  },
  {
    icon: Waves,
    label: "Physics",
    copy: "Motion, forces, circuits and the rules that hold the physical world together.",
  },
  {
    icon: HeartPulse,
    label: "Medicine",
    copy: "Anatomy and physiology, explored with the context a diagram leaves out.",
  },
];

const principles = [
  {
    number: "01",
    title: "Make the invisible visible",
    copy: "A molecular shape, a nerve impulse or a titration curve should be something you can move and test, not just a sentence to remember.",
  },
  {
    number: "02",
    title: "Show the reasoning",
    copy: "An answer without a source is a rumour. The tutor exposes the model, the equation and the material behind every explanation.",
  },
  {
    number: "03",
    title: "Leave room to discover",
    copy: "A good simulation does not tell you what to see. It gives you a variable, a reading and a reason to ask the next question.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <PageHero
          eyebrow="About the lab"
          title={
            <>
              The ideas we cannot see are often the ones that{" "}
              <span className="text-flare">matter most.</span>
            </>
          }
          description="Learning Lab is a scientific simulation workspace for the things a static diagram never quite explains. We build the model, show the evidence and let curiosity finish the job."
          aside={
            <div className="rounded-[22px] border border-paper/12 bg-paper/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/35">
                  What we believe
                </span>
                <Sparkles className="h-3.5 w-3.5 text-flare" />
              </div>
              <p className="mt-4 font-display text-[25px] font-extrabold leading-[1.08] tracking-[-0.045em]">
                Curiosity is a method, not a personality trait.
              </p>
              <p className="mt-3 border-t border-paper/10 pt-3 text-[9.5px] leading-relaxed text-paper/38">
                Give a learner something they can change, something they can see and a way to
                check the explanation. The rest follows.
              </p>
            </div>
          }
          meta={
            <>
              <span className="flex items-center gap-1.5">
                <Microscope className="h-3 w-3 text-flare" /> Built for curious minds
              </span>
              <span className="flex items-center gap-1.5">
                <Atom className="h-3 w-3 text-flare" /> 2D first, browser native
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> Sources attached, always
              </span>
              <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/22 sm:block">
                About / the learning lab
              </span>
            </>
          }
        />

        <section className="py-14 sm:py-20">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <span className="eyebrow text-ink/40">Why we built it</span>
                <h2 className="mt-4 max-w-[380px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-ink">
                  Science is not a finished paragraph.
                </h2>
              </div>
              <div>
                <p className="max-w-[640px] text-[17px] leading-[1.65] tracking-[-0.01em] text-ink/65 sm:text-[20px]">
                  It is a sequence of small moves: change one thing, watch what happens, then
                  explain why. That sequence is where understanding lives. It is also the part
                  that a textbook cannot give you at 11pm before an exam.
                </p>
                <p className="mt-5 max-w-[600px] text-[12.5px] leading-[1.8] text-ink/48">
                  Learning Lab turns that sequence into a workspace. A molecule can be turned.
                  A burette can be opened by a tenth of a millilitre. A body system can be
                  selected and compared. The AI tutor sits beside the model, not above it,
                  ready to explain the thing you are already looking at.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Make it visible", "Change one variable", "Check the source", "Explain it back"].map(
                    (item, index) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-[9.5px] font-medium text-ink/50"
                      >
                        <span className="font-mono text-[7px] text-flare-deep">0{index + 1}</span>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white py-14 sm:py-20">
          <div className="shell">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow text-ink/40">One workshop, four doors</span>
                <h2 className="mt-3 max-w-[600px] text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.04] tracking-[-0.05em] text-ink">
                  Different subjects. The same habit of looking closely.
                </h2>
              </div>
              <Link
                href="/simulations"
                className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold text-ink/50 transition-colors hover:text-ink"
              >
                Explore the library
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {disciplines.map((discipline) => {
                const Icon = discipline.icon;
                return (
                  <article
                    key={discipline.label}
                    className="flex h-full flex-col rounded-2xl border border-line bg-paper-soft p-5"
                  >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-flare-soft text-flare-deep">
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="mt-5 text-[16px] font-bold tracking-[-0.03em] text-ink">
                        {discipline.label}
                      </h3>
                      <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
                        {discipline.copy}
                      </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="shell">
            <div className="grid gap-4 lg:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="flex h-full flex-col rounded-[26px] border border-line bg-white p-6"
                >
                    <span className="font-mono text-[9px] text-flare-deep">{principle.number}</span>
                    <h2 className="mt-6 max-w-[280px] text-[22px] font-extrabold leading-[1.08] tracking-[-0.045em] text-ink">
                      {principle.title}
                    </h2>
                    <p className="mt-3 text-[11px] leading-[1.75] text-ink/45">{principle.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[30px] bg-flare px-5 py-9 text-ink sm:px-9 sm:py-11">
              <div className="dot-grid-dark absolute inset-0 opacity-25" />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/45">
                    The product principle
                  </span>
                  <h2 className="mt-3 max-w-[720px] text-[clamp(2.1rem,4.4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                    Never invent what a learner has not learned.
                  </h2>
                  <p className="mt-4 max-w-[580px] text-[12px] leading-relaxed text-ink/58">
                    The AI may explain, rewrite and suggest. It must not invent a result, a
                    qualification or an observation. The evidence belongs to the learner.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                  <Link
                    href="/signup"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[11px] font-bold text-paper"
                  >
                    Build your lab
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-ink/20 px-5 text-[11px] font-semibold text-ink transition-colors hover:border-ink/45"
                  >
                    Try a demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      <section className="border-t border-line py-10 sm:py-14">
        <div className="shell">
          <p className="max-w-[680px] text-[11.5px] leading-[1.85] text-ink/50">
            {/* Learning Lab is a product of Ivents, based in Lagos, Nigeria. */} For a demo for your
            class, an educator rollout, or anything commercial, write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare"
            >
              {site.email}
            </a>
            {" "}or read the{" "}
            <Link
              href="/contact"
              className="font-semibold text-ink underline decoration-flare/40 underline-offset-2 hover:decoration-flare"
            >
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="h-3 w-3 text-flare">
      <path d="M2 6.2 4.7 9 10 3.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
