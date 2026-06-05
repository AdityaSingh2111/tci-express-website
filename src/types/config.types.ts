export interface CompanyConfig {
  brandName: string;
  legalName: string;
  tagline: string;
  gstNumber: string;
  companyDescription: string;
  supportHours: string;
  supportAvailability: string;
  headOfficeAddress: string;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  supportEmail: string;
  salesEmail: string;
  contactEmail: string;
  careersEmail: string;
}

export interface SeoConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  twitterHandle: string;
}

export interface SocialConfig {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
}

export interface MediaConfig {
  // Brand logos — all consumed via mediaConfig, never hardcoded
  logoPrimary:     string; // Navbar / light backgrounds
  logoFooter:      string; // Footer / dark backgrounds
  logoDark:        string; // Explicit dark-bg variant (if differs from footer)
  logoMonogram:    string; // Icon-only / small spaces
  logoTransparent: string; // PNG with alpha — email / PDF
  logoMaster:      string; // Authoritative master — press kit reference

  heroImages:   string[];
  galleryImages: { id: number; src: string; alt: string; twClass: string }[];
  partnerLogos: { name: string; logoUrl: string }[];
  mapImage:     string;
}

export interface ThemeConfig {
  colors: {
    brandBlue: string;
    brandRed: string;
    brandNavy: string;
    backgroundLight: string;
    backgroundDark: string;
  };
}

export interface FeaturesConfig {
  showOfferPopup: boolean;
  showTestimonials: boolean;
  showTracking: boolean;
  showCareers: boolean;
  showBlog: boolean;
  showGallery: boolean;
  enableWhatsApp: boolean;
  enableCallButton: boolean;
}
