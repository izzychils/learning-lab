import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="eyebrow text-ink/40">{eyebrow}</span>
        <h1 className="display mt-3 text-[clamp(1.9rem,3.3vw,2.6rem)] text-ink">{title}</h1>
        {description ? (
          <p className="mt-2.5 max-w-[560px] text-[12.5px] leading-relaxed text-ink/48">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
