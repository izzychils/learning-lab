import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  Clock3,
  FlaskConical,
  Layers,
  Sparkles,
} from "lucide-react";
import { MolecularWorkspace } from "@/features/simulations/molecular-workspace";
import { AnatomyExplorer } from "@/features/anatomy/anatomy-explorer";
import { TutorDemo } from "@/features/ai/tutor-demo";
import { TitrationLab } from "@/features/simulations/titration-lab";
import { CompleteButton } from "@/features/dashboard/complete-button";

type Workspace = {
  title: string;
  subject: string;
  description: string;
  duration: string;
  level: string;
  objectives: string[];
  note: string;
  render: () => React.ReactNode;
};

const workspaces: Record<string, Workspace> = {
  "molecular-lab": {
    title: "Molecular lab",
    subject: "Chemistry / Structure",
    description:
      "Pick a molecule, switch its labels and see how geometry, polarity and behavior connect.",
    duration: "35 min",
    level: "Foundation",
    objectives: [
      "Read a 2D ball and stick structure without losing the bonds.",
      "Connect shape to polarity for water, methane, carbon dioxide and ammonia.",
      "Use the tutor note as evidence, not as a shortcut.",
    ],
    note: "Switch all four molecules and read the AI note for each before marking this session complete.",
    render: () => <MolecularWorkspace />,
  },
  anatomy: {
    title: "Body systems",
    subject: "Medicine / Anatomy",
    description:
      "Move through four body systems and see the structures that do the work.",
    duration: "30 min",
    level: "Intermediate",
    objectives: [
      "Identify the main organ in each selected system.",
      "Explain one function and one relationship for each system.",
      "Use the schematic map to check your own recall.",
    ],
    note: "The map is intentionally schematic. Focus on relationships, not on memorising a drawing.",
    render: () => <AnatomyExplorer />,
  },
  "ai-tutor": {
    title: "AI tutor session",
    subject: "AI / Guided reasoning",
    description:
      "Ask a question about the model on screen and inspect the source behind the answer.",
    duration: "Open ended",
    level: "All levels",
    objectives: [
      "Ask a question that starts from a visible model.",
      "Follow the equation or structure in the answer.",
      "Check the source before accepting the explanation.",
    ],
    note: "Try all three prompts, then write one question of your own in your notebook.",
    render: () => (
      <div className="mx-auto max-w-[760px]">
        <TutorDemo />
      </div>
    ),
  },
  titration: {
    title: "Titration curves",
    subject: "Chemistry / Practical",
    description:
      "Add sodium hydroxide to hydrochloric acid, follow the pH and locate the equivalence point.",
    duration: "40 min",
    level: "Advanced",
    objectives: [
      "Read a burette volume to one decimal place.",
      "Explain why the pH changes slowly, then sharply, near equivalence.",
      "Use the indicator and the curve as two pieces of evidence.",
    ],
    note: "The model assumes 25.0 mL of 0.100 M HCl and 0.100 M NaOH at 25 degrees Celsius.",
    render: () => <TitrationLab />,
  },
};

export function generateStaticParams() {
  return Object.keys(workspaces).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workspace = workspaces[slug];
  if (!workspace) return { title: "Simulation workspace" };
  return { title: workspace.title, description: workspace.description };
}

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workspace = workspaces[slug];
  if (!workspace) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/simulations"
          className="group inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          Simulation library
        </Link>
        <CompleteButton slug={slug} />
      </div>

      <header className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow text-ink/40">{workspace.subject}</span>
          <h1 className="display mt-3 text-[clamp(1.9rem,3.3vw,2.6rem)] text-ink">{workspace.title}</h1>
          <p className="mt-2.5 max-w-[580px] text-[12.5px] leading-relaxed text-ink/48">
            {workspace.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[9px] text-ink/38">
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-3 w-3" /> {workspace.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-3 w-3" /> {workspace.level}
            </span>
            <span className="flex items-center gap-1.5">
              <FlaskConical className="h-3 w-3" /> Guided simulation
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
          <Atom className="h-4 w-4 text-flare" />
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            Demo / 2D
          </span>
        </div>
      </header>

      <div>{workspace.render()}</div>

      <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-bold text-ink">In this session</h2>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/25">
              3 objectives
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {workspace.objectives.map((objective, index) => (
              <li key={objective} className="flex items-start gap-2.5 text-[11px] leading-relaxed text-ink/52">
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-flare-soft font-mono text-[7px] font-bold text-flare-deep">
                  0{index + 1}
                </span>
                {objective}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3 text-[10px] leading-relaxed text-ink/35">
            {workspace.note}
          </p>
        </section>

        <section className="flex flex-col justify-between rounded-2xl bg-ink p-5 text-paper">
          <div>
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-flare">
              <Sparkles className="h-3 w-3" />
              Keep asking
            </span>
            <h2 className="mt-3 text-[19px] font-extrabold leading-[1.1] tracking-[-0.04em]">
              The model is only the beginning.
            </h2>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-paper/42">
              Ask why a result happens, what would change it and where the explanation comes
              from.
            </p>
          </div>
          <Link
            href="/dashboard/simulations/ai-tutor"
            className="mt-5 inline-flex items-center gap-1.5 text-[10.5px] font-bold text-paper transition-colors hover:text-flare"
          >
            Open the AI tutor
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
