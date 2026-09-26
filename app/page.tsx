"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Analyze any email",
    description:
      "Turn long emails into clear summaries, key points, actions, and dates.",
    icon: Mail,
  },
  {
    title: "Get a smart reply",
    description:
      "Generate a professional reply based on the context of your email.",
    icon: Sparkles,
  },
  {
    title: "Understand your inbox",
    description:
      "Track priorities and email patterns from one simple dashboard.",
    icon: BarChart3,
  },
];

function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <div className="mx-auto mt-16 w-full max-w-6xl">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="group relative"
      >
        {/* Ambient glow */}
        <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-violet-500/20 via-cyan-400/10 to-fuchsia-500/20 blur-3xl" />

        {/* Browser window */}
        <div className="overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/40">
          {/* Browser bar */}
          <div className="flex h-12 items-center gap-2 border-b border-slate-200/80 bg-white/70 px-5 dark:border-white/10 dark:bg-white/[0.03]">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />

            <div className="ml-5 flex-1 rounded-lg border border-slate-200/80 bg-slate-50/80 px-4 py-1.5 text-xs text-slate-400 dark:border-white/10 dark:bg-white/[0.04]">
              app.mailbrief.ai
            </div>

            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600 sm:flex dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AI ready
            </div>
          </div>

          {/* Product */}
          <div className="grid min-h-[430px] md:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-slate-200/70 bg-slate-50/50 p-5 dark:border-white/10 dark:bg-white/[0.02] md:block">
              <div className="mb-9 flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
                  <Mail size={15} />
                </div>
                MailBrief
              </div>

              <div className="space-y-2 text-sm">
                {["Analyzer", "History", "Analytics", "Settings"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`relative rounded-xl px-3 py-2.5 transition ${
                        index === 0
                          ? "bg-gradient-to-r from-violet-500/10 to-cyan-400/10 font-medium text-violet-700 dark:from-violet-500/15 dark:to-cyan-400/10 dark:text-violet-300"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {index === 0 && (
                        <span className="absolute left-0 top-2.5 h-5 w-0.5 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />
                      )}
                      {item}
                    </div>
                  )
                )}
              </div>

              <div className="mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles
                    size={14}
                    className="text-violet-500"
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Gemini AI Engine
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>

                <p className="mt-2 text-[10px] text-slate-400">
                  Intelligent analysis enabled
                </p>
              </div>
            </aside>

            {/* Main preview */}
            <main className="p-6 md:p-10">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">
                    MailBrief AI
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                    {slide.title}
                  </h3>
                </div>

                <div className="hidden rounded-full border border-violet-200/70 bg-violet-50/70 px-3 py-1.5 text-xs font-medium text-violet-600 sm:block dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                  Gemini AI Engine
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_235px]">
                {/* Analysis card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-violet-600 dark:text-violet-300">
                      <div className="absolute inset-0 rounded-xl bg-violet-500/10 blur-lg" />
                      <Icon size={19} className="relative" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        AI Email Analysis
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Processed in seconds
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-white/10" />
                    <div className="h-2.5 w-11/12 rounded-full bg-slate-100 dark:bg-white/10" />
                    <div className="h-2.5 w-8/12 rounded-full bg-slate-100 dark:bg-white/10" />
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Summary", value: "Ready" },
                      { label: "Actions", value: "3 found" },
                      { label: "Dates", value: "2 found" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-white/5 dark:bg-white/[0.03]"
                      >
                        <p className="text-[11px] text-slate-400">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Takeaway */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 text-white dark:bg-white/[0.06]">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-500/20 blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-2xl" />

                  <p className="relative text-xs font-medium text-slate-400">
                    AI takeaway
                  </p>

                  <p className="relative mt-3 text-sm leading-6 text-slate-200">
                    {slide.description}
                  </p>

                  <div className="relative mt-8 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 size={14} />
                    Analysis complete
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="mt-7 flex items-center justify-center gap-3">
        <button
          onClick={() =>
            setActive((active - 1 + slides.length) % slides.length)
          }
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
          aria-label="Previous slide"
        >
          <ChevronLeft size={17} />
        </button>

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === index
                ? "w-8 bg-gradient-to-r from-violet-500 to-cyan-400"
                : "w-2 bg-slate-300 dark:bg-slate-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

        <button
          onClick={() => setActive((active + 1) % slides.length)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-violet-600 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
          aria-label="Next slide"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />
        <div className="absolute right-[-140px] top-20 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-[120px] dark:bg-cyan-500/15" />
        <div className="absolute left-1/3 top-[520px] h-[350px] w-[350px] rounded-full bg-fuchsia-300/10 blur-[120px] dark:bg-fuchsia-500/10" />

        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-[#050816]/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
              <Mail size={18} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              MailBrief
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex dark:text-slate-300">
            <Link
              href="/features"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              Security
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-violet-600 sm:block dark:text-slate-300 dark:hover:text-violet-400"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-600/30"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/60 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            AI-powered email intelligence
            <Sparkles size={13} />
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Your inbox,
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              finally understood.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
            MailBrief turns long, complicated emails into clear summaries,
            important actions, dates, priorities, and smart replies — in
            seconds.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-violet-600/30"
            >
              Start analyzing
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
            >
              See how it works
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-violet-500" />
              Fast AI analysis
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block dark:bg-slate-700" />

            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-cyan-500" />
              Structured insights
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block dark:bg-slate-700" />

            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" />
              Private by design
            </span>
          </div>
        </div>

        {/* Product showcase */}
        <ProductShowcase />
      </section>

      {/* Feature strip */}
      <section className="relative border-y border-slate-200/60 bg-white/30 px-5 py-16 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.015] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Clear summaries",
              text: "Understand the important parts without reading every line.",
            },
            {
              icon: CheckCircle2,
              title: "Action-ready insights",
              text: "Find tasks, deadlines, dates, and priorities automatically.",
            },
            {
              icon: BarChart3,
              title: "One smart workspace",
              text: "Analyze emails, review history, and understand your inbox patterns.",
            },
          ].map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-400/10 text-violet-600 transition group-hover:scale-105 dark:text-violet-300">
                  <Icon size={20} />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-5 py-20 sm:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-violet-200/50 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 p-8 text-center text-white shadow-2xl shadow-violet-600/20 sm:p-14">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative">
            <Sparkles className="mx-auto mb-5" size={25} />

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Make every email easier to understand.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Turn your inbox into clear, actionable information with
              MailBrief AI.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-indigo-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Get started free
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/60 px-5 py-8 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
              <Mail size={14} />
            </div>
            <span>© 2026 MailBrief AI</span>
          </div>

          <div className="flex gap-5">
            <Link
              href="/features"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              Features
            </Link>

            <Link
              href="/security"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              Security
            </Link>

            <Link
              href="/login"
              className="transition hover:text-violet-600 dark:hover:text-violet-400"
            >
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}