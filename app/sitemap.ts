import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swade.co.nz'
  const locales = ['en', 'zh']
  const pages = ['', '/about', '/services', '/contact']
  
  const sitemap: MetadataRoute.Sitemap = []
  
  // Add root redirect
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  })
  
  // Add localized pages
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = page === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${page}`
      let priority: number
      let changeFrequency: 'monthly' | 'yearly'
      
      if (page === '') {
        priority = 1
        changeFrequency = 'monthly'
      } else if (page === '/services') {
        priority = 0.9
        changeFrequency = 'monthly'
      } else if (page === '/about') {
        priority = 0.8
        changeFrequency = 'yearly'
      } else {
        priority = 0.7
        changeFrequency = 'yearly'
      }
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
      })
    })
  })
  
  return sitemap
}