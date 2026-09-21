"use client";

import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock3,
  Filter,
  History as HistoryIcon,
  Mail,
  Menu,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type EmailRecord = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  summary: string | null;
  priority: string;
  sender_intent: string | null;
  created_at: string;
};

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("ALL");

  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please sign in to view your email history.");
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("emails")
        .select(
          "id, sender, subject, body, summary, priority, sender_intent, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("History fetch error:", fetchError);
        setError(fetchError.message);
        return;
      }

      setEmails(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load your email history.");
    } finally {
      setLoading(false);
    }
  }

  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        email.sender.toLowerCase().includes(searchText) ||
        email.subject.toLowerCase().includes(searchText) ||
        email.body.toLowerCase().includes(searchText) ||
        (email.summary || "").toLowerCase().includes(searchText);

      const matchesPriority =
        priority === "ALL" || email.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [emails, search, priority]);

  const urgentCount = emails.filter(
    (email) => email.priority === "URGENT"
  ).length;

  const highCount = emails.filter(
    (email) => email.priority === "HIGH"
  ).length;

  const thisWeekCount = emails.filter((email) => {
    const createdAt = new Date(email.created_at);
    const now = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return createdAt >= weekAgo;
  }).length;

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
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Sparkles size={18} />
                Email Analyzer
              </Link>

              <Link
                href="/history"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
              >
                <HistoryIcon size={18} />
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

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Desktop Top Bar */}
          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Email History
              </h2>
            </div>

            <Link
              href="/analyzer"
              className="flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              <Sparkles size={16} />
              Analyze email
            </Link>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Heading */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                <HistoryIcon size={16} />
                Your analyzed emails
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                Email History
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Review your previous email analyses and AI takeaways.
              </p>
            </div>

            {/* Search + Filter */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search emails, senders or subjects..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <div className="relative sm:w-48">
                <Filter
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-600 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="ALL">All priorities</option>
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                label="Total analyzed"
                value={emails.length.toString()}
              />

              <StatCard
                label="Urgent"
                value={urgentCount.toString()}
              />

              <StatCard
                label="High priority"
                value={highCount.toString()}
              />

              <StatCard
                label="This week"
                value={thisWeekCount.toString()}
              />
            </div>

            {/* Loading */}
            {loading && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />

                <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Loading your email history...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Email List */}
            {!loading && !error && (
              <div className="mt-6 space-y-4">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <EmailCard key={email.id} email={email} />
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
                    <Search
                      size={28}
                      className="mx-auto text-slate-300 dark:text-slate-600"
                    />

                    <h3 className="mt-4 font-bold text-slate-800 dark:text-slate-100">
                      No emails found
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {emails.length === 0
                        ? "Analyze your first email to see it here."
                        : "Try changing your search or priority filter."}
                    </p>
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

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function EmailCard({
  email,
}: {
  email: EmailRecord;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/email/${email.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          router.push(`/email/${email.id}`);
        }
      }}
      className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800 dark:hover:bg-slate-900 sm:p-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 sm:flex">
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {email.subject}
                </h3>

                <PriorityBadge priority={email.priority} />
              </div>

              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {email.sender}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {email.summary || email.body}
              </p>
            </div>
          </div>

          {/* AI Takeaway */}
          <div className="mt-5 rounded-2xl bg-indigo-50/60 p-4 dark:bg-indigo-950/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              <Sparkles size={14} />
              AI takeaway
            </div>

            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              {email.summary ||
                "AI analysis available for this email."}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-4 lg:w-40 lg:flex-col lg:items-end">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={14} />
            {formatDate(email.created_at)}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock3 size={14} />
            {email.sender_intent || "Other"}
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            View
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    URGENT:
      "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400",
    HIGH:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
    MEDIUM:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    LOW:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[priority] ||
        "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
      }`}
    >
      {priority}
    </span>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}