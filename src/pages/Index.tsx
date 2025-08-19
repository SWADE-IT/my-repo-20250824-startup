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
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{
          background: `var(--gradient-hero), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
        aria-labelledby="hero-heading"
      >
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), hsl(var(--golden) / 0.15), transparent 40%)`
          }}
        />
        
        {/* Logo Overlay */}
        <div className="absolute top-8 left-8 z-10">
          <img 
            src={swadeLogo} 
            alt="SWADE IT Logo" 
            className="h-16 w-auto drop-shadow-xl"
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Professional card background for content */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-[var(--shadow-elegant)]">
              <p className="text-lg md:text-xl text-white/90 mb-4 font-medium">
                {t("common.slogan")}
              </p>
              <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg" style={{
                  textShadow: 'var(--text-shadow-3d)'
                }}>
                  {t("home.hero.title")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
                {t("home.hero.subtitle")}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-[hsl(var(--golden))] to-[hsl(45_100%_45%)] hover:from-[hsl(45_100%_45%)] hover:to-[hsl(var(--golden))] text-black font-semibold shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105" asChild>
                  <Link to="/contact">{t("common.cta.contact")}</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                  <Link to="/services">{t("common.cta.learnMore")}</Link>
                </Button>
              </div>
              
              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold text-white text-lg">{t("home.highlights.fast")}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold text-white text-lg">{t("home.highlights.budget")}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="font-semibold text-white text-lg">{t("home.highlights.local")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20" aria-labelledby="services-overview">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/50">
              <h2 id="services-overview" className="text-3xl md:text-4xl font-bold text-center mb-12">
                Our Services
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{t("services.officeTitle")}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {officeList.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{t("services.homeTitle")}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {homeList.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-center mt-8">
                <Button asChild className="bg-gradient-to-r from-[hsl(var(--golden))] to-[hsl(45_100%_45%)] hover:from-[hsl(45_100%_45%)] hover:to-[hsl(var(--golden))] text-black font-semibold">
                  <Link to="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
