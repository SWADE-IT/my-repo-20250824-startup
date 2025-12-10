import { Metadata } from 'next';
import { generatePageMetadata, generateStructuredData } from '@/app/lib/metadata';
import { getServerTranslation } from '@/app/lib/server-i18n';
import ContactClient from '@/app/components/client-pages/contact-client';

export async function generateMetadata(): Promise<Metadata> {
  const title = getServerTranslation('seo.contactTitle');
  const description = getServerTranslation('seo.contactDesc');
  
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

export default function ContactPage() {
  const structuredData = generateStructuredData('contact');
  
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