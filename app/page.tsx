import Image from "next/image";

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
