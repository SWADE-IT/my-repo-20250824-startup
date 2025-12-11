'use client'

import { useI18n } from "@/app/lib/i18n-context";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MainLayout from '@/components/layout/main-layout'
import Image from "next/image";

export default function ServicesClient() {
  const pathname = usePathname();
  const { t, tv } = useI18n();

  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  const getLocalizedPath = (path: string) => {
    return path === '/' ? localePrefix : `${localePrefix}${path}`;
  };

  const officeList: string[] = tv("services.officeList") as string[] || [];
  const homeList: string[] = tv("services.homeList") as string[] || [];
  const officeDetails: string[] = tv("services.officeDetails") as string[] || [];
  const homeDetails: string[] = tv("services.homeDetails") as string[] || [];

  const officeImages = [
    "/assets/service-cyber-security.png",
    "/assets/service-computer-setup.png",
    "/assets/service-microsoft-365.png",
    "/assets/service-vpn-setup.png",
    "/assets/service-nas-cloud.png",
    "/assets/service-ups-power.png"
  ];

  const homeImages = [
    "/assets/service-internet-troubleshooting.png",
    "/assets/service-wifi-extension.png",
    "/assets/service-home-nas.png",
    "/assets/service-home-security.png"
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <section className="container mx-auto px-6 py-20" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 id="services-heading" className="text-5xl font-bold tracking-tight mb-6 text-foreground">
                {t("services.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("services.subtitle")}
              </p>
            </div>

            {/* Office IT Services */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-foreground">{t("services.officeTitle")}</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {officeList.map((item, index) => (
                  <article key={item} className="p-6 rounded-lg bg-service-card hover:shadow-md transition-colors shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <Image
                          src={officeImages[index]}
                          alt={`${item} service icon`}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-4 text-service-card-foreground">{item}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {officeDetails[index]}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Personal & Residential Services */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-foreground">{t("services.homeTitle")}</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {homeList.map((item, index) => (
                  <article key={item} className="p-6 rounded-lg bg-service-card hover:shadow-md transition-colors shadow-sm">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <Image
                          src={homeImages[index]}
                          alt={`${item} service icon`}
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-4 text-service-card-foreground">{item}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {homeDetails[index]}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center p-12 rounded-lg border border-border bg-card">
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {t("services.summary")}
              </p>
              <Button size="lg" asChild>
                <Link href={getLocalizedPath("/contact")}>Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}