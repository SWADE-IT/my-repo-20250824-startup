import { Link, NavLink } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import { useT } from "@/i18n/LanguageContext";

const Header = () => {
  const t = useT();
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" aria-label="SWADE IT"> 
          <div className="size-8 rounded-md bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--primary))] shadow-[var(--shadow-glow)]" />
          <span className="font-bold tracking-tight text-2xl bg-gradient-to-b from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-lg" style={{
            textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25)'
          }}>SWADE IT</span>
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
