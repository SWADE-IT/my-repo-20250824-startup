import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import ServicesClient from '@/app/components/client-pages/services-client';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = getServerTranslation('seo.servicesTitle', locale as 'en' | 'zh');
  const description = getServerTranslation('seo.servicesDesc', locale as 'en' | 'zh');
  
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

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const structuredData = generateStructuredData('services', locale as 'en' | 'zh');
  
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

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}