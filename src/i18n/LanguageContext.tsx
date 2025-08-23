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
      location: "Auckland wide",
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
          "Network troubleshooting, office IT system deployment, home WIFI and Internet issues fixing, home security alarm and CCTV solutions",
      },
      highlights: {
        fast: "Community-oriented",
        budget: "Within your budget",
        local: "Local to Auckland",
      },
      servicesOverview: {
        title: "Our Services",
        subtitle: "Practical IT services and solutions for small businesses and homes",
        viewAll: "View All Services",
      },
    },
    about: {
      title: "About SWADE IT",
      body:
        "We are a team with over 10 years experience in supporting small businesses and residential customers' IT issues, base in Auckland and focus on severing Auckland region communities' IT needs. No matter you are just a two staffs small business which have no budget for a dedicated IT headcount so that light on cost and annual expenditure, or you are just a residential customer and suddenly having internet issues but don't want to wait for too long from your broadband provider or the onsite fee quote from your ISP over your budget. In the economic downturn, we are trying to create more job opportunities by providing crucial IT services that communities need and helping businesses grow with better systems and efficiency. We are in your side and in handy, fixing the tech headaches and within your budget.",
    },
    services: {
      title: "Services",
      subtitle: "Professional IT solutions designed for Auckland businesses and residents",
      officeTitle: "Office IT Services",
      officeList: [
        "Cyber Security audit and remediation",
        "New employee computer setup",
        "Microsoft Office 365 Deployment",
        "VPN secure remote work access setup", 
        "NAS and Private Cloud establishment",
        "Uninterruptible Power Supply"
      ],
      officeDetails: [
        "Worrying about rising risk of business loss and negative impact from cyber attack? Want to assess and implement proper security measures to protect against data breaches and cyber threats?",
        "Got a new employee and want to set up a computer for the employee?",
        "Want modern digital tools for better team collaboration to improve employees productivity like Office 365 deployment, Outlook email, Teams video meeting with clients and SharePoint for easy share files securely?",
        "Want staff to be able to work from home or from anywhere securely access office resource via VPN secure tunnel?",
        "Don't want to use public cloud drive but want to build private storage or office shared drive with modern NAS and data protection? Or even with Geo-redundancy remotely backup the data everyday to a different place?",
        "Want a UPS to keep critical devices like WIFI router or servers remain in service even if a power outage happen?"
      ],
      homeTitle: "Personal & Residential Services",
      homeList: [
        "Internet connection troubleshooting",
        "WiFi range extension", 
        "NAS for private auto-backup of precious photos/videos",
        "CCTV and home security alarm system solution"
      ],
      homeDetails: [
        "Lost internet or just switched to a new broadband provider but having trouble to get the internet connection?",
        "Home WiFi connection is not stable or WiFi signal is too weak in some areas?",
        "Don't trust cloud storage and want to have precious files, photos and videos automatically backup to private drive like a NAS at home with disk redundancy? Or even create private media server with easy mobile access?",
        "Have concern about the worsening public security and want install home security CCTV and alarm system?"
      ],
      summary: "We do all those nerve-racking works for you, just contact us now with a brief message about the issue."
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
        "Scan QR code for more effective domain expert support.",
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
      location: "奥克兰全区",
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
      contactTitle: "联系 SWADE IT — 微信、WhatsApp、致电 029 04 561 561",
      contactDesc:
        "通过微信、WhatsApp 或致电 029 04 561 561 联系我们，获取快速 IT 支持。",
    },
    home: {
      hero: {
        title: "奥克兰小微企业与家庭 IT 支持",
        subtitle:
          "网络故障排查、办公室 IT 系统部署、家庭 WIFI 和网络问题修复、家庭安防报警和监控解决方案",
      },
      highlights: {
        fast: "扎根社区",
        budget: "预算可控",
        local: "本地服务",
      },
      servicesOverview: {
        title: "服务类别",
        subtitle: "为小企业与个人用户提供实在、实用的IT服务与技术解决方案",
        viewAll: "继续浏览服务细节->",
      },
    },
    about: {
      title: "关于 SWADE IT",
      body:
        "我们拥有 10 多年为小微企业与家庭用户处理紧急 IT 问题的经验。立足奥克兰，专注服务没有专职 IT 人员的中小企业，以及不想长时间等待运营商上门或支付高额一次性费用的家庭用户。我们始终站在您这边，随叫随到，及时可靠且价格合理。",
    },
    services: {
      title: "服务项目",
      subtitle: "专为小企业与家庭用户打造实用、专业的IT服务、解决方案与技术支持",
      officeTitle: "企业办公室 IT 服务",
      officeList: [
        "网络安全审计与修复",
        "新员工电脑环境部署",
        "Microsoft Office 365 部署",
        "VPN 安全远程办公访问设置",
        "NAS 和私有云建立",
        "不间断电源"
      ],
      officeDetails: [
        "担心网络攻击造成业务损失和负面影响的风险不断上升？想要评估并实施适当的安全措施以防范数据泄露和网络威胁？",
        "招聘了新员工需要为其配置办公电脑？",
        "想要现代化数字工具来提高团队协作和员工生产力，如 Office 365 部署、Outlook 邮箱、Teams 客户视频会议和 SharePoint 安全文件共享？",
        "想让员工能够安全地从家里或任何地方通过 VPN 安全隧道访问办公室资源？",
        "不想使用公共云盘，而想建立私有存储或办公室共享驱动器，配备现代 NAS 和数据保护？甚至可以异地冗余，每天远程备份数据到不同地方？",
        "想要 UPS 来保护关键设备如 WIFI 路由器或服务器在停电时继续运行？"
      ],
      homeTitle: "个人与家庭服务",
      homeList: [
        "网络连接故障排查",
        "WiFi 范围扩展",
        "NAS 私有自动备份珍贵照片/视频",
        "CCTV 和家庭安防报警系统解决方案"
      ],
      homeDetails: [
        "网络中断或刚换了新的宽带服务商但无法正常连接互联网？",
        "家庭 WiFi 连接不稳定或某些区域信号太弱？",
        "不信任云存储，想要将珍贵的文件、照片和视频自动备份到家中的私有驱动器（如带磁盘冗余的 NAS）？或者创建易于移动访问的私有媒体服务器？",
        "担心日益恶化的公共安全，想要安装家庭安防 CCTV 和报警系统？"
      ],
      summary: "我们为您承担所有这些令人头疼的工作，请立即联系我们并简要说明问题。"
    },
    contact: {
      title: "联系我们",
      intro:
        "电话繁忙时，请通过 WhatsApp 或微信留言详细说明您的情况，我们会安排最合适的技术专家第一时间查看您的问题并以最有效的方式回复您。",
      phone: "029 04 561 561",
      email: "swade.it@outlook.com",
      whatsapp: "WhatsApp",
      wechat: "微信",
      note:
        "扫描二维码获取更有效的专业技术支持。",
    },
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      return (localStorage.getItem("lang") as Language) || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // Ignore localStorage errors in SSR or restricted environments
    }
  }, [lang]);

  const { t, tv } = useMemo(() => {
    const dict = translations[lang] || translations.en;
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
  if (!ctx) {
    console.error("useI18n called outside of I18nProvider");
    // Return a fallback context to prevent crashes
    return {
      lang: "en" as Language,
      setLang: () => {},
      t: (key: string) => key,
      tv: (key: string) => key
    };
  }
  return ctx;
}

export function useT() {
  const { t } = useI18n();
  return t;
}
