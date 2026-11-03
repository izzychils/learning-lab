import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  aside?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0b0a08] pb-12 pt-10 text-paper sm:pb-16 sm:pt-14">
      <div className="grid-dark absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent_94%)]" />
      <div className="absolute right-[-12%] top-[-340px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.17),transparent_68%)]" />
      <svg
        viewBox="0 0 800 800"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-[-80px] hidden h-[720px] w-[720px] opacity-50 lg:block"
      >
        <circle cx="400" cy="400" r="260" stroke="#F4F1E9" strokeOpacity="0.06" />
        <circle cx="400" cy="400" r="330" stroke="#FF5A1F" strokeOpacity="0.1" strokeDasharray="2 12" />
        <ellipse cx="400" cy="400" rx="360" ry="130" stroke="#F4F1E9" strokeOpacity="0.05" transform="rotate(24 400 400)" />
        <circle cx="646" cy="252" r="4" fill="#FF5A1F" />
        <circle cx="184" cy="564" r="3" fill="#F4F1E9" fillOpacity="0.35" />
      </svg>

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow text-paper/45">{eyebrow}</span>
            <h1 className="display mt-5 max-w-[880px] text-[clamp(2.7rem,6vw,5.3rem)] text-paper">
              {title}
            </h1>
            <p className="mt-5 max-w-[560px] text-[13.5px] leading-[1.75] text-paper/50 sm:text-[14.5px]">
              {description}
            </p>
          </div>
          {aside ? <div className="lg:pb-1">{aside}</div> : null}
        </div>

        {meta ? (
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/10 pt-4 text-[10px] text-paper/38">
            {meta}
          </div>
        ) : null}
      </div>
    </section>
  );
}
