import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import HomeClient from '@/app/components/client-pages/home-client';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = getServerTranslation('seo.homeTitle', locale as 'en' | 'zh');
  const description = getServerTranslation('seo.homeDesc', locale as 'en' | 'zh');
  
  return generatePageMetadata({
    title,
    description,
    keywords: [
      'Auckland IT support',
      'small business IT',
      'home network setup',
      'Office 365 deployment',
      'VPN setup Auckland',
      'WiFi troubleshooting',
      'computer setup',
      'cyber security Auckland'
    ],
    type: 'website',
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const structuredData = generateStructuredData('home', locale as 'en' | 'zh');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HomeClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}