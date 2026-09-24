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
const TOTAL_DURATION = SCENE_DURATION * scenes.length;

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
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Mail size={18} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              MailBrief
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm md:flex">
            <Link
              href="/features"
              className="text-slate-600 transition hover:text-indigo-600"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="font-medium text-indigo-600"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="text-slate-600 transition hover:text-indigo-600"
            >
              Security
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 hover:text-indigo-600 sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-700">
            <Sparkles size={13} />
            See MailBrief in action
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            From inbox chaos
            <br />
            <span className="text-indigo-600">to clear action.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            See how MailBrief turns an email into clear, actionable
            information in seconds.
          </p>
        </div>
      </section>

      {/* PRODUCT VIDEO */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            {/* Browser bar */}
            <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-5">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>

              <div className="hidden rounded-lg border border-slate-200 bg-slate-50 px-5 py-1.5 text-xs text-slate-400 sm:block">
                app.mailbrief.ai
              </div>

              <div className="w-12" />
            </div>

            {/* VIDEO AREA */}
            <div
              className="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-slate-50 p-5 sm:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Background decoration */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/40 blur-3xl" />

              {/* LEFT ARROW */}
              <button
                type="button"
                onClick={previousScene}
                aria-label="Previous scene"
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition hover:scale-105 hover:text-indigo-600 sm:left-6"
              >
                <ArrowLeft size={18} />
              </button>

              {/* RIGHT ARROW */}
              <button
                type="button"
                onClick={nextScene}
                aria-label="Next scene"
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition hover:scale-105 hover:text-indigo-600 sm:right-6"
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

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
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

                      <div className="ml-auto rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                        New
                      </div>
                    </div>

                    <div className="py-5">
                      <h3 className="text-lg font-semibold">
                        Project Review Meeting
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-500">
                        Hi Shilpa,
                        <br />
                        <br />
                        Please submit the project report by Friday. Also
                        confirm your presentation slot for Monday&apos;s review
                        meeting.
                        <br />
                        <br />
                        Thanks!
                      </p>
                    </div>

                    <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
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

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
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

                    <div className="mt-7 overflow-hidden rounded-xl bg-indigo-50">
                      <div className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-indigo-700">
                        <Sparkles size={15} />
                        Gemini AI Engine
                        <span className="ml-auto text-xs text-indigo-500">
                          Processing
                        </span>
                      </div>

                      <div className="h-1 bg-indigo-100">
                        <div className="h-full w-2/3 animate-pulse bg-indigo-600" />
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

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-xl sm:p-8">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
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

                    <p className="py-6 text-sm leading-7 text-slate-600">
                      Thanks for the update. I&apos;ll submit the project
                      report by Friday and confirm my presentation slot for
                      Monday&apos;s review meeting.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
                        ✓ Clear
                      </span>

                      <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600">
                        AI generated
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                        Ready to edit
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600">
                    <CheckCircle2 size={17} />
                    Email understood. Next action clear.
                  </div>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-8">
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
                      className={`shrink-0 text-xs font-medium transition ${
                        scene === index
                          ? "text-indigo-600"
                          : "text-slate-400 hover:text-slate-600"
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

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-75"
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
      <section className="border-t border-slate-100 bg-white px-5 py-20 sm:px-8">
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
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-950 px-6 py-14 text-center text-white sm:px-12">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500">
            <Sparkles size={22} />
          </div>

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to understand your inbox?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Turn long emails into clear summaries, actions and replies with
            MailBrief.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Try MailBrief free
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 MailBrief AI</span>

          <div className="flex gap-5">
            <Link href="/features" className="hover:text-slate-700">
              Features
            </Link>

            <Link href="/security" className="hover:text-slate-700">
              Security
            </Link>

            <Link href="/login" className="hover:text-slate-700">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SceneTitle({
  step,
  title,
}: {
  step: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <div className="text-sm font-semibold text-indigo-600">{step}</div>

      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
    </div>
  );
}

function ProcessingRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
        {icon}
      </div>

      <span className="text-sm font-medium">{text}</span>

      <CheckCircle2 className="ml-auto text-emerald-500" size={18} />
    </div>
  );
}

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <span className="text-sm font-semibold">{title}</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <span className="text-xs font-semibold text-indigo-600">{number}</span>

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}