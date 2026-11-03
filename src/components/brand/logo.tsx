import { cn } from "@/lib/utils";

export function LabMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <g stroke="#FF5A1F" strokeWidth="1.45">
        <ellipse cx="16" cy="16" rx="9.4" ry="3.9" transform="rotate(30 16 16)" />
        <ellipse cx="16" cy="16" rx="9.4" ry="3.9" transform="rotate(-30 16 16)" />
        <ellipse cx="16" cy="16" rx="9.4" ry="3.9" transform="rotate(90 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.8" fill="#FF5A1F" />
    </svg>
  );
}

export function LabLogo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LabMark className={tone === "dark" ? "text-paper" : "text-ink"} />
      <span className="inline-flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-display text-[21px] font-semibold leading-none tracking-[-0.055em]",
            tone === "dark" ? "text-paper" : "text-ink",
          )}
        >
          learning
        </span>
        <span
          className={cn(
            "font-display text-[21px] font-semibold leading-none tracking-[-0.055em]",
            tone === "dark" ? "text-flare" : "text-flare",
          )}
        >
          lab
        </span>
        <span className={cn("mb-0.5 h-1.5 w-1.5 rounded-full bg-flare", tone === "dark" && "bg-paper")} />
      </span>
    </span>
  );
}
