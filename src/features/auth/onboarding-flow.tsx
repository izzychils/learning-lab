"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Check,
  Dna,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  LoaderCircle,
  Presentation,
  Timer,
  Waves,
} from "lucide-react";
import { readSession, type DemoUser, type UserRole } from "@/lib/session";
import { cn } from "@/lib/utils";

type Preference = {
  level: string;
  minutes: string;
  subjects: string[];
  goal: string;
};

const roleOptions: { id: UserRole; label: string; copy: string; icon: typeof GraduationCap }[] = [
  {
    id: "student",
    label: "Student",
    copy: "Explore models, run practicals and track what is sticking.",
    icon: GraduationCap,
  },
  {
    id: "educator",
    label: "Educator",
    copy: "Plan a practical and see a class move through it.",
    icon: Presentation,
  },
];

const levels = ["GCSE", "A level", "University foundation", "Medical foundation"];
const times = ["15 min", "30 min", "45 min", "60 min"];

const subjectOptions = [
  { label: "Chemistry", icon: FlaskConical },
  { label: "Biology", icon: Dna },
  { label: "Physics", icon: Waves },
  { label: "Medicine", icon: HeartPulse },
];

const goals = ["Exam preparation", "Coursework", "Pure curiosity"];

const steps = ["Role", "Level", "Subjects"];

