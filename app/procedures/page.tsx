import Link from "next/link";
import { Metadata } from "next";
import { procedures } from "../../content/procedures";
import JsonLd, { getOrganizationSchema, getBreadcrumbSchema } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Specialized Medical Procedures in India | AUROMIL",
  description: "Browse advanced medical procedures coordinated by AUROMIL, including Robotic Knee Replacement, IVF, and spinal care at accredited hospitals in India.",
  keywords: ["medical procedures India", "knee replacement", "IVF treatment India", "fertility care India", "robotic surgery India"],
  alternates: {
    canonical: "https://auromil.com/procedures",
  },
  openGraph: {
    title: "Specialized Medical Procedures in India | AUROMIL",
    description: "Explore clinical treatments and procedures coordinated across leading JCI & NABH accredited hospitals in India.",
    url: "https://auromil.com/procedures",
    type: "website",
  }
};

export default function ProceduresHub() {
  const organizationSchema = getOrganizationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "https://auromil.com" },
    { name: "Procedures", item: "https://auromil.com/procedures" }
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900 pt-32 pb-24">
      <JsonLd schema={[organizationSchema, breadcrumbSchema]} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb list */}
        <nav className="text-xs text-slate-400 mb-6 flex gap-2 font-medium">
          <Link href="/" className="hover:text-blue-700 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Procedures</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3 block">
            Specialized Care
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Procedures We Coordinate
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Connecting you with accredited medical teams and top specialists in India for advanced therapeutic treatments. Select a procedure to read our comprehensive patient guides.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {procedures.map((proc) => (
            <div
              key={proc.slug}
              className="group flex flex-col justify-between p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition duration-300"
            >
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-6">
                  {proc.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition">
                  {proc.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {proc.shortDesc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-4 items-center justify-between">
                <Link
                  href={`/procedures/${proc.slug}`}
                  className="text-sm font-bold text-blue-700 hover:text-blue-900 transition"
                >
                  Read Guide →
                </Link>
                <Link
                  href={`?inquire=${proc.slug}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-semibold transition"
                >
                  Quick Inquiry
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
