"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { PageHeading } from "@/features/dashboard/page-heading";
import { useDashboardSession } from "@/features/dashboard/session-context";
import {
  quizQuestions,
  quizSubjects,
  type QuizQuestion,
  type QuizSubject,
} from "@/features/dashboard/quiz-data";
import { cn } from "@/lib/utils";

type SubjectChoice = "Mixed" | QuizSubject;
type Phase = "intro" | "running" | "result";
type BestScores = Record<string, number>;

const choices: SubjectChoice[] = ["Mixed", ...quizSubjects];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

export function PracticeQuiz() {
  const { user } = useDashboardSession();
  const [choice, setChoice] = useState<SubjectChoice>("Mixed");
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [bests, setBests] = useState<BestScores>({});
  const [ready, setReady] = useState(false);
  const storageKey = `learning-lab.quiz.${user.email}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        const cleaned: BestScores = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (typeof value === "number" && Number.isFinite(value)) cleaned[key] = value;
        }
        setBests(cleaned);
      }
    } catch {
      // A malformed record should not block the quiz.
    }
    setReady(true);
  }, [storageKey]);

  const pool = useMemo(
    () =>
      choice === "Mixed"
        ? quizQuestions
        : quizQuestions.filter((question) => question.subject === choice),
    [choice],
  );

  const start = () => {
    const nextQuestions = shuffle(pool).slice(0, 5);
    setQuestions(nextQuestions);
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setAnswers([]);
    setPhase("running");
  };

  const current = questions[index];
  const score = answers.reduce(
    (total, answer, position) => total + (answer === questions[position]?.answer ? 1 : 0),
    0,
  );
  const answeredCount = answers.length;
  const liveScore =
    score + (checked && selected !== null && selected === current?.answer ? 1 : 0);

  const check = () => {
    if (selected === null) return;
    setChecked(true);
  };

  const next = () => {
    if (!current || selected === null) return;
    const nextAnswers = [...answers];
    nextAnswers[index] = selected;

    if (index === questions.length - 1) {
      const finalScore = nextAnswers.reduce(
        (total, answer, position) =>
          total + (answer === questions[position]?.answer ? 1 : 0),
        0,
      );
      const percent = Math.round((finalScore / questions.length) * 100);
      const nextBests = { ...bests, [choice]: Math.max(bests[choice] ?? 0, percent) };
      setAnswers(nextAnswers);
      setBests(nextBests);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(nextBests));
      } catch {
        // Keep the result on screen even when local storage is unavailable.
      }
      setPhase("result");
      return;
    }

    setAnswers(nextAnswers);
    setIndex((currentIndex) => currentIndex + 1);
    setSelected(null);
    setChecked(false);
  };

  const restart = () => {
    start();
  };

  const changeTopic = () => {
    setPhase("intro");
    setQuestions([]);
    setAnswers([]);
    setSelected(null);
    setChecked(false);
  };

  const currentBest = bests[choice] ?? 0;
  const finalScore = answers.reduce(
    (total, answer, position) => total + (answer === questions[position]?.answer ? 1 : 0),
    0,
  );
  const finalPercent = questions.length
    ? Math.round((finalScore / questions.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Practice / adaptive set"
        title="One honest check at a time."
        description="Five questions, immediate feedback and a source for every answer. Your best score is kept on this browser."
        action={
          <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/40">
            <Target className="h-3 w-3 text-flare" />
            {ready ? `${Object.keys(bests).length} topics attempted` : "Loading scores"}
          </span>
        }
      />

      {phase === "intro" ? (
        <div className="grid gap-3 lg:grid-cols-12">
          <section className="rounded-[24px] border border-line bg-white p-5 sm:p-6 lg:col-span-7">
            <span className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/35">
              Build a set
            </span>
            <h2 className="mt-3 max-w-[430px] text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold leading-[1.06] tracking-[-0.045em] text-ink">
              Pick a subject or mix all four.
            </h2>
            <p className="mt-2.5 max-w-[470px] text-[11px] leading-relaxed text-ink/45">
              Each set pulls five questions from the bank. The explanation appears after you
              commit to an answer, not before.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {choices.map((item) => {
                const active = choice === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setChoice(item)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-colors",
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper-soft text-ink/50 hover:border-ink/25 hover:text-ink",
                    )}
                  >
                    <span className="text-[10.5px] font-bold">{item}</span>
                    <span
                      className={cn(
                        "mt-1 block font-mono text-[7px] uppercase tracking-[0.07em]",
                        active ? "text-paper/30" : "text-ink/25",
                      )}
                    >
                      {item === "Mixed"
                        ? `${quizQuestions.length} questions`
                        : `${quizQuestions.filter((question) => question.subject === item).length} questions`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-[9.5px] text-ink/38">
                <Brain className="h-3.5 w-3.5 text-flare" />
                Best for {choice}: <span className="font-semibold text-ink/60">{currentBest}%</span>
              </div>
              <button
                type="button"
                onClick={start}
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-flare px-4 text-[10.5px] font-bold text-ink transition-colors hover:bg-[#ff6d39]"
              >
                Start five questions
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[24px] bg-[#0b0a08] p-5 text-paper sm:p-6 lg:col-span-5">
            <div className="dot-grid absolute inset-0 opacity-25" />
            <div className="absolute right-[-70px] top-[-80px] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_68%)]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-flare">
                  <Trophy className="h-3 w-3" />
                  Your best
                </span>
                <Link href="/dashboard/progress" className="text-paper/25 hover:text-paper">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {quizSubjects.map((subject) => {
                  const best = bests[subject] ?? 0;
                  return (
                    <div key={subject}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] text-paper/50">{subject}</span>
                        <span className="font-mono text-[8px] text-paper/30">
                          {best ? `${best}%` : "Not tried"}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-paper/10">
                        <div
                          className={cn("h-full rounded-full", best ? "bg-flare" : "bg-paper/10")}
                          style={{ width: `${best}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-paper/10 bg-paper/[0.04] p-3">
                <p className="font-mono text-[7px] uppercase tracking-[0.09em] text-paper/28">
                  Suggested first set
                </p>
                <p className="mt-1.5 text-[11px] font-semibold text-paper/70">
                  Mixed foundations
                </p>
                <p className="mt-1 text-[9px] leading-relaxed text-paper/33">
                  Five questions across all four subjects. About four minutes.
                </p>
              </div>

              <p className="mt-4 border-t border-paper/10 pt-3 text-[9px] leading-relaxed text-paper/32">
                Scores help the tutor choose what to ask next. They are not shared with a
                teacher in this demo.
              </p>
            </div>
          </section>
        </div>
      ) : null}

      {phase === "running" && current ? (
        <div className="grid gap-3 lg:grid-cols-12">
          <section className="rounded-[24px] border border-line bg-white p-5 sm:p-6 lg:col-span-8">
            <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-paper">
                  {current.subject}
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-ink/30">
                  Question {index + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {questions.map((_, position) => (
                  <span
                    key={position}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      position === index
                        ? "w-6 bg-flare"
                        : position < index
                          ? "w-3 bg-ink/30"
                          : "w-3 bg-line",
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-[600px] text-[clamp(1.15rem,2.2vw,1.55rem)] font-bold leading-[1.3] tracking-[-0.025em] text-ink">
              {current.prompt}
            </p>

            <div className="mt-5 space-y-2">
              {current.options.map((option, optionIndex) => {
                const active = selected === optionIndex;
                const isCorrect = checked && optionIndex === current.answer;
                const isWrong = checked && active && optionIndex !== current.answer;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (checked) return;
                      setSelected(optionIndex);
                    }}
                    disabled={checked}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
                      isCorrect
                        ? "border-flare bg-flare-soft"
                        : isWrong
                          ? "border-red-200 bg-red-50"
                          : active
                            ? "border-ink bg-ink text-paper"
                            : "border-line bg-paper-soft text-ink/65 hover:border-ink/25 hover:text-ink",
                      checked ? "cursor-default" : "",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[8px] font-bold",
                        isCorrect
                          ? "border-flare bg-flare text-ink"
                          : isWrong
                            ? "border-red-300 text-red-600"
                            : active
                              ? "border-paper/30 text-paper"
                              : "border-line bg-white text-ink/35",
                      )}
                    >
                      {isCorrect ? (
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      ) : isWrong ? (
                        <X className="h-3 w-3" strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + optionIndex)
                      )}
                    </span>
                    <span className="text-[11px] leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {checked ? (
              <div className="mt-4 rounded-xl border border-line bg-paper-soft p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-flare" />
                  <p
                    className={cn(
                      "font-mono text-[7.5px] uppercase tracking-[0.1em]",
                      selected === current.answer ? "text-flare-deep" : "text-ink/40",
                    )}
                  >
                    {selected === current.answer ? "Correct" : "Not quite"}
                  </p>
                </div>
                <p className="mt-2 text-[10.5px] leading-relaxed text-ink/50">
                  {current.explanation}
                </p>
              </div>
            ) : null}

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
              <button
                type="button"
                onClick={changeTopic}
                className="text-[9.5px] font-medium text-ink/35 transition-colors hover:text-ink"
              >
                Leave this set
              </button>
              {checked ? (
                <button
                  type="button"
                  onClick={next}
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[10.5px] font-bold text-paper transition-colors hover:bg-ink-soft"
                >
                  {index === questions.length - 1 ? "See the result" : "Next question"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={check}
                  disabled={selected === null}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-flare px-4 text-[10.5px] font-bold text-ink transition-colors hover:bg-[#ff6d39] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Check answer
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </button>
              )}
            </div>
          </section>

          <aside className="space-y-3 lg:col-span-4">
            <section className="rounded-[24px] border border-line bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35">
                  This set
                </span>
                <Target className="h-4 w-4 text-flare" />
              </div>
              <p className="mt-4 font-display text-[42px] font-extrabold leading-none tracking-[-0.06em] text-ink">
                {liveScore}
                <span className="ml-1 text-[15px] font-semibold text-ink/30">/ {questions.length}</span>
              </p>
              <p className="mt-2 text-[9.5px] text-ink/35">
                {checked
                  ? "Answer checked. On to the next one."
                  : answeredCount
                    ? `${answeredCount} answered so far`
                    : "Your first answer is waiting."}
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line/70">
                <div
                  className="h-full rounded-full bg-flare transition-[width]"
                  style={{ width: `${((index + (checked ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
            </section>

            <section className="rounded-[24px] bg-flare p-5 text-ink">
              <Sparkles className="h-4 w-4" />
              <p className="mt-4 text-[15px] font-extrabold leading-tight tracking-[-0.03em]">
                Commit first. Check second.
              </p>
              <p className="mt-2 text-[9.5px] leading-relaxed text-ink/55">
                Choosing an answer before the explanation appears is the part that makes the
                feedback useful.
              </p>
            </section>
          </aside>
        </div>
      ) : null}

      {phase === "result" ? (
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-[24px] bg-[#0b0a08] p-5 text-paper sm:p-7">
            <div className="grid-dark absolute inset-0 opacity-40" />
            <div className="absolute right-[-80px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.2),transparent_68%)]" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-flare">
                  <Trophy className="h-3 w-3" />
                  Set complete / {choice}
                </span>
                <h2 className="mt-4 max-w-[520px] text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em]">
                  {finalPercent >= 80
                    ? "That is sticking."
                    : finalPercent >= 60
                      ? "Close. One gap to close."
                      : "Good data. Now revise it."}
                </h2>
                <p className="mt-3 max-w-[490px] text-[11px] leading-relaxed text-paper/42">
                  You answered {finalScore} of {questions.length} correctly. The explanations
                  below are the part worth keeping.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={restart}
                    className="group inline-flex h-10 items-center gap-2 rounded-full bg-flare px-4 text-[10.5px] font-bold text-ink"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Try another set
                  </button>
                  <button
                    type="button"
                    onClick={changeTopic}
                    className="text-[10px] font-semibold text-paper/50 transition-colors hover:text-paper"
                  >
                    Choose a different topic
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-5 lg:flex-col lg:items-end">
                <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full border border-paper/12 bg-paper/[0.05]">
                  <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.05em]">
                    {finalPercent}%
                  </p>
                  <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.09em] text-paper/30">
                    This set
                  </p>
                </div>
                <div className="text-left lg:text-right">
                  <p className="font-mono text-[7px] uppercase tracking-[0.09em] text-paper/28">
                    Personal best / {choice}
                  </p>
                  <p className="mt-1 text-[18px] font-bold text-flare">{Math.max(currentBest, finalPercent)}%</p>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-[24px] border border-line bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[12px] font-bold text-ink">Question review</h3>
                <p className="mt-1 text-[9.5px] text-ink/35">
                  The correct answer and the reason, in one place.
                </p>
              </div>
              <span className="font-mono text-[7px] uppercase tracking-[0.09em] text-ink/25">
                {questions.length} items
              </span>
            </div>
            <div className="mt-4 divide-y divide-line/80">
              {questions.map((question, position) => {
                const answer = answers[position];
                const correct = answer === question.answer;
                return (
                  <details key={question.id} className="group py-3">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3">
                      <span className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            correct ? "bg-flare-soft text-flare-deep" : "bg-ink text-paper",
                          )}
                        >
                          {correct ? (
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          ) : (
                            <X className="h-2.5 w-2.5" strokeWidth={3} />
                          )}
                        </span>
                        <span className="text-[10.5px] font-medium leading-snug text-ink/65">
                          {question.prompt}
                        </span>
                      </span>
                      <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-ink/25 group-open:text-flare-deep">
                        Review
                      </span>
                    </summary>
                    <div className="ml-7 mt-2 rounded-lg bg-paper-soft px-3 py-2.5">
                      <p className="text-[9.5px] leading-relaxed text-ink/50">
                        <span className="font-semibold text-ink/70">Correct:</span>{" "}
                        {question.options[question.answer]}
                      </p>
                      <p className="mt-1.5 text-[9.5px] leading-relaxed text-ink/40">
                        {question.explanation}
                      </p>
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
