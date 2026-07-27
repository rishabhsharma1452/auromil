import Image from "next/image";
import Link from "next/link";
import SocialLinksWidget from "../../components/SocialLinksWidget";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
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
            <Link href="/#about" className="hover:text-blue-700">About</Link>
            <Link href="/#services" className="hover:text-blue-700">Services</Link>
            <Link href="/#process" className="hover:text-blue-700">Process</Link>
            <Link href="/#contact" className="hover:text-blue-700">Contact</Link>
          </div>
        </div>
      </nav>

      <SocialLinksWidget />

      {/* MAIN COMING SOON CONTENT */}
      <main className="flex-grow flex items-center justify-center pt-36 pb-20 px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-8 py-16 sm:p-20 shadow-2xl max-w-3xl w-full text-center">
          {/* Background absolute decor circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated/Glowing Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-8 animate-pulse">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>

            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-6">
              Coming Soon
            </span>

            <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
              Portal Under <span className="text-blue-400">Development</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-10">
              We are preparing to bring you a seamless, world-class medical tourism experience. Our specialized treatment options, hospital coordination, and inquiry portals will be launching shortly.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Back to Home Page
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" aria-label="Auromil home" className="block">
            <Image
              src="/auromil-logo.svg"
              alt="Auromil"
              width={762}
              height={80}
              className="h-auto w-48 sm:w-64"
            />
          </Link>
          <p className="text-slate-500 text-sm">
            © 2026 AUROMIL. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
