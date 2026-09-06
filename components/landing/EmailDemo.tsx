export default function EmailDemo() {
  return (
    <div
      id="demo"
      className="relative mx-auto mt-16 w-full max-w-5xl"
    >
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gray-100 blur-2xl" />

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
        {/* Window header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-gray-300" />
            <span className="h-3 w-3 rounded-full bg-gray-300" />
            <span className="h-3 w-3 rounded-full bg-gray-300" />
          </div>

          <span className="text-xs font-medium text-gray-400">
            MailBrief AI
          </span>

          <span className="text-xs text-gray-400">
            AI Analysis
          </span>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Email */}
          <div className="border-b border-gray-100 p-6 md:border-b-0 md:border-r">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Incoming Email
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                Work
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Project Meeting — Tomorrow
            </h3>

            <div className="mt-3 text-sm text-gray-500">
              From: Sarah Johnson
            </div>

            <div className="mt-6 space-y-3 text-sm leading-7 text-gray-600">
              <p>Hi team,</p>

              <p>
                We need to discuss the updated project timeline and make sure
                everyone is aligned before the next release.
              </p>

              <p>
                Please review the latest requirements before tomorrow&apos;s
                meeting and prepare a quick progress update.
              </p>

              <p>
                The meeting is scheduled for tomorrow at 10:00 AM.
              </p>

              <p>Thanks, Sarah</p>
            </div>
          </div>

          {/* AI result */}
          <div className="bg-gray-50/70 p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                AI Brief
              </span>

              <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                HIGH
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Summary
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Team members need to review project requirements and prepare
                progress updates for tomorrow&apos;s meeting.
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Key points
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• Project timeline needs discussion</li>
                <li>• Requirements should be reviewed</li>
                <li>• Progress update is required</li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">
                ⚡ Action item
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Review requirements and prepare progress update.
              </p>

              <div className="mt-3 text-xs font-medium text-gray-400">
                Due: Tomorrow · 10:00 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}