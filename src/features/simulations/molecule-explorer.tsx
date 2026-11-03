"use client";

import { useState } from "react";
import { ArrowUpRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { molecules, type Atom, type Bond, type Element, type Molecule } from "@/features/simulations/molecules";

const atomStyle: Record<Element, { fill: string; text: string; stroke: string }> = {
  C: { fill: "#302D27", text: "#F4F1E9", stroke: "#F4F1E9" },
  H: { fill: "#F4F1E9", text: "#12110E", stroke: "#F4F1E9" },
  N: { fill: "#C8C1B3", text: "#12110E", stroke: "#F4F1E9" },
  O: { fill: "#FF5A1F", text: "#12110E", stroke: "#FFBEA5" },
};

export function MoleculeExplorer() {
  const [activeId, setActiveId] = useState<Molecule["id"]>("water");
  const [labels, setLabels] = useState(true);
  const active = molecules.find((molecule) => molecule.id === activeId) ?? molecules[0];

  return (
    <div className="overflow-hidden rounded-[28px] border border-paper/14 bg-paper/[0.035]">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-paper/10 p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {molecules.map((molecule, index) => {
          const selected = molecule.id === active.id;
          return (
            <button
              key={molecule.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveId(molecule.id)}
              className={cn(
                "group flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors sm:px-4",
                selected
                  ? "bg-flare text-ink"
                  : "text-paper/52 hover:bg-paper/[0.055] hover:text-paper",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[8px] uppercase tracking-[0.12em]",
                  selected ? "text-ink/50" : "text-paper/28",
                )}
              >
                0{index + 1}
              </span>
              <span className="text-[11.5px] font-semibold">{molecule.name}</span>
              <span
                className={cn(
                  "font-mono text-[10px]",
                  selected ? "text-ink/65" : "text-paper/32",
                )}
              >
                {molecule.formula}
              </span>
            </button>
          );
        })}
        <div className="ml-auto hidden shrink-0 pl-3 pr-1 lg:block">
          <button
            type="button"
            onClick={() => setLabels((value) => !value)}
            aria-pressed={labels}
            className="inline-flex items-center gap-2 rounded-lg border border-paper/12 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-paper/48 transition-colors hover:border-paper/25 hover:text-paper/80"
          >
            {labels ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {labels ? "Labels on" : "Labels off"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.45fr_0.8fr]">
        <div className="relative min-h-[430px] overflow-hidden border-b border-paper/10 lg:min-h-[540px] lg:border-b-0 lg:border-r">
          <div className="dot-grid absolute inset-0 opacity-35" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_45%_48%,rgba(255,90,31,0.11),transparent_72%)]" />

          <div className="relative flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/30">
                Structure / {active.formulaPlain}
              </p>
              <p className="mt-1 text-[12.5px] font-medium text-paper/70">{active.name}</p>
            </div>
            <button
              type="button"
              onClick={() => setLabels((value) => !value)}
              aria-pressed={labels}
              className="inline-flex items-center gap-1.5 rounded-lg border border-paper/12 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/45 lg:hidden"
            >
              {labels ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              {labels ? "Labels" : "Off"}
            </button>
          </div>

          <div className="relative flex h-[350px] items-center justify-center px-2 sm:h-[430px] sm:px-6">
            <svg
              key={active.id}
              viewBox="0 0 520 420"
              role="img"
              aria-label={`Ball and stick model of ${active.name}, ${active.formulaPlain}. ${active.geometry}.`}
              className="molecule-in h-full w-full max-w-[560px]"
            >
              <defs>
                <radialGradient id="molecule-aura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                </radialGradient>
                <filter id="molecule-glow" x="-200%" y="-200%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle cx="260" cy="210" r="190" fill="url(#molecule-aura)" />
              <circle cx="260" cy="210" r="164" fill="none" stroke="#F4F1E9" strokeOpacity="0.07" strokeDasharray="2 7" />
              <circle cx="260" cy="210" r="190" fill="none" stroke="#F4F1E9" strokeOpacity="0.045" strokeDasharray="2 9" />

              <g fontFamily="var(--font-plex), monospace" fill="#F4F1E9" letterSpacing="0.1em">
                <text x="22" y="30" fontSize="8" opacity="0.32">LEARNING LAB / 2D MODEL</text>
                <text x="374" y="398" fontSize="8" opacity="0.25">{active.formulaPlain}</text>
              </g>

              <g stroke="#F4F1E9" strokeOpacity="0.14">
                <path d="M22 54h8M26 50v8" />
                <path d="M490 370h8M494 366v8" />
              </g>

              {active.bonds.map((bond) => (
                <BondLine
                  key={`${bond.from}-${bond.to}`}
                  bond={bond}
                  atoms={active.atoms}
                />
              ))}

              {active.atoms.map((atom) => (
                <AtomCircle key={atom.id} atom={atom} showLabel={labels} />
              ))}

              {active.id === "ammonia" ? (
                <g>
                  <circle cx="260" cy="150" r="3" fill="#F4F1E9" opacity="0.75" />
                  <circle cx="274" cy="144" r="3" fill="#F4F1E9" opacity="0.75" />
                  <text x="290" y="148" fontFamily="var(--font-plex), monospace" fill="#F4F1E9" fillOpacity="0.36" fontSize="7.5" letterSpacing="0.1em">
                    LONE PAIR
                  </text>
                  <path d="M286 145h-4" stroke="#F4F1E9" strokeOpacity="0.25" />
                </g>
              ) : null}

              <g fontFamily="var(--font-plex), monospace" fill="#F4F1E9">
                <text x="260" y="399" textAnchor="middle" fontSize="8" opacity="0.3" letterSpacing="0.12em">
                  {active.geometry.toUpperCase()}
                </text>
              </g>
            </svg>
          </div>

          <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 px-4 pb-4 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/30 sm:px-6">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-flare" /> Oxygen
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-paper" /> Hydrogen
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#C8C1B3]" /> Nitrogen
            </span>
            <span className="ml-auto hidden sm:block">Atoms not to scale</span>
          </div>
        </div>

        <div className="flex h-full flex-col bg-paper p-4 text-ink sm:p-6">
          <div className="flex items-center justify-between">
            <p className="mono-label text-ink/35">Molecule profile</p>
            <span className="rounded-full bg-flare-soft px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-flare-deep">
              Verified
            </span>
          </div>

          <div key={active.id} className="answer-in">
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/38">
                  {active.name}
                </p>
                <p className="mt-1 font-display text-[42px] font-semibold leading-none tracking-[-0.06em]">
                  {active.formula}
                </p>
              </div>
              <span className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink/10">
                <span className="h-2.5 w-2.5 rounded-full bg-flare" />
              </span>
            </div>

            <dl className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
              {[
                ["Geometry", active.geometry],
                ["Polarity", active.polarity],
                ["Molar mass", active.mass],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-[10px] text-ink/45">{label}</dt>
                  <dd className="text-right text-[10.5px] font-semibold text-ink/80">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl border border-flare/20 bg-flare-soft/60 p-3.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-flare-deep" />
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-flare-deep/75">
                  AI tutor / {active.keyIdea}
                </p>
              </div>
              <p className="mt-2.5 text-[11px] leading-[1.65] text-ink/68">{active.note}</p>
            </div>
          </div>

          <a
            href="#tutor"
            className="group mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-[11px] font-semibold text-ink lg:mt-auto"
          >
            Ask a follow up
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function BondLine({ bond, atoms }: { bond: Bond; atoms: Atom[] }) {
  const from = atoms.find((atom) => atom.id === bond.from);
  const to = atoms.find((atom) => atom.id === bond.to);
  if (!from || !to) return null;

  if (bond.order === 1) {
    return (
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#F4F1E9"
        strokeOpacity="0.38"
        strokeWidth="2"
        strokeLinecap="round"
      />
    );
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const offsetX = (-dy / length) * 3.5;
  const offsetY = (dx / length) * 3.5;

  return (
    <g stroke="#F4F1E9" strokeOpacity="0.38" strokeWidth="1.8" strokeLinecap="round">
      <line x1={from.x + offsetX} y1={from.y + offsetY} x2={to.x + offsetX} y2={to.y + offsetY} />
      <line x1={from.x - offsetX} y1={from.y - offsetY} x2={to.x - offsetX} y2={to.y - offsetY} />
    </g>
  );
}

function AtomCircle({ atom, showLabel }: { atom: Atom; showLabel: boolean }) {
  const style = atomStyle[atom.element];
  return (
    <g>
      {atom.element === "O" ? (
        <circle cx={atom.x} cy={atom.y} r={atom.r + 9} fill="#FF5A1F" opacity="0.12" filter="url(#molecule-glow)" />
      ) : null}
      <circle
        cx={atom.x}
        cy={atom.y}
        r={atom.r}
        fill={style.fill}
        stroke={style.stroke}
        strokeOpacity={atom.element === "H" ? 0.35 : 0.22}
        strokeWidth="1"
      />
      <circle
        cx={atom.x - atom.r * 0.3}
        cy={atom.y - atom.r * 0.34}
        r={atom.r * 0.18}
        fill="#FFFFFF"
        opacity={atom.element === "C" ? 0.1 : 0.22}
      />
      {showLabel ? (
        <text
          x={atom.x}
          y={atom.y + atom.r * 0.2}
          textAnchor="middle"
          fill={style.text}
          fontSize={atom.r > 28 ? 15 : 10}
          fontWeight="600"
          fontFamily="var(--font-plex), monospace"
        >
          {atom.element}
        </text>
      ) : null}
    </g>
  );
}
