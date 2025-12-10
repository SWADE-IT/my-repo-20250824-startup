'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import LanguageToggle from "./language-toggle"
import { useT, useI18n } from "@/app/lib/i18n-context"
import Image from "next/image"

const Header = () => {
  const t = useT()
  const { lang } = useI18n()
  const pathname = usePathname()
  
  // Get current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'en'
  const localePrefix = `/${currentLocale}`
  
  const isActive = (path: string) => {
    const fullPath = path === '/' ? localePrefix : `${localePrefix}${path}`
    return pathname === fullPath
  }
  
  const getLocalizedPath = (path: string) => {
    return path === '/' ? localePrefix : `${localePrefix}${path}`
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 border-b border-border">
      <nav className="container-premium flex h-16 items-center justify-between">
        <Link href={getLocalizedPath("/")} className="flex items-center gap-3" aria-label="SWADE IT"> 
          <Image 
            src="/lovable-uploads/31d1ca4d-93b5-4a86-b8a7-a1382f37622f.png" 
            alt="SWADE IT Logo" 
            width={40}
            height={40}
            className="h-10 w-auto" 
            priority
            sizes="40px"
          />
        </Link>
        <div className="flex items-center gap-12">
          <Link 
            href={getLocalizedPath("/")} 
            className={`text-sm font-medium tracking-wide transition-colors hover:text-foreground ${
              isActive('/') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t("nav.home")}
          </Link>
          <Link 
            href={getLocalizedPath("/about")} 
            className={`text-sm font-medium tracking-wide transition-colors hover:text-foreground ${
              isActive('/about') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t("nav.about")}
          </Link>
          <Link 
            href={getLocalizedPath("/services")} 
            className={`text-sm font-medium tracking-wide transition-colors hover:text-foreground ${
              isActive('/services') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t("nav.services")}
          </Link>
          <Link 
            href={getLocalizedPath("/contact")} 
            className={`text-sm font-medium tracking-wide transition-colors hover:text-foreground ${
              isActive('/contact') ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t("nav.contact")}
          </Link>
          <LanguageToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header