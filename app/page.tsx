"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Analyze any email",
    description: "Turn long emails into clear summaries, key points, actions, and dates.",
    icon: Mail,
  },
  {
    title: "Get a smart reply",
    description: "Generate a professional reply based on the context of your email.",
    icon: Sparkles,
  },
  {
    title: "Understand your inbox",
    description: "Track priorities and email patterns from one simple dashboard.",
    icon: BarChart3,
  },
];

function ProductShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];
  const Icon = slide.icon;

  return (
    <div className="mx-auto mt-16 w-full max-w-6xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
        {/* Browser bar */}
        <div className="flex h-12 items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 dark:border-slate-800 dark:bg-slate-900">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />

          <div className="ml-5 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-950">
            app.mailbrief.ai
          </div>
        </div>

        {/* Product */}
        <div className="grid min-h-[390px] md:grid-cols-[210px_1fr]">
          {/* Sidebar */}
          <aside className="hidden border-r border-slate-200 bg-slate-50 p-5 md:block dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-8 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Mail size={16} />
              </div>
              MailBrief
            </div>

            <div className="space-y-2 text-sm">
              {["Analyzer", "History", "Analytics", "Settings"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2.5 ${
                      index === 0
                        ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </aside>

          {/* Main preview */}
          <main className="p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-indigo-600">
                  MailBrief AI
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
                  {slide.title}
                </h3>
              </div>

              <div className="hidden rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 sm:block dark:bg-indigo-950/50 dark:text-indigo-300">
                Gemini AI Engine
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[1fr_220px]">
              <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    <Icon size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      AI Email Analysis
                    </p>
                    <p className="text-xs text-slate-400">
                      Processed in seconds
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-11/12 rounded-full bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-8/12 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {["Summary", "Actions", "Dates"].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900"
                    >
                      <p className="text-xs text-slate-400">{item}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Ready
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white dark:bg-slate-800">
                <p className="text-xs text-slate-400">AI takeaway</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  {slide.description}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 size={14} />
                  Analysis complete
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Slider controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() =>
            setActive((active - 1 + slides.length) % slides.length)
          }
          className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          aria-label="Previous slide"
        >
          <ChevronLeft size={17} />
        </button>

        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all ${
              active === index
                ? "w-7 bg-indigo-600"
                : "w-2 bg-slate-300 dark:bg-slate-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

        <button
          onClick={() => setActive((active + 1) % slides.length)}
          className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
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
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Mail size={18} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              MailBrief
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-slate-600 md:flex dark:text-slate-300">
            <Link
              href="/features"
              className="transition hover:text-indigo-600"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="transition hover:text-indigo-600"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="transition hover:text-indigo-600"
            >
              Security
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-slate-600 transition hover:text-indigo-600 sm:block dark:text-slate-300"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300">
            <Zap size={13} />
            AI-powered email intelligence
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
            Your inbox,
            <br />
            <span className="text-indigo-600">finally understood.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
            MailBrief turns long, complicated emails into clear summaries,
            important actions, dates, priorities, and smart replies — in
            seconds.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
            >
              Start analyzing
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              See how it works
            </Link>
          </div>
        </div>

        <ProductShowcase />

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400">
          <span>Fast AI analysis</span>
          <span>•</span>
          <span>Structured insights</span>
          <span>•</span>
          <span>Private by design</span>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-slate-200 px-5 py-7 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
          <p>© 2026 MailBrief AI</p>

          <div className="flex gap-5">
            <Link href="/features" className="hover:text-indigo-600">
              Features
            </Link>
            <Link href="/security" className="hover:text-indigo-600">
              Security
            </Link>
            <Link href="/login" className="hover:text-indigo-600">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}