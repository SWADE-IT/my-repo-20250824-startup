'use client'

import { useEffect } from 'react'
import { reportWebVitals, initPerformanceMonitoring } from '@/app/lib/performance'

export default function WebVitals() {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initPerformanceMonitoring()

    // Import and setup web vitals reporting
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals)
      onFCP(reportWebVitals)
      onLCP(reportWebVitals)
      onTTFB(reportWebVitals)
      onINP(reportWebVitals)
    }).catch(() => {
      // Gracefully handle if web-vitals is not available
      console.log('Web vitals library not available')
    })

    // Cleanup on unmount
    return () => {
      if (monitor) {
        monitor.disconnect()
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}