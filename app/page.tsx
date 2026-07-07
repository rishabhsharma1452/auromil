import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <Link href="/" aria-label="Auromil home" className="block">
            <Image
              src="/auromil-logo.svg"
              alt="Auromil"
              width={762}
              height={80}
              className="h-auto w-56 sm:w-[21.5rem]"
            />
          </Link>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-blue-700">About</a>
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#process" className="hover:text-blue-700">Process</a>
            <a href="#contact" className="hover:text-blue-700">Contact</a>
          </div>

        </div>
      </nav>

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

      <section className="pt-40 pb-28">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <p className="uppercase tracking-[0.3em] text-blue-700 text-sm mb-5">
              Medical Tourism • India
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">

              Guiding Healing Journeys
              <span className="text-blue-700"> Beyond Borders.</span>

            </h1>

            <p className="mt-8 text-lg text-slate-600 leading-8">

              AUROMIL helps international patients connect with trusted
              hospitals and healthcare professionals across India while
              providing seamless guidance throughout the treatment journey.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-blue-700 transition"
              >
                Get in Touch
              </a>

              <a
                href="#services"
                className="px-8 py-4 rounded-full border border-slate-300 hover:border-blue-700 hover:text-blue-700 transition"
              >
                Our Services
              </a>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
              alt="Doctor consulting with a patient"
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* ABOUT */}

      <section id="about" className="py-24 bg-slate-50">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-8">

            Healthcare, Simplified.

          </h2>

          <p className="text-lg leading-9 text-slate-600">

            At AUROMIL, we assist patients seeking medical treatment in India
            by helping them identify suitable hospitals, coordinate medical
            consultations, arrange travel logistics, and provide personalized
            support throughout their healthcare journey.

          </p>

        </div>

      </section>

      {/* SERVICES */}

      <section id="services" className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="rounded-3xl border p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-semibold mb-4">
                Hospital Matching
              </h3>

              <p className="text-slate-600 leading-8">

                Helping patients connect with hospitals and specialists suited
                to their treatment requirements.

              </p>

            </div>

            <div className="rounded-3xl border p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-semibold mb-4">
                Medical Travel
              </h3>

              <p className="text-slate-600 leading-8">

                Assistance with travel planning, accommodation, and treatment
                scheduling.

              </p>

            </div>

            <div className="rounded-3xl border p-8 hover:shadow-xl transition">

              <h3 className="text-2xl font-semibold mb-4">
                Care Coordination
              </h3>

              <p className="text-slate-600 leading-8">

                Personalized guidance before, during, and after treatment.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* PROCESS */}

      <section
        id="process"
        className="py-24 bg-slate-900 text-white"
      >

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-20">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              "Share your medical reports",
              "Receive hospital recommendations",
              "Plan your medical travel",
              "Begin your treatment journey",
            ].map((item, i) => (

              <div key={i} className="text-center">

                <div className="w-16 h-16 mx-auto rounded-full bg-blue-700 flex items-center justify-center text-xl font-bold mb-6">

                  {i + 1}

                </div>

                <p className="text-slate-300">{item}</p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PROCEDURES */}
      <section id="procedures" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="uppercase tracking-[0.2em] text-blue-900 text-sm font-semibold mb-3">
              Specialized Treatments
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Procedures We Coordinate
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Connecting you with world-class specialists and accredited hospitals across India for advanced medical treatments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedures.map((proc, idx) => (
              <Link
                key={idx}
                href="/coming-soon"
                className="group flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1 transition duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/70 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition duration-300 mb-6">
                  {proc.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {proc.title}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-900 border border-blue-100">
                  {proc.category}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/coming-soon"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold transition duration-300 shadow-lg shadow-blue-900/5 hover:shadow-blue-900/10"
            >
              Request other procedure inquiry
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side info */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <p className="uppercase tracking-[0.2em] text-blue-900 text-sm font-semibold mb-3">
                Why Choose Us
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Professional Care You Can Trust
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We understand how important it is to feel confident when seeking medical treatment abroad. Our experienced team guides, supports, and advocates for you throughout your entire healthcare journey.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-950 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transition duration-300 mb-10"
              >
                Get Your Free Assessment
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
                  title: "Experienced Specialists",
                  desc: "Access to qualified medical professionals across multiple specialties worldwide.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      <path d="M12 11h.01M12 15h.01" />
                    </svg>
                  )
                },
                {
                  title: "Reduced Waiting Times",
                  desc: "Skip long queues and access treatment when you need it, not months later.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )
                },
                {
                  title: "English-Speaking Team",
                  desc: "Clear communication with English-speaking professionals throughout your journey.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                    </svg>
                  )
                },
                {
                  title: "Personalised Coordination",
                  desc: "Individual care plans tailored to your specific medical needs and circumstances.",
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
                  title: "Recovery Support",
                  desc: "Guided post-treatment recovery support to help you heal safely and comfortably.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )
                },
                {
                  title: "Transparent Pricing",
                  desc: "Clear, upfront cost estimates with no hidden fees or unexpected surprises.",
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900 mb-6">
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

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-16 sm:p-20 shadow-2xl">
            {/* Background absolute decor circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headline */}
              <div className="lg:col-span-6 text-left">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-6">
                  Get in Touch
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                  Begin Your Healing Journey
                </h2>
                <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                  We are here to guide you. If you have questions about hospitals, travel, or treatments in India, reach out and we will assist you.
                </p>
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

                {/* Primary Button */}
                <a
                  href="mailto:contact@auromil.com"
                  className="w-full text-center py-4 rounded-2xl bg-blue-900 hover:bg-blue-950 text-white font-bold transition duration-300 shadow-lg shadow-blue-900/25 hover:shadow-blue-900/40"
                >
                  Contact Us Now
                </a>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <Image
            src="/auromil-logo.svg"
            alt="Auromil"
            width={762}
            height={80}
            className="h-auto w-48 sm:w-64"
          />
          <p className="text-slate-500">
            © 2026 AUROMIL. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}
