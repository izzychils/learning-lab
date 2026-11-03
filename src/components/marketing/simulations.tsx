import { MoveUpRight, ScanLine } from "lucide-react";
import { MoleculeExplorer } from "@/features/simulations/molecule-explorer";
import { Reveal } from "@/components/ui/reveal";

export function Simulations() {
  return (
    <section
      id="simulations"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-20 text-paper sm:py-28"
    >
      <div className="grid-dark absolute inset-0 opacity-55 [mask-image:radial-gradient(80%_65%_at_50%_20%,black,transparent)]" />
      <div className="absolute right-[-18%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.14),transparent_68%)]" />

      <div className="shell relative">
        <div className="grid gap-8 border-b border-paper/10 pb-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <Reveal>
            <div className="flex items-center gap-2">
              <ScanLine className="h-3.5 w-3.5 text-flare" />
              <span className="eyebrow text-paper/45">Molecular explorer / live</span>
            </div>
            <h2 className="display mt-5 max-w-[720px] text-[clamp(2.5rem,4.8vw,4.5rem)] text-paper">
              See what the formula{" "}
              <span className="serif text-flare">leaves out.</span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="lg:pb-1">
            <p className="max-w-[420px] text-[14px] leading-[1.75] text-paper/48 lg:ml-auto">
              A formula tells you what is there. Shape tells you how it behaves. Pick a
              molecule, switch the labels, and let the structure explain the chemistry.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.13em] text-paper/30 lg:justify-end">
              <MoveUpRight className="h-3 w-3 text-flare" />
              Interactive / try all four
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-8">
          <MoleculeExplorer />
        </Reveal>

        <div className="mt-5 flex flex-col gap-2 font-mono text-[8.5px] uppercase tracking-[0.11em] text-paper/25 sm:flex-row sm:items-center sm:justify-between">
          <p>Structures simplified for learning. Not a quantum model.</p>
          <p>All explanations are checked against the course library.</p>
        </div>
      </div>
    </section>
  );
}
