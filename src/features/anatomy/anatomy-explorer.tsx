"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ScanLine } from "lucide-react";
import { bodySystems, type SystemId } from "@/features/anatomy/systems";
import { cn } from "@/lib/utils";

export function AnatomyExplorer() {
  const [activeId, setActiveId] = useState<SystemId>("nervous");
  const active = bodySystems.find((system) => system.id === activeId) ?? bodySystems[0];

  return (
    <div className="overflow-hidden rounded-[28px] border border-paper/12 bg-ink shadow-[0_30px_70px_-45px_rgba(18,17,14,0.65)]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-paper/30">
              Body map / 2D
            </p>
            <span className="flex items-center gap-1.5 rounded-full border border-paper/12 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.1em] text-paper/35">
              <ScanLine className="h-2.5 w-2.5 text-flare" />
              Interactive
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2" aria-label="Choose a body system">
            {bodySystems.map((system, index) => {
              const selected = system.id === active.id;
              return (
                <button
                  key={system.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveId(system.id)}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left transition-colors",
                    selected
                      ? "border-flare bg-flare text-ink"
                      : "border-paper/12 text-paper/55 hover:border-paper/25 hover:bg-paper/[0.05] hover:text-paper/85",
                  )}
                >
                  <span className="text-[11.5px] font-semibold">{system.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[8px] uppercase tracking-[0.1em]",
                      selected ? "text-ink/45" : "text-paper/25",
                    )}
                  >
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <div key={active.id} className="answer-in mt-7">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-flare/80">
              {active.label} / {active.organ}
            </p>
            <h3 className="display mt-3 text-[clamp(1.8rem,3vw,2.5rem)] text-paper">
              {active.title}
            </h3>
            <p className="mt-3 max-w-[420px] text-[12.5px] leading-[1.75] text-paper/48">
              {active.copy}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-flare/25 bg-flare/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-flare" />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-flare/90">
                {active.stat}
              </span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {active.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-2 text-[11px] leading-relaxed text-paper/50">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-paper/12">
                    <Check className="h-2.5 w-2.5 text-flare" strokeWidth={2.5} />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#educators"
            className="group mt-auto flex items-center justify-between gap-4 border-t border-paper/10 pt-5 text-[11px] font-semibold text-paper/75 transition-colors hover:text-flare"
          >
            Learn with your class
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative min-h-[480px] overflow-hidden border-t border-paper/10 lg:min-h-[580px] lg:border-l lg:border-t-0">
          <div className="dot-grid absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_58%_at_46%_48%,rgba(255,90,31,0.1),transparent_74%)]" />
          <div className="relative flex h-full items-center justify-center px-2 py-6 sm:px-5">
            <BodyMap systemId={activeId} calloutY={active.calloutY} />
          </div>
          <p className="absolute bottom-4 left-5 font-mono text-[7.5px] uppercase tracking-[0.12em] text-paper/25">
            Anterior view / schematic
          </p>
          <p className="absolute right-5 top-4 font-mono text-[7.5px] uppercase tracking-[0.12em] text-paper/25">
            Fig. 03
          </p>
        </div>
      </div>
    </div>
  );
}

function BodyMap({ systemId, calloutY }: { systemId: SystemId; calloutY: number }) {
  const active = systemId;
  return (
    <svg
      viewBox="0 0 420 560"
      role="img"
      aria-label={`Schematic human body with the ${active} system highlighted.`}
      className="h-auto w-full max-w-[430px]"
    >
      <defs>
        <radialGradient id="organ-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </radialGradient>
        <filter id="organ-blur" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id="organ-glow-filter" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g stroke="#F4F1E9" strokeOpacity="0.1" strokeWidth="1">
        <path d="M168 22v516" strokeDasharray="2 8" />
        <path d="M20 80h18M20 84h10M382 470h18M382 474h10" />
      </g>

      <g fill="none" stroke="#F4F1E9" strokeOpacity="0.2" strokeWidth="1.2">
        <circle cx="168" cy="82" r="43" />
        <path d="M158 123v18M178 123v18" />
        <path d="M128 150c-20 8-29 28-31 52l-8 82c-1 18 8 26 18 24l4-1" />
        <path d="M208 150c20 8 29 28 31 52l8 82c1 18-8 26-18 24l-4-1" />
        <path d="M132 153c-13 4-21 15-23 31l-5 37M204 153c13 4 21 15 23 31l5 37" />
        <path d="M127 172l-6 91M209 172l6 91" />
        <path d="M117 286c-2 22-5 40-9 54M219 286c2 22 5 40 9 54" />
        <path d="M130 150h76l16 27-7 161c-1 13-8 20-18 20h-58c-10 0-17-7-18-20l-7-161 16-27Z" />
        <path d="M126 344h84" />
        <path d="M146 358l-7 82-5 97M190 358l7 82 5 97" />
        <path d="M131 528c0 8 7 12 14 12s12-4 12-10M195 528c0 8 7 12 14 12s12-4 12-10" />
        <path d="M118 532h28M195 532h30" strokeOpacity="0.14" />
      </g>

      <g opacity={active === "respiratory" ? 1 : 0.22} fill={active === "respiratory" ? "#FF5A1F" : "#F4F1E9"} fillOpacity={active === "respiratory" ? 0.16 : 0.05} stroke={active === "respiratory" ? "#FF5A1F" : "#F4F1E9"} strokeOpacity={active === "respiratory" ? 0.7 : 0.25}>
        <path d="M152 186c-15 1-23 18-23 39 0 23 10 36 24 35l6-1 1-63c-2-7-4-10-8-10Z" />
        <path d="M188 186c15 1 23 18 23 39 0 23-10 36-24 35l-6-1-1-63c2-7 4-10 8-10Z" />
        <path d="M170 189v54M162 189v51" strokeOpacity="0.4" fill="none" />
      </g>

      <g opacity={active === "circulation" ? 1 : 0.26} fill={active === "circulation" ? "#FF5A1F" : "#F4F1E9"} fillOpacity={active === "circulation" ? 0.9 : 0.09} stroke={active === "circulation" ? "#FFBEA5" : "#F4F1E9"} strokeOpacity={active === "circulation" ? 0.55 : 0.3}>
        <path d="M171 206c-8-8-19-2-17 8 1 7 8 15 17 24 9-9 16-17 17-24 2-10-9-16-17-8Z" />
      </g>

      <g opacity={active === "nervous" ? 1 : 0.24}>
        <path d="M150 67c5-15 25-22 38-13 12-2 21 8 19 20 7 12-3 25-17 26l-19 2c-14-1-25-12-22-25-3-3-2-7 1-10Z" fill="#FF5A1F" fillOpacity={active === "nervous" ? 0.9 : 0.16} stroke="#FF5A1F" strokeOpacity={active === "nervous" ? 0.6 : 0.3} />
        <path d="M159 62c5 8 3 18-3 23M178 57c-5 9-4 22 3 30M190 66c-6 6-7 14-4 21" fill="none" stroke="#12110E" strokeOpacity={active === "nervous" ? 0.35 : 0.1} />
      </g>

      <g opacity={active === "digestive" ? 1 : 0.22} fill={active === "digestive" ? "#FF5A1F" : "#F4F1E9"} fillOpacity={active === "digestive" ? 0.75 : 0.06} stroke={active === "digestive" ? "#FFBEA5" : "#F4F1E9"} strokeOpacity={active === "digestive" ? 0.5 : 0.25}>
        <path d="M190 270c15-8 30 1 28 16-2 17-16 27-30 22-12-4-16-17-11-27 3-6 7-9 13-11Z" />
        <path d="M197 307c3 12 14 17 22 12" fill="none" strokeWidth="2" />
      </g>

      <circle cx="171" cy="219" r="37" fill="url(#organ-glow)" filter="url(#organ-blur)" opacity={active === "circulation" ? 1 : 0} />
      <circle cx="168" cy="80" r="45" fill="url(#organ-glow)" filter="url(#organ-blur)" opacity={active === "nervous" ? 1 : 0} />
      <circle cx="170" cy="224" r="57" fill="url(#organ-glow)" filter="url(#organ-blur)" opacity={active === "respiratory" ? 0.85 : 0} />
      <circle cx="193" cy="292" r="33" fill="url(#organ-glow)" filter="url(#organ-blur)" opacity={active === "digestive" ? 1 : 0} />

      <g key={active} className="answer-in" fontFamily="var(--font-plex), monospace">
        <path
          d={`M ${active === "nervous" ? 206 : active === "respiratory" ? 216 : active === "circulation" ? 192 : 216} ${calloutY} H 270`}
          stroke="#FF5A1F"
          strokeOpacity="0.45"
          strokeDasharray="2 3"
        />
        <circle
          cx={active === "nervous" ? 206 : active === "respiratory" ? 216 : active === "circulation" ? 192 : 216}
          cy={calloutY}
          r="2.2"
          fill="#FF5A1F"
        />
        <circle
          cx={active === "nervous" ? 168 : active === "respiratory" ? 170 : active === "circulation" ? 171 : 193}
          cy={active === "nervous" ? 80 : active === "respiratory" ? 224 : active === "circulation" ? 219 : 292}
          r={active === "respiratory" ? 50 : 32}
          fill="none"
          stroke="#FF5A1F"
          strokeOpacity="0.3"
          strokeDasharray="2 5"
        />
        <text x="278" y={calloutY - 4} fill="#F4F1E9" fontSize="7.5" opacity="0.45" letterSpacing="0.12em">
          SELECTED
        </text>
        <text x="278" y={calloutY + 7} fill="#FF5A1F" fontSize="8.5" letterSpacing="0.08em">
          {bodySystems.find((system) => system.id === active)?.organ.toUpperCase()}
        </text>
      </g>

      <g fontFamily="var(--font-plex), monospace" fill="#F4F1E9" opacity="0.25">
        <text x="22" y="40" fontSize="7.5" letterSpacing="0.12em">ANTERIOR / 02</text>
        <text x="300" y="540" fontSize="7.5" letterSpacing="0.1em">SCHEMATIC</text>
        <path d="M22 47h20M300 548h20" stroke="#F4F1E9" strokeOpacity="0.2" />
      </g>

      <g stroke="#FF5A1F" strokeOpacity="0.5" strokeWidth="1" filter="url(#organ-glow-filter)">
        <path d="M360 52h10M365 47v10" />
        <path d="M34 450h10M39 445v10" />
      </g>
    </svg>
  );
}
