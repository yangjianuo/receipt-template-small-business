const templates = [
  {
    name: "Classic",
    tag: "Best for printing",
    desc: "Traditional receipt layout for retail, local stores, and service businesses.",
  },
  {
    name: "Modern Clean",
    tag: "Client-facing and polished",
    desc: "Cleaner spacing and a more modern look for freelancers and small studios.",
  },
  {
    name: "Compact",
    tag: "Fast issue flow",
    desc: "A tighter layout for quick receipts and small in-person transactions.",
  },
];

const fields = [
  "Business name",
  "Receipt number",
  "Date",
  "Customer name",
  "Item or service",
  "Total amount",
  "Payment method",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-600">
              MVP setup in progress
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Free Receipt Template for Small Business
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                A standalone MVP for editable, printable receipt templates built for small businesses,
                freelancers, and local service owners.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#templates"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Preview templates
              </a>
              <a
                href="#scope"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-400 hover:bg-stone-100"
              >
                View MVP scope
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="rounded-[24px] border border-stone-200 bg-stone-50 p-5">
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-dashed border-stone-300 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Preview</p>
                  <p className="mt-2 text-2xl font-semibold">Small Business Receipt</p>
                  <p className="mt-1 text-sm text-stone-500">Classic printable direction</p>
                </div>
                <div className="text-right text-sm text-stone-500">
                  <p># 10021</p>
                  <p>2026-05-04</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex justify-between"><span>Customer</span><span>Walk-in client</span></div>
                <div className="flex justify-between"><span>Service</span><span>Repair service</span></div>
                <div className="flex justify-between"><span>Payment</span><span>Cash</span></div>
                <div className="mt-5 flex justify-between border-t border-stone-200 pt-4 text-base font-semibold text-stone-900"><span>Total</span><span>$120.00</span></div>
              </div>
            </div>
          </div>
        </div>

        <section id="templates" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Initial template directions</h2>
            <p className="text-stone-600">Three first-pass styles aligned to the approved PRD.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <article key={template.name} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{template.tag}</p>
                <h3 className="mt-3 text-xl font-semibold">{template.name}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{template.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="scope" className="grid gap-6 rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">MVP scope</h2>
            <p className="mt-3 text-stone-600">
              The first release validates whether users will preview, edit, and print or export a
              receipt without expanding into a full invoicing platform.
            </p>
          </div>
          <div>
            <ul className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              {fields.map((field) => (
                <li key={field} className="rounded-2xl bg-stone-50 px-4 py-3">
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}
