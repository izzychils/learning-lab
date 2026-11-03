import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  ink: "bg-ink text-paper hover:bg-ink-soft",
  flare: "bg-flare text-ink hover:bg-[#ff6d39]",
  paper: "bg-paper text-ink hover:bg-white",
  outline: "border border-ink/20 bg-transparent text-ink hover:border-ink/45 hover:bg-ink/[0.035]",
  outlineDark: "border border-paper/25 bg-transparent text-paper hover:border-paper/50 hover:bg-paper/[0.06]",
};

export function ArrowButton({
  href,
  children,
  variant = "ink",
  className,
  icon = true,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
  icon?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200 sm:px-6",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}
