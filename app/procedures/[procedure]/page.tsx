import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { procedures } from "../../../content/procedures";
import EvidenceBanner from "../../../components/EvidenceBanner";
import JsonLd, {
  getFAQPageSchema,
  getBreadcrumbSchema,
  getMedicalWebPageSchema,
  getMedicalProcedureSchema,
} from "../../../components/JsonLd";

interface PageProps {
  params: Promise<{ procedure: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return procedures.map((proc) => ({
    procedure: proc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { procedure } = await params;
  const proc = procedures.find((p) => p.slug === procedure);
  if (!proc) return {};

  return {
    title: proc.metaTitle,
    description: proc.metaDesc,
    alternates: {
      canonical: `https://auromil.com/procedures/${proc.slug}`,
    },
    openGraph: {
      title: proc.metaTitle,
      description: proc.metaDesc,
      url: `https://auromil.com/procedures/${proc.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: proc.metaTitle,
      description: proc.metaDesc,
    },
  };
}

export default async function ProcedurePillarPage({ params }: PageProps) {
  const { procedure } = await params;
  const proc = procedures.find((p) => p.slug === procedure);
  if (!proc) {
    notFound();
  }

  // Citations mapping
  const sourcesMap: Record<string, { label: string; url: string }[]> = {
    "knee-replacement": [
      {
        label: "Mayo Clinic - Knee Replacement Overview",
        url: "https://www.mayoclinic.org/tests-procedures/knee-replacement/about/pac-20385276",
      },
      {
        label: "NHS UK - Knee Joint Replacement",
        url: "https://www.nhs.uk/conditions/knee-replacement-surgery/",
      },
    ],
    ivf: [
      {
        label: "Cleveland Clinic - In Vitro Fertilization Guide",
        url: "https://my.clevelandclinic.org/health/treatments/22457-in-vitro-fertilization-ivf",
      },
      {
        label: "NHS UK - IVF Treatment & Options",
        url: "https://www.nhs.uk/conditions/ivf/",
      },
    ],
  };

  const sources = sourcesMap[proc.slug] || [];

  // Generate Schemas
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "https://auromil.com" },
    { name: "Procedures", item: "https://auromil.com/procedures" },
    { name: proc.title, item: `https://auromil.com/procedures/${proc.slug}` },
  ]);
  const medicalSchema = getMedicalWebPageSchema(
    proc.title,
    proc.shortDesc,
    `https://auromil.com/procedures/${proc.slug}`
  );
  const procedureSchema = getMedicalProcedureSchema(
    proc.title,
    proc.shortDesc,
    `https://auromil.com/procedures/${proc.slug}`,
    proc.category
  );
  const faqSchema = getFAQPageSchema(proc.faqs);

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <JsonLd schema={[breadcrumbSchema, medicalSchema, procedureSchema, faqSchema]} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Breadcrumbs */}
        <nav className="text-xs text-slate-400 mb-8 flex gap-2 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">Home</Link>
          <span>/</span>
          <Link href="/procedures" className="hover:text-blue-700 transition">Procedures</Link>
          <span>/</span>
          <span className="text-slate-600 font-normal">{proc.title}</span>
        </nav>

        {/* Pillar Page Title */}
        <div className="border-b border-slate-100 pb-10 mb-10">
          <span className="uppercase tracking-[0.2em] text-blue-700 text-xs font-bold block mb-3">
            {proc.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
            {proc.title} Care Guide
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-4xl">
            {proc.shortDesc} Explore the treatment options, preparation steps, and recovery milestones coordinated by AUROMIL in India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`?inquire=${proc.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-700/20 hover:-translate-y-0.5 transition duration-300"
            >
              Request treatment plan review
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="#faqs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 transition duration-300"
            >
              Read FAQs
            </a>
          </div>
        </div>

        {/* Evidence Banner */}
        <div className="mb-12">
          <EvidenceBanner lastUpdated="July 2026" sources={sources} />
        </div>

        {/* Grid Content Layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Medical Overview</h2>
              <p className="text-slate-600 leading-relaxed text-base">{proc.overview}</p>
            </section>

            {/* Who benefits */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Who May Benefit</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {proc.whoBenefits.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-slate-600 text-sm leading-relaxed p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                    <svg className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Treatment Options */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Treatment Options</h2>
              <div className="space-y-4">
                {proc.options.map((opt, idx) => (
                  <div key={idx} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <h3 className="font-bold text-slate-900 mb-2">{opt.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{opt.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recovery */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Clinical Recovery Timeline</h2>
              <div className="p-6 bg-blue-50/30 border border-blue-100/50 rounded-3xl">
                <p className="text-slate-600 leading-relaxed text-sm">{proc.recovery}</p>
              </div>
            </section>

            {/* Benefits & Risks Grid */}
            <section className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-xs">✓</span>
                  Expected Benefits
                </h2>
                <ul className="space-y-2.5">
                  {proc.benefits.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-blue-700 font-bold shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-xs">!</span>
                  Potential Clinical Risks
                </h2>
                <ul className="space-y-2.5">
                  {proc.risks.map((item, idx) => (
                    <li key={idx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQs Accordion */}
            <section id="faqs" className="space-y-6 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {proc.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-slate-100 rounded-2xl bg-slate-50/50 p-5 [&_summary::-webkit-details-marker]:hidden transition duration-300 open:bg-white open:border-blue-100 open:shadow-lg open:shadow-blue-900/5"
                  >
                    <summary className="flex justify-between items-center cursor-pointer list-none focus:outline-none select-none">
                      <h3 className="text-sm font-bold text-slate-900 group-open:text-blue-700 transition">
                        {faq.q}
                      </h3>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 group-open:bg-blue-50 group-open:text-blue-700 group-open:border-blue-100 transition shrink-0">
                        <svg className="w-3.5 h-3.5 transform group-open:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-3 text-slate-600 leading-relaxed text-xs border-t border-slate-100/50 pt-3">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Guides Cluster Links (Task 6) */}
            {proc.topics && Object.keys(proc.topics).length > 0 && (
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Detailed Medical Guides
                </h3>
                <div className="flex flex-col gap-2.5">
                  {Object.entries(proc.topics).map(([slug, topic]) => (
                    <Link
                      key={slug}
                      href={`/procedures/${proc.slug}/${slug}`}
                      className="group flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-white hover:shadow-md transition text-xs font-semibold text-slate-700 hover:text-blue-700"
                    >
                      <span>Compare {topic.title.toLowerCase()}</span>
                      <span className="text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Coordination Info Card */}
            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-600/10 blur-2xl" />
              <h3 className="text-lg font-bold">Coordination Support</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                AUROMIL acts as your travel coordination liaison. We do not provide clinical surgery or medical diagnostics. Leading surgeons in accredited hospital networks manage all clinical treatments.
              </p>
              <ul className="space-y-2.5 text-[11px] text-slate-400">
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span> Secure Medical Records Review
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span> Multi-Hospital Cost Comparison
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 font-bold">✓</span> Visa Invitation Letter Support
                </li>
              </ul>
              <Link
                href={`?inquire=${proc.slug}`}
                className="block text-center py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition"
              >
                Inquire now
              </Link>
            </div>

            {/* Related Procedures (Task 6) */}
            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Related Treatments
              </h3>
              <div className="space-y-3">
                {proc.relatedSlugs
                  .map((slug) => procedures.find((p) => p.slug === slug))
                  .filter((p): p is NonNullable<typeof p> => !!p)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/procedures/${p.slug}`}
                      className="block p-3 rounded-xl border border-slate-50 hover:border-blue-100 hover:shadow-sm transition"
                    >
                      <h4 className="font-bold text-slate-900 text-xs mb-1 group-hover:text-blue-700">{p.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{p.shortDesc}</p>
                    </Link>
                  ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
