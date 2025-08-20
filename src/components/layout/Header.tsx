import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useT } from "@/i18n/LanguageContext";

const Header = () => {
  const t = useT();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border">
      <nav className="container mx-auto flex h-14 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="SWADE IT"> 
          <div className="size-7 rounded-lg bg-primary shadow-sm" />
          <span className="font-semibold tracking-tight text-xl text-foreground">SWADE IT</span>
        </Link>
        <div className="flex items-center gap-8">
          <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{t("nav.home")}</NavLink>
          <NavLink to="/about" className={({isActive}) => `text-sm font-medium transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{t("nav.about")}</NavLink>
          <NavLink to="/services" className={({isActive}) => `text-sm font-medium transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{t("nav.services")}</NavLink>
          <NavLink to="/contact" className={({isActive}) => `text-sm font-medium transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{t("nav.contact")}</NavLink>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
