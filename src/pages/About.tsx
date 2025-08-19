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
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <section className="container mx-auto px-4 py-16" aria-labelledby="about-heading">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/50">
              <h1 id="about-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("about.title")}
              </h1>
              
              <article className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <div className="bg-gradient-to-r from-muted/30 to-accent/10 rounded-xl p-8 border border-border/30">
                  <p className="text-lg md:text-xl leading-relaxed mb-0">
                    {t("about.body")}
                  </p>
                </div>
              </article>
              
              {/* Key highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-card rounded-xl border border-border/30 shadow-[var(--shadow-depth)]">
                  <div className="text-3xl font-bold text-accent mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-xl border border-border/30 shadow-[var(--shadow-depth)]">
                  <div className="text-3xl font-bold text-accent mb-2">Auckland</div>
                  <div className="text-sm text-muted-foreground">Local Base</div>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-xl border border-border/30 shadow-[var(--shadow-depth)]">
                  <div className="text-3xl font-bold text-accent mb-2">Budget</div>
                  <div className="text-sm text-muted-foreground">Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
