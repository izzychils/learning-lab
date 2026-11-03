"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { useDashboardSession } from "@/features/dashboard/session-context";

type Note = {
  id: string;
  title: string;
  body: string;
  simulation: string;
  createdAt: string;
};

const noteLinks: Record<string, string> = {
  "Molecular lab": "/dashboard/simulations/molecular-lab",
  "Titration curves": "/dashboard/simulations/titration",
  "Body systems": "/dashboard/simulations/anatomy",
  "AI tutor": "/dashboard/simulations/ai-tutor",
  "Practice set": "/dashboard/practice",
};

const linkedOptions = ["Molecular lab", "Titration curves", "Body systems", "AI tutor", "Practice set", "Open study"];

const seedNotes: Note[] = [
  {
    id: "seed-1",
    title: "Why water bends",
    body:
      "Oxygen has two lone pairs. They take up more room than the bonding pairs, so the H-O-H angle closes to about 104.5 degrees. The bent shape means the dipoles do not cancel, which is why water is polar.",
    simulation: "Molecular lab",
    createdAt: "2026-10-30T16:20:00.000Z",
  },
  {
    id: "seed-2",
    title: "Equivalence is not the same as the end point",
    body:
      "The equivalence point is where the acid and base have reacted exactly. The end point is where the indicator changes colour. Phenolphthalein turns pink just after pH 8.2, so the two are close but not identical.",
    simulation: "Titration curves",
    createdAt: "2026-10-27T10:05:00.000Z",
  },
  {
    id: "seed-3",
    title: "A question for the tutor",
    body:
      "Ask why the left ventricle is thicker than the right, then connect the answer to the pressure needed for systemic circulation. Do not just memorise the side.",
    simulation: "Body systems",
    createdAt: "2026-10-24T14:40:00.000Z",
  },
];

