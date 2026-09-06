import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section
          id="features"
          className="border-t border-gray-100 bg-gray-50 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Built for your inbox
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything important. Nothing unnecessary.
            </h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Instant summaries",
                  text: "Understand the main point of long emails immediately.",
                },
                {
                  title: "Action items",
                  text: "Automatically identify what you need to do next.",
                },
                {
                  title: "Smart replies",
                  text: "Create thoughtful responses without starting from scratch.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-7 text-left"
                >
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="px-6 py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              From inbox overload to clarity.
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                ["01", "Paste your email"],
                ["02", "AI understands it"],
                ["03", "Get your brief"],
              ].map(([number, title]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-gray-200 p-6"
                >
                  <div className="text-sm font-bold text-gray-400">
                    {number}
                  </div>

                  <div className="mt-3 font-semibold text-gray-900">
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}