"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart summaries",
    description:
      "Turn long emails into concise summaries that capture what actually matters.",
  },
  {
    icon: CheckCircle2,
    title: "Action items",
    description:
      "Automatically identify tasks, requests and things that need your attention.",
  },
  {
    icon: CalendarDays,
    title: "Important dates",
    description:
      "Find deadlines, meetings and important dates hidden inside your emails.",
  },
  {
    icon: MessageSquare,
    title: "Suggested replies",
    description:
      "Get a useful AI-generated reply that you can review, edit and send.",
  },
  {
    icon: BarChart3,
    title: "Email analytics",
    description:
      "Understand your email patterns, priorities and workload from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy focused",
    description:
      "Your email analysis stays connected to your authenticated MailBrief account.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* AURORA BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/20" />

        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-500/15" />

        <div className="absolute left-1/3 top-[650px] h-[420px] w-[420px] rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-600/10" />

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

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-2 text-sm md:flex">
            <Link
              href="/features"
              className="rounded-xl border border-violet-200/60 bg-white/70 px-4 py-2 font-medium text-violet-700 shadow-sm dark:border-violet-400/20 dark:bg-white/[0.06] dark:text-violet-300"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-xl px-4 py-2 font-medium text-slate-600 transition hover:bg-white/60 hover:text-violet-600 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-violet-300"
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
      <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* BADGE */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-400/20 dark:bg-white/[0.06] dark:text-violet-300">
            <Sparkles size={13} />
            Built for smarter email
          </div>

          {/* HEADING */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Everything important.
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              Nothing unnecessary.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
            MailBrief uses AI to transform your emails into information you
            can understand and act on quickly.
          </p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="relative px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/70 bg-white/65 p-7 shadow-[0_10px_40px_rgba(76,29,149,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-[0_20px_60px_rgba(124,58,237,0.14)] dark:border-white/[0.08] dark:bg-white/[0.045] dark:shadow-none dark:hover:border-violet-400/20 dark:hover:bg-white/[0.07]"
              >
                {/* ICON */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/15 to-cyan-500/15 text-violet-600 transition duration-300 group-hover:scale-105 group-hover:from-violet-600 group-hover:to-cyan-500 group-hover:text-white dark:text-violet-300">
                  <Icon size={20} />
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-600 dark:text-violet-300">
                  Explore capability
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI ENGINE */}
      <section className="relative px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b1d]/95 p-8 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-12">
          {/* INNER AURORA */}
          <div className="pointer-events-none absolute" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-2 text-xs font-semibold text-violet-300">
                <Zap size={13} />
                MailBrief Gemini AI Engine
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                One email.
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Multiple useful insights.
                </span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                MailBrief doesn't just shorten an email. It identifies the
                information you may actually need: meaning, tasks, dates,
                priority and possible responses.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Try it yourself
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* INSIGHTS */}
            <div className="grid gap-3 sm:grid-cols-2">
              <DarkInsight title="Summary" />
              <DarkInsight title="Action items" />
              <DarkInsight title="Important dates" />
              <DarkInsight title="Suggested reply" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/60 px-6 py-14 text-center shadow-xl shadow-violet-500/5 backdrop-blur-xl dark:border-white/[0.07] dark:bg-white/[0.035]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
            <Sparkles size={21} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Your inbox can be simpler.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Start turning complicated emails into clear next steps.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
          >
            Try MailBrief free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-200/70 bg-white/50 px-5 py-7 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#050816]/50 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 MailBrief AI</span>

          <div className="flex gap-5">
            <Link
              href="/how-it-works"
              className="transition hover:text-violet-600 dark:hover:text-violet-300"
            >
              How it works
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

function DarkInsight({ title }: { title: string }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.045] p-5 backdrop-blur-xl transition hover:border-violet-400/20 hover:bg-white/[0.08]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-300">
          <CheckCircle2 size={17} />
        </div>

        <span className="text-sm font-medium text-white">{title}</span>
      </div>

      <div className="mt-4 h-2 w-3/4 rounded-full bg-white/[0.08]" />
      <div className="mt-2 h-2 w-1/2 rounded-full bg-white/[0.06]" />
    </div>
  );
}