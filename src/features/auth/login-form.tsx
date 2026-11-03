"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, FlaskConical, LoaderCircle, Mail } from "lucide-react";
import { TextField } from "@/components/ui/text-field";
import {
  DEMO_ACCOUNT,
  nameFromEmail,
  saveSession,
  type DemoUser,
} from "@/lib/session";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const enter = (user: DemoUser, delay = 420) => {
    setLoading(true);
    window.setTimeout(() => {
      saveSession(user);
      router.push("/dashboard");
    }, delay);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Enter the email you use for Learning Lab.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email does not look complete yet.");
      return;
    }
    if (password.length < 6) {
      setError("Your password needs at least 6 characters.");
      return;
    }

    const isDemo = email.trim().toLowerCase() === DEMO_ACCOUNT.email;
    enter({
      name: isDemo ? DEMO_ACCOUNT.name : nameFromEmail(email.trim()),
      email: email.trim().toLowerCase(),
      role: isDemo ? DEMO_ACCOUNT.role : "student",
    });
  };

  const enterDemo = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setError("");
    enter({ name: DEMO_ACCOUNT.name, email: DEMO_ACCOUNT.email, role: DEMO_ACCOUNT.role }, 260);
  };

  return (
    <div>
      <span className="eyebrow text-ink/45">Welcome back</span>
      <h1 className="display mt-4 text-[clamp(2.15rem,4vw,2.9rem)] text-ink">
        Sign in to your lab.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/50">
        Pick up the practical you left open, or start something new.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
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
          placeholder="Enter your password"
          autoComplete="current-password"
          hint="6+ characters"
        />

        <div className="flex items-center justify-between gap-4 pt-0.5">
          <label className="flex cursor-pointer items-center gap-2 text-[11px] text-ink/50">
            <span className="relative flex h-4 w-4 items-center justify-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="peer sr-only"
              />
              <span className="h-4 w-4 rounded-[5px] border border-line bg-white transition-colors peer-checked:border-ink peer-checked:bg-ink" />
              <span className="pointer-events-none absolute h-1.5 w-2.5 -translate-y-px border-b-2 border-l-2 border-paper opacity-0 peer-checked:opacity-100" />
            </span>
            Keep me signed in
          </label>
          <Link href="/forgot-password" className="text-[11px] font-semibold text-ink/55 transition-colors hover:text-flare-deep">
            Forgot password?
          </Link>
        </div>

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
          {loading ? "Opening your lab..." : "Sign in"}
          {!loading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/30">or</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <button
        type="button"
        onClick={enterDemo}
        disabled={loading}
        className="group flex w-full items-center gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3.5 text-left transition-colors hover:border-ink/25 hover:bg-white disabled:opacity-60"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-flare-soft text-flare-deep">
          <FlaskConical className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11.5px] font-semibold text-ink">Enter the demo lab</span>
          <span className="mt-0.5 block text-[10px] text-ink/40">No setup. Opens the seeded student account.</span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-ink/25 transition-transform group-hover:translate-x-0.5" />
      </button>

      <p className="mt-6 text-center text-[11.5px] text-ink/45">
        New to Learning Lab?{" "}
        <Link href="/signup" className="font-semibold text-ink transition-colors hover:text-flare-deep">
          Create an account
        </Link>
      </p>
      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.11em] text-ink/25">
        Demo build / any valid email and 6+ character password work
      </p>
    </div>
  );
}
