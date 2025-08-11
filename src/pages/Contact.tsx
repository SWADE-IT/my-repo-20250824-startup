import { Helmet } from "react-helmet-async";
import { useT } from "@/i18n/LanguageContext";
import qrWhatsapp from "@/assets/qr-whatsapp.png";
import qrWechat from "@/assets/qr-wechat.png";

const Contact = () => {
  const t = useT();
  const canonical = typeof window !== 'undefined' ? window.location.origin + '/contact' : '/contact';
  return (
    <>
      <Helmet>
        <title>{t("seo.contactTitle")}</title>
        <meta name="description" content={t("seo.contactDesc")} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: t("common.businessName"),
            telephone: "+64 22 685 2866",
            areaServed: "Auckland",
            url: typeof window !== 'undefined' ? window.location.origin : undefined,
            contactPoint: [{
              "@type": "ContactPoint",
              contactType: "customer support",
              telephone: "+64 22 685 2866",
              areaServed: "NZ"
            }]
          })}
        </script>
      </Helmet>
      <section className="container mx-auto px-4 py-16" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="text-3xl font-bold tracking-tight mb-6">{t("contact.title")}</h1>
        <p className="text-muted-foreground max-w-2xl">{t("contact.intro")}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border p-6 bg-card shadow-sm">
            <h2 className="font-semibold mb-2">{t("contact.whatsapp")}</h2>
            <img src={qrWhatsapp} alt="WhatsApp QR code for SWADE IT (placeholder)" className="w-full max-w-xs" loading="lazy" />
          </div>
          <div className="rounded-lg border p-6 bg-card shadow-sm">
            <h2 className="font-semibold mb-2">{t("contact.wechat")}</h2>
            <img src={qrWechat} alt="WeChat QR code for SWADE IT (placeholder)" className="w-full max-w-xs" loading="lazy" />
          </div>
          <div className="rounded-lg border p-6 bg-card shadow-sm">
            <h2 className="font-semibold mb-2">{t("contact.phone")}</h2>
            <p className="text-2xl font-bold tracking-tight">022 685 2866</p>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">{t("contact.note")}</p>
      </section>
    </>
  );
};

export default Contact;
