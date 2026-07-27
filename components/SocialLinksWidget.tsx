"use client";

import { useState, useEffect, useRef } from "react";

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919310790689",
    colorClass: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366] text-[#25D366]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.905 1.481 5.426.002 9.842-4.414 9.845-9.843.002-2.63-1.02-5.101-2.877-6.958-1.855-1.856-4.325-2.88-6.952-2.88-5.427 0-9.847 4.418-9.85 9.844-.001 1.743.46 3.447 1.336 4.966l-.99 3.613 3.698-.973zm9.577-6.908c-.266-.134-1.573-.776-1.817-.865-.243-.09-.42-.134-.597.134-.177.266-.686.865-.841 1.042-.155.177-.31.198-.576.065-.266-.134-1.124-.414-2.14-1.32-.79-.705-1.324-1.576-1.48-1.842-.155-.266-.017-.41.116-.543.12-.12.266-.31.4-.465.134-.155.177-.266.266-.443.09-.177.044-.332-.022-.465-.067-.134-.597-1.439-.817-1.97-.215-.519-.432-.449-.597-.457-.155-.008-.332-.01-.508-.01-.177 0-.465.067-.71.333-.243.266-.93.909-.93 2.217s.952 2.572 1.085 2.749c.134.177 1.87 2.854 4.529 3.999.633.273 1.128.436 1.513.559.636.2 1.215.171 1.673.103.51-.076 1.573-.642 1.794-1.262.221-.619.221-1.15.155-1.262-.066-.113-.243-.177-.508-.31z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    href: "tel:+919310790689",
    colorClass: "hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-600",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/auromil",
    colorClass: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] text-[#0077b5]",
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
    colorClass: "hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c] text-[#e1306c]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
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
    colorClass: "hover:bg-black hover:text-white hover:border-black text-slate-800",
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
    colorClass: "hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500] text-[#ff4500]",
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
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3"
      aria-label="Auromil social and contact links"
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
          <div key={social.label} className="flex items-center gap-2">
            {/* Tooltip label for each icon */}
            <span
              className={`bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded shadow border border-white/10 select-none transition-all duration-300 ${
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
              }`}
              style={{
                transitionDelay: isOpen ? `${(socialLinks.length - 1 - index) * 40}ms` : "0ms",
              }}
            >
              {social.label}
            </span>
            <a
              href={social.href}
              aria-label={`Auromil on ${social.label}`}
              title={social.label}
              target="_blank"
              rel="noreferrer"
              style={{
                transitionDelay: isOpen ? `${(socialLinks.length - 1 - index) * 40}ms` : "0ms",
              }}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 ${social.colorClass} focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2`}
            >
              {social.icon}
            </a>
          </div>
        ))}
      </div>

      {/* Trigger Button with Text Pill */}
      <div className="flex items-center gap-2 group/widget cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* Persistent Pill that changes state */}
        <span
          className={`select-none bg-slate-900 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-slate-800 transition-all duration-300 flex items-center gap-1.5 ${
            isOpen ? "bg-slate-800 border-slate-700" : "hover:bg-slate-800 hover:border-slate-700"
          }`}
        >
          {isOpen ? (
            <span>Close</span>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Connect</span>
            </>
          )}
        </span>

        {/* Floating Action Button */}
        <button
          aria-expanded={isOpen}
          aria-label="Toggle contact menu"
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 ${
            isOpen
              ? "bg-slate-800 rotate-90"
              : "bg-blue-700 hover:bg-blue-800 hover:scale-105"
          }`}
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Intuitive Chat/Connect/Contact Bubble
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="16" cy="10" r="1" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
