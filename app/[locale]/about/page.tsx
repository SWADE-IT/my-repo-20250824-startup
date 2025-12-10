import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import AboutClient from '@/app/components/client-pages/about-client';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = getServerTranslation('seo.aboutTitle', locale as 'en' | 'zh');
  const description = getServerTranslation('seo.aboutDesc', locale as 'en' | 'zh');
  
  return generatePageMetadata({
    title,
    description,
    keywords: [
      'Auckland IT company',
      'small business IT support',
      'residential IT help',
      '10 years experience',
      'budget friendly IT',
      'local IT support Auckland'
    ],
    type: 'website',
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const structuredData = generateStructuredData('about', locale as 'en' | 'zh');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AboutClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}