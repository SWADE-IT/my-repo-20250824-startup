'use client'

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/app/lib/i18n-context";
import MainLayout from '@/components/layout/main-layout'
import LazySection from '@/app/components/performance/lazy-section'

export default function HomeClient() {
  const heroRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { t, tv } = useI18n();

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  const getLocalizedPath = (path: string) => {
    return path === '/' ? localePrefix : `${localePrefix}${path}`;
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      hero.style.setProperty('--x', `${x}%`);
      hero.style.setProperty('--y', `${y}%`);
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const officeList: string[] = tv("services.officeList") as string[];
  const homeList: string[] = tv("services.homeList") as string[];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero" aria-labelledby="hero-heading">
        {/* Content Container */}
        <div className="relative z-10 container-premium section-spacing">
          <div className="max-w-6xl mx-auto text-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-6xl font-light tracking-wide uppercase text-primary mb-4">
                  SWADE IT
                </h2>
                <p className="text-lg text-golden font-handwritten font-medium tracking-wide uppercase">
                  {t("common.slogan")}
                </p>
                <h1 id="hero-heading" className="text-foreground leading-none font-normal text-5xl">
                  {t("home.hero.title")}
                </h1>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                  {t("home.hero.subtitle")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" variant="default" asChild>
                  <Link href={getLocalizedPath("/contact")}>{t("common.cta.contact")}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={getLocalizedPath("/services")}>{t("common.cta.learnMore")}</Link>
                </Button>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                <div className="p-8 bg-card border border-border shadow-premium">
                  <div className="font-medium text-foreground text-lg">{t("home.highlights.fast")}</div>
                </div>
                <div className="p-8 bg-card border border-border shadow-premium">
                  <div className="font-medium text-foreground text-lg">{t("home.highlights.budget")}</div>
                </div>
                <div className="p-8 bg-card border border-border shadow-premium">
                  <div className="font-medium text-foreground text-lg">{t("home.highlights.local")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <LazySection
        className="section-spacing bg-gradient-surface"
        fallback={
          <div className="section-spacing bg-gradient-surface">
            <div className="container-premium">
              <div className="max-w-6xl mx-auto">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-96 mx-auto mb-20"></div>
                  <div className="grid gap-12 md:grid-cols-2">
                    <div className="h-64 bg-muted rounded"></div>
                    <div className="h-64 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <section aria-labelledby="services-overview">
          <div className="container-premium">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <h2 id="services-overview" className="mb-6 text-foreground">
                  {t("home.servicesOverview.title")}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t("home.servicesOverview.subtitle")}
                </p>
              </div>

              <div className="grid gap-12 md:grid-cols-2">
                <div className="p-10 bg-card border border-border shadow-card">
                  <h3 className="text-2xl font-medium mb-8 text-foreground">{t("services.officeTitle")}</h3>
                  <ul className="space-y-6">
                    {officeList.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-3 mr-6 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-10 bg-card border border-border shadow-card">
                  <h3 className="text-2xl font-medium mb-8 text-foreground">{t("services.homeTitle")}</h3>
                  <ul className="space-y-6">
                    {homeList.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-primary mt-3 mr-6 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center mt-16">
                <Button size="lg" variant="default" asChild>
                  <Link href={getLocalizedPath("/services")}>{t("home.servicesOverview.viewAll")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </MainLayout>
  )
}