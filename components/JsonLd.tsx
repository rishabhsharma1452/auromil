interface JsonLdProps {
  schema: Record<string, any> | Record<string, any>[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper generators for common schemas

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AUROMIL",
    "url": "https://auromil.com",
    "logo": "https://auromil.com/auromil-logo.svg",
    "email": "contact@auromil.com",
    "telephone": "+919310790689",
    "sameAs": [
      "https://www.linkedin.com/company/auromil",
      "https://www.instagram.com/auromilhealth"
    ],
    "description": "AUROMIL coordinates medical travel for international patients seeking care in India, matching them with JCI and NABH accredited hospitals."
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AUROMIL",
    "url": "https://auromil.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://auromil.com/procedures?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function getFAQPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };
}

export function getMedicalWebPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": name,
    "description": description,
    "url": url,
    "aspect": ["Overview", "Recovery", "Benefits", "Risks"],
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient"
    }
  };
}
