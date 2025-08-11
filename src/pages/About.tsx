import { Helmet } from "react-helmet-async";
import { useT } from "@/i18n/LanguageContext";

const About = () => {
  const t = useT();
  const canonical = typeof window !== 'undefined' ? window.location.origin + '/about' : '/about';
  return (
    <>
      <Helmet>
        <title>{t("seo.aboutTitle")}</title>
        <meta name="description" content={t("seo.aboutDesc")} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <section className="container mx-auto px-4 py-16" aria-labelledby="about-heading">
        <h1 id="about-heading" className="text-3xl font-bold tracking-tight mb-6">{t("about.title")}</h1>
        <article className="prose max-w-3xl text-muted-foreground">
          <p>{t("about.body")}</p>
        </article>
      </section>
    </>
  );
};

export default About;
