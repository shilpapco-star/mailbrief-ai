"use client";

import {
  Bell,
  Bot,
  Check,
  Eye,
  KeyRound,
  LogOut,
  Palette,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardShell from "@/app/components/dashboard/DashboardShell";
import { createClient } from "@/lib/supabase/client";

type ThemeMode = "light" | "dark" | "system";

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [theme, setTheme] = useState<ThemeMode>("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  /* ==================================================
     LOAD SETTINGS
  ================================================== */

  async function loadSettings() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const metadataName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "";

      setName(profile?.full_name || metadataName || "");

      const { data: preferences } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (preferences) {
        if (
          preferences.theme === "light" ||
          preferences.theme === "dark" ||
          preferences.theme === "system"
        ) {
          setTheme(preferences.theme);
          applyTheme(preferences.theme);
        }

        if (typeof preferences.email_notifications === "boolean") {
          setEmailNotifications(preferences.email_notifications);
        }

        if (typeof preferences.ai_suggestions === "boolean") {
          setAiSuggestions(preferences.ai_suggestions);
        }
      } else {
        applyTheme("light");
      }
    } catch (error) {
      console.error("Settings load error:", error);
    } finally {
      setLoading(false);
    }
  }

  /* ==================================================
     THEME
  ================================================== */

  function applyTheme(selectedTheme: ThemeMode) {
    const root = document.documentElement;

    let darkMode = false;

    if (selectedTheme === "dark") {
      darkMode = true;
    }

    if (selectedTheme === "system") {
      darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    root.classList.toggle("dark", darkMode);
  }

  function handleThemeChange(selectedTheme: ThemeMode) {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
    setMessage("");
  }

  /* ==================================================
     SAVE PREFERENCES
  ================================================== */

  async function savePreferences() {
    if (!userId) return;

    try {
      setSaving(true);
      setMessage("");

      const { error } = await supabase
        .from("user_preferences")
        .upsert(
          {
            user_id: userId,
            theme,
            email_notifications: emailNotifications,
            ai_suggestions: aiSuggestions,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

      if (error) {
        console.error(error);
        setMessage("Could not save your preferences.");
        return;
      }

      applyTheme(theme);

      setMessage("Your preferences have been saved successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  }

  /* ==================================================
     SAVE PROFILE
  ================================================== */

  async function saveProfile() {
    if (!userId) return;

    try {
      setSaving(true);
      setMessage("");

      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            full_name: name.trim(),
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "id",
          }
        );

      if (error) {
        console.error(error);
        setMessage("Could not update your profile.");
        return;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: name.trim(),
        },
      });

      setMessage("Your profile has been updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Could not update your profile.");
    } finally {
      setSaving(false);
    }
  }

  /* ==================================================
     CHANGE PASSWORD
  ================================================== */

  async function changePassword() {
    if (newPassword.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      setChangingPassword(true);
      setMessage("");

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setNewPassword("");

      setMessage("Your password has been changed successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Could not change your password.");
    } finally {
      setChangingPassword(false);
    }
  }

  /* ==================================================
     SIGN OUT
  ================================================== */

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  /* ==================================================
     LOADING
  ================================================== */

  if (loading) {
    return (
      <DashboardShell>
        <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-4">
            <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600 dark:border-slate-700 dark:border-t-violet-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading settings...
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="relative min-h-screen overflow-hidden">
        {/* ==================================================
            AURORA BACKGROUND
        ================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-600/15" />

          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />

          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-500/10" />

          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 dark:border-violet-400/20">
                <Palette size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Settings
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Manage your profile, appearance and MailBrief preferences.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================
              MESSAGE
          ================================================== */}

          {message && (
            <div className="flex items-center gap-3 rounded-2xl border border-violet-200/70 bg-white/70 px-4 py-3 text-sm text-violet-700 shadow-sm backdrop-blur-xl dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                <Check size={15} />
              </div>

              {message}
            </div>
          )}

          {/* ==================================================
              PROFILE
          ================================================== */}

          <GlassSection
            icon={<User size={19} />}
            title="Profile"
            description="Your MailBrief account information."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Full name
                </label>

                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none backdrop-blur-md transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>

                <input
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200/80 bg-slate-100/60 px-4 py-3 text-sm text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-500"
                />
              </div>
            </div>

            <GlassButton
              onClick={saveProfile}
              disabled={saving}
              icon={<Save size={16} />}
            >
              {saving ? "Saving..." : "Save profile"}
            </GlassButton>
          </GlassSection>

          {/* ==================================================
              APPEARANCE
          ================================================== */}

          <GlassSection
            icon={<Palette size={19} />}
            title="Appearance"
            description="Choose how MailBrief should look."
          >
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Theme
              </label>

              <div className="grid gap-4 sm:grid-cols-3">
                <ThemeCard
                  title="Light"
                  description="Always use the light theme."
                  active={theme === "light"}
                  onClick={() => handleThemeChange("light")}
                  preview="light"
                />

                <ThemeCard
                  title="Dark"
                  description="Always use the dark theme."
                  active={theme === "dark"}
                  onClick={() => handleThemeChange("dark")}
                  preview="dark"
                />

                <ThemeCard
                  title="System"
                  description="Follow your device preference."
                  active={theme === "system"}
                  onClick={() => handleThemeChange("system")}
                  preview="system"
                />
              </div>
            </div>

            {/* LIVE PREVIEW */}

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <Eye size={16} />
                Live preview
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100/50 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
                <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0b1020]">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-bold text-white">
                        M
                      </div>

                      <span className="text-xs font-semibold text-slate-800 dark:text-white">
                        MailBrief
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                      <span className="text-[10px] text-slate-400">
                        AI active
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 p-4 sm:grid-cols-3">
                    <PreviewCard
                      title="Emails analyzed"
                      value="128"
                    />

                    <PreviewCard
                      title="Action items"
                      value="24"
                    />

                    <PreviewCard
                      title="Important"
                      value="8"
                    />
                  </div>

                  <div className="px-4 pb-4">
                    <div className="rounded-xl border border-violet-200/50 bg-gradient-to-r from-violet-50 to-cyan-50 p-3 dark:border-violet-500/10 dark:from-violet-950/20 dark:to-cyan-950/20">
                      <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                        AI takeaway
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Your inbox is organized and ready.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <GlassButton
              onClick={savePreferences}
              disabled={saving}
              icon={<Save size={16} />}
              primary
            >
              {saving ? "Saving..." : "Save appearance"}
            </GlassButton>
          </GlassSection>

          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          <GlassSection
            icon={<Bell size={19} />}
            title="Notifications"
            description="Control MailBrief notifications."
          >
            <PreferenceToggle
              title="Email notifications"
              description="Receive notifications about important MailBrief activity."
              enabled={emailNotifications}
              onChange={setEmailNotifications}
            />

            <div className="my-5 border-t border-slate-200/70 dark:border-white/10" />

            <PreferenceToggle
              title="AI suggestions"
              description="Show suggested replies and AI-generated recommendations."
              enabled={aiSuggestions}
              onChange={setAiSuggestions}
            />

            <GlassButton
              onClick={savePreferences}
              disabled={saving}
              icon={<Save size={16} />}
              primary
            >
              {saving ? "Saving..." : "Save preferences"}
            </GlassButton>
          </GlassSection>

          {/* ==================================================
              SECURITY
          ================================================== */}

          <GlassSection
            icon={<KeyRound size={19} />}
            title="Security"
            description="Manage your account password."
          >
            <div className="max-w-md">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                New password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none backdrop-blur-md transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-slate-500"
              />

              <GlassButton
                onClick={changePassword}
                disabled={changingPassword}
                icon={<Shield size={16} />}
                primary
              >
                {changingPassword
                  ? "Updating..."
                  : "Change password"}
              </GlassButton>
            </div>
          </GlassSection>

          {/* ==================================================
              AI ENGINE
          ================================================== */}

          <section className="relative overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50/90 via-white/70 to-cyan-50/80 p-6 shadow-xl shadow-violet-500/5 backdrop-blur-2xl dark:border-violet-500/20 dark:from-violet-950/25 dark:via-[#0a1020]/80 dark:to-cyan-950/20">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
                <Bot size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  AI engine
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                  MailBrief uses the Gemini AI engine to analyze
                  email content and generate summaries, action
                  items, dates and suggested replies.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/70" />
                  AI engine connected
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================
              SIGN OUT
          ================================================== */}

          <section className="rounded-3xl border border-red-200/60 bg-red-50/50 p-6 shadow-lg shadow-red-500/5 backdrop-blur-xl dark:border-red-500/15 dark:bg-red-950/10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                    <LogOut size={17} />
                  </div>

                  <h2 className="font-semibold text-red-700 dark:text-red-400">
                    Sign out
                  </h2>
                </div>

                <p className="mt-2 text-sm text-red-600/70 dark:text-red-400/70">
                  Sign out of your MailBrief account on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm backdrop-blur-md transition hover:border-red-300 hover:bg-red-50 hover:shadow-md dark:border-red-900/50 dark:bg-red-950/20 dark:hover:bg-red-950/40"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <div className="pb-4 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-600">
              MailBrief AI · Your inbox, understood.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

/* ==================================================
   GLASS SECTION
================================================== */

function GlassSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/65 p-6 shadow-xl shadow-slate-900/[0.03] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-white/[0.035] dark:shadow-black/20 sm:p-7">
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/[0.04] blur-3xl" />

      <div className="relative">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200/60 bg-gradient-to-br from-violet-500/10 to-cyan-400/10 text-violet-600 dark:border-violet-500/20 dark:text-violet-400">
            {icon}
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

/* ==================================================
   GLASS BUTTON
================================================== */

function GlassButton({
  children,
  onClick,
  disabled,
  icon,
  primary = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        primary
          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700"
          : "border border-slate-200 bg-white/70 text-slate-700 shadow-sm backdrop-blur-md hover:border-violet-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-violet-500/30 dark:hover:bg-white/[0.07]"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

/* ==================================================
   THEME CARD
================================================== */

function ThemeCard({
  title,
  description,
  active,
  onClick,
  preview,
}: {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
  preview: "light" | "dark" | "system";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${
        active
          ? "border-violet-400 bg-violet-50/70 shadow-lg shadow-violet-500/10 dark:border-violet-500/50 dark:bg-violet-950/20"
          : "border-slate-200/80 bg-white/40 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-white/70 hover:shadow-lg dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-violet-500/30 dark:hover:bg-white/[0.05]"
      }`}
    >
      {active && (
        <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-violet-500/10 blur-2xl" />
      )}

      {/* PREVIEW */}

      <div
        className={`relative mb-4 h-20 overflow-hidden rounded-xl border shadow-inner ${
          preview === "dark"
            ? "border-slate-700 bg-slate-950"
            : "border-slate-200 bg-white"
        }`}
      >
        <div
          className={`flex h-5 items-center gap-1 px-2 ${
            preview === "dark"
              ? "bg-slate-800"
              : "bg-slate-100"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </div>

        <div className="flex gap-2 p-2">
          <div
            className={`h-11 w-7 rounded ${
              preview === "dark"
                ? "bg-slate-800"
                : "bg-slate-100"
            }`}
          />

          <div className="flex-1 space-y-1.5">
            <div
              className={`h-2 w-3/4 rounded ${
                preview === "dark"
                  ? "bg-slate-700"
                  : "bg-slate-200"
              }`}
            />

            <div
              className={`h-2 w-1/2 rounded ${
                preview === "dark"
                  ? "bg-slate-700"
                  : "bg-slate-200"
              }`}
            />

            <div className="h-2 w-1/3 rounded bg-gradient-to-r from-violet-500 to-cyan-400" />
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        {active && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20">
            <Check size={14} />
          </div>
        )}
      </div>
    </button>
  );
}

/* ==================================================
   PREVIEW CARD
================================================== */

function PreviewCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-white/[0.07] dark:bg-white/[0.025]">
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

/* ==================================================
   PREFERENCE TOGGLE
================================================== */

function PreferenceToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
          enabled
            ? "border-violet-500/30 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20"
            : "border-slate-300 bg-slate-200 dark:border-white/10 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}