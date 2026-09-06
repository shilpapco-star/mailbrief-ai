import Link from "next/link";
import EmailDemo from "./EmailDemo";

export default function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 text-center lg:px-8 lg:pt-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
          <span className="h-2 w-2 rounded-full bg-black" />
          AI-powered email intelligence
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
          Stop reading every email.
          <span className="block text-gray-400">
            Start understanding them.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600">
          MailBrief AI turns long emails into clear summaries, action items,
          important dates, priorities, and smart replies — in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-300 transition hover:-translate-y-0.5 hover:bg-gray-800"
          >
            Analyze your first email →
          </Link>

          <a
            href="#demo"
            className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            See live demo
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span>✓ Instant summaries</span>
          <span>✓ Action detection</span>
          <span>✓ Smart replies</span>
          <span>✓ Secure by design</span>
        </div>

        <EmailDemo />
      </div>
    </section>
  );
}