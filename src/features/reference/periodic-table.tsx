"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Atom, Search, X } from "lucide-react";
import {
  categoryStyles,
  elementCategories,
  elements,
  type ChemicalElement,
  type ElementCategory,
} from "@/features/reference/elements";
import { cn } from "@/lib/utils";

type Filter = "All" | ElementCategory;

export function PeriodicTable({
  molecularHref = "/demo/molecular-lab",
}: {
  molecularHref?: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedNumber, setSelectedNumber] = useState(8);

  const selected = elements.find((element) => element.number === selectedNumber) ?? elements[7];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return elements.filter((element) => {
      const categoryMatch = filter === "All" || element.category === filter;
      const queryMatch =
        !term ||
        element.name.toLowerCase().includes(term) ||
        element.symbol.toLowerCase() === term ||
        String(element.number) === term;
      return categoryMatch && queryMatch;
    });
  }, [filter, query]);

  return (
    <div className="space-y-3">
      <div className="rounded-[26px] border border-line bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-flare">
              <Atom className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11.5px] font-bold text-ink">Core periodic table</p>
              <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">
                Periods 1 to 4 / 36 elements
              </p>
            </div>
          </div>

          <div className="relative w-full lg:w-[250px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, symbol or number"
              aria-label="Search elements"
              className="h-9 w-full rounded-full border border-line bg-paper-soft pl-9 pr-9 text-[11px] text-ink placeholder:text-ink/30 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-ink/35 hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-3 w-3" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
          {(["All", ...elementCategories] as Filter[]).map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1.5 text-[8.5px] font-semibold capitalize transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper-soft text-ink/50 hover:border-ink/25 hover:text-ink",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mt-4 hidden overflow-x-auto pb-1 lg:block">
          <div className="min-w-[860px]">
            <div
              className="grid gap-1.5"
              style={{
                gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
                gridTemplateRows: "14px repeat(4, minmax(0, 1fr))",
              }}
            >
              {Array.from({ length: 18 }, (_, index) => (
                <span
                  key={`group-${index}`}
                  style={{ gridColumn: index + 1, gridRow: 1 }}
                  className="text-center font-mono text-[6.5px] text-ink/25"
                >
                  {index + 1}
                </span>
              ))}
              {elements.map((element) => (
                <ElementButton
                  key={element.number}
                  element={element}
                  selected={element.number === selectedNumber}
                  onSelect={() => setSelectedNumber(element.number)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:hidden">
          {filtered.map((element) => (
            <button
              key={element.number}
              type="button"
              onClick={() => setSelectedNumber(element.number)}
              aria-pressed={element.number === selectedNumber}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-2 py-2.5 text-left transition-transform active:scale-[0.98]",
                categoryStyles[element.category],
                element.number === selectedNumber && "ring-2 ring-ink ring-offset-1",
              )}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/45 font-display text-[14px] font-extrabold">
                {element.symbol}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[9px] font-bold">{element.name}</span>
                <span className="mt-0.5 block font-mono text-[7px] opacity-55">
                  {element.number} / {element.mass}
                </span>
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-5 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-paper-soft/60 px-4 text-center">
            <Search className="h-4 w-4 text-ink/30" />
            <p className="mt-2 text-[11px] font-semibold text-ink/60">No element matches that.</p>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
              className="mt-2 text-[10px] font-semibold text-flare-deep"
            >
              Clear the filters
            </button>
          </div>
        ) : null}

        <div className="mt-4 flex flex-col gap-2 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] leading-relaxed text-ink/35">
            The demo covers periods 1 to 4. The full lab adds transition series and the f block.
          </p>
          <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/25">
            {filtered.length} of 36 shown
          </span>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.78fr_1.22fr]">
        <section
          className={cn(
            "relative overflow-hidden rounded-[24px] border p-5 sm:p-6",
            categoryStyles[selected.category],
          )}
        >
          <div className="dot-grid-dark absolute inset-0 opacity-20" />
          <div className="relative flex items-start justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] opacity-50">
              {String(selected.number).padStart(3, "0")} / {selected.category}
            </span>
            <span className="rounded-full border border-ink/15 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.09em] opacity-55">
              {selected.state}
            </span>
          </div>
          <div className="relative mt-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-[clamp(3rem,7vw,5rem)] font-extrabold leading-[0.8] tracking-[-0.07em]">
                {selected.symbol}
              </p>
              <h2 className="mt-4 text-[24px] font-extrabold leading-none tracking-[-0.04em]">
                {selected.name}
              </h2>
            </div>
            <div className="text-right font-mono text-[8px] uppercase leading-relaxed tracking-[0.08em] opacity-55">
              <p>Group {selected.group}</p>
              <p>Period {selected.period}</p>
              <p>{selected.mass} g/mol</p>
            </div>
          </div>
          <div className="relative mt-6 grid grid-cols-2 gap-2 border-t border-ink/15 pt-3">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.09em] opacity-45">
                Electrons per shell
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold">
                {selected.shells.join(" / ")}
              </p>
            </div>
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.09em] opacity-45">
                Outer electrons
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold">
                {selected.shells[selected.shells.length - 1]}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-between rounded-[24px] border border-line bg-white p-5 sm:p-6">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/32">
              Element profile
            </span>
            <h2 className="mt-3 max-w-[520px] text-[clamp(1.35rem,2.4vw,2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink">
              {selected.name} in the real world.
            </h2>
            <p className="mt-3 max-w-[560px] text-[12px] leading-relaxed text-ink/52">
              {selected.summary}
            </p>
            <p className="mt-3 border-l-2 border-flare pl-3 text-[10.5px] leading-relaxed text-ink/42">
              <span className="font-semibold text-ink/65">Where you meet it:</span>{" "}
              {selected.usedFor}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex items-center gap-2">
              {elementCategories.slice(0, 4).map((category) => (
                <span
                  key={category}
                  className={cn("h-2 w-2 rounded-full border border-ink/10", categoryStyles[category])}
                  title={category}
                />
              ))}
              <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                Table key
              </span>
            </div>
            <Link
              href={molecularHref}
              className="group inline-flex items-center gap-1.5 text-[10.5px] font-bold text-ink transition-colors hover:text-flare-deep"
            >
              See it in a model
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function ElementButton({
  element,
  selected,
  onSelect,
}: {
  element: ChemicalElement;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${element.name}, atomic number ${element.number}`}
      style={{ gridColumn: element.group, gridRow: element.period + 1 }}
      className={cn(
        "group relative flex min-h-[62px] flex-col items-start justify-between rounded-[9px] border p-1.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
        categoryStyles[element.category],
        selected ? "ring-2 ring-ink ring-offset-2" : "",
      )}
    >
      <span className="font-mono text-[6.5px] leading-none opacity-50">{element.number}</span>
      <span className="font-display text-[17px] font-extrabold leading-none tracking-[-0.03em]">
        {element.symbol}
      </span>
      <span className="w-full truncate text-[6.5px] leading-none opacity-60">{element.name}</span>
    </button>
  );
}
