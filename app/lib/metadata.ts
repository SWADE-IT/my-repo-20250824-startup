import { Metadata } from 'next';

// Base metadata configuration
const baseMetadata = {
  metadataBase: new URL('https://swade.co.nz'),
  applicationName: 'SWADE IT',
  authors: [{ name: 'SWADE IT' }],
  generator: 'Next.js',
  keywords: [
    'Auckland IT support',
    'small business IT',
    'home network',
    'Office 365',
    'VPN setup',
    'WiFi troubleshooting',
    'CCTV installation',
    'cyber security',
    'NAS setup',
    'computer setup'
  ],
  creator: 'SWADE IT',
  publisher: 'SWADE IT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

// Structured data for organization
const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SWADE IT',
  description: 'Professional IT support services for Auckland small businesses and homes',
  url: 'https://swade.co.nz',
  telephone: '+64-29-04-561-561',
  email: 'admin@swade.co.nz',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Auckland',
    addressCountry: 'NZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -36.8485,
    longitude: 174.7633,
  },
  areaServed: {
    '@type': 'City',
    name: 'Auckland',
  },
  serviceType: [
    'IT Support',
    'Network Setup',
    'Computer Repair',
    'Cyber Security',
    'Office 365 Setup',
    'VPN Configuration',
  ],
};

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  images?: string[];
  type?: 'website' | 'article';
  locale?: 'en' | 'zh';
  alternateLocales?: string[];
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    images = ['/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png'],
    type = 'website',
    locale = 'en',
    alternateLocales = ['zh'],
  } = options;

  const fullTitle = title.includes('SWADE IT') ? title : `${title} | SWADE IT`;
  const allKeywords = [...baseMetadata.keywords, ...keywords];

  return {
    ...baseMetadata,
    title: fullTitle,
    description,
    keywords: allKeywords,
    openGraph: {
      type,
      title: fullTitle,
      description,
      images: images.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      })),
      locale,
      siteName: 'SWADE IT',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images,
      creator: '@swadeit',
      site: '@swadeit',
    },
    alternates: {
      canonical: '/',
      languages: alternateLocales.reduce((acc, loc) => {
        acc[loc] = `/${loc}`;
        return acc;
      }, {} as Record<string, string>),
    },
  };
}

export function generateStructuredData(pageType: 'home' | 'about' | 'services' | 'contact', locale: 'en' | 'zh' = 'en') {
  const baseData = organizationStructuredData;
  
  switch (pageType) {
    case 'home':
      return {
        ...baseData,
        '@type': 'Organization',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://swade.co.nz/',
        },
      };
    
    case 'about':
      return {
        ...baseData,
        '@type': 'AboutPage',
        mainEntity: baseData,
      };
    
    case 'services':
      return {
        ...baseData,
        '@type': 'Service',
        provider: baseData,
        serviceType: baseData.serviceType,
      };
    
    case 'contact':
      return {
        ...baseData,
        '@type': 'ContactPage',
        mainEntity: baseData,
      };
    
    default:
      return baseData;
  }
}

// Translation keys for metadata
export const metadataKeys = {
  en: {
    home: {
      title: 'seo.homeTitle',
      description: 'seo.homeDesc',
    },
    about: {
      title: 'seo.aboutTitle', 
      description: 'seo.aboutDesc',
    },
    services: {
      title: 'seo.servicesTitle',
      description: 'seo.servicesDesc',
    },
    contact: {
      title: 'seo.contactTitle',
      description: 'seo.contactDesc',
    },
  },
  zh: {
    home: {
      title: 'seo.homeTitle',
      description: 'seo.homeDesc',
    },
    about: {
      title: 'seo.aboutTitle',
      description: 'seo.aboutDesc',
    },
    services: {
      title: 'seo.servicesTitle',
      description: 'seo.servicesDesc',
    },
    contact: {
      title: 'seo.contactTitle',
      description: 'seo.contactDesc',
    },
  },
};