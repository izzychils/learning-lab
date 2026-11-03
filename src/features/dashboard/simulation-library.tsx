"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { SimulationCard } from "@/features/dashboard/simulation-card";
import { simulations } from "@/features/dashboard/data";
import { cn } from "@/lib/utils";

const subjects = ["All", "Chemistry", "Biology", "Physics", "Medicine", "AI"] as const;
type Subject = (typeof subjects)[number];

export function SimulationLibrary() {
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
    <div className="space-y-6">
      <PageHeading
        eyebrow="Simulation library"
        title="Find the next thing to understand."
        description="Guided models, open explorations and practicals built around the questions you are actually asking."
        action={
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            <Sparkles className="h-3 w-3 text-flare" />
            {simulations.filter((simulation) => simulation.status === "live").length} live now
          </span>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSubject(item)}
              aria-pressed={subject === item}
              className={cn(
                "h-8 rounded-full border px-3 text-[10px] font-semibold transition-colors",
                subject === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-white text-ink/45 hover:border-ink/25 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the library"
            aria-label="Search simulations"
            className="h-9 w-full rounded-full border border-line bg-white pl-9 pr-3.5 text-[11px] text-ink placeholder:text-ink/30 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 text-[9.5px] text-ink/35">
        <span>
          Showing <span className="font-semibold text-ink/60">{filtered.length}</span> of{" "}
          {simulations.length} simulations
        </span>
        <span className="hidden items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] sm:flex">
          <SlidersHorizontal className="h-3 w-3" />
          Curated for your path
        </span>
      </div>

      {filtered.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((simulation) => (
            <SimulationCard key={simulation.title} simulation={simulation} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/50 px-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-flare-soft text-flare-deep">
            <Search className="h-4 w-4" />
          </span>
          <h2 className="mt-4 text-[15px] font-bold text-ink">No simulations found</h2>
          <p className="mt-1.5 max-w-[300px] text-[11px] leading-relaxed text-ink/40">
            Try a different subject or a broader search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubject("All");
              setQuery("");
            }}
            className="mt-4 rounded-full border border-line bg-white px-3.5 py-2 text-[10px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white px-5 py-4 text-[10px] text-ink/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          The library is growing. New practicals are added to the demo build as they are
          reviewed.
        </p>
        <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/25">
          Demo content / no downloads
        </p>
      </div>
    </div>
  );
}
