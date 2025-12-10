import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '../providers'
import { Suspense } from 'react'
import { getServerTranslation } from '../lib/server-i18n'
import { notFound } from 'next/navigation'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
})

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  
  if (!['en', 'zh'].includes(locale)) {
    return {}
  }

  const title = getServerTranslation('seo.homeTitle', locale as 'en' | 'zh')
  const description = getServerTranslation('seo.homeDesc', locale as 'en' | 'zh')

  return {
    title: {
      default: title,
      template: `%s | SWADE IT`
    },
    description,
    keywords: ['IT services', 'Auckland', 'Office 365', 'VPN', 'home networks', 'computer setup', 'cyber security'],
    authors: [{ name: 'SWADE IT' }],
    creator: 'SWADE IT',
    publisher: 'SWADE IT',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://swade.co.nz'),
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_NZ',
      url: `https://swade.co.nz/${locale}`,
      siteName: 'SWADE IT',
      title,
      description,
      images: [
        {
          url: '/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png',
          width: 1200,
          height: 630,
          alt: 'SWADE IT Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!['en', 'zh'].includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload critical resources */}
        <link 
          rel="preload" 
          href="/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png" 
          as="image" 
          type="image/png"
        />
        
        {/* Language alternates */}
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="zh" href="/zh" />
        <link rel="alternate" hrefLang="x-default" href="/en" />
      </head>
      <body className={`${inter.className} antialiased font-loading`}>
        <Providers locale={locale}>
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-32 mb-4"></div>
                <div className="h-4 bg-muted rounded w-48"></div>
              </div>
            </div>
          }>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}