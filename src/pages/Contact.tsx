import { Helmet } from "react-helmet-async";
import { useT } from "@/i18n/LanguageContext";
import qrWhatsApp from "/lovable-uploads/1af7859a-a886-4513-ba8f-ed3687aff7bf.png";
import qrWeChat from "@/assets/qr-wechat.png";

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
            description: t("seo.contactDesc"),
            areaServed: "Auckland",
            url: typeof window !== 'undefined' ? window.location.origin : undefined,
            telephone: "029 04 561 561",
            email: "swade.it@outlook.com",
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <section className="container mx-auto px-6 py-20" aria-labelledby="contact-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 id="contact-heading" className="text-5xl font-bold tracking-tight mb-6 text-foreground">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t("contact.intro")}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              {/* Phone */}
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Phone</h3>
                <p className="text-lg font-mono text-muted-foreground mb-4">{t("contact.phone")}</p>
                <a 
                  href={`tel:${t("contact.phone").replace(/\s/g, '')}`}
                  className="text-primary hover:underline font-medium"
                >
                  Call Now
                </a>
              </div>

              {/* Email */}
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Email</h3>
                <p className="text-lg font-mono text-muted-foreground mb-4">{t("contact.email")}</p>
                <a 
                  href={`mailto:${t("contact.email")}`}
                  className="text-primary hover:underline font-medium"
                >
                  Send Email
                </a>
              </div>

              {/* Location */}
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Location</h3>
                <p className="text-lg text-muted-foreground">{t("common.location")}</p>
              </div>
            </div>

            {/* QR Codes */}
            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <h3 className="text-xl font-semibold mb-6 text-foreground">{t("contact.whatsapp")}</h3>
                <div className="inline-block p-4 bg-white rounded-lg">
                  <img 
                    src={qrWhatsApp} 
                    alt="WhatsApp QR Code" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="text-muted-foreground mt-4">Scan to chat on WhatsApp</p>
              </div>

              <div className="p-8 rounded-lg border border-border bg-card text-center">
                <h3 className="text-xl font-semibold mb-6 text-foreground">{t("contact.wechat")}</h3>
                <div className="inline-block p-4 bg-white rounded-lg">
                  <img 
                    src={qrWeChat} 
                    alt="WeChat QR Code" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
                <p className="text-muted-foreground mt-4">Scan to chat on WeChat</p>
              </div>
            </div>

            {/* Note */}
            <div className="text-center">
              <div className="p-6 rounded-lg border border-border bg-card">
                <p className="text-muted-foreground">{t("contact.note")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;