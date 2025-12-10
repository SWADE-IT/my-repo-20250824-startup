import dynamic from 'next/dynamic'

// Lazy load heavy components with loading states
export const LazyContactClient = dynamic(
  () => import('@/app/components/client-pages/contact-client'),
  {
    loading: () => null,
    ssr: true
  }
)

export const LazyServicesClient = dynamic(
  () => import('@/app/components/client-pages/services-client'),
  {
    loading: () => null,
    ssr: true
  }
)

export const LazyLanguageToggle = dynamic(
  () => import('@/components/layout/language-toggle'),
  {
    loading: () => null,
    ssr: false
  }
)

// Utility for creating lazy components with custom loading states
export function createLazyComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    loading?: () => React.ReactNode
    ssr?: boolean
  } = {}
) {
  return dynamic(importFn, {
    loading: options.loading || (() => null),
    ssr: options.ssr ?? true
  })
}