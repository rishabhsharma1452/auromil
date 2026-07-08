import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" aria-label="Auromil home" className="block">
          <Image
            src="/auromil-logo.svg"
            alt="Auromil"
            width={762}
            height={80}
            className="h-auto w-56 sm:w-[21.5rem]"
            priority
          />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/#about" className="hover:text-blue-700 transition text-slate-700">
            About
          </Link>
          <Link href="/#services" className="hover:text-blue-700 transition text-slate-700">
            Services
          </Link>
          <Link href="/#process" className="hover:text-blue-700 transition text-slate-700">
            Process
          </Link>
          <Link href="/#faq" className="hover:text-blue-700 transition text-slate-700">
            FAQ
          </Link>
          <Link href="/#contact" className="hover:text-blue-700 transition text-slate-700">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
