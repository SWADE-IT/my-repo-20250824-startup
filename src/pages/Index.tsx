import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/LanguageContext";
import heroImage from "@/assets/hero-auckland-skyline.jpg";
import swadeLogo from "@/assets/swade-it-logo.png";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { t, tv } = useI18n();

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      hero.style.setProperty('--x', `${x}%`);
      hero.style.setProperty('--y', `${y}%`);
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const canonical = typeof window !== 'undefined' ? window.location.origin : '/';
  const officeList: string[] = tv("services.officeList") as string[];
  const homeList: string[] = tv("services.homeList") as string[];

  return (
    <>
      <Helmet>
        <title>{t("seo.homeTitle")}</title>
        <meta name="description" content={t("seo.homeDesc")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={t("seo.homeTitle")} />
        <meta property="og:description" content={t("seo.homeDesc")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: t("common.businessName"),
            description: t("seo.homeDesc"),
            areaServed: "Auckland",
            url: typeof window !== 'undefined' ? window.location.origin : undefined,
            telephone: "029 04 561 561",
            email: "swade.it@outlook.com",
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background"
        aria-labelledby="hero-heading"
      >
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground font-medium">
                  {t("common.slogan")}
                </p>
                <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
                  {t("home.hero.title")}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {t("home.hero.subtitle")}
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">{t("common.cta.contact")}</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/services">{t("common.cta.learnMore")}</Link>
                </Button>
              </div>
              
              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="p-6 rounded-lg border border-border bg-card">
                  <div className="font-medium text-foreground">{t("home.highlights.fast")}</div>
                </div>
                <div className="p-6 rounded-lg border border-border bg-card">
                  <div className="font-medium text-foreground">{t("home.highlights.budget")}</div>
                </div>
                <div className="p-6 rounded-lg border border-border bg-card">
                  <div className="font-medium text-foreground">{t("home.highlights.local")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background" aria-labelledby="services-overview">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 id="services-overview" className="text-4xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive IT solutions for your business and home
              </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-2">
              <div className="p-8 rounded-lg border border-border bg-card">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">{t("services.officeTitle")}</h3>
                <ul className="space-y-4">
                  {officeList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-4 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 rounded-lg border border-border bg-card">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">{t("services.homeTitle")}</h3>
                <ul className="space-y-4">
                  {homeList.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-4 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
