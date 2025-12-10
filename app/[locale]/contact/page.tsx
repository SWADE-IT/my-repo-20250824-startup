import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import ContactClient from '@/app/components/client-pages/contact-client';

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = getServerTranslation('seo.contactTitle', locale as 'en' | 'zh');
  const description = getServerTranslation('seo.contactDesc', locale as 'en' | 'zh');
  
  return generatePageMetadata({
    title,
    description,
    keywords: [
      'contact SWADE IT',
      'Auckland IT support phone',
      'WhatsApp IT support',
      'WeChat IT help',
      '029 04 561 561',
      'admin@swade.co.nz',
      'IT support contact Auckland'
    ],
    type: 'website',
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const structuredData = generateStructuredData('contact', locale as 'en' | 'zh');
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ContactClient />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}