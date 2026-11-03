"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookMarked, Search, X } from "lucide-react";
import {
  glossaryTerms,
  type GlossaryCategory,
  type GlossaryTerm,
} from "@/features/reference/glossary";
import { cn } from "@/lib/utils";

const categories: ("All" | GlossaryCategory)[] = [
  "All",
  "Chemistry",
  "Biology",
  "Physics",
  "Medicine",
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [letter, setLetter] = useState("All");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return glossaryTerms
      .filter((item) => {
        const categoryMatch = category === "All" || item.category === category;
        const letterMatch = letter === "All" || item.term.charAt(0).toUpperCase() === letter;
        const queryMatch =
          !term ||
          item.term.toLowerCase().includes(term) ||
          item.short.toLowerCase().includes(term) ||
          item.detail.toLowerCase().includes(term);
        return categoryMatch && letterMatch && queryMatch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [category, letter, query]);

  const grouped = useMemo(() => {
    const groups = new Map<string, GlossaryTerm[]>();
    for (const item of filtered) {
      const key = item.term.charAt(0).toUpperCase();
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  const clear = () => {
    setQuery("");
    setCategory("All");
    setLetter("All");
  };

  return (
    <div>
      <div className="rounded-[24px] border border-line bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-flare">
              <BookMarked className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11.5px] font-bold text-ink">Science glossary</p>
              <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">
                {glossaryTerms.length} terms / four disciplines
              </p>
            </div>
          </div>

          <div className="relative w-full lg:w-[280px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setLetter("All");
              }}
              placeholder="Search a term or idea"
              aria-label="Search the science glossary"
              className="h-10 w-full rounded-full border border-line bg-paper-soft pl-10 pr-9 text-[11px] text-ink placeholder:text-ink/30 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
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

        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "h-8 rounded-full border px-3 text-[9px] font-semibold transition-colors",
                category === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper-soft text-ink/45 hover:border-ink/25 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[154px_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[22px] border border-line bg-white p-3 lg:sticky lg:top-[96px]">
          <p className="px-1 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/30">
            Jump to letter
          </p>
          <div className="mt-2 grid grid-cols-7 gap-1 lg:grid-cols-5">
            <button
              type="button"
              onClick={() => setLetter("All")}
              aria-pressed={letter === "All"}
              className={cn(
                "col-span-2 h-7 rounded-md font-mono text-[8px] font-semibold transition-colors lg:col-span-5",
                letter === "All" ? "bg-ink text-paper" : "bg-paper-soft text-ink/40 hover:text-ink",
              )}
            >
              ALL
            </button>
            {alphabet.map((item) => {
              const available = glossaryTerms.some((term) => term.term.charAt(0).toUpperCase() === item);
              return (
                <button
                  key={item}
                  type="button"
                  disabled={!available}
                  onClick={() => setLetter(item)}
                  aria-pressed={letter === item}
                  className={cn(
                    "flex h-7 items-center justify-center rounded-md font-mono text-[8px] font-semibold transition-colors",
                    letter === item
                      ? "bg-flare text-ink"
                      : available
                        ? "bg-paper-soft text-ink/40 hover:bg-flare-soft hover:text-flare-deep"
                        : "text-ink/15",
                  )}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="mt-3 hidden border-t border-line pt-3 lg:block">
            <p className="text-[8.5px] leading-relaxed text-ink/32">
              Terms are tied to the simulations in the library, not a separate dictionary.
            </p>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 px-1 pb-2">
            <p className="text-[9.5px] text-ink/38">
              <span className="font-semibold text-ink/60">{filtered.length}</span> terms
              {letter !== "All" ? ` starting with ${letter}` : ""}
            </p>
            <button
              type="button"
              onClick={clear}
              className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/28 transition-colors hover:text-ink"
            >
              Clear all
            </button>
          </div>

          {grouped.length ? (
            <div className="space-y-5">
              {grouped.map(([key, terms]) => (
                <section key={key} aria-label={`Terms starting with ${key}`}>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-display text-[24px] font-extrabold leading-none tracking-[-0.05em] text-flare-deep">
                      {key}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/25">
                      {terms.length} terms
                    </span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {terms.map((item) => (
                      <details
                        key={item.term}
                        className="group rounded-xl border border-line bg-white px-4 py-3 transition-colors open:border-ink/25 open:bg-paper-soft"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                          <span>
                            <span className="flex items-center gap-2">
                              <span className="text-[11.5px] font-bold text-ink">{item.term}</span>
                              <span className="rounded-full bg-paper px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.06em] text-ink/35 open:bg-white">
                                {item.category}
                              </span>
                            </span>
                            <span className="mt-1.5 block text-[9.5px] leading-relaxed text-ink/42">
                              {item.short}
                            </span>
                          </span>
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[10px] font-medium text-ink/30 transition-transform group-open:rotate-45 group-open:border-flare group-open:text-flare-deep">
                            +
                          </span>
                        </summary>
                        <div className="mt-3 border-t border-line pt-3">
                          <p className="text-[9.5px] leading-[1.75] text-ink/50">{item.detail}</p>
                          <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.06em] text-ink/28">
                            Related / {item.related.join(" / ")}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[22px] border border-dashed border-ink/15 bg-white/55 px-6 text-center">
              <Search className="h-4 w-4 text-ink/25" />
              <p className="mt-3 text-[13px] font-bold text-ink/65">No term matches that.</p>
              <p className="mt-1 max-w-[300px] text-[10px] leading-relaxed text-ink/38">
                Try a shorter word or clear the subject filter. The glossary grows with the
                library.
              </p>
              <button
                type="button"
                onClick={clear}
                className="mt-4 rounded-full border border-line bg-white px-3.5 py-2 text-[9.5px] font-semibold text-ink/55 hover:text-ink"
              >
                Clear the filters
              </button>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-ink p-5 text-paper sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[7.5px] uppercase tracking-[0.11em] text-flare">
                Still unsure?
              </p>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-paper/48">
                Ask the tutor to explain a term using the model on your screen.
              </p>
            </div>
            <Link
              href="/demo/ai-tutor"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[10.5px] font-bold text-paper transition-colors hover:text-flare"
            >
              Open the AI tutor
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
