import type { Metadata } from "next";
import { StoreProvider } from "./context/StoreContext";

export const metadata: Metadata = {
  title: "Test Sandbox | Momo Junction",
  description: "Internal testing environment for momo ordering system",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "none",
    },
  },
  alternates: {
    canonical: "https://auromil.com/test",
  },
};

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200">
        {/* Style injection to hide parent site layout elements cleanly */}
        <style dangerouslySetInnerHTML={{ __html: `
          body > nav,
          body > footer,
          body > :not(.flex-grow) {
            display: none !important;
            pointer-events: none !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            overflow: hidden !important;
          }
          body {
            background-color: #f8fafc !important; /* Matches slate-50 */
            padding-top: 0 !important;
          }
        `}} />
        <main className="w-full min-h-screen">
          {children}
        </main>
      </div>
    </StoreProvider>
  );
}
