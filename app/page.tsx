"use client";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Mail,
  Menu,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#111827]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white">
              <Mail size={20} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                MailBrief<span className="text-indigo-600"> AI</span>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                Understand every email
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              How it works
              <ChevronDown size={15} />
            </a>

            <a
              href="#security"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Security
            </a>

            <a
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-950"
            >
              Sign in
            </a>

            <a
              href="/register"
              className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Get started
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#features" onClick={() => setMobileMenu(false)}>
                Features
              </a>

              <a href="#how-it-works" onClick={() => setMobileMenu(false)}>
                How it works
              </a>

              <a href="#security" onClick={() => setMobileMenu(false)}>
                Security
              </a>

              <a href="/login" className="font-semibold">
                Sign in
              </a>

              <a
                href="/register"
                className="rounded-xl bg-[#111827] px-5 py-3 text-center font-semibold text-white"
              >
                Get started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 lg:grid-cols-2 lg:items-center lg:px-10 lg:pb-32 lg:pt-28">
          {/* HERO TEXT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={14} />
              AI-powered email intelligence
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
              Understand every
              <span className="block text-indigo-600">email in seconds.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              MailBrief AI turns long, complicated emails into clear summaries,
              actionable tasks, important dates, and ready-to-send replies.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#111827] px-6 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Analyze your first email
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                See how it works
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600" />
                No credit card required
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600" />
                AI-powered
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-emerald-600" />
                Private by design
              </span>
            </div>
          </div>

          {/* HERO DEMO */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-indigo-100/50 blur-2xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 sm:p-6">
              {/* Window header */}
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Sparkles size={13} />
                  MailBrief AI
                </div>
              </div>

              {/* Incoming email */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                    AC
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Alex Chen
                    </p>
                    <p className="text-xs text-slate-400">
                      alex@example.com
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900">
                  Project update & next steps
                </p>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  Hi team, I wanted to share an update on the project. We have
                  completed the first milestone and need everyone to review the
                  attached document before Friday...
                </p>
              </div>

              {/* AI divider */}
              <div className="flex items-center justify-center py-5">
                <div className="flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
                  <Sparkles size={14} />
                  AI ANALYSIS
                </div>
              </div>

              {/* AI output */}
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      AI Brief
                    </p>

                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      High Priority
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-slate-700">
                    The project has completed its first milestone. Team members
                    need to review the attached document before Friday.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-400">
                      ACTION ITEM
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-800">
                      Review project document
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-400">
                      DEADLINE
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                      <Clock3 size={15} />
                      Friday
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 text-center sm:flex-row sm:text-left lg:px-10">
          <p className="text-sm font-medium text-slate-400">
            Built for people who have too much email and too little time.
          </p>

          <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <span>WORK</span>
            <span>STUDY</span>
            <span>PRODUCTIVITY</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
            Everything important
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Your inbox, made simple.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Stop spending your time reading every line. MailBrief extracts
            what actually matters.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText size={22} />}
            title="Instant summaries"
            description="Turn lengthy emails into concise, easy-to-understand briefs."
          />

          <FeatureCard
            icon={<Check size={22} />}
            title="Action items"
            description="Automatically identify what you need to do and what can wait."
          />

          <FeatureCard
            icon={<Clock3 size={22} />}
            title="Important dates"
            description="Extract deadlines, meetings, events, and other time-sensitive details."
          />

          <FeatureCard
            icon={<Zap size={22} />}
            title="Priority detection"
            description="Understand which emails need your attention first."
          />

          <FeatureCard
            icon={<Sparkles size={22} />}
            title="Suggested replies"
            description="Generate professional replies without starting from a blank page."
          />

          <FeatureCard
            icon={<Mail size={22} />}
            title="Email intelligence"
            description="Understand sentiment, category, intent, and the real meaning behind messages."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">
                How it works
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                From inbox chaos to clarity.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                MailBrief takes a few seconds to turn an email into a clear
                brief you can actually act on.
              </p>

              <div className="mt-10 space-y-7">
                <Step
                  number="01"
                  title="Paste your email"
                  description="Add the email you want MailBrief to understand."
                />

                <Step
                  number="02"
                  title="Let AI analyze it"
                  description="MailBrief identifies the important information automatically."
                />

                <Step
                  number="03"
                  title="Take action"
                  description="Read the brief, complete your tasks, and use the suggested reply."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 shadow-xl shadow-slate-900/5 sm:p-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      AI-generated brief
                    </p>
                    <p className="text-xs text-slate-400">
                      Processed in seconds
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Summary
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Review the project milestone and complete the requested
                      document review before the deadline.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What you need to do
                    </p>

                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <Check size={14} />
                        </div>
                        <span className="text-sm text-slate-700">
                          Review the document
                        </span>
                      </div>

                      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                          <Clock3 size={14} />
                        </div>
                        <span className="text-sm text-slate-700">
                          Complete before Friday
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <p className="text-xs font-bold text-indigo-600">
                      SUGGESTED REPLY
                    </p>

                    <p className="mt-2 text-sm leading-6 text-indigo-950">
                      Thanks for the update. I’ll review the document and share
                      my feedback before Friday.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-3xl bg-[#111827] px-7 py-14 text-white sm:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">
              Privacy matters
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Your emails stay yours.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              MailBrief is designed with privacy and secure handling of your
              email data in mind.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <SecurityItem title="Secure authentication" />
            <SecurityItem title="Private user data" />
            <SecurityItem title="Protected API keys" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Sparkles size={25} />
          </div>

          <h2 className="mt-7 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Spend less time reading.
            <span className="block text-indigo-600">
              Spend more time doing.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Turn your inbox into clear, actionable information with MailBrief
            AI.
          </p>

          <a
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#111827] px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            Get started free
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-900">
              <Mail size={18} />
            </div>

            <span className="font-semibold text-white">MailBrief AI</span>
          </div>

          <p className="text-sm">
            © 2026 MailBrief AI. Understand every email in seconds.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SecurityItem({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
        <Check size={16} />
      </div>

      <span className="text-sm font-medium text-slate-200">{title}</span>
    </div>
  );
}