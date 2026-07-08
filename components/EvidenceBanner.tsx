"use client";

import { useState } from "react";

interface EvidenceBannerProps {
  lastUpdated: string;
  sources?: { label: string; url: string }[];
}

export default function EvidenceBanner({ lastUpdated, sources = [] }: EvidenceBannerProps) {
  const [showSources, setShowSources] = useState(false);

  return (
    <div className="w-full border border-slate-100 rounded-2xl bg-slate-50/50 p-5 text-xs text-slate-500 space-y-3 leading-relaxed">
      <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <svg className="w-4 h-4 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Written by AUROMIL Editorial Team
        </div>

        {/* Medical Review - Disabled intentionally until real reviewing physicians exist */}
        <div className="flex items-center gap-1.5 text-slate-400 select-none cursor-not-allowed">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Medical Review (Pending Verification)
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Last updated: {lastUpdated}
        </div>

        {sources.length > 0 && (
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex items-center gap-1 text-blue-700 font-semibold hover:text-blue-900 focus:outline-none transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {showSources ? "Hide Sources" : "View Sources"}
          </button>
        )}
      </div>

      {showSources && sources.length > 0 && (
        <div className="border-t border-slate-100 pt-3 mt-3">
          <p className="font-semibold text-slate-700 mb-1.5">Evidence-Based Clinical Citations:</p>
          <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-400">
            {sources.map((src, idx) => (
              <li key={idx}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 hover:underline transition"
                >
                  {src.label} (External Academic Reference)
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-slate-100 pt-3 text-[11px] text-slate-400">
        <p>
          <strong>Medical Disclaimer:</strong> AUROMIL is a medical travel coordinator, not a healthcare provider. The educational guidelines above describe general surgical options and recovery milestones for clinical context only. Always consult a certified orthopedic or fertility specialist before making treatment decisions.
        </p>
      </div>
    </div>
  );
}
