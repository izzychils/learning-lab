"use client";

import { useMemo, useState } from "react";
import { Beaker, Droplets, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const ACID_VOLUME = 25;
const ACID_MOLARITY = 0.1;
const BASE_MOLARITY = 0.1;
const MAX_VOLUME = 50;

function readChemistry(volume: number) {
  const acidMmol = ACID_VOLUME * ACID_MOLARITY;
  const baseMmol = volume * BASE_MOLARITY;
  const totalMl = ACID_VOLUME + volume;

  if (Math.abs(volume - 25) < 0.002) {
    return {
      ph: 7,
      phase: "equivalence" as const,
      excess: 0,
      copy: "The acid and base have cancelled exactly. The solution is neutral, and the pH is 7.0 at 25 degrees Celsius.",
    };
  }

  if (volume < 25) {
    const hydrogen = (acidMmol - baseMmol) / totalMl;
    const ph = -Math.log10(hydrogen);
    return {
      ph,
      phase: "acid" as const,
      excess: acidMmol - baseMmol,
      copy: "Acid is still in excess. Almost every drop of base is neutralised, so the pH is set by the hydrogen ions that remain.",
    };
  }

  const hydroxide = (baseMmol - acidMmol) / totalMl;
  const ph = 14 + Math.log10(hydroxide);
  return {
    ph,
    phase: "base" as const,
    excess: baseMmol - acidMmol,
    copy: "Base is now in excess. Hydroxide ions dominate, so the pH climbs and then levels off as the solution is diluted.",
  };
}

const curve = Array.from({ length: 101 }, (_, index) => {
  const volume = index * 0.5;
  return { volume, ph: readChemistry(volume).ph };
});

const chart = { width: 560, height: 216, left: 34, right: 14, top: 16, bottom: 30 };
const plotWidth = chart.width - chart.left - chart.right;
const plotHeight = chart.height - chart.top - chart.bottom;
const xForVolume = (volume: number) => chart.left + (volume / MAX_VOLUME) * plotWidth;
const yForPh = (ph: number) => chart.top + ((14 - ph) / 14) * plotHeight;
const curvePath = curve
  .map((point, index) => `${index === 0 ? "M" : "L"} ${xForVolume(point.volume)} ${yForPh(point.ph)}`)
  .join(" ");

const stages = [
  {
    label: "Before equivalence",
    range: "0 to 24.9 mL",
    copy: "Excess HCl sets the pH. Adding base changes it slowly at first.",
  },
  {
    label: "At equivalence",
    range: "25.0 mL",
    copy: "Moles of acid equal moles of base. The solution is neutral.",
  },
  {
    label: "After equivalence",
    range: "25.1 to 50 mL",
    copy: "Excess NaOH sets the pH. The curve flattens as OH- is diluted.",
  },
];

export function TitrationLab() {
  const [volume, setVolume] = useState(24.6);
  const [indicator, setIndicator] = useState(true);

  const reading = readChemistry(volume);
  const pink = indicator && reading.ph > 8.2;
  const markerX = xForVolume(volume);
  const markerY = yForPh(reading.ph);
  const buretteLeft = (MAX_VOLUME - volume) / MAX_VOLUME;
  const flaskFill = 18 + (volume / MAX_VOLUME) * 40;

  const phaseLabel =
    reading.phase === "equivalence"
      ? "Equivalence point"
      : reading.phase === "acid"
        ? "Acid in excess"
        : "Base in excess";

  const statusCopy = useMemo(() => {
    if (reading.ph < 4) return "Strongly acidic";
    if (reading.ph < 6.5) return "Weakly acidic";
    if (reading.ph <= 7.5) return "Neutral range";
    if (reading.ph < 10) return "Weakly basic";
    return "Strongly basic";
  }, [reading.ph]);

  return (
    <div className="overflow-hidden rounded-[26px] border border-line bg-white">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative overflow-hidden bg-[#0b0a08] p-5 text-paper sm:p-6">
          <div className="grid-dark absolute inset-0 opacity-40" />
          <div className="absolute -left-24 top-14 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.15),transparent_68%)]" />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-paper/32">
                Virtual bench / acid base
              </span>
              <h2 className="mt-2 text-[19px] font-extrabold leading-tight tracking-[-0.04em]">
                Strong acid into strong base.
              </h2>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-paper/15 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-paper/40">
              <ShieldCheck className="h-2.5 w-2.5 text-flare" />
              Simulated
            </span>
          </div>

          <div className="relative mt-5 flex items-end justify-center gap-2 sm:gap-8">
            <svg viewBox="0 0 250 340" className="h-auto w-[176px] shrink-0 sm:w-[250px]" role="img" aria-label="A burette above a conical flask containing acid and indicator.">
              <defs>
                <clipPath id="flask-clip">
                  <path d="M110 258 L82 300 Q76 315 94 315 H156 Q174 315 168 300 L140 258 Z" />
                </clipPath>
              </defs>

              <text x="52" y="32" fill="#F4F1E9" fillOpacity="0.38" fontFamily="var(--font-plex), monospace" fontSize="7" letterSpacing="1">
                0.100 M NaOH
              </text>
              <text x="52" y="46" fill="#F4F1E9" fillOpacity="0.2" fontFamily="var(--font-plex), monospace" fontSize="6">
                BURETTE / 50 mL
              </text>

              <rect x="94" y="58" width="44" height="174" rx="6" fill="#F4F1E9" fillOpacity="0.03" stroke="#F4F1E9" strokeOpacity="0.18" />
              <rect x="98" y="62" width="36" height="166" rx="4" fill="#FF5A1F" fillOpacity="0.1" />
              <rect
                x="98"
                y={62 + 166 * (1 - buretteLeft)}
                width="36"
                height={166 * buretteLeft}
                rx="4"
                fill="#FF5A1F"
                fillOpacity="0.34"
              />
              {Array.from({ length: 9 }, (_, index) => (
                <g key={index}>
                  <line x1="122" y1={70 + index * 18} x2={index % 2 === 0 ? 134 : 128} y2={70 + index * 18} stroke="#F4F1E9" strokeOpacity="0.26" strokeWidth="0.8" />
                  {index % 2 === 0 ? (
                    <text x="137" y={73 + index * 18} fill="#F4F1E9" fillOpacity="0.2" fontFamily="var(--font-plex), monospace" fontSize="5.5">
                      {50 - index * 5}
                    </text>
                  ) : null}
                </g>
              ))}

              <path d="M94 232 h44 l-7 10 h-30 z" fill="#F4F1E9" fillOpacity="0.18" stroke="#F4F1E9" strokeOpacity="0.22" />
              <rect x="111" y="242" width="10" height="14" rx="3" fill="#F4F1E9" fillOpacity="0.24" />
              <path d="M116 256v13" stroke="#FF5A1F" strokeWidth="1.2" strokeDasharray="2 4" />
              <circle cx="116" cy="274" r="3" fill="#FF5A1F" className="animate-pulse" />

              <path d="M110 258 L82 300 Q76 315 94 315 H156 Q174 315 168 300 L140 258" fill="#F4F1E9" fillOpacity="0.035" stroke="#F4F1E9" strokeOpacity="0.28" />
              <rect x="106" y="248" width="28" height="12" fill="#F4F1E9" fillOpacity="0.05" stroke="#F4F1E9" strokeOpacity="0.24" />
              <g clipPath="url(#flask-clip)">
                <rect
                  x="70"
                  y={315 - flaskFill}
                  width="110"
                  height={flaskFill}
                  fill={pink ? "#FF7F9F" : "#F4F1E9"}
                  fillOpacity={pink ? 0.58 : 0.1}
                  className="transition-all duration-300"
                />
                <path
                  d={`M72 ${315 - flaskFill} Q110 ${308 - flaskFill} 166 ${315 - flaskFill}`}
                  stroke={pink ? "#FFB3C4" : "#F4F1E9"}
                  strokeOpacity="0.3"
                  fill="none"
                />
              </g>
              <path d="M90 315h70" stroke="#F4F1E9" strokeOpacity="0.18" strokeDasharray="3 5" />

              <text x="40" y="332" fill="#F4F1E9" fillOpacity="0.3" fontFamily="var(--font-plex), monospace" fontSize="6">
                25.0 mL HCl
              </text>
              <text x="166" y="332" fill="#F4F1E9" fillOpacity="0.3" fontFamily="var(--font-plex), monospace" fontSize="6">
                {volume.toFixed(1)} mL added
              </text>
            </svg>

            <div className="mb-8 w-[86px] shrink-0 space-y-4 sm:w-[105px]">
              <div>
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-paper/28">pH</p>
                <p className="mt-1 font-display text-[38px] font-extrabold leading-none tracking-[-0.06em] text-paper">
                  {reading.ph.toFixed(2)}
                </p>
                <p className="mt-1.5 text-[9px] text-paper/35">{statusCopy}</p>
              </div>
              <div className="border-t border-paper/10 pt-3">
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-paper/28">Base added</p>
                <p className="mt-1 font-mono text-[13px] font-semibold text-flare">
                  {volume.toFixed(1)} <span className="text-[8px] text-paper/30">mL</span>
                </p>
              </div>
              <div className="border-t border-paper/10 pt-3">
                <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-paper/28">n(OH-)</p>
                <p className="mt-1 font-mono text-[11px] text-paper/65">
                  {(volume * BASE_MOLARITY).toFixed(2)} mmol
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-1 flex items-start gap-2 border-t border-paper/10 pt-3">
            <Droplets className="mt-0.5 h-3 w-3 shrink-0 text-flare" />
            <p className="text-[9.5px] leading-relaxed text-paper/38">
              {indicator
                ? pink
                  ? "Phenolphthalein has turned pink. The end point is just past equivalence."
                  : "Phenolphthalein stays colourless below pH 8.2. Keep adding base slowly."
                : "Indicator is off. Follow the pH curve instead of the colour."}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/35">
                Live readout
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-display text-[44px] font-extrabold leading-none tracking-[-0.06em] text-ink">
                  {volume.toFixed(1)}
                </p>
                <span className="font-mono text-[11px] text-ink/35">mL NaOH added</span>
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.09em]",
                reading.phase === "equivalence"
                  ? "bg-flare text-ink"
                  : reading.phase === "base"
                    ? "bg-flare-soft text-flare-deep"
                    : "bg-ink text-paper",
              )}
            >
              {phaseLabel}
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-paper-soft p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.09em] text-ink/40">
                <Droplets className="h-3 w-3 text-flare" />
                Burette control
              </span>
              <span className="font-mono text-[8px] text-ink/40">
                {volume.toFixed(1)} / 50.0 mL
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_VOLUME}
              step={0.1}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Volume of sodium hydroxide added in millilitres"
              className="mt-3 h-2.5 w-full cursor-pointer accent-[#ff5a1f]"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setVolume((current) => Math.max(0, Number((current - 0.1).toFixed(1))))}
                  className="rounded-full border border-line bg-white px-2.5 py-1.5 font-mono text-[8px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  - 0.1 mL
                </button>
                <button
                  type="button"
                  onClick={() => setVolume((current) => Math.min(MAX_VOLUME, Number((current + 0.1).toFixed(1))))}
                  className="rounded-full border border-line bg-white px-2.5 py-1.5 font-mono text-[8px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
                >
                  + 0.1 mL
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIndicator((value) => !value)}
                  aria-pressed={indicator}
                  className={cn(
                    "rounded-full border px-2.5 py-1.5 font-mono text-[8px] font-semibold transition-colors",
                    indicator
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-white text-ink/45 hover:text-ink",
                  )}
                >
                  Indicator {indicator ? "on" : "off"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setVolume(24.6);
                    setIndicator(true);
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-ink/35 transition-colors hover:text-ink"
                  aria-label="Reset the titration"
                  title="Reset"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11.5px] font-bold text-ink">pH against volume</h3>
              <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
                Equivalence at 25 mL
              </span>
            </div>
            <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="mt-2 w-full" role="img" aria-label={`pH curve with current pH ${reading.ph.toFixed(2)} at ${volume.toFixed(1)} millilitres.`}>
              <defs>
                <linearGradient id="titration-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 7, 14].map((value) => {
                const y = yForPh(value);
                return (
                  <g key={value}>
                    <line x1={chart.left} y1={y} x2={chart.width - chart.right} y2={y} stroke="#DCD7CB" strokeDasharray="2 5" />
                    <text x={4} y={y + 3} fill="#8A867B" fontFamily="var(--font-plex), monospace" fontSize="7">
                      {value}
                    </text>
                  </g>
                );
              })}
              {[0, 10, 20, 30, 40, 50].map((value) => (
                <text
                  key={value}
                  x={xForVolume(value)}
                  y={chart.height - 8}
                  textAnchor="middle"
                  fill="#8A867B"
                  fontFamily="var(--font-plex), monospace"
                  fontSize="7"
                >
                  {value}
                </text>
              ))}
              <line
                x1={xForVolume(25)}
                y1={chart.top}
                x2={xForVolume(25)}
                y2={chart.height - chart.bottom}
                stroke="#12110E"
                strokeOpacity="0.22"
                strokeDasharray="3 5"
              />
              <path
                d={`${curvePath} L ${xForVolume(MAX_VOLUME)} ${chart.height - chart.bottom} L ${chart.left} ${chart.height - chart.bottom} Z`}
                fill="url(#titration-area)"
              />
              <path d={curvePath} fill="none" stroke="#FF5A1F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={markerX} y1={markerY} x2={markerX} y2={chart.height - chart.bottom} stroke="#12110E" strokeOpacity="0.15" />
              <circle cx={markerX} cy={markerY} r="9" fill="#FF5A1F" fillOpacity="0.14" />
              <circle cx={markerX} cy={markerY} r="3.6" fill="#FF5A1F" stroke="#FFFFFF" strokeWidth="2" />
              <text
                x={Math.min(markerX + 8, chart.width - 60)}
                y={Math.max(markerY - 10, chart.top + 8)}
                fill="#12110E"
                fontFamily="var(--font-plus)"
                fontSize="8.5"
                fontWeight="800"
              >
                pH {reading.ph.toFixed(2)}
              </text>
              <text x={chart.left} y={chart.height - 18} fill="#B4AEA2" fontFamily="var(--font-plex), monospace" fontSize="6">
                VOLUME NaOH / mL
              </text>
              <text x={chart.width - chart.right} y={chart.top + 8} textAnchor="end" fill="#B4AEA2" fontFamily="var(--font-plex), monospace" fontSize="6">
                pH
              </text>
            </svg>
          </div>

          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-line bg-paper-soft p-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-flare-soft text-flare-deep">
              <Beaker className="h-3.5 w-3.5" />
            </span>
            <p className="text-[10px] leading-relaxed text-ink/48">{reading.copy}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 border-t border-line bg-paper-soft sm:grid-cols-3">
        {stages.map((stage, index) => {
          const active =
            (index === 0 && reading.phase === "acid") ||
            (index === 1 && reading.phase === "equivalence") ||
            (index === 2 && reading.phase === "base");
          return (
            <div
              key={stage.label}
              className={cn(
                "border-b border-line p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
                active ? "bg-white" : "",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={cn("text-[10px] font-bold", active ? "text-ink" : "text-ink/45")}>
                  {stage.label}
                </p>
                <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-flare" : "bg-line")} />
              </div>
              <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                {stage.range}
              </p>
              <p className="mt-2 text-[9.5px] leading-relaxed text-ink/40">{stage.copy}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
