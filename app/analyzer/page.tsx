"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  History,
  Mail,
  Menu,
  Send,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EmailAnalysis = {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  importantDates: {
    date: string;
    description: string;
  }[];
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  category: string;
  suggestedReply: string;
};

export default function AnalyzerPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");

  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);
  const [analyzedEmailId, setAnalyzedEmailId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setError("");
    setAnalysis(null);
    setAnalyzedEmailId(null);

    if (!email.trim()) {
      setError("Please paste an email before analyzing.");
      return;
    }

    if (email.trim().length < 10) {
      setError("Please enter a longer email.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/analyze-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender,
          subject,
          emailText: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze the email.");
      }

      setAnalysis(data.analysis);
      setAnalyzedEmailId(data.emailId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing the email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Mobile Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white dark:bg-indigo-600">
            <Mail size={18} />
          </div>

          <span className="font-bold text-slate-900 dark:text-white">
            MailBrief<span className="text-indigo-600"> AI</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } absolute z-20 w-64 border-r border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:relative lg:block`}
        >
          <div className="flex min-h-screen flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-100 px-6 dark:border-slate-800">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-white dark:bg-indigo-600">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-bold tracking-tight text-slate-900 dark:text-white">
                    MailBrief
                    <span className="text-indigo-600"> AI</span>
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
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
              >
                <Sparkles size={18} />
                Email Analyzer
              </Link>

              <Link
                href="/history"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <History size={18} />
                Email History
              </Link>

              <Link
                href="/analytics"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <BarChart3 size={18} />
                Analytics
              </Link>

              <Link
                href="/settings"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Settings size={18} />
                Settings
              </Link>

              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </nav>

            {/* User */}
            <div className="border-t border-slate-100 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400">
                  SP
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
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
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Email Analyzer
              </h2>
            </div>

            <Link
              href="/history"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <History size={16} />
              View history
            </Link>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles size={16} />
                AI Email Intelligence
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Understand every email in seconds.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                Paste an email below and MailBrief AI will summarize it,
                extract important points, identify action items, and highlight
                important dates.
              </p>
            </div>

            {/* Analyzer Grid */}
            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              {/* Email Input */}
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Email to analyze
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Paste the complete email content below.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                      <FileText size={17} />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Sender */}
                  <div>
                    <label
                      htmlFor="sender"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      Sender
                    </label>

                    <input
                      id="sender"
                      type="email"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder="sender@company.com"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mt-5">
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* Body */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400"
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
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Analyze Button */}
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#111827] text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Analyzing with Gemini...
                      </>
                    ) : (
                      <>
                        <Sparkles size={17} />
                        Analyze with Gemini AI
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                {/* Ready Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <CheckCircle2 size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
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
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    What you'll get
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    One clear brief.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
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
                <div className="rounded-3xl bg-[#111827] p-6 text-white dark:bg-slate-800">
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

            {/* Analysis Results */}
            {analysis && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={20}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    AI Analysis
                  </h2>
                </div>

                {/* Summary + Classification */}
                <div className="grid gap-6 lg:grid-cols-[1fr_0.4fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Summary
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {analysis.summary}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Classification
                    </p>

                    <div className="mt-4 space-y-3">
                      <ResultRow
                        label="Priority"
                        value={analysis.priority}
                      />

                      <ResultRow
                        label="Sentiment"
                        value={analysis.sentiment}
                      />

                      <ResultRow
                        label="Category"
                        value={analysis.category}
                      />
                    </div>
                  </div>
                </div>

                {/* Key Points */}
                <ResultSection
                  title="Key Points"
                  items={analysis.keyPoints}
                />

                {/* Action Items */}
                <ResultSection
                  title="Action Items"
                  items={analysis.actionItems}
                />

                {/* Important Dates */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Important Dates
                  </h3>

                  {analysis.importantDates.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-400">
                      No important dates were found.
                    </p>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {analysis.importantDates.map((item, index) => (
                        <div
                          key={`${item.date}-${index}`}
                          className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800"
                        >
                          <p className="font-semibold text-slate-800 dark:text-slate-100">
                            {item.date}
                          </p>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested Reply */}
                <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Suggested Reply
                  </p>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {analysis.suggestedReply}
                  </p>
                </div>

                {/* View Full Analysis */}
                {analyzedEmailId && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() =>
                        router.push(`/email/${analyzedEmailId}`)
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                    >
                      View Full Analysis
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
      <CheckCircle2
        size={17}
        className="text-emerald-500 dark:text-emerald-400"
      />

      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {text}
      </span>
    </div>
  );
}

function InfoCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
        {title}
      </p>
    </div>
  );
}

function ResultSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          No items were found.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-slate-700 dark:text-slate-200">
        {value}
      </span>
    </div>
  );
}