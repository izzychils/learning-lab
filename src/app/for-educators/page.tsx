import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  ClipboardCheck,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PageHero } from "@/components/marketing/page-hero";
import { TeacherConsole } from "@/features/educators/teacher-console";
import { ArrowButton } from "@/components/ui/arrow-button";

export const metadata: Metadata = {
  title: "For educators",
  description:
    "Assign virtual practicals, watch a class progress and review every AI explanation before it counts. Learning Lab for teachers and departments.",
};

const steps = [
  {
    number: "01",
    title: "Pick the practical",
    copy: "Choose from the reviewed library and set it for one class, a year group or the whole department.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "See the room work",
    copy: "Live progress shows who is moving, who is stuck and where the same misconception keeps appearing.",
    icon: Radar,
  },
  {
    number: "03",
    title: "Keep the final say",
    copy: "Read the answers, approve the ones that count and add a teacher note before results are released.",
    icon: ShieldCheck,
  },
];

const features = [
  {
    title: "Assign without printing",
    copy: "Set a practical, attach an objective and choose a due date. No downloads, no lost worksheets.",
    icon: BookOpen,
  },
  {
    title: "Class level insight",
    copy: "See completion, attempt counts and common sticking points before the lesson ends.",
    icon: BarChart3,
  },
  {
    title: "Review, never rubber stamp",
    copy: "AI drafts feedback, but a teacher approves what a student sees. Every explanation points back to a source.",
    icon: Sparkles,
  },
  {
    title: "Built around the room",
    copy: "Use one device, a shared screen or a full class set. The lab travels with the lesson.",
    icon: Users,
  },
];

const promises = [
  "Curriculum aligned practicals",
  "Teacher reviewed explanations",
  "Class progress without spreadsheets",
  "No installation or lab equipment",
];

export default function ForEducatorsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper">
      <Navbar />
      <main>
        <PageHero
          eyebrow="For educators"
          title={
            <>
              Set the practical. See the room{" "}
              <span className="text-flare">get it.</span>
            </>
          }
          description="Give every learner a bench, keep the whole class in view and step in where the understanding breaks down. Learning Lab follows the lesson, not the other way around."
          aside={
            <div className="rounded-[22px] border border-paper/12 bg-paper/[0.04] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/35">
                  Live class / 11B
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-flare">
                  <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                  In session
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-[44px] font-extrabold leading-none tracking-[-0.06em]">
                    24<span className="text-paper/25">/28</span>
                  </p>
                  <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-paper/30">
                    Learners active
                  </p>
                </div>
                <div className="flex h-11 items-end gap-1">
                  {[38, 52, 47, 66, 74, 62, 82, 78].map((height, index) => (
                    <span
                      key={index}
                      className={index === 7 ? "w-1.5 rounded-sm bg-flare" : "w-1.5 rounded-sm bg-paper/20"}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 border-t border-paper/10 pt-3">
                <p className="text-[9px] leading-relaxed text-paper/38">
                  Six learners paused at limiting reagents. A four minute recap is ready.
                </p>
              </div>
            </div>
          }
          meta={
            <>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Teacher review built in
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Works on school devices
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3 text-flare" /> Curriculum aligned
              </span>
              <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.12em] text-paper/22 sm:block">
                Practicals / assessment / reports
              </span>
            </>
          }
        />

        <section className="py-14 sm:py-20">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
              <div>
                <span className="eyebrow text-ink/40">A calmer classroom</span>
                <h2 className="mt-4 max-w-[520px] text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-ink">
                  Less setup. More of the lesson you planned.
                </h2>
                <p className="mt-5 max-w-[470px] text-[13px] leading-[1.8] text-ink/50">
                  The lab removes the equipment queue and the worksheet shuffle without
                  removing the thinking. Students still change one variable, record an
                  observation and explain the result.
                </p>
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {promises.map((promise) => (
                    <div
                      key={promise}
                      className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5"
                    >
                      <Check className="h-3 w-3 shrink-0 text-flare" strokeWidth={3} />
                      <span className="text-[10px] font-medium text-ink/58">{promise}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[30px] bg-ink p-5 text-paper sm:p-8">
                <div className="grid-dark absolute inset-0 opacity-45 [mask-image:linear-gradient(120deg,black,transparent_75%)]" />
                <div className="relative mb-7 flex items-start justify-between gap-4">
                  <div>
                    <span className="eyebrow text-paper/40">The teacher console</span>
                    <p className="mt-3 max-w-[330px] text-[12.5px] leading-relaxed text-paper/45">
                      One screen for the practical, the room and the follow up.
                    </p>
                  </div>
                  <span className="rounded-full border border-paper/12 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-paper/30">
                    Demo data
                  </span>
                </div>
                <TeacherConsole />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-white py-14 sm:py-20">
          <div className="shell">
            <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="eyebrow text-ink/40">The teaching loop</span>
                <h2 className="mt-4 max-w-[360px] text-[clamp(1.9rem,3.5vw,2.9rem)] font-extrabold leading-[1.04] tracking-[-0.05em] text-ink">
                  Three moves, one lesson.
                </h2>
                <p className="mt-4 max-w-[360px] text-[11.5px] leading-relaxed text-ink/45">
                  The teacher keeps the judgement. The lab handles the repetition around it.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.number}
                      className="flex h-full flex-col rounded-2xl border border-line bg-paper-soft p-4"
                    >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] text-flare-deep">{step.number}</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink/40">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        <h3 className="mt-5 text-[14px] font-bold leading-tight tracking-[-0.02em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
                          {step.copy}
                        </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="shell">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="eyebrow text-ink/40">In the room</span>
                <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.8rem)] font-extrabold tracking-[-0.05em] text-ink">
                  Built for the whole department.
                </h2>
              </div>
              <p className="max-w-[330px] text-[11px] leading-relaxed text-ink/42 sm:text-right">
                From a single cover lesson to a shared scheme of work, the same records follow
                the class.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="flex h-full gap-4 rounded-2xl border border-line bg-white p-5"
                  >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-flare-soft text-flare-deep">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-[13.5px] font-bold tracking-[-0.02em] text-ink">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-[10.5px] leading-relaxed text-ink/45">
                          {feature.copy}
                        </p>
                      </div>
                    </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="shell">
            <div className="relative overflow-hidden rounded-[30px] bg-flare px-5 py-8 text-ink sm:px-9 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="dot-grid-dark absolute inset-0 opacity-25" />
              <div className="relative max-w-[600px]">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/45">
                  Bring a class
                </span>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                  Start with one practical.
                </h2>
                <p className="mt-3 max-w-[470px] text-[12px] leading-relaxed text-ink/58">
                  Open the teacher console in the demo, or create a free account and set up a
                  class. No card and no installation.
                </p>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
                <ArrowButton href="/signup" variant="ink">
                  Create a free account
                </ArrowButton>
                <Link
                  href="/demo"
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-ink/20 px-5 text-[12px] font-semibold text-ink transition-colors hover:border-ink/45"
                >
                  Open the demo lab
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
