'use client'

import { Button } from "@/components/ui/button"
import { useI18n } from "@/app/lib/i18n-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

const LanguageToggle = () => {
  const { lang, setLang } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  
  const toggleLanguage = () => {
    const newLang = lang === "en" ? "zh" : "en"
    setLang(newLang)
    
    // Update the URL to reflect the new language
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${newLang}${currentPath}`
    
    // Set locale cookie for server-side detection
    document.cookie = `locale=${newLang}; path=/; max-age=31536000; SameSite=Lax`
    
    router.push(newPath)
  }

  // Sync language with URL on mount
  useEffect(() => {
    const pathLocale = pathname.split('/')[1]
    if (pathLocale && ['en', 'zh'].includes(pathLocale) && pathLocale !== lang) {
      setLang(pathLocale as 'en' | 'zh')
    }
  }, [pathname, lang, setLang])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {lang === "en" ? "中文" : "English"}
    </Button>
  )
}

export default LanguageToggle