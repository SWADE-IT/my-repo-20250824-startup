import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();
  
  const toggleLanguage = () => {
    setLang(lang === "en" ? "zh" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {lang === "en" ? "English" : "中文"}
    </Button>
  );
};

export default LanguageToggle;
