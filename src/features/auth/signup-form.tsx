"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap, LoaderCircle, Mail, Presentation, UserRound } from "lucide-react";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";
import { saveSession, type UserRole } from "@/lib/session";

const roles: { id: UserRole; label: string; copy: string; icon: typeof UserRound }[] = [
  { id: "student", label: "Student", copy: "Explore, practise and track your progress.", icon: GraduationCap },
  { id: "educator", label: "Educator", copy: "Plan practicals and guide a class.", icon: Presentation },
];

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Add the name you want on your lab profile.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Make your password at least 8 characters.");
      return;
    }
    if (!terms) {
      setError("Accept the demo terms to continue.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      saveSession({ name: name.trim(), email: email.trim().toLowerCase(), role });
      router.push("/onboarding");
    }, 520);
  };

  return (
    <div>
      <span className="eyebrow text-ink/45">Start exploring</span>
      <h1 className="display mt-4 text-[clamp(2.15rem,4vw,2.9rem)] text-ink">
        Build your lab.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/50">
        One account for simulations, progress and the tutor that reads them with you.
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
        <TextField
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="Ada Nwosu"
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
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Create a password"
          autoComplete="new-password"
          hint="8+ characters"
        />

        <div>
          <p className="mb-1.5 text-[11.5px] font-semibold text-ink/70">I am joining as</p>
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
                    "rounded-xl border p-3 text-left transition-colors",
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-ink hover:border-ink/25",
                  )}
                >
                  <Icon className={cn("h-4 w-4", selected ? "text-flare" : "text-ink/35")} />
                  <span className="mt-2 block text-[11.5px] font-bold">{item.label}</span>
                  <span className={cn("mt-0.5 block text-[9px] leading-snug", selected ? "text-paper/45" : "text-ink/38")}>
                    {item.copy}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-[10.5px] leading-relaxed text-ink/45">
          <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => setTerms(event.target.checked)}
              className="peer sr-only"
            />
            <span className="h-4 w-4 rounded-[5px] border border-line bg-white transition-colors peer-checked:border-ink peer-checked:bg-ink" />
            <span className="pointer-events-none absolute h-1.5 w-2.5 -translate-y-px border-b-2 border-l-2 border-paper opacity-0 peer-checked:opacity-100" />
          </span>
          I understand this is a demo build. My profile and progress stay in this browser.
        </label>

        {error ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[12.5px] font-bold text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Building your workspace..." : "Continue to setup"}
          {!loading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
        </button>
      </form>

      <p className="mt-6 text-center text-[11.5px] text-ink/45">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-ink transition-colors hover:text-flare-deep">
          Sign in
        </Link>
      </p>
      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-ink/25">
        Demo build / no credit card / no backend
      </p>
    </div>
  );
}
