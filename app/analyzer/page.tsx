"use client";

import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  History,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AnalyzerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white">
            <Mail size={18} />
          </div>

          <span className="font-bold">
            MailBrief<span className="text-indigo-600"> AI</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } absolute z-20 w-64 border-r border-slate-200 bg-white lg:relative lg:block`}
        >
          <div className="flex min-h-screen flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-100 px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-bold tracking-tight">
                    MailBrief<span className="text-indigo-600"> AI</span>
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    AI Email Intelligence
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
              <Link
                href="/analyzer"
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700"
              >
                <Sparkles size={18} />
                Email Analyzer
              </Link>

              <Link
                href="/history"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <History size={18} />
                Email History
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </nav>

            {/* User */}
            <div className="border-t border-slate-100 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  SP
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    User
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    Free workspace
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">
          {/* Top Bar */}
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900">
                Email Analyzer
              </h2>
            </div>

            <Link
              href="/history"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <History size={16} />
              View history
            </Link>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <Sparkles size={16} />
                AI Email Intelligence
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Understand every email in seconds.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Paste an email below and MailBrief AI will summarize it,
                extract important points, identify action items, and highlight
                important dates.
              </p>
            </div>

            {/* Analyzer Grid */}
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              {/* Email Input */}
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Email to analyze
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Paste the complete email content below.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <FileText size={17} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Sender */}
                  <div>
                    <label
                      htmlFor="sender"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Sender
                    </label>

                    <input
                      id="sender"
                      type="email"
                      placeholder="sender@company.com"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mt-5">
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      placeholder="Email subject"
                      className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  {/* Body */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-wide text-slate-500"
                      >
                        Email body
                      </label>

                      <span className="text-xs text-slate-400">
                        {email.length} characters
                      </span>
                    </div>

                    <textarea
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Paste your email here..."
                      rows={12}
                      className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>

                  {/* Analyze Button */}
                  <button
                    type="button"
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Sparkles size={17} />
                    Analyze with Gemini AI
                    <Send size={16} />
                  </button>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                {/* Ready Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Analysis ready
                      </h3>

                      <p className="text-xs text-slate-400">
                        AI processing happens securely.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <StatusItem text="Summary generation" />
                    <StatusItem text="Key point extraction" />
                    <StatusItem text="Action item detection" />
                    <StatusItem text="Important date detection" />
                    <StatusItem text="Priority classification" />
                  </div>
                </div>

                {/* What you'll get */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    What you'll get
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    One clear brief.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Turn long emails into information you can understand and
                    act on quickly.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <InfoCard title="Summary" />
                    <InfoCard title="Key points" />
                    <InfoCard title="Action items" />
                    <InfoCard title="Important dates" />
                    <InfoCard title="Priority" />
                    <InfoCard title="Suggested reply" />
                  </div>
                </div>

                {/* Gemini */}
                <div className="rounded-3xl bg-[#111827] p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Sparkles size={19} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        MailBrief Gemini AI Engine
                      </p>

                      <p className="text-xs text-slate-400">
                        Intelligent email analysis
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-300">
                    Your email is analyzed to identify the information that
                    matters most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* Status Item */
function StatusItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
      <CheckCircle2 size={17} className="text-emerald-500" />

      <span className="text-sm font-medium text-slate-600">{text}</span>
    </div>
  );
}

/* Info Card */
function InfoCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
      <p className="text-xs font-semibold text-slate-600">{title}</p>
    </div>
  );
}