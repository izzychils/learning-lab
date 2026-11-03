import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  FlaskConical,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { SimulationCard } from "@/features/dashboard/simulation-card";
import {
  liveSimulations,
  overviewStats,
  upcoming,
  weeklyActivity,
} from "@/features/dashboard/data";

const statIcons = [FlaskConical, Clock3, Trophy, Target];
const maxMinutes = Math.max(...weeklyActivity.map((day) => day.minutes));
const weekTotal = weeklyActivity.reduce((total, day) => total + day.minutes, 0);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Term 2 / Week 6"
        title="Your lab, at a glance."
        description="Pick up where you left off, or find the next question worth chasing."
        action={
          <Link
            href="/dashboard/simulations"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[11.5px] font-bold text-paper transition-colors hover:bg-ink-soft"
          >
            Browse library
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="relative overflow-hidden rounded-2xl bg-ink p-5 text-paper sm:p-6 lg:col-span-8">
          <div className="grid-dark absolute inset-0 opacity-55 [mask-image:linear-gradient(120deg,black,transparent_76%)]" />
          <div className="absolute right-[-90px] top-[-80px] h-[310px] w-[310px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.18),transparent_68%)]" />

          <div className="relative flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="min-w-0 max-w-[470px]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-paper/38">
                  Continue where you left off
                </span>
              </div>
              <h2 className="mt-4 text-[clamp(1.6rem,2.7vw,2.2rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
                Molecular geometry
              </h2>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-paper/45">
                You were looking at how lone pairs change the shape of a molecule. Pick up at
                the water model.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard/simulations/molecular-lab"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-flare px-4 text-[11.5px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
                >
                  Resume simulation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-paper/30">
                  62% complete / 22 min left
                </span>
              </div>
            </div>

            <div className="relative flex shrink-0 items-center justify-center self-start sm:self-center">
              <div
                className="flex h-[112px] w-[112px] items-center justify-center rounded-full"
                style={{
                  background: "conic-gradient(#FF5A1F 0% 62%, rgba(244,241,233,0.12) 62% 100%)",
                }}
              >
                <div className="flex h-[96px] w-[96px] flex-col items-center justify-center rounded-full border border-paper/10 bg-[#15130f]">
                  <Atom className="h-4 w-4 text-flare" />
                  <p className="mt-1 font-display text-[22px] font-extrabold tracking-[-0.04em]">62%</p>
                  <p className="font-mono text-[6.5px] uppercase tracking-[0.12em] text-paper/30">
                    complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-flare p-5 text-ink sm:p-6 lg:col-span-4">
          <div className="dot-grid-dark absolute inset-0 opacity-30" />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45">
              <Sparkles className="h-3 w-3" />
              AI tutor
            </span>
            <ArrowUpRight className="h-4 w-4 text-ink/40" />
          </div>
          <div className="relative mt-8">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
              Suggested question
            </p>
            <h2 className="mt-2 text-[21px] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Why does the water molecule bend?
            </h2>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-ink/58">
              The tutor will read the model with you and show the source.
            </p>
          </div>
          <Link
            href="/dashboard/simulations/ai-tutor"
            className="relative mt-5 inline-flex items-center gap-1.5 text-[10.5px] font-bold text-ink"
          >
            Ask the tutor
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {overviewStats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold leading-tight text-ink/45">{stat.label}</p>
                <span
                  className={
                    stat.tone === "flare"
                      ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-flare-soft text-flare-deep"
                      : "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper text-ink/45"
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-3 font-display text-[26px] font-extrabold leading-none tracking-[-0.05em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[9px] text-ink/35">
                <TrendingUp className="h-2.5 w-2.5 text-flare" />
                {stat.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[13px] font-bold tracking-[-0.01em] text-ink">Study time</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Minutes in the lab this week</p>
            </div>
            <div className="text-right">
              <p className="font-display text-[20px] font-extrabold leading-none tracking-[-0.04em]">
                {weekTotal}
                <span className="ml-0.5 text-[11px] font-semibold text-ink/35">min</span>
              </p>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.08em] text-flare-deep">
                Best: Thursday
              </p>
            </div>
          </div>

          <div className="relative mt-7">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[132px] flex-col justify-between">
              {[0, 1, 2, 3].map((line) => (
                <span key={line} className="block border-t border-dashed border-line/70" />
              ))}
            </div>
            <div className="relative flex h-[132px] items-stretch gap-2 sm:gap-3">
              {weeklyActivity.map((day) => {
                const height = Math.max(8, Math.round((day.minutes / maxMinutes) * 82));
                const best = day.minutes === maxMinutes;
                return (
                  <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span className="font-mono text-[7px] text-ink/28">{day.minutes}</span>
                    <span
                      className={
                        best
                          ? "block w-full max-w-[34px] rounded-t-md bg-flare transition-[height] duration-500"
                          : "block w-full max-w-[34px] rounded-t-md bg-ink/15 transition-[height] duration-500"
                      }
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex gap-2 border-t border-line pt-2 sm:gap-3">
              {weeklyActivity.map((day) => (
                <span key={day.day} className="flex-1 text-center font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/32">
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[13px] font-bold tracking-[-0.01em] text-ink">Up next</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Scheduled for your class</p>
            </div>
            <CalendarDays className="h-4 w-4 text-ink/25" />
          </div>
          <div className="mt-4 divide-y divide-line/80">
            {upcoming.map((item) => (
              <Link
                key={item.title}
                href="/dashboard/assignments"
                className="group flex items-center gap-3 py-3 first:pt-1 last:pb-0"
              >
                <span
                  className={
                    item.tone === "flare"
                      ? "h-7 w-1 shrink-0 rounded-full bg-flare"
                      : "h-7 w-1 shrink-0 rounded-full bg-ink/15"
                  }
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10.5px] font-semibold text-ink/75">{item.title}</p>
                  <p className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.08em] text-ink/32">
                    {item.subject} / {item.type}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] font-medium text-ink/45">{item.due}</p>
                  <ChevronRight className="ml-auto mt-1 h-3 w-3 text-ink/20 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/dashboard/assignments"
            className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-3 text-[9.5px] font-semibold text-ink/50 transition-colors hover:text-ink"
          >
            <BookOpen className="h-3 w-3" />
            View all classwork
          </Link>
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/35">Recommended</span>
            <h2 className="mt-2 text-[20px] font-extrabold tracking-[-0.035em] text-ink">
              Next in your lab
            </h2>
          </div>
          <Link
            href="/dashboard/simulations"
            className="group inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/45 transition-colors hover:text-ink"
          >
            See all
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {liveSimulations.map((simulation) => (
            <SimulationCard key={simulation.title} simulation={simulation} />
          ))}
        </div>
      </section>
    </div>
  );
}
