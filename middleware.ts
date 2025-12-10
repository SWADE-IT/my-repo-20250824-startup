import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /services)
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = ['en', 'zh'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // e.g. incoming request is /about
    // The new URL is now /en/about or /zh/about
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

function getLocale(request: NextRequest): string {
  // Check if locale is stored in cookie
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && ['en', 'zh'].includes(cookieLocale)) {
    return cookieLocale
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    // Simple language detection - check if Chinese is preferred
    if (acceptLanguage.includes('zh')) {
      return 'zh'
    }
  }

  // Default to English
  return 'en'
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sw.js|robots.txt|sitemap.xml).*)']
}