'use client'

import { useEffect, useRef, useState } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
}

export default function LazySection({ 
  children, 
  className = '', 
  fallback = null,
  rootMargin = '50px',
  threshold = 0.1
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold, hasLoaded])

  return (
    <div 
      ref={ref} 
      className={`${className} ${!isVisible ? 'below-fold' : 'above-fold'}`}
    >
      {isVisible ? children : fallback}
    </div>
  )
}