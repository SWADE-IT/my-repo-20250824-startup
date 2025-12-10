import { describe, it, expect } from 'vitest'
import { getServerTranslation } from '../app/lib/server-i18n'

describe('Internationalization', () => {
  describe('Server-side translations', () => {
    it('should return English translations for en locale', () => {
      const title = getServerTranslation('seo.homeTitle', 'en')
      expect(title).toBe('SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks')
      
      const navHome = getServerTranslation('nav.home', 'en')
      expect(navHome).toBe('Home')
    })

    it('should return Chinese translations for zh locale', () => {
      const title = getServerTranslation('seo.homeTitle', 'zh')
      expect(title).toBe('SWADE IT — 奥克兰 IT 服务 | Office 365、VPN、家庭网络')
      
      const navHome = getServerTranslation('nav.home', 'zh')
      expect(navHome).toBe('首页')
    })

    it('should fallback to English for invalid locale', () => {
      const title = getServerTranslation('seo.homeTitle', 'invalid' as any)
      expect(title).toBe('SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks')
    })

    it('should return key for non-existent translation key', () => {
      const result = getServerTranslation('non.existent.key', 'en')
      expect(result).toBe('non.existent.key')
    })

    it('should handle nested translation keys', () => {
      const ctaContact = getServerTranslation('common.cta.contact', 'en')
      expect(ctaContact).toBe('Get Support')
      
      const ctaContactZh = getServerTranslation('common.cta.contact', 'zh')
      expect(ctaContactZh).toBe('获取支持')
    })
  })

  describe('Translation completeness', () => {
    it('should have all required SEO translations for both locales', () => {
      const seoKeys = [
        'seo.homeTitle',
        'seo.homeDesc',
        'seo.aboutTitle',
        'seo.aboutDesc',
        'seo.servicesTitle',
        'seo.servicesDesc',
        'seo.contactTitle',
        'seo.contactDesc'
      ]

      seoKeys.forEach(key => {
        const enTranslation = getServerTranslation(key, 'en')
        const zhTranslation = getServerTranslation(key, 'zh')
        
        expect(enTranslation).not.toBe(key) // Should not return the key itself
        expect(zhTranslation).not.toBe(key) // Should not return the key itself
        expect(enTranslation).not.toBe(zhTranslation) // Should be different
      })
    })

    it('should have all navigation translations for both locales', () => {
      const navKeys = ['nav.home', 'nav.about', 'nav.services', 'nav.contact']

      navKeys.forEach(key => {
        const enTranslation = getServerTranslation(key, 'en')
        const zhTranslation = getServerTranslation(key, 'zh')
        
        expect(enTranslation).not.toBe(key)
        expect(zhTranslation).not.toBe(key)
        expect(enTranslation).not.toBe(zhTranslation)
      })
    })
  })
})