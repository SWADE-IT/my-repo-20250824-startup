import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useT } from "@/i18n/LanguageContext";

const Header = () => {
  const t = useT();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label={t("common.businessName")}> 
          <div className="size-8 rounded-md bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--primary))] shadow-[var(--shadow-glow)]" />
          <span className="font-semibold tracking-tight">{t("common.businessName")}</span>
        </Link>
        <div className="flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => `text-sm hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{t("nav.home")}</NavLink>
          <NavLink to="/about" className={({isActive}) => `text-sm hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{t("nav.about")}</NavLink>
          <NavLink to="/services" className={({isActive}) => `text-sm hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{t("nav.services")}</NavLink>
          <NavLink to="/contact" className={({isActive}) => `text-sm hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{t("nav.contact")}</NavLink>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
