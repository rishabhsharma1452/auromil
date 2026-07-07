import Image from "next/image";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* NAVBAR */}

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <a href="#" aria-label="Auromil home" className="block">
            <Image
              src="/auromil-logo.svg"
              alt="Auromil"
              width={762}
              height={80}
              className="h-auto w-56 sm:w-[21.5rem]"
            />
          </a>

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

      {/* CONTACT */}

      <section
        id="contact"
        className="py-24"
      >

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">

            Begin Your Healing Journey

          </h2>

          <p className="text-slate-600 mt-6 text-lg">

            We&apos;d be happy to answer your questions and help you explore
            treatment options in India.

          </p>

          <div className="mt-12 space-y-4 text-lg">

            <p>contact@auromil.com</p>

            <p>+91 9310790689</p>

            <p>WhatsApp Available</p>

          </div>

          <a
            href="mailto:contact@auromil.com"
            className="inline-block mt-10 px-8 py-4 rounded-full bg-slate-900 text-white hover:bg-blue-700 transition"
          >
            Contact Us
          </a>

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
