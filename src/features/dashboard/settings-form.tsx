"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  GraduationCap,
  LoaderCircle,
  LogOut,
  Mail,
  RotateCcw,
  ShieldCheck,
  UserRound,
  Presentation,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { TextField } from "@/components/ui/text-field";
import { useDashboardSession } from "@/features/dashboard/session-context";
import { initials, roleLabel, type UserRole } from "@/lib/session";
import { cn } from "@/lib/utils";

const PREFS_KEY = "learning-lab.prefs";

type Prefs = {
  product: boolean;
  assignments: boolean;
  digest: boolean;
};

const defaultPrefs: Prefs = { product: true, assignments: true, digest: false };

const roles: { id: UserRole; label: string; icon: typeof UserRound }[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "educator", label: "Educator", icon: Presentation },
];

export function SettingsForm() {
  const router = useRouter();
  const { user, updateUser, signOut } = useDashboardSession();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<UserRole>(user.role);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PREFS_KEY);
      if (stored) setPrefs({ ...defaultPrefs, ...(JSON.parse(stored) as Partial<Prefs>) });
    } catch {
      setPrefs(defaultPrefs);
    }
  }, []);

  const togglePref = (key: keyof Prefs) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(next));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaved("");

    if (name.trim().length < 2) {
      setError("Add a name with at least two characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setSaving(true);
    window.setTimeout(() => {
      updateUser({ name: name.trim(), email: email.trim().toLowerCase(), role });
      setSaving(false);
      setSaved("Profile saved in this browser.");
      window.setTimeout(() => setSaved(""), 2600);
    }, 420);
  };

  const resetProgress = () => {
    window.localStorage.removeItem("learning-lab.progress");
    setResetDone(true);
    window.setTimeout(() => setResetDone(false), 2600);
  };

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Settings / Local demo profile"
        title="Make the lab yours."
        description="Update the profile shown across your workspace, choose how you want to be reminded and manage the demo data stored in this browser."
      />

      <div className="grid items-start gap-3 lg:grid-cols-[1.25fr_0.75fr]">
        <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-5 sm:p-6" noValidate>
          <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h2 className="text-[13px] font-bold text-ink">Profile</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">This is local to the demo build.</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-paper">
              {initials(name || user.name)}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextField
              label="Full name"
              value={name}
              onChange={setName}
              placeholder="Your name"
              autoComplete="name"
              icon={<UserRound className="h-4 w-4" />}
            />
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@school.edu"
              autoComplete="email"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>

          <div className="mt-4">
            <p className="mb-1.5 text-[11.5px] font-semibold text-ink/70">I use Learning Lab as</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((item) => {
                const Icon = item.icon;
                const selected = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[10.5px] font-semibold transition-colors",
                      selected
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-white text-ink/55 hover:border-ink/25",
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5", selected ? "text-flare" : "text-ink/30")} />
                    {item.label}
                    {selected ? <Check className="ml-auto h-3 w-3 text-flare" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {error ? (
            <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[10.5px] font-medium text-red-700">
              {error}
            </p>
          ) : null}
          {saved ? (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-[10.5px] font-medium text-green-800">
              <Check className="h-3.5 w-3.5" />
              {saved}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="font-mono text-[7.5px] uppercase tracking-[0.09em] text-ink/28">
              {roleLabel(role)} profile / {user.email}
            </p>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[10.5px] font-bold text-paper transition-colors hover:bg-ink-soft disabled:opacity-70"
            >
              {saving ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : null}
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-flare" />
              <h2 className="text-[12px] font-bold text-ink">Notifications</h2>
            </div>
            <div className="mt-4 space-y-4">
              {[
                { key: "product" as const, label: "Simulation reminders", copy: "When a guided session is ready to continue." },
                { key: "assignments" as const, label: "Class assignments", copy: "When a teacher adds work with a due date." },
                { key: "digest" as const, label: "Weekly digest", copy: "A summary of mastery and study time." },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10.5px] font-semibold text-ink/65">{item.label}</p>
                    <p className="mt-0.5 text-[9px] leading-relaxed text-ink/35">{item.copy}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs[item.key]}
                    aria-label={item.label}
                    onClick={() => togglePref(item.key)}
                    className={cn(
                      "mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full border p-0.5 transition-colors",
                      prefs[item.key] ? "border-ink bg-ink" : "border-line bg-paper",
                    )}
                  >
                    <span
                      className={cn(
                        "h-3.5 w-3.5 rounded-full transition-transform",
                        prefs[item.key] ? "translate-x-4 bg-flare" : "translate-x-0 bg-ink/25",
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-flare" />
              <h2 className="text-[12px] font-bold text-ink">Demo data</h2>
            </div>
            <p className="mt-2.5 text-[9.5px] leading-relaxed text-ink/38">
              Your account, preferences and completed-session marks live in this browser. There is
              no server or real password in this build.
            </p>
            <button
              type="button"
              onClick={resetProgress}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-[9.5px] font-semibold text-ink/50 transition-colors hover:border-ink/25 hover:text-ink"
            >
              <RotateCcw className="h-3 w-3" />
              {resetDone ? "Progress cleared" : "Reset session progress"}
            </button>
          </section>

          <section className="rounded-2xl bg-ink p-5 text-paper">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-flare">Session</p>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-paper/45">
              Signed in as {user.name}. Sign out to return to the auth screen.
            </p>
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/login");
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-paper transition-colors hover:text-flare"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
