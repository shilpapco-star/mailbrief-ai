"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Sparkles,
  User,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Email = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  summary: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  sender_intent: string | null;
  created_at: string;
};

type KeyPoint = {
  id: string;
  point: string;
};

type ActionItem = {
  id: string;
  task: string;
  deadline: string | null;
  completed: boolean;
};

type EmailDate = {
  id: string;
  date_text: string;
  description: string;
};

type SuggestedReply = {
  id: string;
  reply: string;
};

export default function EmailDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const emailId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [email, setEmail] = useState<Email | null>(null);
  const [keyPoints, setKeyPoints] = useState<KeyPoint[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [importantDates, setImportantDates] = useState<EmailDate[]>([]);
  const [suggestedReply, setSuggestedReply] =
    useState<SuggestedReply | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const loadEmail = useCallback(async () => {
    if (!emailId) {
      setError("Email ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: emailData, error: emailError } = await supabase
        .from("emails")
        .select(
          "id, sender, subject, body, summary, priority, sender_intent, created_at"
        )
        .eq("id", emailId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (emailError) {
        console.error("Email query error:", emailError);
        throw new Error(emailError.message);
      }

      if (!emailData) {
        throw new Error(
          "This email could not be found or you do not have access to it."
        );
      }

      setEmail(emailData);

      const [
        keyPointsResult,
        actionItemsResult,
        datesResult,
        replyResult,
      ] = await Promise.all([
        supabase
          .from("email_key_points")
          .select("id, point")
          .eq("email_id", emailId)
          .order("id", { ascending: true }),

        supabase
          .from("email_action_items")
          .select("id, task, deadline, completed")
          .eq("email_id", emailId)
          .order("id", { ascending: true }),

        supabase
          .from("email_dates")
          .select("id, date_text, description")
          .eq("email_id", emailId)
          .order("id", { ascending: true }),

        supabase
          .from("suggested_replies")
          .select("id, reply")
          .eq("email_id", emailId)
          .limit(1)
          .maybeSingle(),
      ]);

      if (keyPointsResult.error) {
        console.error("Key points error:", keyPointsResult.error);
      }

      if (actionItemsResult.error) {
        console.error("Action items error:", actionItemsResult.error);
      }

      if (datesResult.error) {
        console.error("Dates error:", datesResult.error);
      }

      if (replyResult.error) {
        console.error("Reply error:", replyResult.error);
      }

      setKeyPoints(keyPointsResult.data || []);
      setActionItems(actionItemsResult.data || []);
      setImportantDates(datesResult.data || []);
      setSuggestedReply(replyResult.data || null);
    } catch (err) {
      console.error("Load email error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while loading the email."
      );
    } finally {
      setLoading(false);
    }
  }, [emailId, router]);

  useEffect(() => {
    loadEmail();
  }, [loadEmail]);

  async function toggleActionItem(
    actionId: string,
    currentStatus: boolean
  ) {
    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("email_action_items")
      .update({
        completed: !currentStatus,
      })
      .eq("id", actionId);

    if (updateError) {
      console.error("Action update error:", updateError);
      return;
    }

    setActionItems((items) =>
      items.map((item) =>
        item.id === actionId
          ? {
              ...item,
              completed: !currentStatus,
            }
          : item
      )
    );
  }

  async function copyReply() {
    if (!suggestedReply?.reply) return;

    try {
      await navigator.clipboard.writeText(suggestedReply.reply);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getPriorityClass(priority: string) {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300";

      case "HIGH":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300";

      case "MEDIUM":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/60 dark:text-yellow-300";

      default:
        return "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300";
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

            <div className="h-5 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="space-y-6">
            <div className="h-48 animate-pulse rounded-3xl bg-white shadow-sm dark:bg-slate-900" />

            <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm dark:bg-slate-900" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-60 animate-pulse rounded-3xl bg-white shadow-sm dark:bg-slate-900" />

              <div className="h-60 animate-pulse rounded-3xl bg-white shadow-sm dark:bg-slate-900" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !email) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => router.push("/history")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to History
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />

              <p>{error || "Email not found."}</p>
            </div>

            <button
              type="button"
              onClick={loadEmail}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/history")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to History
        </button>

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                    email.priority
                  )}`}
                >
                  {email.priority}
                </span>

                {email.sender_intent && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {email.sender_intent}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white md:text-3xl">
                {email.subject}
              </h1>

              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:gap-5">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  {email.sender}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {formatDate(email.created_at)}
                </span>
              </div>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <Mail size={24} />
            </div>
          </div>
        </section>

        {/* Original Email */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <Mail size={19} className="text-slate-700 dark:text-slate-300" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">
                Original Email
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Full email content
              </p>
            </div>
          </div>

          <div className="whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            {email.body}
          </div>
        </section>

        {/* AI Summary */}
        <section className="mt-6 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 shadow-sm transition-colors dark:border-indigo-900/50 dark:bg-indigo-950/30 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950/70">
              <Sparkles
                size={19}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">
                AI Summary
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Generated by MailBrief Gemini AI
              </p>
            </div>
          </div>

          <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
            {email.summary}
          </p>
        </section>

        {/* Key Points + Dates */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Key Points */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-5 text-lg font-semibold text-slate-950 dark:text-white">
              Key Points
            </h2>

            {keyPoints.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No key points were extracted.
              </p>
            ) : (
              <div className="space-y-3">
                {keyPoints.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item.point}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Important Dates */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-5 text-lg font-semibold text-slate-950 dark:text-white">
              Important Dates
            </h2>

            {importantDates.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No important dates were found.
              </p>
            ) : (
              <div className="space-y-3">
                {importantDates.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <CalendarDays
                      size={19}
                      className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                    />

                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                        {item.date_text}
                      </p>

                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Action Items */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <h2 className="mb-5 text-lg font-semibold text-slate-950 dark:text-white">
            Action Items
          </h2>

          {actionItems.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No action items were identified.
            </p>
          ) : (
            <div className="space-y-3">
              {actionItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    toggleActionItem(item.id, item.completed)
                  }
                  className="flex w-full items-start gap-3 rounded-xl bg-slate-50 p-4 text-left transition hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800"
                >
                  <CheckCircle2
                    size={20}
                    className={
                      item.completed
                        ? "mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                        : "mt-0.5 shrink-0 text-slate-300 dark:text-slate-600"
                    }
                  />

                  <div className="flex-1">
                    <p
                      className={`text-sm leading-6 ${
                        item.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {item.task}
                    </p>

                    {item.deadline && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Deadline: {item.deadline}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Suggested Reply */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                Suggested Reply
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                AI-generated professional response
              </p>
            </div>

            {suggestedReply && (
              <button
                type="button"
                onClick={copyReply}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {suggestedReply ? (
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/70">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
                {suggestedReply.reply}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No suggested reply is available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}