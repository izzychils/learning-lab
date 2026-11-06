import { Atom, Dna, FlaskConical, ScanLine, Sparkles } from "lucide-react";

const orbitPath = (rx: number, ry: number) =>
  `M 260 ${215 - ry} a ${rx} ${ry} 0 1 0 0 ${ry * 2} a ${rx} ${ry} 0 1 0 0 ${-ry * 2}`;

const innerPath = orbitPath(98, 35);
const middlePath = orbitPath(154, 55);
const outerPath = orbitPath(204, 74);

const middleElectrons = Array.from({ length: 8 }, (_, index) => index);
const innerElectrons = [0, 1];

export function AtomConsole() {
  return (
    <div className="relative mx-auto w-full max-w-[570px] lg:mr-0">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="mono-label text-paper/35">Fig. 01 / Atomic structure</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35">
          <span className="h-1.5 w-1.5 rounded-full bg-flare" />
          Live model
        </span>
      </div>

      <div className="overflow-hidden rounded-[26px] border border-paper/15 bg-[#15130f] shadow-[0_35px_90px_-28px_rgba(0,0,0,0.85)]">
        <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="ml-2 hidden font-mono text-[9px] tracking-[0.08em] text-paper/30 sm:block">
            learning-lab / structure / sodium
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-flare/30 bg-flare/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-flare">
            <span className="h-1.5 w-1.5 rounded-full bg-flare" />
            2D
          </span>
        </div>

        <div className="flex">
          <div className="hidden w-11 shrink-0 flex-col items-center gap-1 border-r border-white/10 py-3 sm:flex">
            {[Atom, FlaskConical, Dna, ScanLine].map((Icon, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? "flex h-8 w-8 items-center justify-center rounded-lg bg-flare text-ink"
                    : "flex h-8 w-8 items-center justify-center rounded-lg text-paper/28"
                }
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper/65">
                  Bohr model
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.12em] text-paper/30">
                <span>Na</span>
                <span>Z = 11</span>
              </div>
            </div>

            <div className="relative overflow-hidden bg-[#171510]">
              <div className="dot-grid absolute inset-0 opacity-55" />
              <div className="absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_50%,rgba(255,90,31,0.13),transparent_72%)]" />

              <div className="relative px-2 pb-1 pt-2 sm:px-3">
                <AtomGraphic />
              </div>

              <div className="pointer-events-none absolute left-4 top-4 hidden rounded-md border border-white/10 bg-ink/55 px-2 py-1.5 backdrop-blur-sm sm:block">
                <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-paper/30">
                  Nucleus
                </p>
                <p className="mt-0.5 font-mono text-[9px] text-paper/65">11 p / 12 n</p>
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 hidden rounded-md border border-flare/25 bg-ink/60 px-2 py-1.5 backdrop-blur-sm sm:block">
                <p className="font-mono text-[7.5px] uppercase tracking-[0.15em] text-flare/70">
                  Valence shell
                </p>
                <p className="mt-0.5 font-mono text-[9px] text-paper/65">1 electron</p>
              </div>
            </div>

            <div className="grid grid-cols-4 border-y border-white/10">
              {[
                ["Protons", "11"],
                ["Neutrons", "12"],
                ["Shells", "2 · 8 · 1"],
                ["Charge", "0"],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-white/10 px-3 py-2.5 last:border-r-0">
                  <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-paper/28">
                    {label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] font-medium text-paper/75">{value}</p>
                </div>
              ))}
            </div>

            <a
              href="/tutor"
              className="group flex items-center gap-2.5 bg-flare px-4 py-3 text-ink transition-colors hover:bg-[#ff6c39]"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <p className="min-w-0 flex-1 truncate text-[10.5px] font-medium">
                <span className="mr-1.5 font-mono text-[8px] uppercase tracking-[0.13em] opacity-55">
                  AI note
                </span>
                Sodium gives up its outer electron easily.
              </p>
              <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] opacity-55 transition-opacity group-hover:opacity-100 sm:block">
                Ask why
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtomGraphic() {
  return (
    <svg
      viewBox="0 0 520 430"
      role="img"
      aria-label="A 2D Bohr model of a sodium atom with eleven protons, twelve neutrons and one valence electron."
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="nucleus-fill" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFB18D" />
          <stop offset="48%" stopColor="#FF6A33" />
          <stop offset="100%" stopColor="#F0470D" />
        </radialGradient>
        <radialGradient id="nucleus-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </radialGradient>
        <filter id="electron-glow" x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nucleus-blur" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <circle cx="260" cy="215" r="120" fill="url(#nucleus-aura)" />
      <circle cx="260" cy="215" r="72" fill="#FF5A1F" opacity="0.12" filter="url(#nucleus-blur)" />

      <g className="atom-pulse" style={{ transformOrigin: "260px 215px" }}>
        <circle cx="260" cy="215" r="53" fill="none" stroke="#FF5A1F" strokeOpacity="0.28" />
      </g>
      <g className="atom-pulse" style={{ transformOrigin: "260px 215px", animationDelay: "1.4s" }}>
        <circle cx="260" cy="215" r="53" fill="none" stroke="#FF5A1F" strokeOpacity="0.18" />
      </g>

      <g transform="rotate(-18 260 215)">
        <path id="atom-inner-orbit" d={innerPath} fill="none" stroke="#F4F1E9" strokeOpacity="0.2" strokeWidth="0.9" strokeDasharray="2 5" />
        <g className="atom-motion">
          {innerElectrons.map((index) => (
            <circle key={index} r="2.6" fill="#F4F1E9" opacity="0.82">
              <animateMotion
                dur="8.5s"
                begin={`${-index * 4.25}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#atom-inner-orbit" />
              </animateMotion>
            </circle>
          ))}
        </g>
      </g>

      <g transform="rotate(54 260 215)">
        <path id="atom-middle-orbit" d={middlePath} fill="none" stroke="#F4F1E9" strokeOpacity="0.16" strokeWidth="0.9" strokeDasharray="2 6" />
        <g className="atom-motion">
          {middleElectrons.map((index) => (
            <circle key={index} r="2.5" fill="#F4F1E9" opacity="0.72">
              <animateMotion
                dur="15s"
                begin={`${-index * 1.875}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#atom-middle-orbit" />
              </animateMotion>
            </circle>
          ))}
        </g>
      </g>

      <g transform="rotate(-58 260 215)">
        <path id="atom-outer-orbit" d={outerPath} fill="none" stroke="#FF5A1F" strokeOpacity="0.3" strokeWidth="0.9" strokeDasharray="2 7" />
        <g className="atom-motion">
          <circle r="8" fill="#FF5A1F" opacity="0.16" filter="url(#electron-glow)">
            <animateMotion dur="19s" repeatCount="indefinite" rotate="auto">
              <mpath href="#atom-outer-orbit" />
            </animateMotion>
          </circle>
          <circle r="4.8" fill="#FF5A1F" stroke="#FFD7C8" strokeWidth="1.4" filter="url(#electron-glow)">
            <animateMotion dur="19s" repeatCount="indefinite" rotate="auto">
              <mpath href="#atom-outer-orbit" />
            </animateMotion>
          </circle>
        </g>
      </g>

      <circle cx="260" cy="215" r="39" fill="url(#nucleus-fill)" />
      <circle cx="260" cy="215" r="39" fill="none" stroke="#FFD7C8" strokeOpacity="0.45" strokeWidth="0.8" />
      <circle cx="246" cy="202" r="3" fill="#7A2208" opacity="0.24" />
      <circle cx="274" cy="207" r="2.4" fill="#7A2208" opacity="0.2" />
      <circle cx="254" cy="229" r="2.7" fill="#7A2208" opacity="0.2" />
      <circle cx="271" cy="228" r="3.2" fill="#FFE1D5" opacity="0.32" />
      <text
        x="260"
        y="221"
        textAnchor="middle"
        fill="#12110E"
        fontSize="19"
        fontWeight="600"
        fontFamily="var(--font-plex), monospace"
        letterSpacing="-0.04em"
      >
        Na
      </text>

      <g fontFamily="var(--font-plex), monospace" fill="#F4F1E9">
        <text x="60" y="340" fontSize="8" opacity="0.26" letterSpacing="0.12em">
          ENERGY LEVEL K
        </text>
        <text x="384" y="94" fontSize="8" opacity="0.26" letterSpacing="0.12em">
          VALENCE
        </text>
        <text x="74" y="82" fontSize="8" opacity="0.2" letterSpacing="0.12em">
          + 11p
        </text>
      </g>

      <g stroke="#F4F1E9" strokeOpacity="0.16">
        <path d="M 44 44 h 10 M 49 39 v 10" />
        <path d="M 466 386 h 10 M 471 381 v 10" />
        <path d="M 466 44 h 10 M 471 39 v 10" />
      </g>
    </svg>
  );
}
