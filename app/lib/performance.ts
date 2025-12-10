// Performance monitoring utilities for Core Web Vitals

export interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 }
}

export function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

// Report web vitals to analytics
export function reportWebVitals(metric: WebVitalsMetric) {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id
    })
  }
  
  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}

// Performance observer for custom metrics
export class PerformanceMonitor {
  private observers: PerformanceObserver[] = []

  constructor() {
    if (typeof window === 'undefined') return
    
    this.observeNavigationTiming()
    this.observeResourceTiming()
    this.observeLongTasks()
  }

  private observeNavigationTiming() {
    if (!('PerformanceObserver' in window)) return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          
          // Time to First Byte
          const ttfb = navEntry.responseStart - navEntry.requestStart
          console.log('TTFB:', ttfb)
          
          // DOM Content Loaded
          const dcl = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart
          console.log('DOM Content Loaded:', dcl)
          
          // Load Complete
          const loadComplete = navEntry.loadEventEnd - navEntry.loadEventStart
          console.log('Load Complete:', loadComplete)
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['navigation'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('Navigation timing observation not supported')
    }
  }

  private observeResourceTiming() {
    if (!('PerformanceObserver' in window)) return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          
          // Log slow resources (>1s)
          if (resourceEntry.duration > 1000) {
            console.warn('Slow resource:', {
              name: resourceEntry.name,
              duration: resourceEntry.duration,
              size: resourceEntry.transferSize
            })
          }
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('Resource timing observation not supported')
    }
  }

  private observeLongTasks() {
    if (!('PerformanceObserver' in window)) return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime
          })
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['longtask'] })
      this.observers.push(observer)
    } catch (e) {
      console.warn('Long task observation not supported')
    }
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Image loading performance utilities
export function preloadCriticalImages(imageSrcs: string[]) {
  if (typeof window === 'undefined') return

  imageSrcs.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

// Font loading optimization
export function preloadFonts(fontUrls: string[]) {
  if (typeof window === 'undefined') return

  fontUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = url
    document.head.appendChild(link)
  })
}

// Critical resource hints
export function addResourceHints() {
  if (typeof window === 'undefined') return

  // DNS prefetch for external domains
  const domains = ['fonts.googleapis.com', 'fonts.gstatic.com']
  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = `//${domain}`
    document.head.appendChild(link)
  })
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Add resource hints
  addResourceHints()
  
  // Start performance monitoring
  const monitor = new PerformanceMonitor()
  
  // Preload critical images
  preloadCriticalImages([
    '/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png', // Logo
  ])

  return monitor
}