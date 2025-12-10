import { MetadataRoute } from 'next'

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
      const priority = page === '' ? 1 : page === '/services' ? 0.9 : page === '/about' ? 0.8 : 0.7
      const changeFrequency = page === '' || page === '/services' ? 'monthly' : 'yearly'
      
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: changeFrequency as 'monthly' | 'yearly',
        priority,
      })
    })
  })
  
  return sitemap
}