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
              className="font-medium text-indigo-600"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="text-slate-600 transition hover:text-indigo-600"
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
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-700">
            <Sparkles size={13} />
            Built for smarter email
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Everything important.
            <br />
            <span className="text-indigo-600">Nothing unnecessary.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            MailBrief uses AI to transform your emails into information you
            can understand and act on quickly.
          </p>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={20} />
                </div>

                <h2 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-indigo-600">
                  Explore capability
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI ENGINE */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                <Zap size={13} />
                MailBrief Gemini AI Engine
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                One email.
                <br />
                Multiple useful insights.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                MailBrief doesn't just shorten an email. It identifies the
                information you may actually need: meaning, tasks, dates,
                priority and possible responses.
              </p>
            </div>

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
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your inbox can be simpler.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
            Start turning complicated emails into clear next steps.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try MailBrief free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 MailBrief AI</span>

          <div className="flex gap-5">
            <Link href="/how-it-works" className="hover:text-slate-700">
              How it works
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

function DarkInsight({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
          <CheckCircle2 size={17} />
        </div>

        <span className="text-sm font-medium">{title}</span>
      </div>

      <div className="mt-4 h-2 w-3/4 rounded-full bg-white/10" />
      <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
    </div>
  );
}