const prompts = [
  "What changed when you moved one variable?",
  "What surprised you, and why?",
  "Write the explanation without looking at the model.",
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function Notebook() {
  const { user } = useDashboardSession();
  const storageKey = `learning-lab.notebook.${user.email}`;
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [simulation, setSimulation] = useState("Molecular lab");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((item): item is Note => {
            if (!item || typeof item !== "object") return false;
            const candidate = item as Partial<Note>;
            return (
              typeof candidate.id === "string" &&
              typeof candidate.title === "string" &&
              typeof candidate.body === "string" &&
              typeof candidate.simulation === "string" &&
              typeof candidate.createdAt === "string"
            );
          });
          setNotes(cleaned);
          return;
        }
      }
      setNotes(seedNotes);
      window.localStorage.setItem(storageKey, JSON.stringify(seedNotes));
    } catch {
      setNotes(seedNotes);
    }
  }, [storageKey]);

  const persist = (next: Note[]) => {
    setNotes(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // The note stays on screen even when browser storage is blocked.
    }
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const sorted = [...notes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (!term) return sorted;
    return sorted.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.body.toLowerCase().includes(term) ||
        note.simulation.toLowerCase().includes(term),
    );
  }, [notes, query]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (title.trim().length < 3) {
      setError("Give the note a title with at least three characters.");
      return;
    }
    if (body.trim().length < 12) {
      setError("Add a little more detail so future you can use it.");
      return;
    }

    const note: Note = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `note-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      simulation,
      createdAt: new Date().toISOString(),
    };

    persist([note, ...notes]);
    setTitle("");
    setBody("");
    setSimulation("Molecular lab");
    setFormOpen(false);
    setQuery("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Lab notebook / private"
        title="Write it down before it fades."
        description="A working record of what you changed, what you saw and what you would ask next. Everything here is stored in this browser."
        action={
          <button
            type="button"
            onClick={() => {
              setFormOpen((current) => !current);
              setError("");
            }}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[11px] font-bold text-paper transition-colors hover:bg-ink-soft"
          >
            {formOpen ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5 text-flare" />}
            {formOpen ? "Close the form" : "New entry"}
          </button>
        }
      />

      {saved ? (
        <div className="flex items-center gap-2 rounded-xl border border-flare/20 bg-flare-soft px-4 py-3">
          <Check className="h-3.5 w-3.5 text-flare-deep" strokeWidth={3} />
          <p className="text-[12px] font-semibold text-flare-deep">Entry saved to this browser.</p>
        </div>
      ) : null}

      {formOpen ? (
        <form onSubmit={submit} className="rounded-[24px] border border-line bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35">
                New entry
              </span>
              <h2 className="mt-2 text-[20px] font-extrabold tracking-[-0.035em] text-ink">
                What do you want to remember?
              </h2>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flare-soft text-flare-deep">
              <BookOpen className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[11.5px] font-semibold text-ink/55">Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="A clear name for the idea"
                className="h-11 w-full rounded-xl border border-line bg-paper-soft px-3.5 text-[12.5px] text-ink placeholder:text-ink/28 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11.5px] font-semibold text-ink/55">
                Linked session
              </span>
              <select
                value={simulation}
                onChange={(event) => setSimulation(event.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-paper-soft px-3.5 text-[12.5px] text-ink transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
              >
                {linkedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-3 block">
            <span className="mb-1.5 block text-[11.5px] font-semibold text-ink/55">Note</span>
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              rows={4}
              placeholder="What did you observe? What would you ask next?"
              className="w-full resize-y rounded-xl border border-line bg-paper-soft px-3.5 py-3 text-[12.5px] leading-relaxed text-ink placeholder:text-ink/28 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
            />
          </label>

          {error ? (
            <p role="alert" className="mt-3 text-[12px] font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-ink/25">
              Private / local storage
            </p>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-flare px-4 text-[11px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
            >
              Save entry
              <Check className="h-3 w-3" strokeWidth={3} />
            </button>
          </div>
        </form>
      ) : null}

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-[260px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your notes"
                aria-label="Search notebook entries"
                className="h-9 w-full rounded-full border border-line bg-white pl-9 pr-3.5 text-[12px] text-ink placeholder:text-ink/30 transition-all focus:border-flare focus:outline-none focus:ring-4 focus:ring-flare/10"
              />
            </div>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.09em] text-ink/32">
              {filtered.length} of {notes.length} entries
            </span>
          </div>

          {filtered.length ? (
            <div className="space-y-2">
              {filtered.map((note) => (
                <article key={note.id} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-flare-soft px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.07em] text-flare-deep">
                          {note.simulation}
                        </span>
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.07em] text-ink/30">
                          {formatDate(note.createdAt)}
                        </span>
                      </div>
                      <h2 className="mt-2.5 text-[17px] font-extrabold leading-tight tracking-[-0.03em] text-ink">
                        {note.title}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => persist(notes.filter((item) => item.id !== note.id))}
                      aria-label={`Delete note: ${note.title}`}
                      title="Delete note"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-ink/20 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="mt-2.5 text-[13px] font-medium leading-[1.7] text-ink/55">
                    {note.body}
                  </p>
                  {noteLinks[note.simulation] ? (
                    <Link
                      href={noteLinks[note.simulation]}
                      className="mt-3 inline-flex items-center gap-1.5 border-t border-line pt-2.5 text-[11px] font-semibold text-ink/45 transition-colors hover:text-ink"
                    >
                      Reopen {note.simulation}
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/55 px-6 text-center">
              <BookOpen className="h-5 w-5 text-ink/25" />
              <h2 className="mt-3 text-[15px] font-bold text-ink/60">
                {notes.length ? "No note matches that search." : "The notebook is empty."}
              </h2>
              <p className="mt-1.5 max-w-[320px] text-[12px] leading-relaxed text-ink/40">
                {notes.length
                  ? "Try a shorter word or search by the linked session."
                  : "Start with one observation from a simulation. A sentence is enough."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFormOpen(true);
                }}
                className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[11px] font-bold text-paper"
              >
                <Plus className="h-3 w-3 text-flare" />
                Write an entry
              </button>
            </div>
          )}
        </section>

        <aside className="space-y-3 lg:col-span-4">
          <section className="relative overflow-hidden rounded-[22px] bg-[#0b0a08] p-5 text-paper">
            <div className="dot-grid absolute inset-0 opacity-20" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-flare">
                  Notebook state
                </span>
                <BookOpen className="h-4 w-4 text-paper/25" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.05em]">
                    {notes.length}
                  </p>
                  <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-paper/35">
                    Entries
                  </p>
                </div>
                <div>
                  <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.05em]">
                    {new Set(notes.map((note) => note.simulation)).size}
                  </p>
                  <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.08em] text-paper/35">
                    Sessions linked
                  </p>
                </div>
              </div>
              <p className="mt-5 border-t border-paper/10 pt-3 text-[10.5px] leading-relaxed text-paper/40">
                Notes stay on this device. They are not sent to a teacher or a server in this
                demo.
              </p>
            </div>
          </section>

          <section className="rounded-[22px] border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-flare" />
              <h2 className="text-[14px] font-extrabold text-ink">If you are stuck</h2>
            </div>
            <ul className="mt-3.5 space-y-3">
              {prompts.map((prompt, index) => (
                <li key={prompt} className="flex items-start gap-2.5 text-[12px] font-medium leading-relaxed text-ink/50">
                  <span className="mt-0.5 font-mono text-[8.5px] text-flare-deep">0{index + 1}</span>
                  {prompt}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard/practice"
              className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-3 text-[11px] font-semibold text-ink/45 transition-colors hover:text-ink"
            >
              Practise the idea
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
