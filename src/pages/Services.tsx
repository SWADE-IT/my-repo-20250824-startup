import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/LanguageContext";
import computerSetup from "@/assets/service-computer-setup.png";
import microsoft365 from "@/assets/service-microsoft-365.png";
import vpnSetup from "@/assets/service-vpn-setup.png";
import nasCloud from "@/assets/service-nas-cloud.png";
import upsPower from "@/assets/service-ups-power.png";
import internetTroubleshooting from "@/assets/service-internet-troubleshooting.png";
import wifiExtension from "@/assets/service-wifi-extension.png";
import homeNas from "@/assets/service-home-nas.png";
import homeSecurity from "@/assets/service-home-security.png";

const Services = () => {
  const { t, tv } = useI18n();
  const officeList: string[] = tv("services.officeList") as string[];
  const homeList: string[] = tv("services.homeList") as string[];
  const officeDetails: string[] = tv("services.officeDetails") as string[];
  const homeDetails: string[] = tv("services.homeDetails") as string[];
  const canonical = typeof window !== 'undefined' ? window.location.origin + '/services' : '/services';

  const officeImages = [computerSetup, microsoft365, vpnSetup, nasCloud, upsPower];
  const homeImages = [internetTroubleshooting, wifiExtension, homeNas, homeSecurity];

  return (
    <>
      <Helmet>
        <title>{t("seo.servicesTitle")}</title>
        <meta name="description" content={t("seo.servicesDesc")} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: t("common.businessName"),
            description: t("seo.servicesDesc"),
            areaServed: "Auckland",
            url: typeof window !== 'undefined' ? window.location.origin : undefined,
            telephone: "029 04 561 561",
            email: "swade.it@outlook.com",
            makesOffer: [
              ...officeList.map((name) => ({ "@type": "Offer", category: "Office IT", name })),
              ...homeList.map((name) => ({ "@type": "Offer", category: "Residential IT", name })),
            ],
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="container mx-auto px-4 py-16" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/50 mb-12">
              <h1 id="services-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("services.title")}
              </h1>
            </div>

            {/* Office IT Services */}
            <div className="mb-16">
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/50">
                <h2 className="text-3xl font-bold mb-8 text-primary text-center">{t("services.officeTitle")}</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {officeList.map((item, index) => (
                    <article key={item} className="bg-gradient-card rounded-xl p-6 shadow-[var(--shadow-depth)] border border-border/30 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-4 bg-muted/50 rounded-xl">
                          <img 
                            src={officeImages[index]} 
                            alt={`${item} service icon`}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-primary">{item}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {officeDetails[index]}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal & Residential Services */}
            <div className="mb-16">
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/50">
                <h2 className="text-3xl font-bold mb-8 text-primary text-center">{t("services.homeTitle")}</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {homeList.map((item, index) => (
                    <article key={item} className="bg-gradient-card rounded-xl p-6 shadow-[var(--shadow-depth)] border border-border/30 hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-4 bg-muted/50 rounded-xl">
                          <img 
                            src={homeImages[index]} 
                            alt={`${item} service icon`}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-primary">{item}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {homeDetails[index]}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12 border border-accent/20 text-center">
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
                {t("services.summary")}
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[hsl(var(--golden))] to-[hsl(45_100%_45%)] hover:from-[hsl(45_100%_45%)] hover:to-[hsl(var(--golden))] text-black font-semibold rounded-lg shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 text-lg"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;