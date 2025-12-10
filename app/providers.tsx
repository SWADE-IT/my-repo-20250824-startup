'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { I18nProvider } from './lib/i18n-context'
import WebVitals from './components/performance/web-vitals'
import ServiceWorkerRegistration from './components/performance/service-worker'
import { useState } from 'react'

export function Providers({ children, locale }: { children: React.ReactNode; locale?: string }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <TooltipProvider>
          <I18nProvider initialLocale={locale}>
            {children}
            <Toaster />
            <Sonner />
            <WebVitals />
            <ServiceWorkerRegistration />
          </I18nProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}