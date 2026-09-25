"use client";

import DashboardShell from "../components/dashboard/DashboardShell";
import {
  Calendar,
  ChevronRight,
  Clock3,
  Filter,
  History as HistoryIcon,
  Mail,
  Search,
  Sparkles,
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
    <DashboardShell>
      <div className="relative min-h-screen overflow-hidden bg-[#f6f7fb] text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-slate-100">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-300/10 blur-3xl dark:bg-fuchsia-600/10" />
        </div>

        {/* Desktop Top Bar */}
        <div className="relative hidden h-20 items-center justify-between border-b border-white/70 bg-white/65 px-8 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/40 lg:flex">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              Workspace
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Email History
            </h2>
          </div>

          <Link
            href="/analyzer"
            className="group flex items-center gap-2 rounded-xl border border-white/70 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
          >
            <Sparkles
              size={16}
              className="transition-transform group-hover:rotate-12"
            />
            Analyze email
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {/* Heading */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-3 py-1.5 text-xs font-bold text-violet-600 shadow-sm backdrop-blur-xl dark:border-violet-400/10 dark:bg-white/5 dark:text-violet-300">
              <HistoryIcon size={14} />
              Your analyzed emails
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Email History
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
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
                className="h-13 w-full rounded-2xl border border-white/80 bg-white/70 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none backdrop-blur-xl transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-500"
              />
            </div>

            <div className="relative sm:w-52">
              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="h-13 w-full appearance-none rounded-2xl border border-white/80 bg-white/70 pl-11 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none backdrop-blur-xl transition focus:border-violet-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:focus:border-violet-500"
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
              icon={<Mail size={17} />}
            />

            <StatCard
              label="Urgent"
              value={urgentCount.toString()}
              icon={<Sparkles size={17} />}
              accent="urgent"
            />

            <StatCard
              label="High priority"
              value={highCount.toString()}
              icon={<Clock3 size={17} />}
              accent="high"
            />

            <StatCard
              label="This week"
              value={thisWeekCount.toString()}
              icon={<Calendar size={17} />}
              accent="week"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-6 rounded-3xl border border-white/80 bg-white/65 p-12 text-center shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-violet-600 dark:border-slate-700 dark:border-t-violet-400" />

              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                Loading your email history...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-6 rounded-3xl border border-red-200/70 bg-red-50/80 p-5 text-sm text-red-600 shadow-sm backdrop-blur-xl dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
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
                <div className="rounded-3xl border border-dashed border-slate-300/80 bg-white/60 p-12 text-center shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-white/[0.03]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200/60 bg-violet-50/70 text-violet-500 dark:border-violet-400/10 dark:bg-violet-500/10 dark:text-violet-400">
                    <Search size={25} />
                  </div>

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
      </div>
    </DashboardShell>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: "urgent" | "high" | "week";
}) {
  const accentStyles = {
    urgent:
      "bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400",
    high:
      "bg-orange-500/10 text-orange-500 dark:bg-orange-400/10 dark:text-orange-400",
    week:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/65 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-white/[0.045]">
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl transition group-hover:bg-violet-400/20" />

      <div className="relative flex items-start justify-between">
        <p className="text-xs font-semibold text-slate-400">
          {label}
        </p>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
            accent
              ? accentStyles[accent]
              : "bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400"
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="relative mt-3 text-2xl font-bold text-slate-900 dark:text-white">
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
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-violet-500/30 dark:hover:bg-white/[0.06] sm:p-6"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-400/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            {/* Mail icon */}
            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-200/60 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 text-violet-600 shadow-sm dark:border-violet-400/10 dark:text-violet-400 sm:flex">
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
                  {email.subject}
                </h3>

                <PriorityBadge priority={email.priority} />
              </div>

              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {email.sender}
              </p>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {email.summary || email.body}
              </p>
            </div>
          </div>

          {/* AI Takeaway */}
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-violet-200/50 bg-gradient-to-r from-violet-50/80 to-cyan-50/50 p-4 dark:border-violet-400/10 dark:from-violet-500/[0.08] dark:to-cyan-500/[0.04]">
            <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl" />

            <div className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-violet-600 dark:text-violet-400">
              <Sparkles size={14} />
              AI takeaway
            </div>

            <p className="relative mt-2 text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">
              {email.summary || "AI analysis available for this email."}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-slate-200/70 pt-4 lg:w-40 lg:flex-col lg:items-end lg:border-0 lg:pt-0 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={14} />
            {formatDate(email.created_at)}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Clock3 size={14} />
            {email.sender_intent || "Other"}
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2 dark:text-violet-400">
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