"use client";

import { useState } from "react";
import { submitInquiryAction } from "../app/actions/inquiry";

export default function ContactInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    procedureSlug: "knee-replacement",
    message: "",
    consent: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const procedureOptions = [
    { slug: "knee-replacement", title: "Total Knee Replacement" },
    { slug: "hip-replacement", title: "Hip Replacement" },
    { slug: "spinal-procedures", title: "Spine Surgery" },
    { slug: "ivf", title: "IVF Treatment" },
    { slug: "cosmetic-surgery", title: "Cosmetic Surgery" },
    { slug: "dental-implants", title: "Dental Implants" },
    { slug: "cataract-surgery", title: "Cataract Surgery" },
    { slug: "weight-loss-surgery", title: "Weight Loss Surgery" },
    { slug: "custom", title: "Custom / Other Procedure" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);
    setError(null);

    const match = procedureOptions.find(p => p.slug === formData.procedureSlug);
    const procedureTitle = match ? match.title : "Custom Procedure";

    const result = await submitInquiryAction({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      procedureSlug: formData.procedureSlug,
      procedureTitle: procedureTitle,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        procedureSlug: "knee-replacement",
        message: "",
        consent: false,
      });
    } else {
      setError(result.error || "An unexpected error occurred.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-white">Inquiry Sent Successfully</h4>
        <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
          Thank you. A care coordinator will review your medical records request and contact you within 24 to 48 hours to discuss treatment options.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
      {error && (
        <div className="p-3 bg-rose-500/10 text-rose-300 text-xs rounded-xl border border-rose-500/20 font-medium">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-[11px] font-semibold text-slate-300 mb-1">
            Your Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-[11px] font-semibold text-slate-300 mb-1">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-[11px] font-semibold text-slate-300 mb-1">
            Phone (with Country Code)
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            placeholder="+1 555 0199"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="contact-procedure" className="block text-[11px] font-semibold text-slate-300 mb-1">
            Desired Procedure
          </label>
          <select
            id="contact-procedure"
            value={formData.procedureSlug}
            onChange={(e) => setFormData({ ...formData, procedureSlug: e.target.value })}
            className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition"
          >
            {procedureOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug} className="bg-slate-900 text-white">
                {opt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[11px] font-semibold text-slate-300 mb-1">
          Describe Your Medical Situation & Symptoms
        </label>
        <textarea
          id="contact-message"
          required
          rows={2}
          placeholder="Describe your symptoms or diagnosis..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition resize-none"
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="contact-consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-0.5 h-3.5 w-3.5 rounded border-white/10 bg-white/5 text-blue-700 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="contact-consent" className="text-[10px] text-slate-400 leading-normal select-none cursor-pointer">
          I agree to share my medical records and understand AUROMIL coordinates travel and care, and does not provide clinical diagnosis or surgery.
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !formData.consent}
        className="w-full text-center py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-xs transition shadow-md shadow-blue-700/10 hover:shadow-blue-700/25 cursor-pointer animate-none"
      >
        {isSubmitting ? "Submitting Inquiry..." : "Submit Confidential Inquiry"}
      </button>
    </form>
  );
}
