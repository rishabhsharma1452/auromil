import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12 text-slate-500 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 mb-12">
        <div className="md:col-span-4 space-y-4">
          <Link href="/" aria-label="Auromil home" className="block">
            <Image
              src="/auromil-logo.svg"
              alt="Auromil"
              width={762}
              height={80}
              className="h-auto w-40 sm:w-48"
            />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            AUROMIL coordinates medical travel for international patients, connecting them with accredited hospital networks in India. We do not provide clinical diagnosis or direct medical treatment.
          </p>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h4 className="text-slate-900 font-semibold uppercase tracking-wider text-xs">Medical Travel</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/procedures" className="hover:text-blue-700 transition">
                All Procedures
              </Link>
            </li>
            <li>
              <Link href="/procedures/knee-replacement" className="hover:text-blue-700 transition">
                Knee Replacement
              </Link>
            </li>
            <li>
              <Link href="/procedures/ivf" className="hover:text-blue-700 transition">
                IVF Treatment
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="text-slate-900 font-semibold uppercase tracking-wider text-xs">Company</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#about" className="hover:text-blue-700 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-blue-700 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-blue-700 transition">
                Contact & Care
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h4 className="text-slate-900 font-semibold uppercase tracking-wider text-xs">Accreditation Info</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All medical matching points exclusively to JCI and NABH accredited clinical centers, ensuring gold-standard patient safety.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-slate-400">
          © 2026 AUROMIL. All rights reserved.
        </p>
        <p className="text-slate-400 text-center md:text-right max-w-2xl leading-relaxed">
          <strong>Disclaimer:</strong> AUROMIL is a travel facilitator and care coordinator. We do not provide clinical guidance. All diagnostic reviews and surgical interventions are administered solely by registered healthcare practitioners.
        </p>
      </div>
    </footer>
  );
}
