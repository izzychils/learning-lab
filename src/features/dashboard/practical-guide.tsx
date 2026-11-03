"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FlaskConical,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { useDashboardSession } from "@/features/dashboard/session-context";
import { practicals } from "@/features/dashboard/practicals";
import { cn } from "@/lib/utils";

export function PracticalGuide() {
  const { user } = useDashboardSession();
  const [activeSlug, setActiveSlug] = useState(practicals[0].slug);
  const [progress, setProgress] = useState<Record<string, number[]>>({});
  const storageKey = `learning-lab.practicals.${user.email}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const cleaned: Record<string, number[]> = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (Array.isArray(value)) {
            cleaned[key] = value.filter((item): item is number => typeof item === "number");
          }
        }
        setProgress(cleaned);
      }
    } catch {
      // A malformed saved record should not stop the practicals page.
    }
  }, [storageKey]);

  const active = practicals.find((item) => item.slug === activeSlug) ?? practicals[0];
  const completedSteps = progress[active.slug] ?? [];
  const currentStep = active.steps.findIndex((_, index) => !completedSteps.includes(index));
  const percent = Math.round((completedSteps.length / active.steps.length) * 100);
  const startedCount = useMemo(
    () => practicals.filter((item) => (progress[item.slug]?.length ?? 0) > 0).length,
    [progress],
  );

  const save = (next: Record<string, number[]>) => {
    setProgress(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Progress is convenience only in the demo; never block the interaction.
    }
  };

  const toggleStep = (index: number) => {
    const existing = progress[active.slug] ?? [];
    const nextList = existing.includes(index)
      ? existing.filter((item) => item !== index)
      : [...existing, index].sort((a, b) => a - b);
    save({ ...progress, [active.slug]: nextList });
  };

  const reset = () => {
    save({ ...progress, [active.slug]: [] });
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Guided practicals / Term 2"
        title="Run the practical. Keep the notes."
        description="A step by step bench for the experiments that need more than a diagram. Progress is saved to this browser as you work."
        action={
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            <ClipboardCheck className="h-3 w-3 text-flare" />
            {startedCount} of {practicals.length} started
          </span>
        }
      />

      <div className="grid gap-3 lg:grid-cols-12">
        <aside className="order-2 space-y-2 lg:order-1 lg:col-span-4">
          <div className="flex items-center justify-between px-1 pb-1">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35">
              Choose a practical
            </p>
            <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/22">
              {practicals.length} available
            </span>
          </div>

          {practicals.map((practical, index) => {
            const steps = progress[practical.slug]?.length ?? 0;
            const done = steps === practical.steps.length;
            const isActive = practical.slug === active.slug;
            return (
              <button
                key={practical.slug}
                type="button"
                onClick={() => setActiveSlug(practical.slug)}
                aria-pressed={isActive}
                className={cn(
                  "w-full rounded-2xl border p-4 text-left transition-colors",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white text-ink hover:border-ink/25",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      isActive ? "bg-flare text-ink" : "bg-paper text-ink/35",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={3} /> : <FlaskConical className="h-4 w-4" />}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[7px] uppercase tracking-[0.08em]",
                      isActive ? "text-paper/30" : "text-ink/25",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} / {practical.duration}
                  </span>
                </div>
                <p className={cn("mt-3 text-[12px] font-bold leading-tight tracking-[-0.02em]", isActive ? "text-paper" : "text-ink")}>
                  {practical.title}
                </p>
                <p className={cn("mt-1.5 text-[9px] leading-relaxed", isActive ? "text-paper/40" : "text-ink/35")}>
                  {practical.subject} / {practical.level}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className={cn("h-1 flex-1 overflow-hidden rounded-full", isActive ? "bg-paper/15" : "bg-line/70")}>
                    <span
                      className="block h-full rounded-full bg-flare transition-[width]"
                      style={{ width: `${(steps / practical.steps.length) * 100}%` }}
                    />
                  </span>
                  <span className={cn("font-mono text-[7px]", isActive ? "text-paper/35" : "text-ink/28")}>
                    {steps}/{practical.steps.length}
                  </span>
                </div>
              </button>
            );
          })}
        </aside>

        <article className="order-1 overflow-hidden rounded-[24px] border border-line bg-white lg:order-2 lg:col-span-8">
          <div className="relative overflow-hidden bg-[#0b0a08] p-5 text-paper sm:p-6">
            <div className="grid-dark absolute inset-0 opacity-40 [mask-image:linear-gradient(120deg,black,transparent_85%)]" />
            <div className="absolute right-[-80px] top-[-100px] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_68%)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-flare">
                  {active.subject} / {active.level}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-paper/12 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/30">
                  <ShieldAlert className="h-2.5 w-2.5 text-flare" />
                  Teacher supervised
                </span>
              </div>
              <h2 className="mt-3 max-w-[550px] text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
                {active.title}
              </h2>
              <p className="mt-2 max-w-[560px] text-[10.5px] leading-relaxed text-paper/45">
                {active.brief}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-4">
                <div>
                  <p className="font-display text-[24px] font-extrabold leading-none tracking-[-0.04em]">
                    {percent}%
                  </p>
                  <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/28">
                    Steps complete
                  </p>
                </div>
                <div className="h-8 w-px bg-paper/10" />
                <p className="text-[9.5px] text-paper/35">
                  {completedSteps.length} of {active.steps.length} steps checked
                  <br />
                  {active.duration} / suggested session
                </p>
                {active.simulation ? (
                  <Link
                    href={active.simulation.href}
                    className="group ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold text-paper transition-colors hover:text-flare"
                  >
                    Open the model
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[12px] font-bold text-ink">Method</h3>
                <p className="mt-1 text-[9.5px] text-ink/35">
                  Check each step once you have done it. You can undo any step.
                </p>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
                Apparatus / {active.apparatus.join(" / ")}
              </span>
            </div>

            <ol className="divide-y divide-line/80">
              {active.steps.map((step, index) => {
                const done = completedSteps.includes(index);
                const current = index === currentStep;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => toggleStep(index)}
                      aria-pressed={done}
                      className="group flex w-full items-start gap-3 py-4 text-left"
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[8px] font-semibold transition-colors",
                          done
                            ? "border-flare bg-flare text-ink"
                            : current
                              ? "border-flare bg-flare-soft text-flare-deep"
                              : "border-line bg-paper text-ink/35",
                        )}
                      >
                        {done ? <Check className="h-3 w-3" strokeWidth={3.5} /> : `0${index + 1}`}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "flex flex-wrap items-center gap-2 text-[11.5px] font-semibold transition-colors",
                            done ? "text-ink/38 line-through decoration-ink/20" : "text-ink/75",
                          )}
                        >
                          {step.title}
                          {current && !done ? (
                            <span className="rounded-full bg-flare-soft px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-flare-deep">
                              Current
                            </span>
                          ) : null}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[10px] leading-relaxed",
                            done ? "text-ink/28" : "text-ink/45",
                          )}
                        >
                          {step.detail}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors",
                          done
                            ? "border-ink bg-ink text-paper"
                            : "border-line bg-white text-transparent group-hover:border-ink/30",
                        )}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={4} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-2 rounded-xl border border-flare/20 bg-flare-soft/55 p-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-flare-deep" />
                <p className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-flare-deep">
                  Safety and limits
                </p>
              </div>
              <ul className="mt-2 space-y-1.5">
                {active.safety.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[9.5px] leading-relaxed text-ink/50">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flare-deep/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={reset}
                disabled={completedSteps.length === 0}
                className="inline-flex items-center gap-1.5 self-start text-[9.5px] font-medium text-ink/35 transition-colors hover:text-ink disabled:opacity-40"
              >
                <RotateCcw className="h-3 w-3" />
                Reset this practical
              </button>
              {percent === 100 ? (
                <Link
                  href="/dashboard/notebook"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[10px] font-bold text-paper transition-colors hover:bg-ink-soft"
                >
                  Write up your notes
                  <Sparkles className="h-3 w-3 text-flare" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep >= 0) toggleStep(currentStep);
                  }}
                  className="inline-flex h-9 items-center gap-1.5 self-start rounded-full bg-flare px-4 text-[10px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
                >
                  Mark the current step
                  <Check className="h-3 w-3" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
