import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { procedures } from "../../../../content/procedures";
import JsonLd, { getBreadcrumbSchema, getMedicalWebPageSchema } from "../../../../components/JsonLd";

interface TopicPageProps {
  params: Promise<{ procedure: string; topic: string }>;
}

export async function generateStaticParams() {
  const paramsList: { procedure: string; topic: string }[] = [];
  procedures.forEach((proc) => {
    if (proc.topics) {
      Object.keys(proc.topics).forEach((tSlug) => {
        paramsList.push({
          procedure: proc.slug,
          topic: tSlug,
        });
      });
    }
  });
  return paramsList;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { procedure, topic } = await params;
  const proc = procedures.find((p) => p.slug === procedure);
  if (!proc || !proc.topics || !proc.topics[topic]) return {};

  const tData = proc.topics[topic];

  return {
    title: tData.metaTitle,
    description: tData.metaDesc,
    alternates: {
      canonical: `https://auromil.com/procedures/${proc.slug}/${topic}`,
    },
    openGraph: {
      title: tData.metaTitle,
      description: tData.metaDesc,
      url: `https://auromil.com/procedures/${proc.slug}/${topic}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: tData.metaTitle,
      description: tData.metaDesc,
    },
  };
}

export default async function ProcedureTopicPage({ params }: TopicPageProps) {
  const { procedure, topic } = await params;
  const proc = procedures.find((p) => p.slug === procedure);
  if (!proc || !proc.topics || !proc.topics[topic]) {
    notFound();
  }

  const tData = proc.topics[topic];

  // Breadcrumbs
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "https://auromil.com" },
    { name: "Procedures", item: "https://auromil.com/procedures" },
    { name: proc.title, item: `https://auromil.com/procedures/${proc.slug}` },
    { name: tData.title, item: `https://auromil.com/procedures/${proc.slug}/${topic}` },
  ]);
  const medicalSchema = getMedicalWebPageSchema(
    `${proc.title}: ${tData.title}`,
    tData.metaDesc,
    `https://auromil.com/procedures/${proc.slug}/${topic}`
  );

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <JsonLd schema={[breadcrumbSchema, medicalSchema]} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Navigation Breadcrumbs */}
        <nav className="text-xs text-slate-400 mb-8 flex gap-2 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">Home</Link>
          <span>/</span>
          <Link href="/procedures" className="hover:text-blue-700 transition">Procedures</Link>
          <span>/</span>
          <Link href={`/procedures/${proc.slug}`} className="hover:text-blue-700 transition">
            {proc.title}
          </Link>
          <span>/</span>
          <span className="text-slate-600 font-normal">{tData.title}</span>
        </nav>

        {/* Article Header */}
        <div className="border-b border-slate-100 pb-8 mb-10">
          <span className="uppercase tracking-[0.2em] text-blue-700 text-xs font-bold block mb-3">
            {proc.title} Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
            {proc.title}: {tData.title}
          </h1>
          <p className="text-slate-500 text-sm">
            Information and travel guidelines compiled by AUROMIL Editorial Team.
          </p>
        </div>

        {/* Content Body */}
        <article className="prose prose-slate max-w-none mb-12">
          {/* We render the text dynamically. Under the design constraints, we keep styling identical to page typography. */}
          <div
            className="text-slate-600 leading-relaxed space-y-6 text-base"
            dangerouslySetInnerHTML={{ __html: tData.content }}
          />
        </article>

        {/* Support Callout Box */}
        <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Need a comprehensive treatment estimate?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every patient's medical records are unique. We collect cost estimates and clinical reviews from multiple accredited hospitals in India based on your records, helping you compare your options objectively.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href={`?inquire=${proc.slug}`}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition"
            >
              Inquire regarding this procedure
            </Link>
            <Link
              href={`/procedures/${proc.slug}`}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 transition"
            >
              ← Back to {proc.title} Hub
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
