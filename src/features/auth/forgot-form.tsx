"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, MailCheck } from "lucide-react";
import { TextField } from "@/components/ui/text-field";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 500);
  };

  if (sent) {
    return (
      <div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-flare-soft text-flare-deep">
          <MailCheck className="h-5 w-5" />
        </span>
        <h1 className="display mt-5 text-[clamp(2.15rem,4vw,2.9rem)] text-ink">
          Check your inbox.
        </h1>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/50">
          If an account exists for <span className="font-semibold text-ink">{email.trim()}</span>,
          a reset link would be on its way.
        </p>
        <div className="mt-6 rounded-xl border border-line bg-paper-soft p-4">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35">Demo note</p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-ink/50">
            This build has no email service. Use the demo account to get back into the lab, or
            create a new profile.
          </p>
        </div>
        <Link
          href="/login"
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[12.5px] font-bold text-paper transition-colors hover:bg-ink-soft"
        >
          Return to sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 w-full text-center text-[11px] font-semibold text-ink/40 transition-colors hover:text-ink"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      <span className="eyebrow text-ink/45">Account recovery</span>
      <h1 className="display mt-4 text-[clamp(2.15rem,4vw,2.9rem)] text-ink">
        Reset your password.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-ink/50">
        Enter the email on your account and we will send a link to set a new password.
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
        {error ? (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-medium text-red-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[12.5px] font-bold text-paper transition-colors hover:bg-ink-soft disabled:opacity-70"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Sending..." : "Send reset link"}
          {!loading ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-ink/45 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}
