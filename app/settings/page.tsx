"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  Bot,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Moon,
  Shield,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useTheme } from "../providers/ThemeProvider";

export default function SettingsPage() {
  const { setTheme } = useTheme();

  // --------------------------------------------------
  // PROFILE
  // --------------------------------------------------

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");

  // --------------------------------------------------
  // PASSWORD
  // --------------------------------------------------

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // --------------------------------------------------
  // PREFERENCES
  // --------------------------------------------------

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [weeklyInsights, setWeeklyInsights] = useState(true);

  const [autoAnalyze, setAutoAnalyze] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [loadingPreferences, setLoadingPreferences] =
    useState(true);

  const [preferenceMessage, setPreferenceMessage] =
    useState("");

  const [preferenceError, setPreferenceError] = useState("");

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadProfile();
    loadPreferences();
  }, []);

  // --------------------------------------------------
  // LOAD PROFILE
  // --------------------------------------------------

  async function loadProfile() {
    try {
      setLoadingProfile(true);
      setProfileError("");

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setProfileError("Unable to load your account.");
        return;
      }

      setEmail(user.email || "");
      setFullName(user.user_metadata?.full_name || "");
    } catch (error) {
      console.error("Profile loading error:", error);
      setProfileError("Unable to load your profile.");
    } finally {
      setLoadingProfile(false);
    }
  }

  // --------------------------------------------------
  // SAVE PROFILE
  // --------------------------------------------------

  async function saveProfile() {
    try {
      setSavingProfile(true);
      setProfileMessage("");
      setProfileError("");

      const trimmedName = fullName.trim();

      if (!trimmedName) {
        setProfileError("Please enter your full name.");
        return;
      }

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setProfileError("You must be logged in.");
        return;
      }

      const { error: updateError } =
        await supabase.auth.updateUser({
          data: {
            full_name: trimmedName,
          },
        });

      if (updateError) {
        setProfileError(updateError.message);
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: trimmedName,
        })
        .eq("id", user.id);

      if (profileError) {
        console.error(
          "Profile database update error:",
          profileError
        );
      }

      setFullName(trimmedName);
      setProfileMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile save error:", error);
      setProfileError("Unable to save your profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  // --------------------------------------------------
  // LOAD PREFERENCES
  // --------------------------------------------------

  async function loadPreferences() {
    try {
      setLoadingPreferences(true);
      setPreferenceError("");

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setPreferenceError("Unable to load preferences.");
        return;
      }

      const { data, error } = await supabase
        .from("user_preferences")
        .select(
          "email_notifications, weekly_insights, auto_analyze, dark_mode"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Preferences loading error:", error);
        setPreferenceError("Unable to load your preferences.");
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase
          .from("user_preferences")
          .insert({
            user_id: user.id,
            email_notifications: true,
            weekly_insights: true,
            auto_analyze: false,
            dark_mode: false,
          });

        if (insertError) {
          console.error(
            "Default preferences creation error:",
            insertError
          );
        }

        setEmailNotifications(true);
        setWeeklyInsights(true);
        setAutoAnalyze(false);
        setDarkMode(false);

        setTheme("light");

        return;
      }

      setEmailNotifications(data.email_notifications);
      setWeeklyInsights(data.weekly_insights);
      setAutoAnalyze(data.auto_analyze);
      setDarkMode(data.dark_mode);

      setTheme(data.dark_mode ? "dark" : "light");
    } catch (error) {
      console.error("Preferences loading error:", error);
      setPreferenceError("Unable to load your preferences.");
    } finally {
      setLoadingPreferences(false);
    }
  }

  // --------------------------------------------------
  // UPDATE PREFERENCE
  // --------------------------------------------------

  async function updatePreference(
    field:
      | "email_notifications"
      | "weekly_insights"
      | "auto_analyze"
      | "dark_mode",
    value: boolean
  ) {
    try {
      setPreferenceMessage("");
      setPreferenceError("");

      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setPreferenceError("You must be logged in.");
        return;
      }

      const { error } = await supabase
        .from("user_preferences")
        .update({
          [field]: value,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) {
        console.error("Preference update error:", error);
        setPreferenceError("Unable to save this preference.");
        return;
      }

      setPreferenceMessage("Preference saved.");
    } catch (error) {
      console.error("Preference update error:", error);
      setPreferenceError("Unable to save this preference.");
    }
  }

  // --------------------------------------------------
  // CHANGE PASSWORD
  // --------------------------------------------------

  async function handleChangePassword() {
    try {
      setPasswordMessage("");
      setPasswordError("");

      if (!newPassword) {
        setPasswordError("Please enter a new password.");
        return;
      }

      if (newPassword.length < 8) {
        setPasswordError(
          "Password must be at least 8 characters long."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setPasswordError(
          "New password and confirm password do not match."
        );
        return;
      }

      setChangingPassword(true);

      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Password update error:", error);
        setPasswordError(error.message);
        return;
      }

      setNewPassword("");
      setConfirmPassword("");
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      setPasswordMessage("Password updated successfully.");
      setShowPasswordForm(false);
    } catch (error) {
      console.error("Password change error:", error);

      setPasswordError(
        "Unable to update your password. Please try again."
      );
    } finally {
      setChangingPassword(false);
    }
  }

  // --------------------------------------------------
  // DARK MODE
  // --------------------------------------------------

  function handleDarkModeChange() {
    const newValue = !darkMode;

    setDarkMode(newValue);

    setTheme(newValue ? "dark" : "light");

    updatePreference("dark_mode", newValue);
  }

  // --------------------------------------------------
  // SIGN OUT
  // --------------------------------------------------

  async function handleSignOut() {
    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error);
        return;
      }

      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen">

        {/* ==================================================
            SHARED SIDEBAR
        ================================================== */}

        <DashboardSidebar />

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <section className="min-w-0 flex-1">

          {/* MOBILE HEADER */}

          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white dark:bg-indigo-600">
                <Mail size={18} />
              </div>

              <span className="font-bold text-slate-900 dark:text-white">
                MailBrief
                <span className="text-indigo-600"> AI</span>
              </span>
            </Link>
          </header>

          {/* DESKTOP TOP BAR */}

          <div className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900 lg:flex">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Workspace
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Settings
              </h2>
            </div>

            <Link
              href="/analyzer"
              className="flex items-center gap-2 rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              <Bot size={16} />
              Analyze email
            </Link>
          </div>

          {/* PAGE */}

          <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:py-10">

            {/* HEADING */}

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Account preferences
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Settings
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                Customize your profile, notifications, AI behavior
                and account security.
              </p>
            </div>

            {/* ==================================================
                PROFILE
            ================================================== */}

            <SettingsSection
              icon={<User size={19} />}
              title="Profile information"
              description="Your basic account information"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Full name"
                  value={fullName}
                  onChange={setFullName}
                  disabled={loadingProfile}
                />

                <InputField
                  label="Email address"
                  value={email}
                  disabled
                />
              </div>

              <button
                type="button"
                onClick={saveProfile}
                disabled={savingProfile || loadingProfile}
                className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {savingProfile ? "Saving..." : "Save changes"}
              </button>

              {profileMessage && (
                <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {profileMessage}
                </p>
              )}

              {profileError && (
                <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
                  {profileError}
                </p>
              )}
            </SettingsSection>

            {/* ==================================================
                NOTIFICATIONS
            ================================================== */}

            <SettingsSection
              icon={<Bell size={19} />}
              title="Notifications"
              description="Choose how MailBrief keeps you updated"
            >
              <ToggleRow
                title="Email notifications"
                description="Receive important account and analysis notifications."
                enabled={emailNotifications}
                disabled={loadingPreferences}
                onChange={() => {
                  const newValue = !emailNotifications;

                  setEmailNotifications(newValue);

                  updatePreference(
                    "email_notifications",
                    newValue
                  );
                }}
              />

              <ToggleRow
                title="Weekly productivity insights"
                description="Get a weekly summary of your email activity."
                enabled={weeklyInsights}
                disabled={loadingPreferences}
                onChange={() => {
                  const newValue = !weeklyInsights;

                  setWeeklyInsights(newValue);

                  updatePreference(
                    "weekly_insights",
                    newValue
                  );
                }}
              />
            </SettingsSection>

            {/* ==================================================
                AI PREFERENCES
            ================================================== */}

            <SettingsSection
              icon={<Bot size={19} />}
              title="AI preferences"
              description="Control how MailBrief analyzes your emails"
            >
              <ToggleRow
                title="Automatic analysis"
                description="Automatically analyze emails when they are added."
                enabled={autoAnalyze}
                disabled={loadingPreferences}
                onChange={() => {
                  const newValue = !autoAnalyze;

                  setAutoAnalyze(newValue);

                  updatePreference(
                    "auto_analyze",
                    newValue
                  );
                }}
              />

              <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-800">
                    <Bot size={19} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      MailBrief Gemini AI Engine
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Your emails are analyzed for summaries, key
                      points, action items, important dates, priority
                      and suggested replies.
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <Check size={14} />
                      AI analysis enabled
                    </div>
                  </div>
                </div>
              </div>
            </SettingsSection>

            {/* ==================================================
                SECURITY
            ================================================== */}

            <SettingsSection
              icon={<Shield size={19} />}
              title="Security"
              description="Manage your account protection"
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">

                {/* PASSWORD */}

                <div className="py-5 first:pt-0">
                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        <Lock size={18} />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          Password
                        </h4>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Change your account password
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(!showPasswordForm);
                        setPasswordMessage("");
                        setPasswordError("");
                      }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {showPasswordForm ? "Cancel" : "Change"}

                      {!showPasswordForm && (
                        <ChevronRight size={15} />
                      )}
                    </button>
                  </div>

                  {showPasswordForm && (
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/60">

                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Change your password
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Choose a strong password with at least 8
                        characters.
                      </p>

                      {/* NEW PASSWORD */}

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          New password
                        </label>

                        <div className="relative">
                          <input
                            type={
                              showNewPassword
                                ? "text"
                                : "password"
                            }
                            value={newPassword}
                            onChange={(event) =>
                              setNewPassword(event.target.value)
                            }
                            placeholder="Enter new password"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowNewPassword(
                                !showNewPassword
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            {showNewPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* CONFIRM PASSWORD */}

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Confirm new password
                        </label>

                        <div className="relative">
                          <input
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(
                                event.target.value
                              )
                            }
                            placeholder="Confirm new password"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      {passwordError && (
                        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                          {passwordError}
                        </div>
                      )}

                      {passwordMessage && (
                        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                          ✓ {passwordMessage}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={changingPassword}
                        className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                      >
                        {changingPassword
                          ? "Updating..."
                          : "Update password"}
                      </button>
                    </div>
                  )}
                </div>

                {/* EMAIL VERIFICATION */}

                <div className="flex items-center justify-between gap-4 py-5 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Mail size={18} />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Email verification
                      </h4>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Your email address is verified
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Check size={13} />
                    Verified
                  </span>
                </div>
              </div>
            </SettingsSection>

            {/* ==================================================
                APPEARANCE
            ================================================== */}

            <SettingsSection
              icon={<Moon size={19} />}
              title="Appearance"
              description="Customize the way MailBrief looks"
            >
              <ToggleRow
                title="Dark mode"
                description="Use a darker interface throughout the application."
                enabled={darkMode}
                disabled={loadingPreferences}
                onChange={handleDarkModeChange}
              />

              <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {darkMode
                  ? "Dark mode is currently active."
                  : "Light mode is currently active."}
              </p>
            </SettingsSection>

            {/* PREFERENCE STATUS */}

            {preferenceMessage && (
              <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                ✓ {preferenceMessage}
              </div>
            )}

            {preferenceError && (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                {preferenceError}
              </div>
            )}

            {/* ==================================================
                SIGN OUT
            ================================================== */}

            <section className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm dark:border-red-500/20 dark:bg-slate-900">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Sign out
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Sign out of your MailBrief account on this
                    device.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <LogOut size={17} />
                  Sign out
                </button>
              </div>
            </section>

            <div className="py-10 text-center text-xs text-slate-400">
              MailBrief AI · Your email, understood.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ==================================================
   SHARED DASHBOARD SIDEBAR
================================================== */

function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
      <div className="flex min-h-screen flex-col">

        {/* LOGO */}

        <div className="flex h-20 items-center border-b border-slate-100 px-6 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
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

        {/* NAVIGATION */}

        <nav className="flex-1 space-y-2 p-4">
          <DashboardLink
            href="/analyzer"
            icon={<Bot size={18} />}
            label="Email Analyzer"
          />

          <DashboardLink
            href="/history"
            icon={<Mail size={18} />}
            label="Email History"
          />

          <DashboardLink
            href="/analytics"
            icon={<Bot size={18} />}
            label="Analytics"
          />

          <DashboardLink
            href="/settings"
            icon={<User size={18} />}
            label="Settings"
            active
          />

          <DashboardLink
            href="/"
            icon={<ChevronRight size={18} />}
            label="Back to Home"
          />
        </nav>

        {/* USER */}

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
  );
}

/* ==================================================
   DASHBOARD LINK
================================================== */

function DashboardLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
        active
          ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

/* ==================================================
   SETTINGS SECTION
================================================== */

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

/* ==================================================
   INPUT FIELD
================================================== */

function InputField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        disabled={disabled}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500"
            : "border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        }`}
      />
    </label>
  );
}

/* ==================================================
   TOGGLE
================================================== */

function ToggleRow({
  title,
  description,
  enabled,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <div>
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h4>

        <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        aria-label={`Toggle ${title}`}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-indigo-600"
            : "bg-slate-300 dark:bg-slate-700"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
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