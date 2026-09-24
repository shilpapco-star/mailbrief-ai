"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Mail,
  Sparkles,
} from "lucide-react";
import DashboardShell from "../components/dashboard/DashboardShell";
import { createClient } from "../../lib/supabase/client";

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
  const supabase = createClient();

  const [emailText, setEmailText] = useState("");
  const [analysis, setAnalysis] = useState<EmailAnalysis | null>(null);
  const [analyzedEmailId, setAnalyzedEmailId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, [router, supabase]);

  function handleClear() {
    setEmailText("");
    setAnalysis(null);
    setAnalyzedEmailId(null);
    setError("");
  }

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setAnalysis(null);
    setAnalyzedEmailId(null);

    const trimmedEmail = emailText.trim();

    if (!trimmedEmail) {
      setError("Please paste an email before analyzing.");
      return;
    }

    if (trimmedEmail.length < 20) {
      setError("Please paste a complete email with enough content to analyze.");
      return;
    }

    setAnalyzing(true);

    try {
      const response = await fetch("/api/analyze-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailText: trimmedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong while analyzing the email."
        );
      }

      setAnalysis(data.analysis);
      setAnalyzedEmailId(data.emailId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze the email. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-indigo-600" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            MailBrief Gemini AI Engine
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Understand your email in seconds.
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Paste your entire email below. MailBrief automatically extracts
            the important information and gives you a clear AI-powered
            breakdown.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          {/* Input */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                      Paste your email
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      From, subject and body can all be pasted together.
                    </p>
                  </div>
                </div>
              </div>

              {emailText && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <form onSubmit={handleAnalyze}>
              <div className="relative">
                <textarea
                  value={emailText}
                  onChange={(event) => setEmailText(event.target.value)}
                  placeholder={`Paste the complete email here...

Example:

From: John Smith <john@example.com>
Subject: Meeting scheduled for tomorrow

Hi Shilpa,

The meeting has been moved to 10 AM tomorrow. Please prepare the presentation before the meeting.

Thanks,
John`}
                  className="min-h-[390px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-indigo-500 dark:focus:bg-slate-950"
                  disabled={analyzing}
                />

                <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-white/90 px-2 py-1 text-[10px] text-slate-400 shadow-sm dark:bg-slate-900/90">
                  {emailText.length.toLocaleString()} characters
                </div>
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={analyzing || !emailText.trim()}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing email...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Analyze Email
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <MiniFeature label="AI Summary" />
              <MiniFeature label="Action Items" />
              <MiniFeature label="Priority & Dates" />
            </div>
          </section>

          {/* Results */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            {!analysis ? (
              <EmptyAnalysisState analyzing={analyzing} />
            ) : (
              <AnalysisResult
                analysis={analysis}
                onViewFullAnalysis={() => {
                  if (analyzedEmailId) {
                    router.push(`/email/${analyzedEmailId}`);
                  }
                }}
              />
            )}
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}

function MiniFeature({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950">
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
    </div>
  );
}

function EmptyAnalysisState({ analyzing }: { analyzing: boolean }) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10">
        {analyzing ? (
          <Loader2 className="h-7 w-7 animate-spin text-indigo-600 dark:text-indigo-400" />
        ) : (
          <FileText className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
        )}
      </div>

      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {analyzing ? "Analyzing your email..." : "Your AI analysis will appear here"}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        {analyzing
          ? "MailBrief is extracting the important information from your email."
          : "Paste a complete email on the left and click Analyze Email to get started."}
      </p>

      {!analyzing && (
        <div className="mt-6 space-y-2 text-left text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Summary and key points
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Action items and important dates
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Priority and suggested reply
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisResult({
  analysis,
  onViewFullAnalysis,
}: {
  analysis: EmailAnalysis;
  onViewFullAnalysis: () => void;
}) {
  const priorityClass = {
    LOW: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    MEDIUM:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
    HIGH:
      "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
    URGENT:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
  }[analysis.priority];

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              AI Analysis
            </span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Email insights
          </h2>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClass}`}
        >
          {analysis.priority}
        </span>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Summary
        </p>
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          {analysis.summary}
        </p>
      </div>

      {/* Key points */}
      {analysis.keyPoints.length > 0 && (
        <ResultSection title="Key points">
          <ul className="space-y-2">
            {analysis.keyPoints.map((point, index) => (
              <li
                key={index}
                className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                {point}
              </li>
            ))}
          </ul>
        </ResultSection>
      )}

      {/* Action items */}
      {analysis.actionItems.length > 0 && (
        <ResultSection title="Action items">
          <div className="space-y-2">
            {analysis.actionItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-slate-100 p-3 dark:border-slate-800"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </ResultSection>
      )}

      {/* Dates */}
      {analysis.importantDates.length > 0 && (
        <ResultSection title="Important dates">
          <div className="space-y-2">
            {analysis.importantDates.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-100 p-3 dark:border-slate-800"
              >
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.date}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </ResultSection>
      )}

      {/* Metadata */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Category
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            {analysis.category}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Sentiment
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            {analysis.sentiment}
          </p>
        </div>
      </div>

      {/* Suggested reply */}
      {analysis.suggestedReply && (
        <ResultSection title="Suggested reply">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
              {analysis.suggestedReply}
            </p>
          </div>
        </ResultSection>
      )}

      <button
        type="button"
        onClick={onViewFullAnalysis}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        View Full Analysis
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      {children}
    </div>
  );
}