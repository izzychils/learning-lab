import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  Layers,
  MonitorPlay,
  Sparkles,
} from "lucide-react";
import { DemoHeader } from "@/components/site/demo-header";
import { DemoFooter } from "@/components/site/demo-footer";
import { MolecularWorkspace } from "@/features/simulations/molecular-workspace";
import { AnatomyExplorer } from "@/features/anatomy/anatomy-explorer";
import { TutorDemo } from "@/features/ai/tutor-demo";
import { TitrationLab } from "@/features/simulations/titration-lab";
import { PeriodicTable } from "@/features/reference/periodic-table";

type Demo = {
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  duration: string;
  level: string;
  notes: string[];
  render: () => React.ReactNode;
};

const demos: Record<string, Demo> = {
  "molecular-lab": {
    title: "Molecular lab",
    eyebrow: "Chemistry / Structure",
    headline: "See the shape behind the formula.",
    description:
      "Pick a molecule, switch the labels and let the structure explain the chemistry. The model and the tutor note move together.",
    duration: "35 min",
    level: "Foundation",
    notes: [
      "Four molecules with different geometry and polarity.",
      "Turn labels on or off to test your own recall.",
      "Read the grounded note before moving to the next structure.",
    ],
    render: () => <MolecularWorkspace />,
  },
  anatomy: {
    title: "Body systems",
    eyebrow: "Medicine / Anatomy",
    headline: "The body, without the flat poster.",
    description:
      "Move between four body systems and see the structures that do the work. Select a tab and the map responds.",
    duration: "30 min",
    level: "Intermediate",
    notes: [
      "Nervous, circulation, respiration and digestion in one map.",
      "Each system connects a structure to a function.",
      "Use the schematic view to check relationships, not just labels.",
    ],
    render: () => <AnatomyExplorer />,
  },
  "ai-tutor": {
    title: "AI tutor",
    eyebrow: "AI / Guided reasoning",
    headline: "Ask why, not just what.",
    description:
      "Choose a question about the science you are looking at. Every sample answer shows the reasoning, the equation and a source.",
    duration: "Open ended",
    level: "All levels",
    notes: [
      "Answers start from the model on screen.",
      "Equations and structures are shown, not hidden.",
      "A source is attached to every grounded explanation.",
    ],
    render: () => (
      <div className="mx-auto max-w-[760px]">
        <TutorDemo />
      </div>
    ),
  },
  titration: {
    title: "Titration bench",
    eyebrow: "Chemistry / Practical",
    headline: "Watch a pH curve happen one drop at a time.",
    description:
      "Run a strong acid against a strong base. Move the burette, follow the indicator and stop at the equivalence point.",
    duration: "40 min",
    level: "Advanced",
    notes: [
      "Add base in 0.1 mL steps and watch the pH respond.",
      "The curve marks the equivalence point at exactly 25.0 mL.",
      "Switch the indicator off to read the chemistry without the colour.",
    ],
    render: () => <TitrationLab />,
  },
  "periodic-table": {
    title: "Periodic table",
    eyebrow: "Chemistry / Reference",
    headline: "The table, not as a poster.",
    description:
      "Search the core table, filter by family and open any element. Each profile connects the number to a use you can recognise.",
    duration: "20 min",
    level: "Foundation",
    notes: [
      "All 36 elements in periods 1 to 4 are selectable.",
      "Filter by family or search by symbol, name or number.",
      "Every profile links back to a structural model.",
    ],
    render: () => <PeriodicTable />,
  },
};

export function generateStaticParams() {
  return Object.keys(demos).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = demos[slug];
  if (!demo) return { title: "Demo lab" };
  return {
    title: `${demo.title} demo`,
    description: demo.description,
  };
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = demos[slug];
  if (!demo) notFound();

  return (
    <div className="min-h-screen bg-paper">
      <DemoHeader />
      <main>
        <section className="relative overflow-hidden bg-[#0b0a08] pb-10 pt-8 text-paper sm:pb-12">
          <div className="grid-dark absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="absolute right-[-10%] top-[-260px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_68%)]" />
          <div className="shell relative">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/35 transition-colors hover:text-paper"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
              All demos
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.56fr] lg:items-end">
              <div>
                <span className="eyebrow text-paper/42">{demo.eyebrow}</span>
                <h1 className="display mt-4 max-w-[700px] text-[clamp(2.6rem,5vw,4.4rem)] text-paper">
                  {demo.headline}
                </h1>
                <p className="mt-4 max-w-[590px] text-[13px] leading-[1.75] text-paper/48">
                  {demo.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-paper/10 pt-4 text-[9px] text-paper/35 lg:justify-end">
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3 w-3" /> {demo.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3 w-3" /> {demo.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <MonitorPlay className="h-3 w-3" /> 2D / browser
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="shell">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35">
                <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                Live demo / no sign in required
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/25">
                Built with demo data
              </span>
            </div>
            {demo.render()}
          </div>
        </section>

        <section className="pb-14">
          <div className="shell grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/32">
                What this demo shows
              </span>
              <ul className="mt-4 space-y-3">
                {demo.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-ink/52">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-flare-soft">
                      <Check className="h-2.5 w-2.5 text-flare-deep" strokeWidth={3} />
                    </span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ink p-5 text-paper sm:p-6">
              <div className="dot-grid absolute inset-0 opacity-25" />
              <div className="relative">
                <Sparkles className="h-4 w-4 text-flare" />
                <h2 className="mt-4 text-[23px] font-extrabold leading-[1.08] tracking-[-0.04em]">
                  Keep the model. Keep the progress.
                </h2>
                <p className="mt-2.5 max-w-[360px] text-[11px] leading-relaxed text-paper/42">
                  Create a free demo account to save sessions, see mastery and bring the lab
                  into a class.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <Link
                    href="/signup"
                    className="group inline-flex h-10 items-center gap-2 rounded-full bg-flare px-4 text-[10.5px] font-bold text-ink"
                  >
                    Start free
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/login" className="text-[10.5px] font-semibold text-paper/55 transition-colors hover:text-paper">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <DemoFooter />
    </div>
  );
}
