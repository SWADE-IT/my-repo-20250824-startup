import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/LanguageContext";

const Services = () => {
  const { t, tv } = useI18n();
  const officeList: string[] = tv("services.officeList") as string[];
  const homeList: string[] = tv("services.homeList") as string[];
  const canonical = typeof window !== 'undefined' ? window.location.origin + '/services' : '/services';

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
            telephone: "+64 22 685 2866",
            makesOffer: [
              ...officeList.map((name) => ({ "@type": "Offer", category: "Office IT", name })),
              ...homeList.map((name) => ({ "@type": "Offer", category: "Residential IT", name })),
            ],
          })}
        </script>
      </Helmet>
      <section className="container mx-auto px-4 py-16" aria-labelledby="services-heading">
        <h1 id="services-heading" className="text-3xl font-bold tracking-tight mb-8">{t("services.title")}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{t("services.officeTitle")}</h2>
            <ul className="mt-4 list-disc list-inside text-muted-foreground space-y-1">
              {officeList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{t("services.homeTitle")}</h2>
            <ul className="mt-4 list-disc list-inside text-muted-foreground space-y-1">
              {homeList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
};

export default Services;
