import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import AboutClient from '@/app/components/client-pages/about-client';

export async function generateMetadata(): Promise<Metadata> {
  const title = getServerTranslation('seo.aboutTitle');
  const description = getServerTranslation('seo.aboutDesc');
  
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

export default function AboutPage() {
  const structuredData = generateStructuredData('about');
  
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