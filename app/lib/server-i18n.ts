// Server-side translation utility for metadata generation
// This mirrors the client-side translations but can be used in server components

type Language = "en" | "zh";

const translations: Record<Language, Record<string, any>> = {
  en: {
    common: {
      businessName: "SWADE IT",
      slogan: "IT IS LIFE",
      cta: {
        contact: "Get Support",
        learnMore: "Learn more",
      },
      location: "Auckland wide",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    seo: {
      homeTitle: "SWADE IT - Auckland IT Services I  Comprehensive Office IT support and solutions",
      homeDesc:
        "Fast, professional IT help in Auckland: Web design, Software development, Network troubleshooting,  office IT system setup, Cyber Security audit, as well as IT infrastructure solutions, including UPS, rack, PDU, and remote monitoring software.",
      aboutTitle: "About SWADE IT — Auckland IT Services I  Comprehensive Office IT support and solutions",
      aboutDesc:
        "Fast, professional IT help in Auckland: Web design, Software development, Network troubleshooting,  office IT system setup, Cyber Security audit, as well as IT infrastructure solutions, including UPS, rack, PDU, and remote monitoring software.",
      servicesTitle: "IT Services — Office 365, VPN, Email, Home WiFi & CCTV | SWADE IT",
      servicesDesc:
        "Office IT services and residential support: 365 deployment, Outlook, VPN, networks, WiFi, CCTV.",
      contactTitle: "Contact SWADE IT — WhatsApp, WeChat, Call 029 04 561 561",
      contactDesc:
        "Reach SWADE IT in Auckland via WhatsApp, WeChat or call 029 04 561 561 for fast IT support.",
    },
  },
  zh: {
    common: {
      businessName: "SWADE IT",
      slogan: "IT IS LIFE",
      cta: {
        contact: "获取支持",
        learnMore: "了解更多",
      },
      location: "奥克兰全区域覆盖",
    },
    nav: {
      home: "首页",
      about: "关于我们",
      services: "服务项目",
      contact: "联系我们",
    },
    seo: {
      homeTitle: "SWADE IT — 奥克兰 IT 服务 | Office 365、VPN、家庭网络",
      homeDesc:
        "为奥克兰提供快速专业的 IT 支持：Office 365、远程办公 VPN、邮箱、家庭网络排障。",
      aboutTitle: "关于 SWADE IT — 小微企业与家庭 IT 支持",
      aboutDesc:
        "10+ 年经验，为奥克兰小微企业与家庭用户提供及时、实惠的 IT 帮助。",
      servicesTitle: "IT 服务 — 365 部署、VPN、邮箱、家庭 Wi‑F 与监控 | SWADE IT",
      servicesDesc:
        "企业 IT 与家用支持：Office 365、Outlook、VPN、网络、Wi‑Fi、CCTV。",
      contactTitle: "联系 SWADE IT — 微信、WhatsApp、致电 029 04 561 561",
      contactDesc:
        "通过微信、WhatsApp 或致电 029 04 561 561 联系我们，获取快速 IT 支持。",
    },
  },
};

export function getServerTranslation(key: string, lang: Language = 'en'): string {
  const dict = translations[lang] || translations.en;
  const parts = key.split(".");
  let cur: any = dict;

  for (const part of parts) {
    cur = cur?.[part];
  }

  if (typeof cur === "string") return cur;
  return Array.isArray(cur) ? cur.join(", ") : String(cur ?? key);
}

export function detectLanguageFromHeaders(): Language {
  // In a real implementation, you would check headers or cookies
  // For now, defaulting to English
  return 'en';
}