import Image from "next/image";
import Link from "next/link";
import JsonLd, { getOrganizationSchema, getWebSiteSchema, getMedicalBusinessSchema } from "../components/JsonLd";
import ContactInquiryForm from "../components/ContactInquiryForm";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/auromil",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/auromilhealth?igsh=MWg3bDB2a3htZWp4cA==",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/auromilhealth",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"
        />
      </svg>
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/auromil",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <path d="M12 8.5c3.75 0 6.8 2.25 6.8 5.02 0 2.78-3.05 5.03-6.8 5.03s-6.8-2.25-6.8-5.03C5.2 10.75 8.25 8.5 12 8.5Z" />
        <path d="M13.1 8.6 14.35 4l3.25.72" />
        <circle cx="18.7" cy="5" r="1.4" />
        <circle cx="8.9" cy="13.1" r=".8" fill="currentColor" stroke="none" />
        <circle cx="15.1" cy="13.1" r=".8" fill="currentColor" stroke="none" />
        <path d="M9.8 15.7c1.25.85 3.15.85 4.4 0" />
        <path d="M5.7 10.65 4.2 9.25" />
        <path d="m18.3 10.65 1.5-1.4" />
      </svg>
    ),
  },
];

const procedures = [
  {
    title: "Knee Replacement",
    category: "Orthopaedic",
    desc: "Relieve chronic joint pain and restore active mobility through advanced reconstruction.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="5" r="2" />
        <path d="M13 18l-2-4-2-3 2-2 2 3" />
        <path d="M9 18l1.5-3.5" />
        <path d="M14 20l-1-4" />
        <path d="M17 11l-3.5-1-1.5-2" />
      </svg>
    ),
  },
  {
    title: "Hip Replacement",
    category: "Orthopaedic",
    desc: "Regain natural joint function and comfort with highly precise arthroplasty.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2v10M12 12c-2.5 0-4 1.5-4 4v5M12 12c2.5 0 4 1.5 4 4v5" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Spinal Procedures",
    category: "Orthopaedic",
    desc: "Relieve nerve pressure and restore stability through specialized neurosurgical care.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 9v8" />
        <path d="M8 13h8" />
      </svg>
    ),
  },
  {
    title: "IVF Fertility Treatment",
    category: "Fertility",
    desc: "Compassionate, advanced reproductive technologies tailored to your family journey.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 22V12" />
        <path d="M12 12C12 7.58 8.42 4 4 4c0 4.42 3.58 8 8 8Z" />
        <path d="M12 12c0-4.42 3.58-8 8-8 0 4.42-3.58 8-8 8Z" />
      </svg>
    ),
  },
  {
    title: "Cosmetic Surgery",
    category: "Aesthetic",
    desc: "Reconstructive and aesthetic care led by board-certified plastic surgeons.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5z" />
        <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
      </svg>
    ),
  },
  {
    title: "Dental Implants",
    category: "Dental",
    desc: "Restore dental function and confidence with durable, medical-grade materials.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 2.5 6 4.5 7.5L9 22h3l1-4 1 4h3l-1.5-6.5C18 14 20.5 11.5 20.5 8c0-3.5-2.5-6-6-6Z" />
      </svg>
    ),
  },
  {
    title: "Cataract Surgery",
    category: "Ophthalmology",
    desc: "Clear your vision and enjoy rapid recovery with advanced micro-incision lens replacement.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Weight Loss Surgery",
    category: "Bariatric",
    desc: "Improve long-term health and vitality through specialized bariatric options.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    title: "Share Medical Records",
    step: "Step 01",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Receive Treatment Plans",
    step: "Step 02",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    title: "Select Your Hospital",
    step: "Step 03",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Travel & Arrival",
    step: "Step 04",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4.5 19.5 3c-1.5-1.5-3-1.5-4.5.5L11.5 7l-8.2-1.8L2 7l7.5 3.5L6 14l-3-1-1.5 1.5L5 17l1.5 3.5 1.5-1.5-1-3 3.5-3.5 3.5 7.5z" />
      </svg>
    ),
  },
  {
    title: "Treatment & Recovery",
    step: "Step 05",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();
  const medicalBusinessSchema = getMedicalBusinessSchema();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd schema={[organizationSchema, webSiteSchema, medicalBusinessSchema]} />

      <div
        className="fixed bottom-6 right-4 z-40 flex flex-col gap-3"
        aria-label="Auromil social links"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={`Auromil on ${social.label}`}
            title={social.label}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* HERO */}

      <section className="pt-48 pb-28">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <p className="uppercase tracking-[0.3em] text-blue-700 text-sm font-semibold mb-5">
              Medical Travel Coordination • India
            </p>

            <h1 className="text-5xl lg:text-7.5xl font-extrabold leading-tight tracking-tight">

              Guiding Healing Journeys
              <span className="text-blue-700 block sm:inline"> Beyond Borders.</span>

            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">

              AUROMIL makes it simple for international patients to access medical care in India. 
              We coordinate your entire journey—from finding the right accredited hospital and specialist, 
              to managing travel details and medical visas. You focus on healing; we handle the details.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-blue-700 transition font-semibold shadow-lg shadow-slate-900/10 hover:shadow-blue-700/25"
              >
                Request a Free Consultation
              </a>

              <a
                href="#procedures"
                className="px-8 py-4 rounded-full border border-slate-300 hover:border-blue-700 hover:text-blue-700 transition font-semibold"
              >
                View Procedures
              </a>

            </div>

          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 rounded-3xl -rotate-2 transform scale-102" />
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
              alt="Doctor consulting with a patient"
              width={800}
              height={450}
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[450px]"
              priority
            />

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Context & Copy */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <span className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
                About Auromil
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Personal Guidance.<br/>Complete Transparency.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Traveling for medical care is a deeply personal decision. At AUROMIL, we act as your trusted coordinator on the ground in India, connecting you directly with world-class hospitals.
              </p>
              <p className="text-slate-500 leading-relaxed text-sm">
                Rather than navigating a foreign healthcare system alone, you receive the direct coordination, clear translation, and logistical support you need. We work solely for you—prioritizing your comfort, representing your preferences, and maintaining absolute honesty at every step of your journey.
              </p>
            </div>

            {/* Right Column: Key Pillars */}
            <div className="lg:col-span-7 grid gap-6 w-full">
              {[
                {
                  title: "Hospital Matching",
                  desc: "We help you compare options across JCI and NABH accredited hospitals in India, ensuring your medical records are reviewed by leading specialists for your specific condition.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                  )
                },
                {
                  title: "Dedicated Coordination",
                  desc: "Avoid the stress of dealing with multiple hospital departments. You have a single coordinator managing your updates, scheduling, and consultations from start to finish.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  title: "Travel & Visa Coordination",
                  desc: "We coordinate the details that matter—facilitating official medical visa invitation letters from the hospital, recommending local accommodation, and arranging airport transfers.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )
                }
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 hover:shadow-lg transition duration-300 items-start text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 border border-blue-100/50">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
              Our Services
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Medical Travel & Care Coordination
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Clear, reliable coordination designed to take the stress out of seeking treatment abroad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hospital Matching",
                desc: "Compare options from leading medical institutions. We share your medical records with top accredited specialists, gather detailed treatment plans, and help you evaluate transparent cost outlines.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <circle cx="15" cy="15" r="2" />
                    <line x1="17" y1="7" x2="7" y2="17" />
                  </svg>
                )
              },
              {
                title: "Travel & Visa Coordination",
                desc: "Focus on your health while we take care of the logistics. We manage hospital visa invitation letters, recommend vetted local accommodation options for you and your companion, and coordinate your airport transfers.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                )
              },
              {
                title: "On-Ground Support",
                desc: "Receive personal care from the moment you arrive. We provide local coordination during your hospital stay, arrange language translation if needed, and schedule remote follow-up care when you return home.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                )
              }
            ].map((service, idx) => {
              const hrefs = [
                "/procedures",
                "?inquire=visa-travel",
                "?inquire=on-ground-support"
              ];
              const href = hrefs[idx] || "/procedures";
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 border border-blue-100/50 mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {service.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 group/link transition"
                    >
                      Learn more
                      <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
              Our Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              How we coordinate your journey
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We guide you through each milestone, keeping the process simple, clear, and reassuring.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/70 text-blue-700 mb-6 border border-blue-100/50">
                  {step.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section id="procedures" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
              Specialized Treatments
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Procedures We Coordinate
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Connecting you with accredited medical teams and top specialists in India for advanced therapeutic treatments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedures.map((proc, idx) => {
              const slugs = [
                "knee-replacement",
                "hip-replacement",
                "spinal-procedures",
                "ivf",
                "cosmetic-surgery",
                "dental-implants",
                "cataract-surgery",
                "weight-loss-surgery"
              ];
              const slug = slugs[idx] || "custom";
              const href = `/procedures/${slug}`;
              return (
                <Link
                  key={idx}
                  href={href}
                  className="group flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition duration-300"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/70 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition duration-300 mb-6">
                    {proc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                    {proc.desc}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    {proc.category}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="?inquire=custom"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold transition duration-300 shadow-lg shadow-blue-700/5 hover:shadow-blue-700/10"
            >
              Request Custom Procedure Inquiry
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <p className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
                Why Auromil
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Why use a coordinator instead of contacting hospitals directly?
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                While you can contact foreign hospitals directly, managing medical records, visa invitations, local lodging, and transport on your own is overwhelming. We handle the complexity and act as your independent advocate on the ground.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-700/20 hover:-translate-y-0.5 transition duration-300 mb-10"
              >
                Discuss Your Treatment Plan
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="w-full relative overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/doctor-microscope.jpg"
                  alt="Senior doctor looking intently through a microscope in a clinical laboratory"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Right side grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Unbiased Comparison",
                  desc: "Hospitals will only recommend their own services. We collect treatment options and cost outlines from multiple accredited hospitals, helping you make an objective choice.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      <path d="M12 11h.01M12 15h.01" />
                    </svg>
                  )
                },
                {
                  title: "One Dedicated Contact",
                  desc: "Avoid being passed between various administrative offices. Your coordinator manages all communication, schedules consultations, and updates you daily.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )
                },
                {
                  title: "Visa Invitation Support",
                  desc: "We work directly with hospital registration desks to expedite the official Medical Visa Invitation Letter required for your visa application.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                    </svg>
                  )
                },
                {
                  title: "Lodging & Transfers",
                  desc: "We recommend and arrange comfortable local lodging near your hospital, ensuring a quiet, convenient space for you and your companion.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )
                },
                {
                  title: "Independent Advocacy",
                  desc: "We work for you, not the hospital network. Our sole priority is ensuring clear communication, transparent pricing, and patient comfort.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )
                },
                {
                  title: "Transparent Cost Outlines",
                  desc: "We secure comprehensive package outlines beforehand, explaining exactly what is included so you can plan with financial peace of mind.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="12" y1="10" x2="12" y2="10.01" />
                      <line x1="12" y1="14" x2="12" y2="14.01" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  )
                }
              ].map((card, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start p-8 bg-white border border-slate-100 rounded-3xl hover:border-blue-100 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.2em] text-blue-700 text-sm font-semibold mb-3">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Common Questions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Straightforward answers to help you plan your journey with confidence.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does AUROMIL work?",
                a: "We act as your dedicated coordinator with leading medical institutions in India. Once you share your medical records, we coordinate with specialists across accredited hospitals to secure treatment plans and cost estimates. We then assist with visa invitation letters, local lodging options, and airport transfers to ensure a seamless, supportive experience."
              },
              {
                q: "Does AUROMIL charge patients?",
                a: "We provide transparent, tailored coordination services. Our consultation and matching service includes a clear breakdown of pricing based on your specific treatment and logistics requirements. All fees are discussed and agreed upon upfront before you begin your travel, with absolute transparency and no hidden costs."
              },
              {
                q: "Which hospitals can I choose from?",
                a: "We connect you with premier JCI (Joint Commission International) and NABH (National Accreditation Board for Hospitals) accredited hospitals in India. As a dedicated coordinator, we introduce you directly to the medical departments and senior specialists best suited to your specific diagnosis and preferences."
              },
              {
                q: "How do I send medical records?",
                a: "You can securely email your medical records to contact@auromil.com or share them directly with us via WhatsApp. All documents are handled with strict privacy protocols and are only shared with authorized medical consultants reviewing your case."
              },
              {
                q: "Is my information confidential?",
                a: "Absolutely. Patient confidentiality is our highest priority. We operate under strict data protection principles, ensuring your personal details, clinical history, and medical records are stored securely and only shared with the consulting specialists reviewing your treatment plan."
              },
              {
                q: "How long does the process take?",
                a: "Typically, we are able to secure detailed treatment plans and comprehensive cost estimates within 48 to 72 hours of receiving your medical records."
              },
              {
                q: "Can AUROMIL help with medical visas?",
                a: "Yes. Once you select your hospital and decide to proceed, we coordinate directly with their international patient division to issue an official Medical Visa Invitation Letter. We then guide you step-by-step through the visa application process."
              }
            ].map((faq, i) => (
              <details
                key={i}
                className="group border border-slate-100 rounded-3xl bg-slate-50/50 p-6 [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:bg-white open:border-blue-100 open:shadow-lg open:shadow-blue-900/5"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none focus:outline-none select-none">
                  <h3 className="text-lg font-bold text-slate-900 group-open:text-blue-700 transition duration-300 pr-4">
                    {faq.q}
                  </h3>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 border border-slate-100 group-open:bg-blue-50 group-open:text-blue-700 group-open:border-blue-100 transition-all duration-300 shrink-0">
                    <svg
                      className="w-4 h-4 transform group-open:rotate-180 transition duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 text-slate-600 leading-relaxed text-sm pr-6 border-t border-slate-100/50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-16 sm:p-20 shadow-2xl">
            {/* Background absolute decor circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headline */}
              <div className="lg:col-span-6 text-left flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-6">
                    Consultation
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                    Discuss Your Medical Needs
                  </h2>
                  <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                    We are here to answer your questions and coordinate your care. Contact us for a confidential, no-obligation discussion about your healthcare options in India.
                  </p>
                </div>
                
                {/* Visual Stepper Checklist */}
                <div className="mt-12 border-t border-white/10 pt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-6">
                    Next Steps After You Contact Us
                  </h3>
                  <ul className="space-y-6 text-sm text-slate-300">
                    <li className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300 border border-blue-500/20">1</span>
                      <div>
                        <strong className="text-white block font-medium">Review Medical Records</strong>
                        <span className="text-slate-400 text-xs mt-1 block">We securely receive and review your diagnostics.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300 border border-blue-500/20">2</span>
                      <div>
                        <strong className="text-white block font-medium">Gather Specialist Options</strong>
                        <span className="text-slate-400 text-xs mt-1 block">We consult leading accredited hospitals to collect initial opinions.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300 border border-blue-500/20">3</span>
                      <div>
                        <strong className="text-white block font-medium">Compare Cost & Care</strong>
                        <span className="text-slate-400 text-xs mt-1 block">We present transparent treatment plans and cost estimates.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-300 border border-blue-500/20">4</span>
                      <div>
                        <strong className="text-white block font-medium">Coordinate Travel Details</strong>
                        <span className="text-slate-400 text-xs mt-1 block">We assist with medical visa invitation letters, lodging, and transfers.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Details card */}
              <div className="lg:col-span-6 flex flex-col gap-6 w-full">
                
                {/* Contact options */}
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* Email Card */}
                  <a
                    href="mailto:contact@auromil.com"
                    className="group flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition duration-300 text-left"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 group-hover:bg-blue-700 group-hover:text-white transition duration-300 mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <span className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Email us</span>
                    <span className="font-semibold text-white break-all text-sm sm:text-base">contact@auromil.com</span>
                  </a>

                  {/* Phone/WhatsApp Card */}
                  <a
                    href="https://wa.me/919310790689"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition duration-300 text-left"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition duration-300 mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">WhatsApp & Call</span>
                    <span className="font-semibold text-white text-sm sm:text-base">+91 9310790689</span>
                  </a>

                </div>

                {/* Embedded Inquiry Form */}
                <ContactInquiryForm />

              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
