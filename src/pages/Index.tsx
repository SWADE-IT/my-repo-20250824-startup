import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-swadetit.jpg";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useI18n, useT } from "@/i18n/LanguageContext";

const Index = () => {
  const t = useT();
  const { tv } = useI18n();
  const officeList = tv("services.officeList") as string[];
  const homeList = tv("services.homeList") as string[];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, []);

  const canonical = typeof window !== 'undefined' ? window.location.origin + '/' : '/';

  return (
    <>
      <Helmet>
        <title>{t("seo.homeTitle")}</title>
        <meta name="description" content={t("seo.homeDesc")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={t("seo.homeTitle")} />
        <meta property="og:description" content={t("seo.homeDesc")} />
      </Helmet>
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-from))] to-[hsl(var(--hero-to))]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), hsl(var(--brand)/0.25), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="container mx-auto px-4 py-20 grid gap-10 lg:grid-cols-2 lg:items-center relative">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{t("common.slogan")}</p>
            <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground">
              {t("home.hero.title")}
            </h1>
            <p className="mt-4 text-primary-foreground/90 text-lg max-w-prose">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">{t("common.cta.contact")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">{t("common.cta.learnMore")}</Link>
              </Button>
            </div>
            <div className="mt-8 flex gap-4 text-primary-foreground/80">
              <span className="text-sm border border-white/20 rounded-full px-3 py-1">{t("home.highlights.fast")}</span>
              <span className="text-sm border border-white/20 rounded-full px-3 py-1">{t("home.highlights.budget")}</span>
              <span className="text-sm border border-white/20 rounded-full px-3 py-1">{t("home.highlights.local")}</span>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="SWADE IT hero image showing modern technology theme for Auckland IT services"
              className="w-full rounded-lg shadow-xl"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16" aria-labelledby="services-overview">
        <h2 id="services-overview" className="text-2xl font-semibold tracking-tight mb-6">
          {t("services.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{t("services.officeTitle")}</h3>
            <ul className="mt-4 list-disc list-inside text-muted-foreground space-y-1">
              {officeList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{t("services.homeTitle")}</h3>
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

export default Index;
