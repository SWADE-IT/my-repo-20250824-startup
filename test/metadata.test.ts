import { describe, it, expect } from 'vitest';
import { generatePageMetadata, generateStructuredData } from '../app/lib/metadata';
import { getServerTranslation } from '../app/lib/server-i18n';

describe('Metadata Generation', () => {
  it('should generate proper page metadata for home page', () => {
    const title = getServerTranslation('seo.homeTitle');
    const description = getServerTranslation('seo.homeDesc');
    
    const metadata = generatePageMetadata({
      title,
      description,
      keywords: ['test', 'keywords'],
    });

    expect(metadata.title).toContain('SWADE IT');
    expect(metadata.description).toBe(description);
    expect(metadata.openGraph?.title).toContain('SWADE IT');
    expect(metadata.openGraph?.description).toBe(description);
    expect(metadata.twitter?.title).toContain('SWADE IT');
    expect(metadata.twitter?.description).toBe(description);
  });

  it('should generate structured data for different page types', () => {
    const homeData = generateStructuredData('home');
    const aboutData = generateStructuredData('about');
    const servicesData = generateStructuredData('services');
    const contactData = generateStructuredData('contact');

    expect(homeData['@type']).toBe('Organization');
    expect(aboutData['@type']).toBe('AboutPage');
    expect(servicesData['@type']).toBe('Service');
    expect(contactData['@type']).toBe('ContactPage');
    
    // All should have the base organization data
    expect(homeData.name).toBe('SWADE IT');
    expect(aboutData.name).toBe('SWADE IT');
    expect(servicesData.name).toBe('SWADE IT');
    expect(contactData.name).toBe('SWADE IT');
  });

  it('should get server translations correctly', () => {
    const enTitle = getServerTranslation('seo.homeTitle', 'en');
    const zhTitle = getServerTranslation('seo.homeTitle', 'zh');
    
    expect(enTitle).toContain('Auckland IT Services');
    expect(zhTitle).toContain('奥克兰 IT 服务');
    expect(enTitle).not.toBe(zhTitle);
  });

  it('should handle missing translation keys gracefully', () => {
    const missing = getServerTranslation('nonexistent.key');
    expect(missing).toBe('nonexistent.key');
  });
});