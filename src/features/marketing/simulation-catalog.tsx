"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  CircuitBoard,
  Dna,
  FlaskConical,
  HeartPulse,
  Search,
  Sparkles,
  TestTubes,
  Waves,
} from "lucide-react";
import { simulations, type Simulation } from "@/features/dashboard/data";
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

const subjects = ["All", "Chemistry", "Biology", "Physics", "Medicine", "AI"] as const;
type Subject = (typeof subjects)[number];

const watermarks: Record<Simulation["subject"], string> = {
  Chemistry: "H2O",
  Biology: "DNA",
  Physics: "F=ma",
  Medicine: "BPM",
  AI: "SRC",
};

export function SimulationCatalog() {
  const [subject, setSubject] = useState<Subject>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return simulations.filter((simulation) => {
      const subjectMatch = subject === "All" || simulation.subject === subject;
      const queryMatch =
        !term ||
        simulation.title.toLowerCase().includes(term) ||
        simulation.description.toLowerCase().includes(term) ||
        simulation.subject.toLowerCase().includes(term);
      return subjectMatch && queryMatch;
    });
  }, [subject, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSubject(item)}
              aria-pressed={subject === item}
              className={cn(
                "h-9 rounded-full border px-3.5 text-[10.5px] font-semibold transition-colors",
                subject === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink/45 hover:border-ink/25 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-[280px]">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the library"
            aria-label="Search the simulation library"
            className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-4 text-[11.5px] text-ink placeholder:text-ink/30 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[10px] text-ink/38">
          <span className="font-semibold text-ink/65">{filtered.length}</span> simulations in view
        </p>
        <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/25">
          {filtered.filter((item) => item.status === "live").length} live now / 2D
        </p>
      </div>

      {filtered.length ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((simulation, index) => {
            const Icon = icons[simulation.icon];
            const live = simulation.status === "live" && simulation.slug;
            const card = (
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-[24px] border bg-white p-2 transition-colors",
                  live ? "border-line hover:border-ink/25" : "border-line/80",
                )}
              >
                <div className="relative h-[158px] overflow-hidden rounded-[18px] bg-[#0b0a08]">
                  <div className="dot-grid absolute inset-0 opacity-35" />
                  <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_70%_30%,rgba(255,90,31,0.16),transparent_68%)]" />
                  <span className="absolute right-3 top-3 font-mono text-[7.5px] uppercase tracking-[0.12em] text-paper/25">
                    {String(index + 1).padStart(2, "0")} / {simulation.subject}
                  </span>
                  <span className="absolute bottom-[-16px] left-2 font-display text-[84px] font-extrabold leading-none tracking-[-0.08em] text-paper/[0.055]">
                    {watermarks[simulation.subject]}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-[20px] border border-paper/12 bg-paper/[0.04] text-flare backdrop-blur-sm">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        live ? "bg-flare" : "bg-paper/25",
                      )}
                    />
                    <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-paper/40">
                      {live ? "Live demo" : "In review"}
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full border border-paper/12 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/35">
                    {simulation.duration}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-[18px] font-extrabold leading-[1.1] tracking-[-0.04em] text-ink">
                      {simulation.title}
                    </h2>
                    {live ? (
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink/30 transition-colors group-hover:border-flare group-hover:bg-flare group-hover:text-ink">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    ) : (
                      <span className="mt-0.5 shrink-0 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/25">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
                    {simulation.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-line/80 pt-3">
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                      {simulation.level}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/15" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                      {simulation.subject}
                    </span>
                  </div>
                </div>
              </article>
            );

            return (
              <div key={simulation.title} className="h-full">
                {live ? (
                  <Link href={`/demo/${simulation.slug}`} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-dashed border-ink/15 bg-white/55 px-6 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-flare-soft text-flare-deep">
            <Search className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-[17px] font-bold text-ink">No simulation matches that yet.</h2>
          <p className="mt-1.5 max-w-[330px] text-[11px] leading-relaxed text-ink/40">
            Try another subject or a shorter search term. The library grows every term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubject("All");
              setQuery("");
            }}
            className="mt-4 rounded-full border border-line bg-white px-4 py-2 text-[10px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
          >
            Clear the filters
          </button>
        </div>
      )}
    </div>
  );
}
