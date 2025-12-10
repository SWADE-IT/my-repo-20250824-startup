import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Suspense } from 'react'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
})

export const metadata: Metadata = {
  title: {
    default: 'SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks',
    template: '%s | SWADE IT'
  },
  description: 'Fast, professional IT help in Auckland: Office 365, VPN remote work, email, and home network troubleshooting.',
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
    locale: 'en_NZ',
    url: 'https://swade.co.nz',
    siteName: 'SWADE IT',
    title: 'SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks',
    description: 'Fast, professional IT help in Auckland: Office 365, VPN remote work, email, and home network troubleshooting.',
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
    title: 'SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks',
    description: 'Fast, professional IT help in Auckland: Office 365, VPN remote work, email, and home network troubleshooting.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
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
      </head>
      <body className={`${inter.className} antialiased font-loading`}>
        <Providers>
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