"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkResetSession();
  }, []);

  async function checkResetSession() {
    try {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "This password reset link is invalid or has expired. Please request a new one."
        );
      }
    } catch (error) {
      console.error("Reset session error:", error);

      setError(
        "Unable to verify the password reset session."
      );
    } finally {
      setCheckingSession(false);
    }
  }

  async function handleResetPassword() {
    try {
      setError("");
      setMessage("");

      if (!newPassword) {
        setError("Please enter a new password.");
        return;
      }

      if (newPassword.length < 8) {
        setError(
          "Password must be at least 8 characters long."
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setError(
          "New password and confirm password do not match."
        );
        return;
      }

      setLoading(true);

      const supabase = createClient();

      const { error: updateError } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        console.error(
          "Password reset error:",
          updateError
        );

        setError(updateError.message);
        return;
      }

      setSuccess(true);
      setMessage(
        "Your password has been updated successfully."
      );

      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password reset error:", error);

      setError(
        "Unable to reset your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-5 text-white">
        {/* Aurora background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="absolute bottom-[-180px] left-[-100px] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[110px]" />
        </div>

        <div className="relative text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
            <Loader2
              className="animate-spin text-violet-300"
              size={25}
            />
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Verifying your password reset link...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* =====================================================
          Aurora Background
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute right-[-120px] top-[35%] h-[380px] w-[380px] rounded-full bg-fuchsia-500/10 blur-[130px]" />

        <div className="absolute bottom-[-180px] left-[-100px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_38%)]" />

      </div>

      {/* =====================================================
          Header
      ====================================================== */}

      <header className="relative z-10 border-b border-white/[0.07] bg-[#050816]/60 backdrop-blur-xl">

        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07] shadow-lg shadow-violet-950/20">
              <Sparkles
                size={15}
                className="text-violet-300"
              />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Mail
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Brief
              </span>
            </span>
          </Link>

          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to login
          </Link>

        </div>

      </header>

      {/* =====================================================
          Main
      ====================================================== */}

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12 sm:py-16">

        <div className="w-full max-w-md">

          {/* =================================================
              Card
          ================================================= */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

            {/* Card glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            {!success ? (
              <div className="relative">

                {/* =================================================
                    Icon
                ================================================== */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/20">
                  <LockKeyhole size={25} />
                </div>

                {/* =================================================
                    Heading
                ================================================== */}

                <div className="mt-6">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">
                    Account security
                  </p>

                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                    Reset your password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Create a new password to keep your
                    MailBrief account secure.
                  </p>

                </div>

                {/* =================================================
                    New Password
                ================================================== */}

                <div className="mt-7">

                  <label className="mb-2 block text-sm font-medium text-slate-200">
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
                      disabled={loading}
                      className="w-full rounded-xl border border-white/[0.10] bg-black/20 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showNewPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>

                </div>

                {/* =================================================
                    Confirm Password
                ================================================== */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-medium text-slate-200">
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
                      placeholder="Confirm your password"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/[0.10] bg-black/20 px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* =================================================
                    Error
                ================================================== */}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-400/15 bg-red-500/[0.08] px-4 py-3 text-sm font-medium leading-5 text-red-300">
                    {error}
                  </div>
                )}

                {/* =================================================
                    Submit
                ================================================== */}

                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={loading || !!error}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Updating password...
                    </>
                  ) : (
                    "Update password"
                  )}
                </button>

                {/* =================================================
                    Security Note
                ================================================== */}

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] p-4">

                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-300"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your password is securely managed by
                    Supabase Auth. MailBrief does not store
                    your password in the application database.
                  </p>

                </div>

              </div>
            ) : (
              /* =================================================
                 Success
              ================================================== */

              <div className="relative py-6 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 shadow-lg shadow-emerald-950/20">
                  <CheckCircle2 size={32} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                  All set
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  Password updated
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                  {message}
                </p>

                <Link
                  href="/login"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] hover:shadow-violet-900/40"
                >
                  Continue to login
                </Link>

              </div>
            )}

          </div>

          {/* =====================================================
              Footer
          ====================================================== */}

          <p className="mt-6 text-center text-xs text-slate-600">
            MailBrief AI · Your email, understood.
          </p>

        </div>

      </div>
    </main>
  );
}