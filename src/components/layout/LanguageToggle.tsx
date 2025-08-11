import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2" aria-label="Language selector">
      <Button
        variant={lang === "en" ? "hero" : "outline"}
        size="sm"
        onClick={() => setLang("en")}
      >
        EN
      </Button>
      <Button
        variant={lang === "zh" ? "hero" : "outline"}
        size="sm"
        onClick={() => setLang("zh")}
      >
        中文
      </Button>
    </div>
  );
};

export default LanguageToggle;
