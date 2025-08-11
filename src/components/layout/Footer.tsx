import { useT } from "@/i18n/LanguageContext";

const Footer = () => {
  const t = useT();
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {t("common.businessName")} · {t("common.location")}</p>
        <p className="text-sm text-muted-foreground">{t("common.slogan")}</p>
      </div>
    </footer>
  );
};

export default Footer;
