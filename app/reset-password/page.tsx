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
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5">
        <div className="text-center">
          <Loader2
            className="mx-auto animate-spin text-indigo-600"
            size={28}
          />

          <p className="mt-4 text-sm text-slate-500">
            Verifying your password reset link...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">

          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Mail<span className="text-indigo-600">Brief</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

        </div>
      </header>

      {/* Main */}

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12">

        <div className="w-full max-w-md">

          {/* Card */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {!success ? (
              <>
                {/* Icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <LockKeyhole size={26} />
                </div>

                {/* Heading */}

                <div className="mt-6">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Reset your password
                  </h1>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create a new password for your MailBrief
                    account.
                  </p>
                </div>

                {/* Password */}

                <div className="mt-7">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Use at least 8 characters.
                  </p>

                </div>

                {/* Confirm Password */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
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
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Error */}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-5 text-red-600">
                    {error}
                  </div>
                )}

                {/* Submit */}

                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={loading || !!error}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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

                {/* Security */}

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">

                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Your password is securely managed by
                    Supabase Auth. MailBrief does not store your
                    password in the application database.
                  </p>

                </div>
              </>
            ) : (
              /* Success */

              <div className="py-6 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>

                <h1 className="mt-6 text-2xl font-bold tracking-tight">
                  Password updated
                </h1>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  {message}
                </p>

                <Link
                  href="/login"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Continue to login
                </Link>

              </div>
            )}

          </div>

          {/* Footer */}

          <p className="mt-6 text-center text-xs text-slate-400">
            MailBrief AI · Your email, understood.
          </p>

        </div>

      </div>
    </main>
  );
}