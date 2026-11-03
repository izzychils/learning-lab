import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Users,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { classLearners, classes, upcoming } from "@/features/dashboard/data";
import { cn } from "@/lib/utils";

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Classes / Term 2"
        title="Your classes, in one place."
        description="See who you are learning with, what is coming next and where the class is moving together."
        action={
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            <Users className="h-3 w-3 text-flare" />
            3 groups / 85 learners
          </span>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {classes.map((group) => (
          <Link
            key={group.name}
            href={`/dashboard/classes/${group.code.toLowerCase()}`}
            className="group block h-full"
          >
          <article className="relative h-full overflow-hidden rounded-2xl border border-line bg-white p-5 transition-colors group-hover:border-ink/25">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-[3px]",
                group.color === "flare" ? "bg-flare" : "bg-ink",
              )}
            />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/30">
                {group.code}
              </span>
              <span className="flex items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/30">
                <Users className="h-3 w-3" />
                {group.members}
              </span>
            </div>
            <h2 className="mt-4 text-[17px] font-extrabold leading-tight tracking-[-0.035em] text-ink">
              {group.name}
            </h2>
            <p className="mt-1 text-[10px] text-ink/40">{group.teacher}</p>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
              <div>
                <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/28">Class average</p>
                <p className="mt-1 font-display text-[20px] font-extrabold leading-none tracking-[-0.04em]">
                  {group.average}%
                </p>
              </div>
              <div className="w-[100px]">
                <div className="h-1.5 overflow-hidden rounded-full bg-line/70">
                  <div
                    className={group.color === "flare" ? "h-full rounded-full bg-flare" : "h-full rounded-full bg-ink"}
                    style={{ width: `${group.average}%` }}
                  />
                </div>
                <p className="mt-1.5 text-right font-mono text-[7px] text-ink/30">mastery</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-paper-soft px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3 text-flare" />
                <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">Next up</p>
              </div>
              <p className="mt-1.5 text-[10px] font-semibold text-ink/65">{group.next}</p>
              <p className="mt-0.5 text-[9px] text-ink/35">{group.nextTime}</p>
            </div>

            <span className="mt-4 inline-flex items-center gap-1 text-[9px] font-semibold text-ink/35 transition-colors group-hover:text-ink">
              Open class
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </article>
          </Link>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[13px] font-bold text-ink">Chemistry 11B / roster</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Progress across the current practical</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-flare-soft px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-flare-deep">
              <span className="h-1 w-1 rounded-full bg-flare" />
              Live demo
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Learner", "Progress", "Status"].map((heading) => (
                    <th key={heading} className="pb-2 pr-4 text-[8px] font-medium uppercase tracking-[0.09em] text-ink/30 last:pr-0 last:text-right">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {classLearners.map((learner) => (
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
                            className={learner.progress < 50 ? "h-full rounded-full bg-flare" : "h-full rounded-full bg-ink/50"}
                            style={{ width: `${learner.progress}%` }}
                          />
                        </div>
                        <span className="w-7 text-right font-mono text-[8px] text-ink/35">{learner.progress}%</span>
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

          <Link
            href="/dashboard/progress"
            className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-3 text-[9.5px] font-semibold text-ink/50 transition-colors hover:text-ink"
          >
            See the full progress report
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </section>

        <div className="space-y-3 lg:col-span-4">
          <section className="rounded-2xl bg-ink p-5 text-paper">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-flare">Class pulse</span>
              <ClipboardList className="h-4 w-4 text-paper/30" />
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-[38px] font-extrabold leading-none tracking-[-0.05em]">82%</p>
                <p className="mt-1.5 font-mono text-[7.5px] uppercase tracking-[0.08em] text-paper/30">
                  Class average
                </p>
              </div>
              <div className="flex h-12 items-end gap-1">
                {[52, 64, 58, 74, 68, 82, 78].map((value, index) => (
                  <span
                    key={index}
                    className={index === 5 ? "w-2 rounded-t-sm bg-flare" : "w-2 rounded-t-sm bg-paper/20"}
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 border-t border-paper/10 pt-3 text-[10px] leading-relaxed text-paper/40">
              Six learners paused at limiting reagents. A recap is ready for the next lesson.
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[12px] font-bold text-ink">Due this week</h2>
              <BookOpen className="h-4 w-4 text-ink/25" />
            </div>
            <div className="mt-3 divide-y divide-line/80">
              {upcoming.map((item) => (
                <div key={item.title} className="flex items-center gap-3 py-3 first:pt-1 last:pb-0">
                  <span className={item.tone === "flare" ? "h-1.5 w-1.5 shrink-0 rounded-full bg-flare" : "h-1.5 w-1.5 shrink-0 rounded-full bg-ink/20"} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-ink/70">{item.title}</p>
                    <p className="mt-0.5 text-[8.5px] text-ink/30">{item.due}</p>
                  </div>
                  <ChevronRight className="h-3 w-3 shrink-0 text-ink/20" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
