"use client";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      window.location.href = "/analyzer";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const supabase = createClient();

      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });

      if (googleError) {
        setError(googleError.message);
        setLoading(false);
      }
    } catch {
      setError("Unable to sign in with Google. Please try again.");
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError(
        "Enter your email address first, then click Forgot password."
      );
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(trimmedEmail, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        console.error("PASSWORD RESET ERROR:", resetError);
        setError(resetError.message);
        return;
      }

      setMessage(
        "Password reset instructions have been sent. Please check your inbox and spam folder."
      );
    } catch (err) {
      console.error("PASSWORD RESET EXCEPTION:", err);

      setError(
        "Unable to send password reset instructions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-8 text-white sm:px-6">

      {/* =====================================================
          Aurora Background
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-[-240px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[145px]" />

        <div className="absolute right-[-150px] top-[25%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[135px]" />

        <div className="absolute bottom-[-180px] left-[-100px] h-[430px] w-[430px] rounded-full bg-cyan-500/10 blur-[135px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_38%)]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]" />

      </div>

      {/* =====================================================
          Top Navigation
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-6xl">

        <div className="flex items-center justify-between">

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            Back to home
          </Link>

          <Link
            href="/register"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Create account
          </Link>

        </div>

      </div>

      {/* =====================================================
          Login Section
      ====================================================== */}

      <section className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center py-10">

        <div className="w-full max-w-md">

          {/* =================================================
              Brand
          ================================================== */}

          <div className="mb-7 text-center">

            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] shadow-lg shadow-violet-950/20">
                <Sparkles
                  size={18}
                  className="text-violet-300"
                />
              </div>

              <span className="text-xl font-bold tracking-tight">
                Mail
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Brief
                </span>
              </span>

            </Link>

          </div>

          {/* =================================================
              Login Card
          ================================================== */}

          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.055] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">

            {/* Card glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">

              {/* =================================================
                  Heading
              ================================================== */}

              <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-950/20">
                  <LockKeyhole size={25} />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300/80">
                  Welcome back
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                  Sign in to MailBrief
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">
                  Continue to your workspace and understand
                  your emails in seconds.
                </p>

              </div>

              {/* =================================================
                  Google
              ================================================== */}

              <div className="mt-7">

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.04] text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:border-white/[0.16] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-sm font-bold text-slate-900">
                    G
                  </span>

                  {loading
                    ? "Connecting..."
                    : "Continue with Google"}

                </button>

              </div>

              {/* =================================================
                  Divider
              ================================================== */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/[0.08]" />

                <span className="whitespace-nowrap text-[10px] font-semibold tracking-[0.14em] text-slate-600">
                  OR CONTINUE WITH EMAIL
                </span>

                <div className="h-px flex-1 bg-white/[0.08]" />

              </div>

              {/* =================================================
                  Login Form
              ================================================== */}

              <form onSubmit={handleSignIn}>

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                  </div>

                </div>

                {/* Password */}

                <div className="mt-5">

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-200"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={loading}
                      className="text-xs font-semibold text-violet-300 transition hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-white/[0.10] bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-white/[0.16] focus:border-violet-400/50 focus:bg-white/[0.045] focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      disabled={loading}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/[0.06] hover:text-slate-200 disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
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
                  <div className="mt-5 rounded-xl border border-red-400/15 bg-red-500/[0.08] px-4 py-3 text-sm leading-5 text-red-300">
                    {error}
                  </div>
                )}

                {/* =================================================
                    Success
                ================================================== */}

                {message && (
                  <div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-500/[0.08] px-4 py-3 text-sm leading-5 text-emerald-300">
                    {message}
                  </div>
                )}

                {/* =================================================
                    Sign In
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:scale-[1.01] hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* =================================================
                  Register
              ================================================== */}

              <p className="mt-6 text-center text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  href="/register"
                  className="font-semibold text-violet-300 transition hover:text-violet-200"
                >
                  Create one
                </Link>

              </p>

            </div>

          </div>

          {/* =================================================
              Security
          ================================================== */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">

            <ShieldCheck
              size={15}
              className="text-emerald-400"
            />

            Your information is protected with secure authentication.

          </div>

          {/* Footer */}

          <p className="mt-4 text-center text-xs text-slate-700">
            MailBrief AI · Your email, understood.
          </p>

        </div>

      </section>

    </main>
  );
}