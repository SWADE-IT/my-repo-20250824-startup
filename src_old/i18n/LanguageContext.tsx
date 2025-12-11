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
        viewAll: "Click to Explore Detailed Services",
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
      email: "admin@swade.co.nz",
      whatsapp: "WhatsApp",
      wechat: "WeChat",
      note:
        "Scan QR code for more effective domain expert support.",
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
          "网络故障抢修、办公室 IT 系统部署、家庭 WIFI 和网络问题解决、家庭安防、警报器和监控解决方案",
      },
      highlights: {
        fast: "扎根社区",
        budget: "预算可控",
        local: "中文服务",
      },
      servicesOverview: {
        title: "服务类别",
        subtitle: "为小企业与个人用户提供实在、实用的IT服务与技术解决方案",
        viewAll: "点击查看各服务详情",
      },
    },
    about: {
      title: "关于 SWADE IT",
      body:
        "我们拥有 10 多年为小微企业与家庭用户处理紧急 IT 问题的经验。立足于奥克兰，我们专注于为降低运营成本而未设置专职 IT 职位的小企业，以及担心与洋人服务商语言沟通不畅的客户，或者您只是不想长时间等待洋人运营商来上门，或只是觉着运营商官方技术支持的价格难以承受。在经济不景气的大环境下， 我们却致力于创造机会，以无障碍沟通的中文服务，真诚地为华人社区与小企业提供您所急需的降本增效IT方案与技术服务。我们始终从您的角度，以可靠且合理的价格让您满意。",
    },
    services: {
      title: "服务项目",
      subtitle: "专为小企业与家庭用户打造实用、专业的IT服务、解决方案与技术支持",
      officeTitle: "企业办公室 IT 服务",
      officeList: [
        "网络安全评估与补救",
        "新员工电脑环境部署",
        "Microsoft Office 365 部署",
        "VPN 安全远程办公访问设置",
        "NAS 和私有云建立",
        "不间断电源"
      ],
      officeDetails: [
        "从来没有做过网络安全检测？担心公司IT系统受到网络安全威胁、可能造成生意停止运作？担心受攻击后客户信息泄露对公司口碑造成负面影响？想要评估并实施适当的安全措施以防范数据泄露和网络威胁？",
        "招聘了新员工需要为其配置办公电脑？",
        "想要部署现代化IT工具如 Office 365、客户视频会议和、SharePoint 安全文件共享等来提高团队协作和员工的工作效率？",
        "想让自己或员工能够安全地居家办公或从任何地方办公、并安全的访问办公资源、避免内部商业数据因通过简单、非加密通道传输而遭泄露？",
        "不想使用公有云盘，而想建立办公室内部私有的、带冗余备份的共享盘？甚至能异地冗余、自动同步新的数据到远程、实时异地备份？",
        "想要重要IT设备如服务器、WIFI 路由器在突然停电的情况下依然持续运行、避免设备损坏、数据丢失、或降低对业务影响？"
      ],
      homeTitle: "个人与家庭服务",
      homeList: [
        "网络故障抢修",
        "WiFi 问题及覆盖范围拓展",
        "NAS私有云创建",
        "CCTV、安防警报系统解决方案"
      ],
      homeDetails: [
        "网络故障？或刚换了新的宽带运营商但无法正常连上网？",
        "家里WiFi 连接不稳定？或大房子某些区域信号太弱？",
        "不信任公有云存储、想要将手机拍的珍贵照片、视频、文件每天自动备份到家中的私有网盘（如带硬盘冗余的 NAS，即便一个硬盘老化或损坏也不会丢失珍贵资料）？或者想要一个方便的、用手机、电视一键即可访问的私有多媒体服务器？",
        "周围邻居家被偷了、担心日益恶化的治安？想要安装家庭安防 CCTV 和警报系统来提前防范与震慑？"
      ],
      summary: "我们将竭诚为您服务、解决所有IT技术烦恼，请立即联系我们。"
    },
    contact: {
      title: "联系我们",
      intro:
        "如果电话占线或或长时间无人接听，请通过 WhatsApp 或微信留言，并详细说明您的情况，以便我们为您安排该细分领域专家第一时间处理，缩短您的等待时间。",
      phone: "029 04 561 561",
      email: "admin@swade.co.nz",
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
      setLang: () => { },
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