export function OnboardingFlow() {
  const router = useRouter();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>("student");
  const [preference, setPreference] = useState<Preference>({
    level: "A level",
    minutes: "30 min",
    subjects: ["Chemistry", "Biology"],
    goal: "Exam preparation",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (!session) {
      router.replace("/signup");
      return;
    }
    setUser(session);
    setRole(session.role);
    try {
      const raw = window.localStorage.getItem(`learning-lab.onboarding.${session.email}`);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Preference>;
        setPreference((current) => ({
          level: typeof parsed.level === "string" ? parsed.level : current.level,
          minutes: typeof parsed.minutes === "string" ? parsed.minutes : current.minutes,
          subjects: Array.isArray(parsed.subjects)
            ? parsed.subjects.filter((item): item is string => typeof item === "string")
            : current.subjects,
          goal: typeof parsed.goal === "string" ? parsed.goal : current.goal,
        }));
      }
    } catch {
      // A malformed local preference should never block onboarding.
    }
    setReady(true);
  }, [router]);

  const update = <K extends keyof Preference,>(key: K, value: Preference[K]) => {
    setPreference((current) => ({ ...current, [key]: value }));
  };

  const toggleSubject = (subject: string) => {
    setPreference((current) => {
      const active = current.subjects.includes(subject);
      if (active && current.subjects.length === 1) return current;
      return {
        ...current,
        subjects: active
          ? current.subjects.filter((item) => item !== subject)
          : [...current.subjects, subject],
      };
    });
  };

  const finish = (skipped = false) => {
    if (!user) return;
    setSaving(true);
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          `learning-lab.onboarding.${user.email}`,
          JSON.stringify({
            ...preference,
            role,
            skipped,
            completedAt: new Date().toISOString(),
          }),
        );
        if (role !== user.role) {
          window.localStorage.setItem(
            "learning-lab.session",
            JSON.stringify({ ...user, role }),
          );
        }
      } catch {
        // Local storage can be unavailable in private browsing. Keep the flow moving.
      }
      router.push("/dashboard");
    }, 420);
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    finish();
  };

  if (!ready) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoaderCircle className="h-5 w-5 animate-spin text-ink/30" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-flare" />
          <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/40">
            Setup / {steps[step]}
          </span>
        </div>
        <button
          type="button"
          onClick={() => finish(true)}
          disabled={saving}
          className="text-[10px] font-semibold text-ink/35 transition-colors hover:text-ink disabled:opacity-50"
        >
          Skip for now
        </button>
      </div>

      <div className="mt-3 flex gap-1.5">
        {steps.map((label, index) => (
          <span key={label} className="flex-1">
            <span
              className={cn(
                "block h-1 rounded-full transition-colors",
                index <= step ? "bg-flare" : "bg-line",
              )}
            />
          </span>
        ))}
      </div>

      <h1 className="display mt-7 text-[clamp(2.1rem,4vw,2.8rem)] text-ink">
        {step === 0
          ? `Welcome, ${user?.name.split(" ")[0] ?? "scientist"}.`
          : step === 1
            ? "Where should the lab meet you?"
            : "What do you want to explore?"}
      </h1>
      <p className="mt-3 text-[12.5px] leading-relaxed text-ink/48">
        {step === 0
          ? "Tell the lab how you plan to use it. You can change this later in settings."
          : step === 1
            ? "A short setup makes the recommendations more useful. Pick the level and the time you can realistically give."
            : "Choose at least one subject and the reason you are here. The first session will start from there."}
      </p>

      {step === 0 ? (
        <div className="mt-7 grid gap-2">
          {roleOptions.map((option) => {
            const Icon = option.icon;
            const active = role === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setRole(option.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white text-ink hover:border-ink/25",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    active ? "bg-flare text-ink" : "bg-paper text-ink/40",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-bold">{option.label}</span>
                    {active ? <Check className="h-3.5 w-3.5 text-flare" /> : null}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-[10px] leading-relaxed",
                      active ? "text-paper/45" : "text-ink/40",
                    )}
                  >
                    {option.copy}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-7 space-y-6">
          <div>
            <p className="mb-2 text-[10.5px] font-semibold text-ink/55">
              {role === "educator" ? "Where do you teach?" : "What are you studying?"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => update("level", level)}
                  aria-pressed={preference.level === level}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left text-[10.5px] font-semibold transition-colors",
                    preference.level === level
                      ? "border-flare bg-flare-soft text-flare-deep"
                      : "border-line bg-white text-ink/50 hover:border-ink/25 hover:text-ink",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold text-ink/55">
              <Timer className="h-3 w-3" />
              Weekly lab time
            </p>
            <div className="grid grid-cols-4 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => update("minutes", time)}
                  aria-pressed={preference.minutes === time}
                  className={cn(
                    "rounded-xl border py-2.5 font-mono text-[9px] font-semibold transition-colors",
                    preference.minutes === time
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-ink/40 hover:border-ink/25 hover:text-ink",
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-paper-soft p-3">
            <p className="text-[9.5px] leading-relaxed text-ink/38">
              This is a pacing preference, not a deadline. The lab will use it to shape
              suggested sessions and study plans.
            </p>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-7 space-y-6">
          <div>
            <p className="mb-2 text-[10.5px] font-semibold text-ink/55">
              Subjects <span className="font-normal text-ink/30">/ choose at least one</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map((subject) => {
                const Icon = subject.icon;
                const active = preference.subjects.includes(subject.label);
                return (
                  <button
                    key={subject.label}
                    type="button"
                    onClick={() => toggleSubject(subject.label)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-3 text-left transition-colors",
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-white text-ink/50 hover:border-ink/25 hover:text-ink",
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", active ? "text-flare" : "text-ink/30")} />
                    <span className="text-[10px] font-semibold">{subject.label}</span>
                    {active ? <Check className="ml-auto h-3 w-3 text-flare" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10.5px] font-semibold text-ink/55">Main reason</p>
            <div className="space-y-1.5">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => update("goal", goal)}
                  aria-pressed={preference.goal === goal}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-[10.5px] font-medium transition-colors",
                    preference.goal === goal
                      ? "border-flare bg-flare-soft text-ink"
                      : "border-line bg-white text-ink/45 hover:border-ink/25 hover:text-ink",
                  )}
                >
                  {goal}
                  <span
                    className={cn(
                      "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
                      preference.goal === goal ? "border-flare bg-flare text-ink" : "border-line",
                    )}
                  >
                    {preference.goal === goal ? <Check className="h-2 w-2" strokeWidth={4} /> : null}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-line bg-paper-soft p-3">
            <Atom className="h-4 w-4 shrink-0 text-flare" />
            <p className="text-[9px] leading-relaxed text-ink/38">
              You can add more subjects later. The first recommendation will come from this
              selection.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-7 flex items-center gap-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={saving}
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-line bg-white px-4 text-[11px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink disabled:opacity-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        ) : null}
        <button
          type="button"
          onClick={next}
          disabled={saving}
          className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-ink text-[11.5px] font-bold text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {saving ? "Opening your lab..." : step === steps.length - 1 ? "Enter my lab" : "Continue"}
          {!saving ? <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /> : null}
        </button>
      </div>

      <p className="mt-5 text-center text-[10.5px] text-ink/35">
        You can change all of this later in{" "}
        <Link href="/dashboard/settings" className="font-semibold text-ink/60 hover:text-ink">
          settings
        </Link>
        .
      </p>
    </div>
  );
}
