import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { mastery, recentResults } from "@/features/dashboard/data";

const scores = [58, 66, 62, 74, 79, 84, 88];
const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "Now"];
const width = 620;
const height = 220;
const paddingX = 18;
const paddingTop = 16;
const paddingBottom = 30;
const points = scores.map((score, index) => {
  const x = paddingX + (index * (width - paddingX * 2)) / (scores.length - 1);
  const y = paddingTop + ((100 - score) / 100) * (height - paddingTop - paddingBottom);
  return [x, y] as const;
});
const linePath = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
const areaPath = `${linePath} L ${points[points.length - 1][0]} ${height - paddingBottom} L ${points[0][0]} ${height - paddingBottom} Z`;

const stats = [
  { label: "Average score", value: "86%", detail: "+4 this month", icon: Target },
  { label: "Topics mastered", value: "8 / 12", detail: "2 almost there", icon: BarChart3 },
  { label: "Study this week", value: "274 min", detail: "Across 5 sessions", icon: Clock3 },
  { label: "Best streak", value: "11 days", detail: "Current: 7 days", icon: Flame },
];

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Progress / Term 2"
        title="See what is sticking."
        description="Scores, study time and mastery, kept together so the next revision session starts with better information."
        action={
          <Link
            href="/dashboard/simulations"
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[11px] font-semibold text-ink/55 transition-colors hover:border-ink/25 hover:text-ink"
          >
            Practise something new
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold leading-tight text-ink/45">{stat.label}</p>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-paper text-ink/45">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-3 font-display text-[25px] font-extrabold leading-none tracking-[-0.05em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[9px] text-ink/35">
                <TrendingUp className="h-2.5 w-2.5 text-flare" />
                {stat.detail}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-7">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[13px] font-bold text-ink">Score trend</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Seven assessment checkpoints</p>
            </div>
            <span className="rounded-full bg-flare-soft px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-flare-deep">
              +30 points
            </span>
          </div>

          <div className="mt-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Score trend from 58 to 88 percent.">
              <defs>
                <linearGradient id="score-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[25, 50, 75, 100].map((value) => {
                const y = paddingTop + ((100 - value) / 100) * (height - paddingTop - paddingBottom);
                return (
                  <g key={value}>
                    <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#DCD7CB" strokeDasharray="2 5" />
                    <text x={0} y={y + 3} fill="#8A867B" fontFamily="var(--font-plex), monospace" fontSize="7">
                      {value}
                    </text>
                  </g>
                );
              })}
              <path d={areaPath} fill="url(#score-area)" />
              <path d={linePath} fill="none" stroke="#FF5A1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {points.map(([x, y], index) => (
                <g key={labels[index]}>
                  <circle cx={x} cy={y} r="3.2" fill="#FFFFFF" stroke="#FF5A1F" strokeWidth="2" />
                  {index === points.length - 1 ? (
                    <>
                      <circle cx={x} cy={y} r="8" fill="#FF5A1F" opacity="0.12" />
                      <text x={x - 9} y={y - 13} fill="#12110E" fontFamily="var(--font-plus)" fontSize="9" fontWeight="800">
                        {scores[index]}%
                      </text>
                    </>
                  ) : null}
                  <text
                    x={x}
                    y={height - 8}
                    textAnchor="middle"
                    fill="#8A867B"
                    fontFamily="var(--font-plex), monospace"
                    fontSize="7"
                  >
                    {labels[index]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[13px] font-bold text-ink">Mastery by topic</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Based on simulations and quizzes</p>
            </div>
            <Sparkles className="h-4 w-4 text-ink/25" />
          </div>
          <div className="mt-5 space-y-3.5">
            {mastery.map((topic) => (
              <div key={topic.label}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] text-ink/55">{topic.label}</span>
                  <span className="font-mono text-[8px] font-medium text-ink/40">{topic.value}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line/70">
                  <div
                    className={topic.value >= 70 ? "h-full rounded-full bg-ink" : "h-full rounded-full bg-flare"}
                    style={{ width: `${topic.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-line pt-3 text-[9.5px] text-ink/35">
            Lowest mastery: Waves. The tutor recommends a 20 minute foundations session.
          </p>
        </section>
      </div>

      <div className="grid gap-3 lg:grid-cols-12">
        <section className="rounded-2xl border border-line bg-white p-5 lg:col-span-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[13px] font-bold text-ink">Recent results</h2>
              <p className="mt-1 text-[9.5px] text-ink/38">Your latest work, newest first</p>
            </div>
            <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/25">
              Demo data
            </span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[460px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Session", "Type", "When", "Score"].map((heading) => (
                    <th key={heading} className="pb-2 pr-4 text-[8px] font-medium uppercase tracking-[0.09em] text-ink/30 last:pr-0 last:text-right">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result) => (
                  <tr key={result.title} className="border-b border-line/70 last:border-b-0">
                    <td className="py-3 pr-4 text-[10.5px] font-semibold text-ink/70">{result.title}</td>
                    <td className="py-3 pr-4 text-[10px] text-ink/40">{result.type}</td>
                    <td className="py-3 pr-4 font-mono text-[8px] uppercase tracking-[0.06em] text-ink/30">{result.date}</td>
                    <td className="py-3 text-right">
                      <span className="inline-flex rounded-full bg-paper px-2 py-1 font-mono text-[8px] font-medium text-ink/65">
                        {result.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-ink p-5 text-paper lg:col-span-4">
          <div className="grid-dark absolute inset-0 opacity-50" />
          <div className="relative">
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-flare">This week</span>
            <h2 className="mt-3 text-[20px] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Close the wave gap.
            </h2>
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-paper/40">
              A short guided path, built from the topics with the lowest mastery right now.
            </p>
            <div className="mt-5 space-y-2.5">
              {[
                ["01", "Wave basics", "12 min"],
                ["02", "Frequency practice", "8 min"],
                ["03", "Checkpoint quiz", "6 min"],
              ].map(([number, title, time]) => (
                <div key={number} className="flex items-center gap-2.5 border-t border-paper/10 pt-2.5">
                  <span className="font-mono text-[7px] text-flare">{number}</span>
                  <span className="flex-1 text-[10px] text-paper/65">{title}</span>
                  <span className="font-mono text-[7px] text-paper/25">{time}</span>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/simulations"
              className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-bold text-flare"
            >
              Start the path
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
