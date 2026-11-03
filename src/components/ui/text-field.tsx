"use client";

import { useId, useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  autoComplete,
  hint,
  error,
  icon,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password";
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
  required?: boolean;
}) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-[11.5px] font-semibold text-ink/70">
          {label}
        </label>
        {hint ? <span className="text-[10px] text-ink/35">{hint}</span> : null}
      </div>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30">
            {icon}
          </span>
        ) : null}
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-3.5 text-[13px] text-ink placeholder:text-ink/28 transition-all focus:outline-none focus:ring-4",
            icon ? "pl-10" : "",
            isPassword ? "pr-11" : "",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-line hover:border-ink/25 focus:border-flare focus:ring-flare/10",
          )}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setRevealed((current) => !current)}
            aria-label={revealed ? "Hide password" : "Show password"}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink/35 transition-colors hover:bg-ink/[0.04] hover:text-ink/70"
          >
            {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 text-[10.5px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
