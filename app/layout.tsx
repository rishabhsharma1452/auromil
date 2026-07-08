import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AUROMIL | Premium Medical Travel & Care Coordination to India",
  description:
    "AUROMIL coordinates medical travel for international patients seeking care in India. Compare options across JCI & NABH accredited hospitals, receive dedicated visa invitation support, and experience end-to-end on-ground care.",
  keywords: [
    "medical travel India",
    "medical travel coordination",
    "healthcare travel India",
    "accredited hospitals India",
    "patient travel coordinator",
    "knee replacement India",
    "hip replacement India",
    "IVF treatment India",
    "affordable healthcare India",
  ],
  authors: [{ name: "AUROMIL" }],
  openGraph: {
    title: "AUROMIL | Premium Medical Travel & Care Coordination to India",
    description:
      "Connect with leading accredited medical institutions in India. Get personalized hospital matching, visa assistance, and empathetic on-ground support.",
    url: "https://auromil.com",
    siteName: "AUROMIL",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUROMIL | Premium Medical Travel Coordination",
    description:
      "Simplifying medical travel to India. Expert hospital matching, travel coordination, and personalized care.",
  },
  icons: {
    icon: "/icon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
