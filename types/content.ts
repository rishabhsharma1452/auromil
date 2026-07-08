export interface FAQItem {
  q: string;
  a: string;
}

export interface OptionItem {
  title: string;
  description: string;
}

export interface ProcedureTopic {
  title: string;
  metaTitle: string;
  metaDesc: string;
  content: string; // Markdown or detailed text content
}

export interface Procedure {
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  metaTitle: string;
  metaDesc: string;
  overview: string;
  whoBenefits: string[];
  options: OptionItem[];
  recovery: string;
  benefits: string[];
  risks: string[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  topics?: Record<string, ProcedureTopic>;
}
