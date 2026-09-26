"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fc] text-slate-900 dark:bg-[#050816] dark:text-white">

      {/* ==================================================
          AURORA BACKGROUND
      ================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15" />
        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-500/10" />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.7) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl dark:border-white/[0.06] dark:bg-[#050816]/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* LOGO */}

          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
              <span className="text-sm font-bold">M</span>
            </div>

            <div>
              <p className="font-bold tracking-tight text-slate-950 dark:text-white">
                MailBrief
                <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  {" "}AI
                </span>
              </p>

              <p className="hidden text-[8px] uppercase tracking-[0.16em] text-slate-400 sm:block">
                AI Email Intelligence
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/50 p-1 text-sm font-medium shadow-sm backdrop-blur-xl md:flex dark:border-white/[0.06] dark:bg-white/[0.03]">

            <Link
              href="/features"
              className="rounded-full px-4 py-2 text-slate-500 transition hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-full px-4 py-2 text-slate-500 transition hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="rounded-full border border-violet-200/60 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 px-4 py-2 text-slate-950 shadow-sm dark:border-violet-400/20 dark:text-white"
            >
              Security
            </Link>

          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-2.5">

            <Link
              href="/login"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 sm:block dark:text-slate-300 dark:hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              Get started
            </Link>

          </div>
        </div>
      </header>

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden">

        <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-400/10 to-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-28">

          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/60 px-4 py-2 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-400/20 dark:bg-white/[0.04] dark:text-violet-300">
            <ShieldCheck size={15} />
            Security & privacy
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Your emails deserve
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              {" "}thoughtful protection.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg dark:text-slate-400">
            MailBrief is designed to keep your email data protected
            while giving AI the information it needs to understand
            your messages.
          </p>

        </div>
      </section>

      {/* ==================================================
          SECURITY VISUAL
      ================================================== */}

      <section className="px-5 pb-20 sm:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-slate-950 p-6 shadow-2xl shadow-violet-500/10 sm:p-10 dark:border-white/[0.08]">

            {/* Aurora glow */}

            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">

              {/* Browser top */}

              <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <Lock size={12} className="text-emerald-400" />

                  <span className="text-[10px] text-slate-400">
                    Protected MailBrief session
                  </span>
                </div>

              </div>

              {/* Security flow */}

              <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr]">

                <SecurityNode
                  icon={<Mail size={22} />}
                  title="Your email"
                  description="Email content enters MailBrief."
                />

                <Arrow />

                <SecurityNode
                  icon={<Sparkles size={22} />}
                  title="AI analysis"
                  description="Gemini processes the email for analysis."
                  highlighted
                />

                <Arrow />

                <SecurityNode
                  icon={<ShieldCheck size={22} />}
                  title="Your results"
                  description="Insights are stored with your account."
                />

              </div>

              {/* Bottom status */}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-400">

                <StatusItem text="Authenticated access" />
                <StatusItem text="User-scoped data" />
                <StatusItem text="Protected database" />

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* ==================================================
          SECURITY FEATURES
      ================================================== */}

      <section className="border-y border-slate-200/60 bg-white/30 px-5 py-20 backdrop-blur-sm sm:px-8 dark:border-white/[0.05] dark:bg-white/[0.015]">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 max-w-2xl">

            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">
              Built with security in mind
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Protection across the MailBrief experience.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
              MailBrief combines authentication, database security
              and controlled access to help keep your email insights
              private.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <SecurityFeature
              icon={<Lock size={21} />}
              title="Authenticated accounts"
              description="Your MailBrief workspace is tied to your authenticated account so your saved email analysis is associated with you."
            />

            <SecurityFeature
              icon={<Database size={21} />}
              title="Protected database access"
              description="MailBrief uses Supabase PostgreSQL with row-level security policies to restrict access to user-owned data."
            />

            <SecurityFeature
              icon={<UserCheck size={21} />}
              title="User-scoped email history"
              description="Email history and analysis records are queried for the authenticated user rather than being exposed as shared application data."
            />

            <SecurityFeature
              icon={<ShieldCheck size={21} />}
              title="Protected application routes"
              description="Authenticated application areas are protected so users are redirected to sign in when they do not have an active session."
            />

          </div>

        </div>

      </section>

      {/* ==================================================
          PRIVACY PRINCIPLES
      ================================================== */}

      <section className="px-5 py-20 sm:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            <div>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 text-violet-600 shadow-sm dark:border-violet-400/20 dark:text-violet-300">
                <ShieldCheck size={24} />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Security should stay simple.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400">
                MailBrief is built around a straightforward principle:
                only authenticated users should be able to access their
                own email analysis and account information.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                Create your account
                <ArrowRight size={16} />
              </Link>

            </div>

            {/* CHECKLIST */}

            <div className="rounded-[28px] border border-slate-200/70 bg-white/60 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-xl sm:p-8 dark:border-white/[0.07] dark:bg-white/[0.035] dark:shadow-black/20">

              <div className="mb-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  MailBrief security
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Designed around your account
                </h3>

              </div>

              <div className="space-y-5">

                <ChecklistItem text="Authenticated access to your workspace" />

                <ChecklistItem text="User-specific email analysis history" />

                <ChecklistItem text="Row-level database security" />

                <ChecklistItem text="Protected application routes" />

                <ChecklistItem text="Secure password authentication through Supabase" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          CTA
      ================================================== */}

      <section className="px-5 pb-20 sm:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 px-6 py-14 text-center shadow-2xl shadow-violet-500/10 sm:px-10">

          <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-300">
              <ShieldCheck size={24} />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Understand your inbox with confidence.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Start using MailBrief to turn long emails into clear,
              actionable intelligence.
            </p>

            <Link
              href="/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Get started
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-slate-200/60 px-5 py-8 dark:border-white/[0.06] sm:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>

            <p className="font-semibold">
              MailBrief
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                {" "}AI
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Understand every email in seconds.
            </p>

          </div>

          <div className="flex items-center gap-5 text-xs text-slate-400">

            <Link
              href="/features"
              className="transition hover:text-slate-700 dark:hover:text-white"
            >
              Features
            </Link>

            <Link
              href="/how-it-works"
              className="transition hover:text-slate-700 dark:hover:text-white"
            >
              How it works
            </Link>

            <Link
              href="/security"
              className="text-slate-700 dark:text-slate-200"
            >
              Security
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}

/* ==================================================
   SECURITY NODE
================================================== */

function SecurityNode({
  icon,
  title,
  description,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 text-center backdrop-blur-xl ${
        highlighted
          ? "border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-cyan-400/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div
        className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
          highlighted
            ? "bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300"
            : "bg-white/10 text-slate-300"
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* ==================================================
   ARROW
================================================== */

function Arrow() {
  return (
    <div className="hidden text-violet-400/60 md:block">
      <ArrowRight size={18} />
    </div>
  );
}

/* ==================================================
   STATUS ITEM
================================================== */

function StatusItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={14}
        className="text-emerald-400"
      />

      <span>{text}</span>
    </div>
  );
}

/* ==================================================
   SECURITY FEATURE
================================================== */

function SecurityFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-300/50 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/[0.07] dark:bg-white/[0.035] dark:hover:border-violet-400/20">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-400/10 text-violet-600 transition group-hover:from-violet-600 group-hover:to-fuchsia-500 group-hover:text-white dark:text-violet-300">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}

/* ==================================================
   CHECKLIST
================================================== */

function ChecklistItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <CheckCircle2
        size={19}
        className="mt-0.5 shrink-0 text-violet-500 dark:text-violet-400"
      />

      <span className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        {text}
      </span>

    </div>
  );
}