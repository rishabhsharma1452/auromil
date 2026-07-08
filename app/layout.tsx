import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProcedureInquiryModal from "../components/ProcedureInquiryModal";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auromil | Medical Travel & Care Coordination",
  description: "Auromil coordinates care matching international patients with accredited hospital networks in India. We simplify medical visa invitation letters and travel files.",
  alternates: {
    canonical: "https://auromil.com",
  },
  openGraph: {
    title: "Auromil | Medical Travel & Care Coordination",
    description: "Auromil coordinates care matching international patients with accredited hospital networks in India. We simplify medical visa invitation letters and travel files.",
    url: "https://auromil.com",
    siteName: "Auromil",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auromil | Medical Travel & Care Coordination",
    description: "Auromil coordinates care matching international patients with accredited hospital networks in India. We simplify medical visa invitation letters and travel files.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <ProcedureInquiryModal />
      </body>
    </html>
  );
}
