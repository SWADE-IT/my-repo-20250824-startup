import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import ServicesClient from '@/app/components/client-pages/services-client';

export async function generateMetadata(): Promise<Metadata> {
  const title = getServerTranslation('seo.servicesTitle');
  const description = getServerTranslation('seo.servicesDesc');
  
  return generatePageMetadata({
    title,
    description,
    keywords: [
      'Office 365 deployment Auckland',
      'VPN setup service',
      'cyber security audit',
      'computer setup Auckland',
      'NAS private cloud',
      'WiFi extension service',
      'CCTV installation Auckland',
      'home security system',
      'internet troubleshooting',
      'UPS power backup'
    ],
    type: 'website',
  });
}

export default function ServicesPage() {
  const structuredData = generateStructuredData('services');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ServicesClient />
    </>
  );
}