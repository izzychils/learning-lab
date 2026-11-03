import { Atom, Dna, FlaskConical, HeartPulse, Sparkles, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  ["40+", "guided experiments"],
  ["4", "core sciences"],
  ["2D", "made for clarity"],
];

export function Platform() {
  return (
    <section id="platform" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-10 border-b border-ink/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <span className="eyebrow text-ink/55">The platform</span>
            <h2 className="display mt-5 max-w-[760px] text-[clamp(2.5rem,4.8vw,4.3rem)] text-ink">
              One lab. Every scale of the{" "}
              <span className="serif text-flare">visible</span> world.
            </h2>
            <p className="mt-5 max-w-[580px] text-[14px] leading-relaxed text-ink/58 sm:text-[15px]">
              Move from a single atom to a whole organism without changing tabs, losing your
              place or pretending a static diagram is enough.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-paper-soft">
              {stats.map(([value, label]) => (
                <div key={label} className="px-4 py-4 sm:px-5">
                  <p className="font-display text-[28px] font-semibold leading-none tracking-[-0.05em] text-ink">
                    {value}
                  </p>
                  <p className="mt-1.5 text-[9.5px] leading-tight text-ink/45">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <article className="relative flex h-full min-h-[470px] flex-col overflow-hidden rounded-[26px] border border-ink bg-ink p-5 text-paper sm:min-h-[520px] sm:p-7">
              <div className="grid-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
              <div className="relative flex items-center justify-between">
                <span className="mono-label text-paper/38">01 / Chemistry</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 text-flare">
                  <Atom className="h-4 w-4" />
                </span>
              </div>

              <div className="relative mt-10 max-w-[360px]">
                <h3 className="display text-[clamp(2rem,3.5vw,3rem)] text-paper">
                  Build molecules you can turn around.
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-paper/52">
                  Atoms, bonds and geometry in clear 2D. Change the structure, watch the
                  properties move, then ask why.
                </p>
              </div>

              <div className="relative mt-auto flex-1 pt-8">
                <ChemistryGlyph />
                <div className="absolute bottom-0 left-0 flex flex-wrap gap-1.5">
                  {["Bond angles", "Polarity", "Molecular shape"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-paper/12 bg-paper/[0.04] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/48"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-5">
            <article className="relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[26px] bg-flare p-5 text-ink sm:p-6">
              <div className="dot-grid-dark absolute inset-0 opacity-35" />
              <div className="relative flex items-center justify-between">
                <span className="mono-label text-ink/45">02 / Virtual lab</span>
                <FlaskConical className="h-4 w-4 text-ink/60" />
              </div>
              <div className="relative mt-7 flex items-end justify-between gap-4">
                <div className="max-w-[240px]">
                  <h3 className="font-display text-[25px] font-semibold leading-[1.05] tracking-[-0.045em]">
                    Run it before you risk it.
                  </h3>
                  <p className="mt-2.5 text-[11.5px] leading-relaxed text-ink/65">
                    Guided practicals with real apparatus, hazards and observations attached.
                  </p>
                </div>
                <FlaskGlyph />
              </div>
            </article>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <article className="relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[26px] border border-line bg-paper-soft p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink/40">03 / AI tutor</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-paper text-flare">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-4">
                <div>
                  <h3 className="font-display text-[25px] font-semibold leading-[1.05] tracking-[-0.045em]">
                    Ask why, not just what.
                  </h3>
                  <p className="mt-2.5 max-w-[235px] text-[11.5px] leading-relaxed text-ink/52">
                    A tutor that reads the same model you are looking at.
                  </p>
                </div>
                <div className="hidden w-[142px] space-y-1.5 sm:block">
                  <div className="ml-auto w-fit max-w-full rounded-[10px] rounded-br-[3px] bg-ink px-2.5 py-2 text-[9px] leading-snug text-paper/85">
                    Why is water bent?
                  </div>
                  <div className="w-fit max-w-full rounded-[10px] rounded-bl-[3px] border border-ink/10 bg-paper px-2.5 py-2 text-[9px] leading-snug text-ink/70">
                    Lone pairs repel more.
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-1.5 border-t border-ink/10 pt-3">
                <span className="h-1.5 w-1.5 rounded-full bg-flare" />
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/38">
                  Grounded in your course
                </span>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-4">
            <article className="relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-line bg-paper-soft p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink/40">04 / Biology</span>
                <Dna className="h-4 w-4 text-ink/35" />
              </div>
              <div className="mt-6">
                <CellGlyph />
              </div>
              <h3 className="mt-5 font-display text-[21px] font-semibold leading-[1.05] tracking-[-0.04em]">
                Cells, alive on screen.
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink/50">
                Organelles, membranes and processes, with every label one click from an
                explanation.
              </p>
            </article>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-4">
            <article className="relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-line bg-paper p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink/40">05 / Anatomy</span>
                <HeartPulse className="h-4 w-4 text-ink/35" />
              </div>
              <div className="mt-6">
                <BodyGlyph />
              </div>
              <h3 className="mt-5 font-display text-[21px] font-semibold leading-[1.05] tracking-[-0.04em]">
                The body, layer by layer.
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink/50">
                Explore systems and structures without flattening them into a single poster.
              </p>
            </article>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <article className="relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-line bg-paper-soft p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink/40">06 / Physics</span>
                <Waves className="h-4 w-4 text-ink/35" />
              </div>
              <div className="mt-6">
                <WaveGlyph />
              </div>
              <h3 className="mt-5 font-display text-[21px] font-semibold leading-[1.05] tracking-[-0.04em]">
                Change a variable. Watch it answer.
              </h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-ink/50">
                Motion, force, waves and circuits that respond while you adjust them.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChemistryGlyph() {
  return (
    <div className="relative h-[230px] w-full sm:h-[260px]">
      <svg
        viewBox="0 0 520 300"
        role="img"
        aria-label="A ball and stick model of ethanol with labelled atoms."
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="carbon-fill" cx="35%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#F7F3EA" />
            <stop offset="100%" stopColor="#BDB7AA" />
          </radialGradient>
          <radialGradient id="oxygen-fill" cx="35%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#FF8A5C" />
            <stop offset="100%" stopColor="#FF5A1F" />
          </radialGradient>
          <radialGradient id="hydrogen-fill" cx="35%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#3B3730" />
            <stop offset="100%" stopColor="#26231D" />
          </radialGradient>
        </defs>

        <circle cx="290" cy="145" r="118" fill="none" stroke="#F4F1E9" strokeOpacity="0.06" strokeDasharray="2 7" />
        <circle cx="290" cy="145" r="158" fill="none" stroke="#F4F1E9" strokeOpacity="0.045" strokeDasharray="2 9" />

        <g stroke="#F4F1E9" strokeOpacity="0.3" strokeWidth="1.4">
          <path d="M230 118 L 292 152" />
          <path d="M292 152 L 352 116" />
          <path d="M292 152 L 355 194" />
          <path d="M292 152 L 230 194" />
          <path d="M230 118 L 174 97" strokeOpacity="0.16" />
          <path d="M292 152 L 294 96" strokeOpacity="0.14" />
          <path d="M355 194 L 404 232" strokeOpacity="0.18" />
          <path d="M230 194 L 178 230" strokeOpacity="0.18" />
          <path d="M352 116 L 400 89" strokeOpacity="0.15" />
        </g>

        <g>
          <circle cx="292" cy="152" r="25" fill="url(#carbon-fill)" />
          <text x="292" y="157" textAnchor="middle" fill="#12110E" fontSize="11" fontFamily="var(--font-plex), monospace">C</text>
        </g>
        <g>
          <circle cx="230" cy="118" r="21" fill="url(#carbon-fill)" />
          <text x="230" y="123" textAnchor="middle" fill="#12110E" fontSize="10" fontFamily="var(--font-plex), monospace">C</text>
        </g>
        <g>
          <circle cx="353" cy="194" r="23" fill="url(#oxygen-fill)" />
          <text x="353" y="199" textAnchor="middle" fill="#12110E" fontSize="11" fontFamily="var(--font-plex), monospace">O</text>
        </g>
        <g>
          <circle cx="354" cy="116" r="19" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.25" />
          <text x="354" y="120" textAnchor="middle" fill="#F4F1E9" fontSize="9" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="230" cy="194" r="19" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.25" />
          <text x="230" y="198" textAnchor="middle" fill="#F4F1E9" fontSize="9" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="174" cy="97" r="13" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.22" />
          <text x="174" y="101" textAnchor="middle" fill="#F4F1E9" fontSize="7.5" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="294" cy="96" r="13" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.22" />
          <text x="294" y="100" textAnchor="middle" fill="#F4F1E9" fontSize="7.5" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="404" cy="232" r="13" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.22" />
          <text x="404" y="236" textAnchor="middle" fill="#F4F1E9" fontSize="7.5" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="178" cy="230" r="13" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.22" />
          <text x="178" y="234" textAnchor="middle" fill="#F4F1E9" fontSize="7.5" fontFamily="var(--font-plex), monospace">H</text>
        </g>
        <g>
          <circle cx="400" cy="89" r="13" fill="url(#hydrogen-fill)" stroke="#F4F1E9" strokeOpacity="0.22" />
          <text x="400" y="93" textAnchor="middle" fill="#F4F1E9" fontSize="7.5" fontFamily="var(--font-plex), monospace">H</text>
        </g>

        <g fontFamily="var(--font-plex), monospace" fill="#F4F1E9" letterSpacing="0.1em">
          <text x="22" y="38" fontSize="8" opacity="0.28">C₂H₅OH / ETHANOL</text>
          <text x="426" y="270" fontSize="8" opacity="0.2">BALL + STICK</text>
        </g>
      </svg>
    </div>
  );
}

function FlaskGlyph() {
  return (
    <div className="relative h-[130px] w-[126px] shrink-0">
      <svg viewBox="0 0 160 180" fill="none" aria-hidden="true" className="h-full w-full">
        <path d="M64 26h32v35l28 64c8 18-5 37-24 37H60c-19 0-32-19-24-37l28-64V26Z" stroke="#12110E" strokeWidth="2" />
        <path d="M57 26h46" stroke="#12110E" strokeWidth="3" strokeLinecap="round" />
        <path d="M79 63 58 111c-3 8 2 16 10 16h24c8 0 13-8 10-16L81 63" fill="#12110E" fillOpacity="0.12" />
        <path d="M47 132h66" stroke="#12110E" strokeWidth="1.3" strokeOpacity="0.5" />
        <circle cx="70" cy="145" r="3.2" stroke="#12110E" strokeWidth="1.2" />
        <circle cx="90" cy="152" r="2.6" stroke="#12110E" strokeWidth="1.2" />
        <circle cx="84" cy="135" r="2" stroke="#12110E" strokeWidth="1.2" />
        <path d="M36 82h-16M34 94h-10M126 70h16M124 82h10" stroke="#12110E" strokeOpacity="0.35" strokeWidth="1" />
      </svg>
      <span className="bubble absolute left-[49%] top-[46%] h-1.5 w-1.5 rounded-full bg-ink/40" />
      <span className="bubble absolute left-[58%] top-[55%] h-1 w-1 rounded-full bg-ink/30 [animation-delay:1.2s]" />
      <span className="bubble absolute left-[44%] top-[63%] h-1 w-1 rounded-full bg-ink/30 [animation-delay:2.1s]" />
    </div>
  );
}

function CellGlyph() {
  return (
    <svg viewBox="0 0 240 110" role="img" aria-label="A simplified animal cell diagram." className="h-[110px] w-full">
      <defs>
        <radialGradient id="cell-fill" cx="40%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#FFF8F2" />
          <stop offset="100%" stopColor="#F0E9DC" />
        </radialGradient>
      </defs>
      <circle cx="118" cy="56" r="54" fill="url(#cell-fill)" stroke="#12110E" strokeOpacity="0.18" />
      <circle cx="118" cy="56" r="54" fill="none" stroke="#FF5A1F" strokeOpacity="0.32" strokeWidth="2" />
      <circle cx="104" cy="48" r="16" fill="#FF5A1F" fillOpacity="0.9" />
      <circle cx="100" cy="43" r="4" fill="#12110E" fillOpacity="0.24" />
      <path d="M140 26c11 4 18 15 16 27" stroke="#12110E" strokeOpacity="0.22" strokeWidth="1.2" fill="none" strokeDasharray="2 4" />
      <path d="M74 78c7-8 15-3 20 2s11 3 15-4" stroke="#12110E" strokeOpacity="0.35" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="148" cy="72" rx="14" ry="6" transform="rotate(-24 148 72)" stroke="#12110E" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <ellipse cx="82" cy="38" rx="10" ry="4" transform="rotate(28 82 38)" stroke="#12110E" strokeOpacity="0.25" strokeWidth="1.3" fill="none" />
      <circle cx="137" cy="42" r="2.2" fill="#FF5A1F" />
      <circle cx="95" cy="75" r="1.8" fill="#12110E" fillOpacity="0.25" />
      <circle cx="154" cy="53" r="1.6" fill="#12110E" fillOpacity="0.22" />
      <g fontFamily="var(--font-plex), monospace" fill="#12110E" opacity="0.32">
        <text x="190" y="24" fontSize="7">NUCLEUS</text>
        <text x="188" y="96" fontSize="7">MEMBRANE</text>
        <path d="M186 28h-48M186 92h-38" stroke="#12110E" strokeOpacity="0.2" />
      </g>
      <g stroke="#12110E" strokeOpacity="0.18">
        <path d="M14 13h7M17.5 9.5v7" />
        <path d="M219 96h7M222.5 92.5v7" />
      </g>
    </svg>
  );
}

function BodyGlyph() {
  return (
    <div className="relative flex h-[110px] items-center justify-center">
      <svg viewBox="0 0 150 150" role="img" aria-label="A schematic human body with highlighted organs." className="h-full">
        <circle cx="75" cy="25" r="16" stroke="#12110E" strokeOpacity="0.2" fill="none" />
        <path
          d="M63 41c-13 4-21 14-23 27l-4 31M87 41c13 4 21 14 23 27l4 31M58 48 48 91M92 48l10 43M62 48l-5 62M88 48l5 62M67 110l-2 31M83 110l2 31"
          stroke="#12110E"
          strokeOpacity="0.18"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M63 42h24l10 20-6 48H59l-6-48 10-20Z" stroke="#12110E" strokeOpacity="0.22" fill="none" />
        <ellipse cx="75" cy="72" rx="7" ry="9" fill="#FF5A1F" />
        <path d="M63 69c-5 2-7 7-5 12" stroke="#FF5A1F" strokeOpacity="0.55" strokeWidth="2" fill="none" />
        <path d="M87 69c5 2 7 7 5 12" stroke="#FF5A1F" strokeOpacity="0.55" strokeWidth="2" fill="none" />
        <circle cx="75" cy="73" r="17" stroke="#FF5A1F" strokeOpacity="0.22" fill="none" strokeDasharray="2 4" />
        <circle cx="75" cy="73" r="24" stroke="#FF5A1F" strokeOpacity="0.12" fill="none" strokeDasharray="2 5" />
        <path d="M60 99h30" stroke="#12110E" strokeOpacity="0.25" />
        <g fontFamily="var(--font-plex), monospace" fill="#12110E" opacity="0.35">
          <text x="98" y="72" fontSize="7">HEART</text>
          <path d="M96 69h-8" stroke="#12110E" strokeOpacity="0.25" />
        </g>
      </svg>
      <span className="absolute bottom-1 right-0 font-mono text-[7px] uppercase tracking-[0.1em] text-ink/30">
        2D / SYSTEMS
      </span>
    </div>
  );
}

function WaveGlyph() {
  return (
    <svg viewBox="0 0 240 110" role="img" aria-label="A sine wave diagram with amplitude markers." className="h-[110px] w-full">
      <g stroke="#12110E" strokeOpacity="0.12">
        <path d="M12 55h216M12 18v74" />
      </g>
      <g stroke="#12110E" strokeOpacity="0.1" strokeDasharray="2 4">
        <path d="M12 27h216M12 83h216" />
      </g>
      <path
        d="M12 55c14 0 14-28 28-28s14 56 28 56 14-56 28-56 14 56 28 56 14-56 28-56 14 28 28 28"
        stroke="#FF5A1F"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 55c14 0 14-18 28-18s14 36 28 36 14-36 28-36 14 36 28 36 14-36 28-36 14 18 28 18"
        stroke="#12110E"
        strokeOpacity="0.16"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="3 4"
      />
      <circle cx="40" cy="27" r="3" fill="#FF5A1F" />
      <circle cx="124" cy="83" r="3" fill="#FF5A1F" />
      <g fontFamily="var(--font-plex), monospace" fill="#12110E" opacity="0.34">
        <text x="186" y="24" fontSize="7">+A</text>
        <text x="186" y="98" fontSize="7">-A</text>
        <text x="200" y="58" fontSize="7">t</text>
      </g>
      <g stroke="#FF5A1F" strokeOpacity="0.5" strokeWidth="1">
        <path d="M205 34h10M210 29v10" />
      </g>
    </svg>
  );
}
