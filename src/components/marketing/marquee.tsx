const disciplines = [
  "Molecular structure",
  "Cellular biology",
  "Reaction kinetics",
  "Human anatomy",
  "Newtonian mechanics",
  "Circuit design",
  "Organic chemistry",
  "Medical foundations",
];

export function DisciplineMarquee() {
  const items = [...disciplines, ...disciplines];

  return (
    <section
      aria-label="Scientific disciplines covered by Learning Lab"
      className="border-y border-ink/10 bg-paper-soft"
    >
      <div className="flex overflow-hidden">
        <div className="marquee-track py-3.5">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex shrink-0 items-center gap-5 pr-5 font-mono text-[9.5px] uppercase tracking-[0.17em] text-ink/48"
            >
              <span className="h-1 w-1 rounded-full bg-flare" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
