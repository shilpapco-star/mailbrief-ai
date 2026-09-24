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

  const [emailNotifications, setEmailNotifications] =
    useState(true);

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

      /* ---------- PROFILE ---------- */

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

      /* ---------- PREFERENCES ---------- */

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

        if (
          typeof preferences.email_notifications ===
          "boolean"
        ) {
          setEmailNotifications(
            preferences.email_notifications
          );
        }

        if (
          typeof preferences.ai_suggestions === "boolean"
        ) {
          setAiSuggestions(
            preferences.ai_suggestions
          );
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
     SAVE APPEARANCE + PREFERENCES
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
        setMessage(
          "Could not save your preferences."
        );
        return;
      }

      applyTheme(theme);

      setMessage(
        "Your preferences have been saved successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong while saving."
      );
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
        setMessage(
          "Could not update your profile."
        );
        return;
      }

      await supabase.auth.updateUser({
        data: {
          full_name: name.trim(),
        },
      });

      setMessage(
        "Your profile has been updated successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Could not update your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  /* ==================================================
     CHANGE PASSWORD
  ================================================== */

  async function changePassword() {
    if (newPassword.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
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

      setMessage(
        "Your password has been changed successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Could not change your password."
      );
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
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
        </div>
      </DashboardShell>
    );
  }

  /* ==================================================
     PAGE
  ================================================== */

  return (
    <DashboardShell>
      <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your profile, appearance and MailBrief preferences.
          </p>
        </div>

        {/* ==================================================
            MESSAGE
        ================================================== */}

        {message && (
          <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Check size={17} />
            {message}
          </div>
        )}

        {/* ==================================================
            PROFILE
        ================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <User size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Profile
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your MailBrief account information
              </p>
            </div>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Full name
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
              </label>

              <input
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />

            {saving
              ? "Saving..."
              : "Save profile"}
          </button>

        </section>

        {/* ==================================================
            APPEARANCE
        ================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Palette size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Appearance
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose how MailBrief should look.
              </p>
            </div>

          </div>

          {/* THEME OPTIONS */}

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Theme
            </label>

            <div className="grid gap-3 sm:grid-cols-3">

              <ThemeCard
                title="Light"
                description="Always use the light theme."
                active={theme === "light"}
                onClick={() =>
                  handleThemeChange("light")
                }
                preview="light"
              />

              <ThemeCard
                title="Dark"
                description="Always use the dark theme."
                active={theme === "dark"}
                onClick={() =>
                  handleThemeChange("dark")
                }
                preview="dark"
              />

              <ThemeCard
                title="System"
                description="Follow your device preference."
                active={theme === "system"}
                onClick={() =>
                  handleThemeChange("system")
                }
                preview="system"
              />

            </div>
          </div>

          {/* LIVE PREVIEW */}

          <div className="mt-8">

            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200">
              <Eye size={16} />
              Live preview
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">

                {/* MINI HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">

                  <div className="flex items-center gap-2">

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white dark:bg-indigo-600">
                      M
                    </div>

                    <span className="text-xs font-semibold text-slate-800 dark:text-white">
                      MailBrief
                    </span>

                  </div>

                  <div className="h-2 w-2 rounded-full bg-emerald-500" />

                </div>

                {/* MINI CONTENT */}

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

                  <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950/30">

                    <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
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

          {/* SAVE */}

          <button
            type="button"
            onClick={savePreferences}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />

            {saving
              ? "Saving..."
              : "Save appearance"}
          </button>

        </section>

        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Notifications
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Control MailBrief notifications.
              </p>
            </div>

          </div>

          <PreferenceToggle
            title="Email notifications"
            description="Receive notifications about important MailBrief activity."
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />

          <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

          <PreferenceToggle
            title="AI suggestions"
            description="Show suggested replies and AI-generated recommendations."
            enabled={aiSuggestions}
            onChange={setAiSuggestions}
          />

          <button
            type="button"
            onClick={savePreferences}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={16} />

            {saving
              ? "Saving..."
              : "Save preferences"}
          </button>

        </section>

        {/* ==================================================
            SECURITY
        ================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <KeyRound size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Security
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage your account password.
              </p>
            </div>

          </div>

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
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            <button
              type="button"
              onClick={changePassword}
              disabled={changingPassword}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              <Shield size={16} />

              {changingPassword
                ? "Updating..."
                : "Change password"}
            </button>

          </div>

        </section>

        {/* ==================================================
            AI ENGINE
        ================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Bot size={19} />
            </div>

            <div>

              <h2 className="font-semibold text-slate-900 dark:text-white">
                AI engine
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                MailBrief uses the Gemini AI engine to analyze
                email content and generate summaries, action
                items, dates and suggested replies.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                AI engine connected
              </div>

            </div>

          </div>

        </section>

        {/* ==================================================
            SIGN OUT
        ================================================== */}

        <section className="rounded-2xl border border-red-100 bg-red-50/50 p-6 dark:border-red-950 dark:bg-red-950/20">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <h2 className="font-semibold text-red-700 dark:text-red-400">
                Sign out
              </h2>

              <p className="mt-1 text-sm text-red-600/70 dark:text-red-400/70">
                Sign out of your MailBrief account on this device.
              </p>

            </div>

            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:bg-red-950/30 dark:hover:bg-red-950/50"
            >
              <LogOut size={16} />
              Sign out
            </button>

          </div>

        </section>

      </div>
    </DashboardShell>
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
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-indigo-500 bg-indigo-50/70 shadow-sm dark:border-indigo-500 dark:bg-indigo-950/30"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:hover:border-slate-600"
      }`}
    >
      {/* MINI THEME PREVIEW */}

      <div
        className={`mb-4 h-20 overflow-hidden rounded-xl border ${
          preview === "dark"
            ? "border-slate-700 bg-slate-900"
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

            <div className="h-2 w-1/3 rounded bg-indigo-500" />
          </div>

        </div>
      </div>

      {/* TEXT */}

      <div className="flex items-center justify-between gap-2">

        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        {active && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
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
    <div className="rounded-xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
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
        <h3 className="text-sm font-medium text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-indigo-600"
            : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}