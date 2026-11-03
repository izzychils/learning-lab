"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardList,
  Dna,
  FlaskConical,
  HeartPulse,
  RotateCcw,
  Waves,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { useDashboardSession } from "@/features/dashboard/session-context";
import { assignments, type Assignment } from "@/features/dashboard/assignments";
import { cn } from "@/lib/utils";

type Tab = "all" | "open" | "submitted" | "graded";

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "open", label: "Open" },
  { id: "submitted", label: "Submitted" },
  { id: "graded", label: "Graded" },
];

const subjectIcons = {
  Chemistry: FlaskConical,
  Biology: Dna,
  Physics: Waves,
  Medicine: HeartPulse,
};

export function AssignmentList() {
  const { user } = useDashboardSession();
  const storageKey = `learning-lab.assignments.${user.email}`;
  const [tab, setTab] = useState<Tab>("all");
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setSubmittedIds(parsed.filter((item): item is string => typeof item === "string"));
        }
      }
    } catch {
      // Ignore a broken local record.
    }
  }, [storageKey]);

  const persist = (next: string[]) => {
    setSubmittedIds(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // The UI still reflects the change for this session.
    }
  };

  const statusOf = (assignment: Assignment) =>
    assignment.status === "open" && submittedIds.includes(assignment.id)
      ? "submitted"
      : assignment.status;

  const rows = useMemo(
    () =>
      assignments
        .map((assignment) => ({ assignment, status: statusOf(assignment) }))
        .filter((row) => tab === "all" || row.status === tab)
        .sort((a, b) => a.assignment.dueOrder - b.assignment.dueOrder),
    [tab, submittedIds],
  );

  const openRows = assignments.filter((assignment) => statusOf(assignment) === "open");
  const graded = assignments.filter((assignment) => assignment.status === "graded" && assignment.grade);
  const average = graded.length
    ? Math.round(graded.reduce((total, item) => total + (item.grade ?? 0), 0) / graded.length)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Classwork / Term 2"
        title="Know what is due, not just what is next."
        description="Every assigned practical, quiz, review and write up in one list. Status changes are saved to this browser."
        action={
          <Link
            href="/dashboard/classes"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[11px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
          >
            View classes
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Open now", value: String(openRows.length), detail: "Due this week", icon: ClipboardList },
          {
            label: "Submitted",
            value: String(assignments.filter((item) => statusOf(item) === "submitted").length),
            detail: "Waiting for review",
            icon: Check,
          },
          { label: "Graded", value: String(graded.length), detail: "This term", icon: CalendarDays },
          { label: "Average grade", value: `${average}%`, detail: "Graded work only", icon: ArrowUpRight },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold text-ink/45">{stat.label}</p>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                    index === 0 ? "bg-flare-soft text-flare-deep" : "bg-paper text-ink/40",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-3 font-display text-[27px] font-extrabold leading-none tracking-[-0.05em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/28">
                {stat.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-b border-line pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((item) => {
            const count =
              item.id === "all"
                ? assignments.length
                : assignments.filter((assignment) => statusOf(assignment) === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-pressed={tab === item.id}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full border px-3 text-[9.5px] font-semibold transition-colors",
                  tab === item.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white text-ink/45 hover:border-ink/25 hover:text-ink",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "font-mono text-[7px]",
                    tab === item.id ? "text-paper/35" : "text-ink/25",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
          {rows.length} items / soonest due first
        </span>
      </div>

      {rows.length ? (
        <div className="space-y-2">
          {rows.map(({ assignment, status }) => {
            const Icon = subjectIcons[assignment.subject];
            const gradedItem = status === "graded" && assignment.grade;
            return (
              <article
                key={assignment.id}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-ink/40">
                  <Icon className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                      {assignment.subject} / {assignment.type}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/15" />
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                      {assignment.className}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-[13px] font-bold leading-tight tracking-[-0.02em] text-ink">
                    {assignment.title}
                  </h2>
                  <p className="mt-1 max-w-[540px] text-[9.5px] leading-relaxed text-ink/38">
                    {assignment.brief}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <div className="text-left sm:text-right">
                    <p
                      className={cn(
                        "text-[9px] font-medium",
                        status === "open" && assignment.dueOrder <= 2
                          ? "text-flare-deep"
                          : "text-ink/38",
                      )}
                    >
                      {assignment.due}
                    </p>
                    <span
                      className={cn(
                        "mt-1 inline-flex rounded-full px-2 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.06em]",
                        status === "graded"
                          ? "bg-ink text-paper"
                          : status === "submitted"
                            ? "bg-flare-soft text-flare-deep"
                            : "bg-paper text-ink/35",
                      )}
                    >
                      {gradedItem ? `Graded / ${assignment.grade}%` : status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={assignment.href}
                      className="group inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-[9px] font-semibold text-ink/50 transition-colors hover:border-ink/25 hover:text-ink"
                    >
                      {assignment.actionLabel}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                    {assignment.status === "open" ? (
                      submittedIds.includes(assignment.id) ? (
                        <button
                          type="button"
                          onClick={() => persist(submittedIds.filter((id) => id !== assignment.id))}
                          className="flex h-8 items-center gap-1 rounded-full px-2 text-[8px] font-medium text-ink/30 transition-colors hover:text-ink"
                          title="Undo submission"
                        >
                          <RotateCcw className="h-2.5 w-2.5" />
                          Undo
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => persist([...submittedIds, assignment.id])}
                          className="flex h-8 items-center gap-1 rounded-full bg-flare px-3 text-[8px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          Mark done
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-white/55 px-6 text-center">
          <Check className="h-5 w-5 text-flare" strokeWidth={3} />
          <h2 className="mt-3 text-[14px] font-bold text-ink/65">Nothing in this column.</h2>
          <p className="mt-1 max-w-[280px] text-[10px] leading-relaxed text-ink/35">
            Try another status or open the full list. New work appears here when a teacher
            assigns it.
          </p>
          <button
            type="button"
            onClick={() => setTab("all")}
            className="mt-4 rounded-full border border-line bg-white px-4 py-2 text-[9.5px] font-semibold text-ink/55 hover:text-ink"
          >
            Show all work
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white px-5 py-4 text-[9.5px] text-ink/38 sm:flex-row sm:items-center sm:justify-between">
        <p>Status changes are demo-only and stay in this browser.</p>
        <p className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
          Teacher review still applies
        </p>
      </div>
    </div>
  );
}
