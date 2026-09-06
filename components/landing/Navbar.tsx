import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
            M
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            MailBrief
            <span className="text-gray-400"> AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            How it works
          </a>

          <a
            href="#demo"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Demo
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-gray-600 transition hover:text-gray-900 sm:block"
          >
            Sign in
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}