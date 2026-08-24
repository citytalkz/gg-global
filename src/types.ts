export interface Interview {
  id: string;
  slug: string;
  title: string;
  executiveName: string;
  executiveRole: string;
  company: string;
  companyLogo?: string;
  executivePhoto: string;
  publishedAt: string;
  isPublished: boolean;
  featuredOrder?: number;
  summary: string;
  intro: string;
  keyHighlights: string[];
  content: string; // Markdown or rich HTML-compatible text
  youtubeUrl: string;
  youtubeId: string;
  linkedinUrl: string;
  tags: string[];
  category: 'Finance Leadership' | 'Executive Insights' | 'Business Transformation' | 'Technology' | 'Future of Work' | 'Strategy' | 'Organizational Growth';
  readTime: string;
  videoDuration: string;
  seoTitle?: string;
  seoDescription?: string;
  viewCount?: number;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  country: string;
  requirement: string;
  service: string;
  headcount?: string;
  message?: string;
  date: string;
  source: 'Contact Form' | 'AI Chatbot' | 'Website CTA' | 'Globally Unscripted CTA';
  status: LeadStatus;
  notes?: string;
  budget?: string;
}

export interface WebsiteContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  whoWeAre: {
    heading: string;
    statement: string;
    description: string;
    stats: Array<{ label: string; value: string; detail: string }>;
  };
  workforceSolutions: {
    tagline: string;
    description: string;
    offerings: Array<{
      title: string;
      description: string;
      features: string[];
      icon: string;
    }>;
  };
  domainOperations: {
    tagline: string;
    description: string;
    functions: Array<{
      name: string;
      code: string;
      focus: string;
      deliverables: string[];
      metrics: string;
    }>;
  };
  howWeWork: {
    steps: Array<{
      number: string;
      name: string;
      subtitle: string;
      description: string;
      deliverable: string;
    }>;
  };
  whyGGGlobal: {
    pillars: Array<{
      title: string;
      description: string;
      metric: string;
    }>;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  contact: {
    email: string;
    phone: string;
    offices: Array<{
      city: string;
      country: string;
      address: string;
      type: string;
    }>;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionPills?: string[];
  leadCaptured?: boolean;
}
