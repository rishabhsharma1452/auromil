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

      {/* SOCIAL LINKS WIDGET */}
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
