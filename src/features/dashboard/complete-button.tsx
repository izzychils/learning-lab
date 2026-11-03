"use client";

import { useEffect, useState } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const PROGRESS_KEY = "learning-lab.progress";

function readProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}") as Record<string, boolean>;
  } catch {
    return {};
  }
}

export function CompleteButton({ slug }: { slug: string }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(Boolean(readProgress()[slug]));
  }, [slug]);

  const toggle = () => {
    const progress = readProgress();
    const next = !complete;
    progress[slug] = next;
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    setComplete(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={complete}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[10.5px] font-bold transition-colors",
        complete
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white text-ink/55 hover:border-ink/30 hover:text-ink",
      )}
    >
      {complete ? <Check className="h-3.5 w-3.5 text-flare" strokeWidth={3} /> : <Circle className="h-3.5 w-3.5" />}
      {complete ? "Session complete" : "Mark complete"}
    </button>
  );
}
