"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { procedures } from "../content/procedures";
import { submitInquiryAction } from "../app/actions/inquiry";

function ModalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const inquirySlug = searchParams.get("inquire") || searchParams.get("inquiry");
  
  const [isOpen, setIsOpen] = useState(false);
  const [procedureTitle, setProcedureTitle] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close helper
  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    // Remove search param from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("inquire");
    params.delete("inquiry");
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  useEffect(() => {
    if (inquirySlug) {
      const match = procedures.find((p) => p.slug === inquirySlug);
      setProcedureTitle(match ? match.title : inquirySlug);
      setIsOpen(true);
      // Autofocus first input on open
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 50);
    } else {
      setIsOpen(false);
    }
  }, [inquirySlug]);

  // Trap focus and handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        handleClose();
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, input, textarea, [tabindex="0"]'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitInquiryAction({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      procedureSlug: inquirySlug || "custom",
      procedureTitle: procedureTitle,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
      });
    } else {
      setError(result.error || "An unexpected error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300 p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 id="modal-title" className="text-2xl font-bold text-slate-900">Inquiry Received</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you. A care coordinator will review your medical records request and contact you within 24 to 48 hours to discuss treatment options.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                Inquiry Referral
              </span>
              <h3 id="modal-title" className="text-2xl font-bold text-slate-900 leading-tight">
                Inquiry regarding {procedureTitle}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Connect with leading accredited clinics in India. We coordinate records, consultations, and visas.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-100 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Full Name
                </label>
                <input
                  ref={firstInputRef}
                  id="inquiry-name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 focus:outline-none transition"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone (with Country Code)
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    required
                    placeholder="+1 555 0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Describe Your Medical Situation & Symptoms
                </label>
                <textarea
                  id="inquiry-message"
                  required
                  rows={3}
                  placeholder="Please describe your current diagnosis, symptoms, or any diagnostic files you plan to share..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 focus:outline-none transition resize-none"
                />
              </div>

              <div className="flex items-start gap-3 mt-2">
                <input
                  id="inquiry-consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="inquiry-consent" className="text-xs text-slate-500 leading-normal select-none cursor-pointer">
                  I agree to share my medical records for clinical review and understand AUROMIL coordinates travel and care, and does not provide clinical diagnosis or surgery.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.consent}
              className="w-full text-center py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold transition shadow-lg shadow-blue-700/20 hover:shadow-blue-700/35 cursor-pointer"
            >
              {isSubmitting ? "Submitting Inquiry..." : "Submit Confidential Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProcedureInquiryModal() {
  return (
    <Suspense fallback={null}>
      <ModalContent />
    </Suspense>
  );
}
