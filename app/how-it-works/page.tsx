"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const scenes = [
  {
    label: "Receive",
    title: "An email arrives.",
  },
  {
    label: "Understand",
    title: "MailBrief understands it.",
  },
  {
    label: "Extract",
    title: "Important details become clear.",
  },
  {
    label: "Act",
    title: "You know what to do next.",
  },
];

const SCENE_DURATION = 1500;

export default function HowItWorksPage() {
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextScene = () => {
    setScene((current) => (current + 1) % scenes.length);
    setProgress(0);
  };

  const previousScene = () => {
    setScene((current) => (current - 1 + scenes.length) % scenes.length);
    setProgress(0);
  };

  useEffect(() => {
    if (paused) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const currentProgress = Math.min(
        (elapsed / SCENE_DURATION) * 100,
        100
      );

      setProgress(currentProgress);

      if (elapsed >= SCENE_DURATION) {
        nextScene();
      }
    }, 30);

    return () => clearInterval(timer);
  }, [scene, paused]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextScene();
      }

      if (event.key === "ArrowLeft") {
        previousScene();
      }

      if (event.key === " ") {
        event.preventDefault();
        setPaused((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* AURORA BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/20" />

        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/15" />

        <div className="absolute left-1/3 top-[700px] h-[420px] w-[420px] rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-600/10" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(99,102,241,1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,1)_1px,transparent_1px)] [background-size:48px_48px] dark:opacity-[0.045]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-[#050816]/65">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
              <Mail size={18} />
            </div>

            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
              MailBrief
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-2 text-sm md:flex">
            <Link
              href="/features"
              className="rounded-xl px-4 py-2 font-medium text-slate-600 transition hover:bg-white/60 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-violet-300"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-xl border border-violet-200/60 bg-white/70 px-4 py-2 font-medium text-violet-700 shadow-sm dark:border-violet-400/20 dark:bg-white/[0.06] dark:text-violet-300"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="rounded-xl px-4 py-2 font-medium text-slate-600 transition hover:bg-white/60 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-violet-300"
            >
              Security
            </Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-violet-600 sm:block dark:text-slate-300 dark:hover:text-violet-300"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-400/20 dark:bg-white/[0.06] dark:text-violet-300">
            <Sparkles size={13} />
            See MailBrief in action
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            From inbox chaos
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              to clear action.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
            See how MailBrief turns an email into clear, actionable
            information in seconds.
          </p>
        </div>
      </section>

      {/* PRODUCT DEMO */}
      <section className="relative px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 shadow-[0_30px_90px_rgba(76,29,149,0.12)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-2xl dark:shadow-violet-950/20">
            {/* BROWSER BAR */}
            <div className="flex h-12 items-center justify-between border-b border-slate-200/70 bg-white/70 px-5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.035]">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              </div>

              <div className="hidden rounded-lg border border-slate-200/70 bg-white/60 px-5 py-1.5 text-xs text-slate-400 backdrop-blur-xl sm:block dark:border-white/[0.07] dark:bg-white/[0.04]">
                app.mailbrief.ai
              </div>

              <div className="w-12" />
            </div>

            {/* VIDEO AREA */}
            <div
              className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-white/80 via-violet-50/40 to-cyan-50/30 p-5 dark:from-[#080c20] dark:via-violet-950/10 dark:to-cyan-950/10 sm:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* AURORA INSIDE DEMO */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" />

              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-400/10 blur-3xl" />

              {/* LEFT ARROW */}
              <button
                type="button"
                onClick={previousScene}
                aria-label="Previous scene"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-600 shadow-xl backdrop-blur-xl transition hover:scale-105 hover:text-violet-600 dark:border-white/[0.08] dark:bg-[#10162d]/80 dark:text-slate-300 dark:hover:text-violet-300 sm:left-6"
              >
                <ArrowLeft size={18} />
              </button>

              {/* RIGHT ARROW */}
              <button
                type="button"
                onClick={nextScene}
                aria-label="Next scene"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-600 shadow-xl backdrop-blur-xl transition hover:scale-105 hover:text-violet-600 dark:border-white/[0.08] dark:bg-[#10162d]/80 dark:text-slate-300 dark:hover:text-violet-300 sm:right-6"
              >
                <ArrowRight size={18} />
              </button>

              {/* SCENE 1 */}
              <div
                className={`absolute inset-0 flex items-center justify-center px-16 py-10 transition-all duration-500 ${
                  scene === 0
                    ? "translate-x-0 scale-100 opacity-100"
                    : "-translate-x-8 scale-95 opacity-0"
                }`}
              >
                <div className="w-full max-w-2xl">
                  <SceneTitle
                    step="01 · RECEIVE"
                    title="An email arrives."
                  />

                  <div className="mt-8 rounded-2xl border border-white/80 bg-white/80 p-5 shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:p-7 dark:border-white/[0.08] dark:bg-[#10162d]/85 dark:shadow-violet-950/20">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-5 dark:border-white/[0.07]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-semibold text-white">
                        PS
                      </div>

                      <div>
                        <div className="text-sm font-semibold">
                          Project Supervisor
                        </div>

                        <div className="text-xs text-slate-400">
                          project@university.edu
                        </div>
                      </div>

                      <div className="ml-auto rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                        New
                      </div>
                    </div>

                    <div className="py-5">
                      <h3 className="text-lg font-semibold">
                        Project Review Meeting
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                        Hi Shilpa,
                        <br />
                        <br />
                        Please submit the project report by Friday. Also
                        confirm your presentation slot for Monday&apos;s
                        review meeting.
                        <br />
                        <br />
                        Thanks!
                      </p>
                    </div>

                    <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400 dark:border-white/[0.07]">
                      <FileText size={14} />
                      Email received
                    </div>
                  </div>
                </div>
              </div>

              {/* SCENE 2 */}
              <div
                className={`absolute inset-0 flex items-center justify-center px-16 py-10 transition-all duration-500 ${
                  scene === 1
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-8 scale-95 opacity-0"
                }`}
              >
                <div className="w-full max-w-2xl">
                  <SceneTitle
                    step="02 · UNDERSTAND"
                    title="MailBrief understands it."
                  />

                  <div className="mt-8 rounded-2xl border border-white/80 bg-white/80 p-7 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#10162d]/85">
                    <div className="space-y-5">
                      <ProcessingRow
                        icon={<Mail size={17} />}
                        text="Reading email"
                      />

                      <ProcessingRow
                        icon={<Zap size={17} />}
                        text="Understanding intent"
                      />

                      <ProcessingRow
                        icon={<Sparkles size={17} />}
                        text="Extracting useful information"
                      />
                    </div>

                    <div className="mt-7 overflow-hidden rounded-xl border border-violet-200/50 bg-violet-50/70 dark:border-violet-400/10 dark:bg-violet-500/10">
                      <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-violet-700 dark:text-violet-300">
                        <Sparkles size={15} />
                        Gemini AI Engine

                        <span className="ml-auto text-xs font-medium text-violet-500 dark:text-violet-400">
                          Processing
                        </span>
                      </div>

                      <div className="h-1 bg-violet-100 dark:bg-white/[0.06]">
                        <div className="h-full w-2/3 animate-pulse bg-gradient-to-r from-violet-600 to-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SCENE 3 */}
              <div
                className={`absolute inset-0 flex items-center justify-center px-16 py-10 transition-all duration-500 ${
                  scene === 2
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-y-8 scale-95 opacity-0"
                }`}
              >
                <div className="w-full max-w-3xl">
                  <SceneTitle
                    step="03 · EXTRACT"
                    title="Important details become clear."
                  />

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <InsightCard
                      icon={<FileText size={18} />}
                      title="AI Summary"
                      text="Submit the project report and confirm your presentation slot."
                    />

                    <InsightCard
                      icon={<Check size={18} />}
                      title="Action Item"
                      text="Submit the project report by Friday."
                    />

                    <InsightCard
                      icon={<CalendarDays size={18} />}
                      title="Important Date"
                      text="Monday · Project review meeting."
                    />

                    <InsightCard
                      icon={<Zap size={18} />}
                      title="Priority"
                      text="Important — requires your attention."
                    />
                  </div>
                </div>
              </div>

              {/* SCENE 4 */}
              <div
                className={`absolute inset-0 flex items-center justify-center px-16 py-10 transition-all duration-500 ${
                  scene === 3
                    ? "translate-x-0 scale-100 opacity-100"
                    : "translate-x-8 scale-95 opacity-0"
                }`}
              >
                <div className="w-full max-w-2xl text-center">
                  <SceneTitle
                    step="04 · ACT"
                    title="You know exactly what to do next."
                  />

                  <div className="mt-8 rounded-2xl border border-white/80 bg-white/80 p-6 text-left shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:p-8 dark:border-white/[0.08] dark:bg-[#10162d]/85">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-white/[0.07]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 text-violet-600 dark:text-violet-300">
                        <MessageSquare size={18} />
                      </div>

                      <div>
                        <div className="text-sm font-semibold">
                          Suggested reply
                        </div>

                        <div className="text-xs text-slate-400">
                          Generated by MailBrief AI
                        </div>
                      </div>
                    </div>

                    <p className="py-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      Thanks for the update. I&apos;ll submit the project
                      report by Friday and confirm my presentation slot for
                      Monday&apos;s review meeting.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                        ✓ Clear
                      </span>

                      <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                        AI generated
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                        Ready to edit
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-300">
                    <CheckCircle2 size={17} />
                    Email understood. Next action clear.
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="border-t border-slate-200/70 bg-white/65 px-5 py-5 backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.035] sm:px-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-5 overflow-hidden">
                  {scenes.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setScene(index);
                        setProgress(0);
                      }}
                      className={`shrink-0 text-xs font-semibold transition ${
                        scene === index
                          ? "text-violet-600 dark:text-violet-300"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} · {item.label}
                    </button>
                  ))}
                </div>

                <span className="hidden text-xs text-slate-400 sm:block">
                  {paused ? "Paused" : "Auto playing"}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ArrowLeft size={13} />
                Use keyboard arrows to navigate
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SMALL EXPLANATION */}
      <section className="relative px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            <MiniCard
              number="01"
              title="Understand"
              text="MailBrief reads the important meaning behind your email."
            />

            <MiniCard
              number="02"
              title="Organize"
              text="Actions, dates and priorities are extracted automatically."
            />

            <MiniCard
              number="03"
              title="Respond"
              text="Get a useful suggested reply when you need one."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[#070b1d]/95 px-6 py-14 text-center text-white shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:px-12">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/20">
            <Sparkles size={22} />
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to understand your inbox?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Turn long emails into clear summaries, actions and replies with
            MailBrief.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
          >
            Try MailBrief free
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-200/70 bg-white/50 px-5 py-7 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#050816]/50 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 MailBrief AI</span>

          <div className="flex gap-5">
            <Link
              href="/features"
              className="transition hover:text-violet-600 dark:hover:text-violet-300"
            >
              Features
            </Link>

            <Link
              href="/security"
              className="transition hover:text-violet-600 dark:hover:text-violet-300"
            >
              Security
            </Link>

            <Link
              href="/login"
              className="transition hover:text-violet-600 dark:hover:text-violet-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ================================
   SCENE TITLE
================================ */

function SceneTitle({
  step,
  title,
}: {
  step: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <div className="text-sm font-bold text-violet-600 dark:text-violet-300">
        {step}
      </div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

/* ================================
   PROCESSING ROW
================================ */

function ProcessingRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.035]">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm dark:bg-white/[0.07] dark:text-violet-300">
        {icon}
      </div>

      <span className="text-sm font-medium">{text}</span>

      <CheckCircle2
        className="ml-auto text-emerald-500 dark:text-emerald-400"
        size={18}
      />
    </div>
  );
}

/* ================================
   INSIGHT CARD
================================ */

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/80 bg-white/75 p-5 shadow-lg shadow-violet-500/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.045] dark:hover:border-violet-400/20 dark:hover:bg-white/[0.07]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 text-violet-600 transition group-hover:from-violet-600 group-hover:to-cyan-500 group-hover:text-white dark:text-violet-300">
          {icon}
        </div>

        <span className="text-sm font-semibold">{title}</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}

/* ================================
   MINI CARD
================================ */

function MiniCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-white/70 bg-white/60 p-6 shadow-[0_10px_40px_rgba(76,29,149,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.045] dark:shadow-none dark:hover:border-violet-400/20 dark:hover:bg-white/[0.07]">
      <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-xs font-bold text-transparent">
        {number}
      </span>

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}