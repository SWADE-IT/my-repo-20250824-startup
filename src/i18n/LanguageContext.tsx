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
      contactTitle: "Contact SWADE IT — WhatsApp, WeChat, Call 029 04 561 561",
      contactDesc:
        "Reach SWADE IT in Auckland via WhatsApp, WeChat or call 029 04 561 561 for fast IT support.",
    },
    home: {
      hero: {
        title: "Auckland small business & home IT support",
        subtitle:
          "Network troubleshooting, Office IT system deployment, Remote working setup, Home WIFI, Internet issues fixing and CCTV solutions",
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
        "We are a team with over 10 years experience in supporting small businesses and residential customers' IT issues, base in Auckland and focus on severing Auckland region communities' IT needs. No matter you are just a two staffs small business which have no budget for a dedicated IT headcount so that light on cost and annual expenditure, or you are just a residential customer and suddenly having internet issues but don't want to wait for too long from your broadband provider or the onsite fee quote from your ISP over your budget. In the economic downturn, we are trying to create more job opportunities by providing crucial IT services that communities need and helping businesses grow with better systems and efficiency. We are in your side and in handy, fixing the tech headaches and within your budget.",
    },
    services: {
      title: "Services",
      officeTitle: "Office IT Services",
      officeList: [
        "New employee computer setup",
        "Microsoft 365 Deployment",
        "VPN remote work access setup", 
        "NAS and Private Cloud establishment",
        "Uninterruptible Power Supply"
      ],
      officeDetails: [
        "You got a new employee and want to set up a computer for the employee?",
        "You want Office 365 deployment like Outlook email, Teams and group cloud drive?",
        "You want yourself or your staff to be able to work from home or from anywhere securely access your office resource via VPN secure tunnel?",
        "You don't want to use public cloud drive but want to build your own private storage or office shared drive with modern NAS and data protection? Or even with Geo-redundancy remotely backup the data everyday to a different place?",
        "You want a UPS to keep your important IT devices be protected from sudden power outage or just want the office internet still on even if a power outage happen?"
      ],
      homeTitle: "Personal & Residential Services",
      homeList: [
        "Internet connection troubleshooting",
        "WiFi range extension", 
        "NAS for private photos and videos automatic backup",
        "CCTV and home security alarm system solution"
      ],
      homeDetails: [
        "You switched to a new broadband service but having trouble to get the internet connection?",
        "Your home WiFi connection is not stable or WiFi signal is too weak in some areas?",
        "You don't trust cloud storage and want to have your precious files, photos and videos automatically backup to your private drive like a NAS at home with disk redundancy? Or even building your own media with easy mobile access?",
        "You have concern about the worsening public security and want install home security CCTV and alarm system?"
      ],
      summary: "We do all those brain heavy lifting work for you - network troubleshooting, VPN creation and remote access setup, Microsoft Office 365 office software deployment, just contact us now."
    },
    contact: {
      title: "Contact",
      intro:
        "We might be busy on the line when you calling, so please use either WhatsApp or WeChat leave a message to us with your case details so that we can get the 1st available domain expert look into your case and respond you in the most effective way.",
      phone: "029 04 561 561",
      email: "swade.it@outlook.com",
      whatsapp: "WhatsApp",
      wechat: "WeChat",
      note:
        "Scan QR codes or call us directly for fast IT support.",
    },
  },
  zh: {
    common: {
      businessName: "SWADE IT",
      slogan: "IT Is Life",
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
          "网络故障排查、办公室 IT 系统部署、远程办公设置、家庭 WIFI、网络问题修复和监控解决方案",
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
      officeDetails: [
        "您招聘了新员工需要为其配置办公电脑？",
        "您想部署 Office 365 包括 Outlook 邮箱、Teams 和共享云盘？",
        "您想让自己或员工能够安全地从家里或任何地方通过 VPN 安全隧道访问办公室资源？",
        "您不想使用公共云盘，而想建立自己的私有存储或办公室共享驱动器，配备现代 NAS 和数据保护？甚至可以异地冗余备份？",
        "您想要 UPS 来保护重要的 IT 设备免受突然断电影响，或在停电时保持办公室网络运行？"
      ],
      homeDetails: [
        "您换了新的宽带服务但无法正常连接互联网？",
        "您的家庭 Wi-Fi 连接不稳定或某些区域信号太弱？",
        "您不信任云存储，想要将珍贵的文件、照片和视频自动备份到家中的私有驱动器（如 NAS）并具备磁盘冗余？或者搭建自己的媒体服务器？",
        "您担心日益恶化的公共安全，想要安装家庭安防监控和报警系统？"
      ],
      summary: "我们为您承担所有的技术重担 - 网络故障排查、VPN 创建和远程访问设置、Microsoft Office 365 办公软件部署，请立即联系我们。"
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
