"use client";

import { useState, useEffect, useRef } from "react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/auromil",
    colorClass: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]",
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
    colorClass: "hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]",
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
    colorClass: "hover:bg-black hover:text-white hover:border-black",
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
    colorClass: "hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500]",
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

export default function SocialLinksWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-4 z-40 flex flex-col items-center gap-3"
      aria-label="Auromil social links"
    >
      {/* Social links column */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      >
        {socialLinks.map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={`Auromil on ${social.label}`}
            title={social.label}
            target="_blank"
            rel="noreferrer"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 ${social.colorClass} focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2`}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle social links"
        className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-900 rotate-180"
            : "bg-blue-700 hover:bg-blue-800 hover:scale-105"
        }`}
      >
        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )}
      </button>
    </div>
  );
}
