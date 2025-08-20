import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
      
      <div className="min-h-screen bg-background">
        <section className="container mx-auto px-6 py-20" aria-labelledby="services-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 id="services-heading" className="text-5xl font-bold tracking-tight mb-6 text-foreground">
                {t("services.title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional IT solutions designed for Auckland businesses and residents
              </p>
            </div>

            {/* Office IT Services */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-12 text-foreground">{t("services.officeTitle")}</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {officeList.map((item, index) => (
                  <article key={item} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 p-4 bg-muted rounded-lg">
                        <img 
                          src={officeImages[index]} 
                          alt={`${item} service icon`}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">{item}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
                  <article key={item} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6 p-4 bg-muted rounded-lg">
                        <img 
                          src={homeImages[index]} 
                          alt={`${item} service icon`}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">{item}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
                <Link to="/contact">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;