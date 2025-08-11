import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "zh";

type Translations = Record<string, any>;

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  tv: (key: string) => any; // typed value (string | string[])
};

const translations: Record<Language, Translations> = {
  en: {
    common: {
      businessName: "SWADE IT",
      slogan: "IT Is Life",
      cta: {
        contact: "Get Support",
        learnMore: "Learn more",
      },
      location: "Auckland, New Zealand",
    },
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },
    seo: {
      homeTitle: "SWADE IT — Auckland IT Services | Office 365, VPN, Home Networks",
      homeDesc:
        "Fast, professional IT help in Auckland: Office 365, VPN remote work, email, and home network troubleshooting.",
      aboutTitle: "About SWADE IT — Auckland Small Business & Home IT Support",
      aboutDesc:
        "Over 10 years helping Auckland small businesses and homes with urgent, budget-friendly IT support.",
      servicesTitle: "IT Services — Office 365, VPN, Email, Home WiFi & CCTV | SWADE IT",
      servicesDesc:
        "Office IT services and residential support: 365 deployment, Outlook, VPN, networks, WiFi, CCTV.",
      contactTitle: "Contact SWADE IT — WhatsApp, WeChat, Call 022 685 2866",
      contactDesc:
        "Reach SWADE IT in Auckland via WhatsApp, WeChat or call 022 685 2866 for fast IT support.",
    },
    home: {
      hero: {
        title: "Auckland small business & home IT support",
        subtitle:
          "Office 365 deployment, VPN for working anywhere, Outlook troubleshooting, and reliable home network fixes.",
      },
      highlights: {
        fast: "Fast & friendly",
        budget: "Within your budget",
        local: "Local to Auckland",
      },
    },
    about: {
      title: "About SWADE IT",
      body:
        "We are a team with over 10 years' experience supporting small businesses and residential customers' urgent IT issues. Based in Auckland, we focus on serving small businesses without a dedicated IT headcount, and residential clients who don't want to wait weeks for their broadband provider or pay too much for a single technician visit. We're on your side and at hand — providing timely service within your budget.",
    },
    services: {
      title: "Services",
      officeTitle: "Office IT Services",
      officeList: [
        "New employee computer setup",
        "Office 365 deployment",
        "Outlook email troubleshooting",
        "Work-from-anywhere VPN creation & remote access setup",
        "Office network troubleshooting",
      ],
      homeTitle: "Personal & Residential Services",
      homeList: [
        "Home internet connection rescue",
        "Wi‑Fi coverage & stability troubleshooting",
        "Home security CCTV installation",
      ],
    },
    contact: {
      title: "Contact",
      intro:
        "Scan the QR codes or call us directly. We're ready to help.",
      phone: "Mobile",
      whatsapp: "WhatsApp",
      wechat: "WeChat",
      note:
        "QR codes shown are placeholders — replace with your own to enable scanning.",
    },
  },
  zh: {
    common: {
      businessName: "SWADE IT",
      slogan: "IT 即生活",
      cta: {
        contact: "获取支持",
        learnMore: "了解更多",
      },
      location: "新西兰 奥克兰",
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
      servicesTitle: "IT 服务 — 365 部署、VPN、邮箱、家庭 Wi‑Fi 与监控 | SWADE IT",
      servicesDesc:
        "企业 IT 与家用支持：Office 365、Outlook、VPN、网络、Wi‑Fi、CCTV。",
      contactTitle: "联系 SWADE IT — 微信、WhatsApp、致电 022 685 2866",
      contactDesc:
        "通过微信、WhatsApp 或致电 022 685 2866 联系我们，获取快速 IT 支持。",
    },
    home: {
      hero: {
        title: "奥克兰小微企业与家庭 IT 支持",
        subtitle:
          "Office 365 部署、随时随地的 VPN 远程办公、Outlook 邮件排障，以及可靠的家庭网络修复。",
      },
      highlights: {
        fast: "快速友好",
        budget: "预算可控",
        local: "本地服务",
      },
    },
    about: {
      title: "关于 SWADE IT",
      body:
        "我们拥有 10 多年为小微企业与家庭用户处理紧急 IT 问题的经验。立足奥克兰，专注服务没有专职 IT 人员的中小企业，以及不想长时间等待运营商上门或支付高额一次性费用的家庭用户。我们始终站在您这边，随叫随到，及时可靠且价格合理。",
    },
    services: {
      title: "服务项目",
      officeTitle: "企业办公室 IT 服务",
      officeList: [
        "新员工电脑环境部署",
        "Office 365 部署",
        "Outlook 邮箱问题排查",
        "随时随地办公的 VPN 搭建与远程访问设置",
        "办公室网络故障排查",
      ],
      homeTitle: "个人与家庭服务",
      homeList: [
        "家庭宽带连接抢修",
        "家庭 Wi‑Fi 覆盖与稳定性问题排查",
        "家庭安防监控（CCTV）安装",
      ],
    },
    contact: {
      title: "联系我们",
      intro: "扫描二维码或直接致电，我们马上为您服务。",
      phone: "手机",
      whatsapp: "WhatsApp",
      wechat: "微信",
      note: "当前二维码为示意图，替换为您的真实二维码即可扫码。",
    },
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem("lang") as Language) || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const { t, tv } = useMemo(() => {
    const dict = translations[lang];
    const getter = (key: string): any => {
      const parts = key.split(".");
      let cur: any = dict;
      for (const p of parts) {
        cur = cur?.[p];
      }
      return cur;
    };
    const tFn = (key: string): string => {
      const val = getter(key);
      if (typeof val === "string") return val;
      return Array.isArray(val) ? val.join(", ") : String(val ?? key);
    };
    return { t: tFn, tv: getter };
  }, [lang]);

  const value: I18nContextType = { lang, setLang, t, tv };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
