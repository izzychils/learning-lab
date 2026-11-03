import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  CircuitBoard,
  Dna,
  FlaskConical,
  HeartPulse,
  Sparkles,
  TestTubes,
  Waves,
} from "lucide-react";
import type { Simulation } from "@/features/dashboard/data";
import { cn } from "@/lib/utils";

const icons = {
  atom: Atom,
  flask: FlaskConical,
  heart: HeartPulse,
  dna: Dna,
  wave: Waves,
  chip: CircuitBoard,
  spark: Sparkles,
  test: TestTubes,
};

export function SimulationCard({ simulation, compact = false }: { simulation: Simulation; compact?: boolean }) {
  const Icon = icons[simulation.icon];
  const isLive = simulation.status === "live" && simulation.slug;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex items-center justify-center rounded-xl border",
            compact ? "h-9 w-9" : "h-10 w-10",
            simulation.status === "live"
              ? "border-flare/20 bg-flare-soft text-flare-deep"
              : "border-line bg-paper text-ink/30",
          )}
        >
          <Icon className={compact ? "h-4 w-4" : "h-4.5 w-4.5"} />
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em]",
            simulation.status === "live"
              ? "bg-ink text-paper"
              : "border border-line text-ink/30",
          )}
        >
          {simulation.status === "live" ? simulation.subject : "Coming soon"}
        </span>
      </div>

      <div className={compact ? "mt-4" : "mt-5"}>
        <h3 className="text-[14px] font-bold leading-tight tracking-[-0.025em] text-ink">
          {simulation.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-relaxed text-ink/45">
          {simulation.description}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-line/80 pt-3">
        <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/32">
          {simulation.level}
        </span>
        <span className="h-1 w-1 rounded-full bg-ink/15" />
        <span className="font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/32">
          {simulation.duration}
        </span>
        {isLive ? (
          <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : null}
      </div>

      {simulation.progress > 0 ? (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[8px] text-ink/35">
            <span>Progress</span>
            <span className="font-mono">{simulation.progress}%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line/70">
            <div className="h-full rounded-full bg-flare" style={{ width: `${simulation.progress}%` }} />
          </div>
        </div>
      ) : null}
    </>
  );

  if (isLive) {
    return (
      <Link
        href={`/dashboard/simulations/${simulation.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition-colors hover:border-ink/25"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-white/55 p-4 opacity-80">
      {content}
    </div>
  );
}
