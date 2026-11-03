import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardList,
  FlaskConical,
  Sparkles,
  Users,
} from "lucide-react";
import { assignments } from "@/features/dashboard/assignments";
import { classLearners, classes } from "@/features/dashboard/data";
import { practicals as practicalLibrary } from "@/features/dashboard/practicals";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return classes.map((group) => ({ code: group.code.toLowerCase() }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const group = classes.find((item) => item.code.toLowerCase() === code.toLowerCase());
  if (!group) return { title: "Class" };
  return {
    title: group.name,
    description: `${group.name} with ${group.teacher}. Class average, roster and open work.`,
  };
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const group = classes.find((item) => item.code.toLowerCase() === code.toLowerCase());
  if (!group) notFound();

  const offset = group.average - 82;
  const roster = classLearners.map((learner) => {
    const progress = Math.max(22, Math.min(98, learner.progress + offset));
    return {
      ...learner,
      progress,
      status: progress < 50 ? "Needs help" : progress < 70 ? "Watch" : "On track",
    };
  });
  const classWork = assignments.filter((item) => item.className === group.name);
  const nextPractical =
    practicalLibrary.find((item) =>
      group.name.startsWith("Chemistry")
        ? item.subject === "Chemistry" && item.slug === "titration-bench"
        : group.name.startsWith("Biology")
          ? item.subject === "Medicine"
          : item.slug === "molecule-shapes",
    ) ?? practicalLibrary[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/classes"
          className="group inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          All classes
        </Link>
        <Link
          href="/dashboard/assignments"
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[9.5px] font-semibold text-ink/50 transition-colors hover:border-ink/25 hover:text-ink"
        >
          <ClipboardList className="h-3 w-3" />
          Open classwork
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-[24px] bg-[#0b0a08] p-5 text-paper sm:p-7">
        <div className="grid-dark absolute inset-0 opacity-40 [mask-image:linear-gradient(120deg,black,transparent_82%)]" />
        <div className="absolute right-[-100px] top-[-120px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_68%)]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-flare">
              {group.code} / Term 2
            </span>
            <h1 className="display mt-4 max-w-[650px] text-[clamp(2.1rem,4.5vw,3.7rem)] text-paper">
              {group.name}
            </h1>
            <p className="mt-3 text-[11.5px] text-paper/45">
              {group.teacher} / {group.members} learners
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-paper/10 pt-4 text-[9px] text-paper/35">
              <span className="flex items-center gap-1.5">
                <Users className="h-3 w-3" /> {group.members} on the roster
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" /> Next: {group.nextTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Teacher reviewed
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-5 border-t border-paper/10 pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="font-display text-[42px] font-extrabold leading-none tracking-[-0.06em]">
                {group.average}%
              </p>
              <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.09em] text-paper/30">
                Class average
              </p>
            </div>
            <div className="h-12 w-px bg-paper/10" />
            <div>
              <p className="font-display text-[24px] font-extrabold leading-none tracking-[-0.04em] text-flare">
                {roster.filter((learner) => learner.status === "Needs help").length}
              </p>
              <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.09em] text-paper/30">
                Need a check in
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-8">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-[13px] font-bold text-ink">Class pulse</h2>
                <p className="mt-1 text-[9.5px] text-ink/38">Progress across the current practical</p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-flare-soft px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-flare-deep">
                <span className="h-1 w-1 rounded-full bg-flare" />
                Live demo
              </span>
            </div>
            <div className="mt-5 flex h-[90px] items-end gap-1.5">
              {[44, 58, 52, 66, 61, 72, 68, 78, 74, 82, 86, group.average].map((value, index) => (
                <span
                  key={index}
                  className={cn(
                    "flex-1 rounded-t-[3px]",
                    index === 11 ? "bg-flare" : value < 55 ? "bg-ink/15" : "bg-ink/30",
                  )}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between border-t border-line pt-2 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/25">
              <span>Week 1</span>
              <span>Now</span>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[13px] font-bold text-ink">Roster</h2>
                <p className="mt-1 text-[9.5px] text-ink/38">Demo learners, ordered by need</p>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
                {roster.length} shown
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    {["Learner", "Progress", "Status"].map((heading) => (
                      <th
                        key={heading}
                        className="pb-2 pr-4 text-[8px] font-medium uppercase tracking-[0.09em] text-ink/30 last:pr-0 last:text-right"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roster.map((learner) => (
                    <tr key={learner.name} className="border-b border-line/70 last:border-b-0">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-paper text-[7.5px] font-bold text-ink/55">
                            {learner.initials}
                          </span>
                          <span className="text-[10.5px] font-semibold text-ink/70">{learner.name}</span>
                        </div>
                      </td>
                      <td className="w-[45%] py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/70">
                            <div
                              className={cn(
                                "h-full rounded-full",
                                learner.progress < 50 ? "bg-flare" : "bg-ink/45",
                              )}
                              style={{ width: `${learner.progress}%` }}
                            />
                          </div>
                          <span className="w-7 text-right font-mono text-[8px] text-ink/35">
                            {learner.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2 py-1 font-mono text-[7px] uppercase tracking-[0.06em]",
                            learner.status === "Needs help"
                              ? "bg-flare-soft text-flare-deep"
                              : learner.status === "Watch"
                                ? "bg-paper text-ink/45"
                                : "bg-ink/[0.055] text-ink/40",
                          )}
                        >
                          {learner.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-bold text-ink">Work for this class</h2>
              <Link
                href="/dashboard/assignments"
                className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold text-ink/40 transition-colors hover:text-ink"
              >
                All work
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            {classWork.length ? (
              <div className="mt-3 divide-y divide-line/80">
                {classWork.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex items-center gap-3 py-3 first:pt-1 last:pb-0"
                  >
                    <span
                      className={cn(
                        "h-7 w-1 shrink-0 rounded-full",
                        item.status === "open" ? "bg-flare" : "bg-ink/15",
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10.5px] font-semibold text-ink/70">{item.title}</p>
                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                        {item.type} / {item.due}
                      </p>
                    </div>
                    <span className="font-mono text-[7px] uppercase tracking-[0.06em] text-ink/28">
                      {item.status}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-ink/12 bg-paper-soft p-4 text-[9.5px] leading-relaxed text-ink/35">
                No assigned work is listed for this class yet. The next practical is ready to
                set.
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-3 lg:col-span-4">
          <section className="rounded-2xl bg-flare p-5 text-ink">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45">
              <Sparkles className="h-3 w-3" />
              Next session
            </span>
            <h2 className="mt-4 text-[20px] font-extrabold leading-[1.08] tracking-[-0.04em]">
              {nextPractical.title}
            </h2>
            <p className="mt-2 text-[10px] leading-relaxed text-ink/58">
              {nextPractical.summary}
            </p>
            <p className="mt-4 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/45">
              <CalendarDays className="h-3 w-3" />
              {group.nextTime}
            </p>
            <Link
              href="/dashboard/practicals"
              className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[10px] font-bold text-paper transition-colors hover:bg-ink-soft"
            >
              Open the practical
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[12px] font-bold text-ink">Teacher note</h2>
              <FlaskConical className="h-4 w-4 text-flare" />
            </div>
            <p className="mt-3 text-[10px] leading-[1.75] text-ink/45">
              Six learners paused at limiting reagents last week. Start the recap with the
              particle model before moving to the calculation.
            </p>
            <p className="mt-3 border-t border-line pt-3 text-[9px] leading-relaxed text-ink/32">
              The note is demo content. In the full workspace it would be authored by the
              class teacher.
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="text-[12px] font-bold text-ink">Class tools</h2>
            <div className="mt-3 space-y-1.5">
              {[
                { label: "Guided practicals", href: "/dashboard/practicals", icon: FlaskConical },
                { label: "Practice questions", href: "/dashboard/practice", icon: BookOpen },
                { label: "Lab notebook", href: "/dashboard/notebook", icon: ClipboardList },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-[9.5px] font-medium text-ink/50 transition-colors hover:bg-paper-soft hover:text-ink"
                  >
                    <Icon className="h-3.5 w-3.5 text-ink/30" />
                    {item.label}
                    <ArrowUpRight className="ml-auto h-3 w-3 text-ink/20 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
