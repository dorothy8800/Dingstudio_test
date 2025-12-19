export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface SiteConfig {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  accentColor: string; // Hex code
  contactEmail: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'PenTool' | 'Monitor' | 'Smartphone' | 'Layers';
}

export type Tab = 'home' | 'services' | 'portfolio' | 'contact';