// Mossawah Center for Civil Society Development - Bilingual Data Store
// مركز مساواة لتنمية المجتمع المدني

export interface Project {
  id: string;
  title: { ar: string; en: string };
  donor: { ar: string; en: string };
  category: "youth" | "women" | "livelihoods" | "environment" | "governance";
  tag: string;
  description: { ar: string; en: string };
  keyFacts?: string[];
  keyFactsAr?: string[];
}

export interface ValueItem {
  id: string;
  icon: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
}

export interface GovernanceSector {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
}

export const CENTER_INFO = {
  name: {
    ar: "مركز مساواة لتنمية المجتمع المدني",
    en: "Mossawah Center for Civil Society Development"
  },
  abbreviation: "MCCSD",
  incorporationDate: "19-11-2009",
  registrationNumber: "2009032200001",
  representative: {
    ar: "د. أحمد منصور",
    en: "Dr. Ahmad Mansour"
  },
  emails: ["mossawah@yahoo.com", "alkhawaldeh_2010@yahoo.com"],
  phones: ["0777790680", "0776338484"],
  whatsapp: "0776338484",
  facebook: "https://www.facebook.com/share/1aUBhQxxUf/",
  googleMaps: "https://maps.app.goo.gl/jVWdNMwkgE7g8zvU8?g_st=ac",
  country: {
    ar: "الأردن",
    en: "Jordan"
  },
  governorates: {
    ar: ["عمان", "المفرق", "معان", "الزرقاء", "الطفيلة", "الكرك", "إربد", "جرش", "عجلون"],
    en: ["Amman", "Mafraq", "Maan", "Zarqa", "Tafilah", "Karak", "Irbid", "Jerash", "Ajloun"]
  }
};

// Circular Service list from Page 3 of the PDF
export const STRATEGIC_SERVICES: GovernanceSector[] = [
  {
    id: "strategic_planning",
    title: { ar: "التخطيط الاستراتيجي", en: "Strategic Planning" },
    description: {
      ar: "مساعدة المجموعات والمنظمات التنموية في صياغة خطط نمو طويلة المدى ومبادرات فاعلة ومستدامة.",
      en: "Supporting developmental groups and organizations in shaping long-term growth plans and sustainable initiatives."
    }
  },
  {
    id: "management_systems",
    title: { ar: "أنظمة الإدارة", en: "Management Systems" },
    description: {
      ar: "بناء هياكل تنظيمية متميزة تدعم اتخاذ القرارات الرشيدة وسرعة الاستجابة اللوجستية.",
      en: "Structuring functional internal frameworks to support robust decision-making and administrative agility."
    }
  },
  {
    id: "project_management",
    title: { ar: "إدارة المشاريع", en: "Project Management" },
    description: {
      ar: "الإشراف الكامل على تخطيط وتنفيذ المشاريع التنموية في الأردن وفق توجيهات الموثوقية وبأدق جودة.",
      en: "Full oversight of planning and executing development programs in Jordan under high standards of quality."
    }
  },
  {
    id: "business_development",
    title: { ar: "تطوير الأعمال", en: "Business Development" },
    description: {
      ar: "توفير الاستشارات والتدريب وتوجيه المشاريع المنزلية والصغيرة والمتوسطة MSMEs لتمكين سبل عيش مستدامة.",
      en: "Providing consultations, trainings, and mentorship to micro, small, and home-based businesses to boost livelihoods."
    }
  },
  {
    id: "governance_solutions",
    title: { ar: "حلول الحوكمة", en: "Governance Solutions" },
    description: {
      ar: "تعزيز المساءلة، تمكين الاستثمار، ودعم المشاركة الممنهجة للمجتمعات المحلية وأصحاب المصلحة.",
      en: "Advancing social stability and integration by establishing accountable frameworks for local stakeholders."
    }
  },
  {
    id: "excellence_entrepreneurship",
    title: { ar: "التميز وريادة الأعمال", en: "Excellence & Entrepreneurship" },
    description: {
      ar: "بناء قدرات الشباب والفتيات لإنشاء مشاريعهم المستقلة واكتساح أسواق العمل الحر والتشغيل السريع.",
      en: "Equipping young community members with tools to launch businesses, capture markets, and build career pipelines."
    }
  },
  {
    id: "process_reengineering",
    title: { ar: "إعادة هندسة العمليات", en: "Process Reengineering" },
    description: {
      ar: "تحسين مخرجات وتطوير كفاءة مؤسسات المجتمع المدني الأردنية لمضاعفة أثر المنح الدولية والمشاريع الوطنية.",
      en: "Revamping and optimizing operations of local civil organizations to amplify the impact of funds and grassroot work."
    }
  }
];

// Core ICARE Values from Page 3 of the PDF
export const CORE_VALUES: ValueItem[] = [
  {
    id: "innovation",
    icon: "Lightbulb",
    title: { ar: "الإبداع", en: "Innovation" },
    description: {
      ar: "ابتكار حلول تنموية ومناهج تدريبية تحاكي المتطلبات المعاصرة لسوق العمل.",
      en: "Pioneering creative development approaches and training modalities tailored for the modern workforce."
    }
  },
  {
    id: "compassionate",
    icon: "Heart",
    title: { ar: "التعاطف", en: "Compassionate" },
    description: {
      ar: "العمل بروح المساعدة والقرب لتفهم ودعم الفئات الأكثر ضعفاً واللاجئين والنساء والأطفال.",
      en: "Leading with deep human kindness and empathy, especially for refugees, marginalized women, and young seekers."
    }
  },
  {
    id: "accountable",
    icon: "ShieldAlert",
    title: { ar: "المسؤولية والمساءلة", en: "Accountable" },
    description: {
      ar: "الالتزام التام بالحيادية ونظام التدقيق المالي المتين المعتمد دولياً لدى مختلف الهيئات الأممية.",
      en: "Operating under absolute transparency, accredited auditing frameworks, and strong financial accountability."
    }
  },
  {
    id: "respectful",
    icon: "Users",
    title: { ar: "الاحترام المتبادل", en: "Respectful" },
    description: {
      ar: "صون الكرامة الإنسانية ودعم التعايش والسلم المجتمعي وثقافات التكامل بين كافة المجتمعات.",
      en: "Upholding human dignity, encouraging positive social cohesion, and maintaining mutual trust among host and refugee groups."
    }
  },
  {
    id: "excellent",
    icon: "Award",
    title: { ar: "التميز", en: "Excellent" },
    description: {
      ar: "تقديم أعلى مستويات التقييم ومؤشرات النجاح في إدارة المنح التنموية الكبرى.",
      en: "Delivering pristine excellence in outcome compliance, metrics tracking, and building solid success models."
    }
  }
];

// Detailed Projects and Experiences list from Section 1 & Section 2 & 3 of the PDF
export const PROJECTS_LIST: Project[] = [
  {
    id: "proj_unicef_digital",
    title: {
      ar: "مشروع المهارات الرقمية لمستقبل أفضل",
      en: "Digital Skills for A Better Future Programme"
    },
    donor: {
      ar: "منظمة اليونيسيف بالتعاون مع وزارة الاقتصاد الرقمي والريادة (MoDEE) ومؤسسة (DOT)",
      en: "Funded by UNICEF inside partnership with Ministry of Digital Economy & Entrepreneurship (MoDEE) & DOT"
    },
    category: "youth",
    tag: "UNICEF",
    description: {
      ar: "تجهيز وتمكين الشباب الضعفاء (ذكور وإناث) بالمهارات الرقمية الأساسية والمتقدمة وتعديل سلوكيات العمل لربطهم بالفرص الاقتصادية الرسمية والعمل الحر عبر الإنترنت بالتساوي.",
      en: "Equipping vulnerable youth (both young males and females) with basic and advanced digital skills, linking them with sustainable online income-generating opportunities in both formal sectors and the gig economy."
    },
    keyFactsAr: ["تمكين الشباب والشابات (ذكور وإناث) من المهارات المتقدمة", "تأسيس نظام توجيه رقمي جندري مخصص", "ربط مباشر بكلا الجنسين بأسواق العمل الحر"],
    keyFacts: ["Equiping young males and females with IT tools", "Direct gender-inclusive monitoring pipelines", "Linkages with freelance markets"]
  },
  {
    id: "proj_unhcr_livelihoods",
    title: {
      ar: "مشروع سبل العيش للاجئين والأردنيين",
      en: "Jordan Livelihoods Project (JLP)"
    },
    donor: {
      ar: "المفوضية السامية للأمم المتحدة شؤون اللاجئين (UNHCR)",
      en: "Funded by UNHCR (United Nations High Commissioner for Refugees)"
    },
    category: "livelihoods",
    tag: "UNHCR",
    description: {
      ar: "تمكين ودعم الأردنيين الضعفاء واللاجئين السوريين (من ذكور وإناث) في محافظات عمان والمفرق ومعان والزرقاء والطفيلة والكرك وإربد، لتقوية محركات النمو وتأسيس مشاريع منزلية وصغيرة مستدامة.",
      en: "Strengthening small & home-based economic endeavors for vulnerable Jordanians and Syrian refugees (both males and females) across Amman, Mafraq, Maan, Zarqa, Tafilah, Karak, and Irbid to secure reliable business environments."
    },
    keyFactsAr: ["شمل ذكوراً وإناثاً في 7 من كبريات محافظات المملكة", "دعم مخصص وبناء قدرات للمشاريع المنزلية (للجنسين)", "تعزيز الاندماج والنشاط الاقتصادي المحلي المتوازن"],
    keyFacts: ["Covered both males & females in 7 key governorates", "Home-based business incubation & startup capital assistance", "Promoting secure micro-finance pathways"]
  },
  {
    id: "proj_oxfam_swm",
    title: {
      ar: "مبادرة إدارة النفايات الصلبة والنقد مقابل العمل",
      en: "Solid Waste Management and Cash for Work"
    },
    donor: {
      ar: "منظمة أكسفام (OXFAM) والاتحاد الأوروبي (EU Regional Trust Fund)",
      en: "Oxfam in partnership with the European Union (EU Regional Trust Fund for Syrian Crisis)"
    },
    category: "environment",
    tag: "Oxfam / EU",
    description: {
      ar: "توفير فرص عمل مؤقتة للاجئين السوريين والأردنيين (من كلا الجنسين: ذكور وإناث بالتساوي) في المفرق من خلال تحسين إدارة وفرز وتدوير النفايات بمخيم الزعتري والبلديات المجاورة تحت لواء مشروع 'تحويل النفايات إلى طاقة إيجابية'.",
      en: "Creating immediate short-term employment opportunities for refugees and Jordanians (both males and females) in Mafraq while fostering environmental preservation through advanced recycling inside Za'atari camp and neighbor municipalities."
    },
    keyFactsAr: ["استقطاب متوازن للعمالة (ذكور وإناث بالتناوب)", "دعم توظيف مباشر ومكافآت نقدية يومية ترفع لواء المعيشة", "برامج توعية شاملة بالفرز وإعادة الاستعمال لكافة أفراد الأسرة"],
    keyFacts: ["Active across Za'atari camp with balanced male & female cohorts", "Provides direct economic relief through incentive-based volunteering", "Environmental campaigns focusing on waste-to-resource strategies"]
  },
  {
    id: "proj_usaid_power",
    title: {
      ar: "تمكين الشباب وتنمية المهارات الاحترافية",
      en: "Youth Empowerment Initiative"
    },
    donor: {
      ar: "الوكالة الأمريكية للتنمية الدولية (USAID YOUTH Power)",
      en: "Funded by USAID (YOUTH Power Program)"
    },
    category: "youth",
    tag: "USAID",
    description: {
      ar: "تدريب وتأجير 300 من الشباب والشابات (ذكور وإناث) في الزرقاء والمفرق على ريادة الأعمال وصيانة الهواتف الذكية وتصميم وبناء مواقع الويب، بالإضافة إلى مهارات القيادة والتوظيف الشاملة.",
      en: "Providing crucial leadership and job-readiness tools to over 300 young males and females in Zarqa and Mafraq. Trainings centered on micro-business creation, advanced mobile screen/hardware maintenance, and responsive website development."
    },
    keyFactsAr: ["استفاد منه 300 شاب وشابة (ذكور وإناث) في المفرق والزرقاء", "منهاج تدريب معقد على الصيانة الخلوية وتصميم الويب", "بناء مهارات التوظيف والاتصال الشخصي المهني لكلا الجنسين"],
    keyFacts: ["Empowered 300 young males and females in Zarqa & Mafraq", "Tech courses focused on mobile repair and website creation", "Enhanced employability profiles with personal branding support"]
  },
  {
    id: "proj_mepi_women",
    title: {
      ar: "تمكين المرأة اقتصادياً في شمال الأردن",
      en: "Women's Economic Empowerment in North Jordan"
    },
    donor: {
      ar: "مبادرة الشراكة الأمريكية الشرق أوسطية (MEPI)",
      en: "Funded by MEPI (Middle East Partnership Initiative)"
    },
    category: "women",
    tag: "MEPI",
    description: {
      ar: "تعزيز مشاركة المبدعات في الاقتصاد المنظم بقطاعات الأغذية ومحلات التجزئة وتكوين مشاريع ريادية منزلية في الزرقاء، مع توفير مهد خاص لرعاية الأطفال وتغطية بدلات التكلفة اللوجستية للمرأة العاملة والمكافِحة.",
      en: "Uplifting female economic share by helping 100 Jordanian and Syrian women in Zarqa enter food and retail businesses, complete with fully-staffed day-care nursery systems and daily transport support."
    },
    keyFactsAr: ["دعم 100 امرأة مكافحة (18-45 عاماً) في الزرقاء", "إنشاء وحدة مخصصة للبحث عن الوظائف وإنشاء المشاريع", "توفير غرف حضانة للأطفال وبدلات نقل لضمان أريحية الحضور"],
    keyFacts: ["Aided 100 resilient women in Zarqa (ages 18-45)", "Created a functional Job Seekers Unit & matchmaking forum with employers", "Supplied active day-care setups and transport tokens to lower exit barriers"]
  },
  {
    id: "proj_she_tvet",
    title: {
      ar: "مشروع 'هي' للتعليم التقني والتدريب المهني",
      en: "She TVET Programme"
    },
    donor: {
      ar: "بالشراكة مع غرف التجارة والصناعة ومؤسسة التدريب المهني في الأردن",
      en: "In close partnership with Jordan Vocational Training Corp (VTC) and Chambers of Commerce & Industry"
    },
    category: "women",
    tag: "TVET",
    description: {
      ar: "برنامج تدريب وتشغيل الفتيات في محافظات المفرق، إربد والزرقاء بقطاعات الفن التقني والصيانة، وتأسيس وحدة دعم التدريب والتوظيف (ETSO) لتبادل فرص الربط المباشر مع الأسواق.",
      en: "Fostering technical careers for women across Mafraq, Irbid, and Zarqa in TVET modules, culminating in the design of the Employment and Training Support Unit (ETSO) linking job-seekers to real industrial positions."
    },
    keyFactsAr: ["تخريج دفعة تقنية مؤهلة للانخراط مباشرة بالصناعة المحلية", "بناء تحالفات متينة مع مؤسسات المجتمع والشركاء التنمويين", "تأسيس وحدة العمل المتكاملة ETSO لوصل فرص التوظيف"],
    keyFacts: ["Supplied industry-vetted technical curricula to local cohorts", "Strong alliances with 2 active regional CBOs in Irbid & Zarqa", "Launched the Employment and Training Support Unit (ETSO) for careers"]
  },
  {
    id: "proj_giz_hygiene",
    title: {
      ar: "مبادرة الترويج الصحي وحماية المواد البيئية",
      en: "Hygiene Promotion & Waste Circularity"
    },
    donor: {
      ar: "الوكالة الألمانية للتعاون الدولي (GIZ) والوزارة الاتحادية للتعاون الاقتصادي (BMZ)",
      en: "Funded by GIZ on behalf of the German Federal Ministry for Economic Cooperation & Development (BMZ)"
    },
    category: "environment",
    tag: "GIZ / BMZ",
    description: {
      ar: "تفعيل برامج العمل الكثيف لتدوير النفايات والفرز المنهجي للكرتون والبلاستيك والمعادن، بمشاركة 1000 عامل وعاملة موزعين عادلاً في 10 بلديات أردنية لتعزيز الصحة والتعايش السلمي وتخفيض الأثر البيئي السلبي.",
      en: "Directing 1,000 workers across 10 vital municipalities in Jordan (Irbid, Ramtha, Mafraq, Karak, Madaba, etc.) under intensive cash-for-work recycling programs, creating secure communal trust and high ecological standards."
    },
    keyFactsAr: ["إدارة وتشغيل 1000 عامل أردني وسوري في فرز النفايات والمكبات", "شمل 10 بلديات متباعدة بالمملكة", "ضوابط صارمة للسلامة المهنية الصحية وحماية الموارد البيئية"],
    keyFacts: ["Managed and trained 1,000 workers in waste segregation", "Active across 10 distinct municipal zones", "Implemented high-standard workplace safety protocols and vaccinations"]
  },
  {
    id: "proj_water_harvest",
    title: {
      ar: "مشروع الحصاد المائي وإعادة استخدام المياه الرمادية",
      en: "Water Harvesting and Greywater Reuse"
    },
    donor: {
      ar: "مشاريع دولية لحماية الموارد المائية الشحيحة في مدن اللجوء السوري",
      en: "Multi-donor environmental security initiative for water-scarce host cities"
    },
    category: "environment",
    tag: "Water",
    description: {
      ar: "معالجة أزمة الشح الحرج للمياه بمحافظات المفرق، إربد، الزرقاء، جرش وعجلون عبر إصلاح شبكات الصرف وصيانة أسطح وتاسيس أنظمة فلترة طبيعية تعتمد الرمل والزيوليت لاستثمار المياه بملاعب الوحدات والمدارس والمساجد.",
      en: "Combating severe water stress in refugee-hosting hubs (Mafraq, Irbid, Zarqa, Jerash, Ajloun). Repaired rooftops, installed rainwater gutters, and built hybrid natural filters (sand + zeolite) to reuse greywater for local irrigation."
    },
    keyFactsAr: ["أنظمة فلترة هجينة فريدة من رمال وزيوليت الأردن الفوسفاتي", "شمل المدارس، والمساجد، والكنائس، والمنشآت الخدمية", "حصد مياه الأمطار بكفاءة عالية لتغذية المساحات الخضراء والمراحيض"],
    keyFacts: ["Constructed hybrid eco-filters using local active sand & zeolite", "Targeted vital public centers: schools, mosques, and churches", "Restored storage cisterns for toilet flushing and local organic gardens"]
  },
  {
    id: "proj_community_cep",
    title: {
      ar: "مشروع المشاركة وبناء كفاية المجتمعات المحلية",
      en: "Community Participation Project (CEP)"
    },
    donor: {
      ar: "بالتنسيق مع السلطات المحلية والبلدية ومؤسسات الحكم المحلي",
      en: "Executed closely with municipal authorities, local leaders, and civic groups"
    },
    category: "governance",
    tag: "CEP",
    description: {
      ar: "تأسيس فرق المشاركة المجتمعية (CLTs) الممثلة للأهالي لتحديد الفرص والاحتياجات التخطيطية من الباب للباب والعمل كجسر اتصال مثالي ومباشر مع الدوائر الحكومية والمنظمات الدولية.",
      en: "Fostering cohesive, resilient neighborhoods by forming Community Leadership Teams (CLTs). Conducted intensive home surveys to prioritize local municipal investments and bridge communication with donors."
    },
    keyFactsAr: ["تأسيس لجان قيادة مجتمعية ذكورية وإناثية متوازنة", "إجراء فحوص لمتطلبات أكثر من 5% من أهالي الأحياء السكنية", "تطوير الجسور الحوارية والتمثيل أمام صناع القرار"],
    keyFacts: ["Established balanced local Community Leadership Teams (CLTs)", "Conducted detailed needs assessments covering more than 5% of host households", "Pioneered feedback-led community dialog models with ministry officers"]
  },
  {
    id: "proj_makni_friends",
    title: {
      ar: "مشروع مكِّني لدعم المشاريع والرياديات",
      en: "Makkini Project"
    },
    donor: {
      ar: "الصندوق الكندي للمبادرات المحلية (Canadian Fund for Local Initiatives)",
      en: "Funded by the Canadian Fund for Local Initiatives (CFLI)"
    },
    category: "livelihoods",
    tag: "Canada",
    description: {
      ar: "مساندة وتمكين رياديات الأعمال الصغيرات واللاجئات في محافظة المفرق عبر بناء خطط تشغيل تدريبية متخصصة ومستدامة، ترافقت مع تخريج وتأهيل 30 مرشداً ومرشدة لدعم 200 ريادية بمجتمعاتهم.",
      en: "Boosting economic resilience for young women micro-entrepreneurs in Mafraq. Trained 30 expert local mentors who successfully provided business plan incubation and financial counseling to 200 women-led startups."
    },
    keyFactsAr: ["تخريج 30 مرشداً ومرشدة محلية لدعم الأعمال", "احتضان وتمويل وتنمية 200 مشروع ريادي نسائي ناجح بمحافظات الشمال", "تنسيق اتصالات مباشرة وفعالة مع الصناديق والمانحين"],
    keyFacts: ["Trained 30 expert business mentors directly from the community", "Advises 200 women-led starturps on growth strategies", "Established credit-connection paths to launch local enterprises"]
  }
];

export const GENERAL_TRANSLATIONS = {
  ar: {
    title: "مساواة لتنمية المجتمع المدني",
    subtitle: "مستقبل مُمكّن، مجتمع ريادي ومشاركة فاعلة للذكور والإناث",
    tagline: "منذ تأسيسنا عام 2009، نسعى لتطوير قيادات المجتمع من ذكور وإناث، تنمية ريادة الأعمال، وكسر حواجز الفقر والتمكين الاقتصادي لكلا الجنسين بالتساوي في الأردن.",
    home: "الرئيسية",
    about: "عن المركز",
    services: "خدماتنا الاستراتيجية",
    projects: "مشاريعنا والمانحون",
    contact: "اتصل بنا",
    volunteer: "بوابة التطوع والتضامن",
    stats_youth_title: "شباب وشابات (ذكور وإناث) تم تدريبهم",
    stats_beneficiaries_title: "مستفيد ومستفيدة (ذكور وإناث) في المحافظات",
    stats_experience_title: "أعوام من العطاء",
    stats_locations_title: "مدن ومحافظات نخدمها",
    mission: "رسالتنا",
    mission_text: "تزويد الأفراد والمؤسسات المحلية (من الذكور والإناث) بالمعرفة والمهارات القيادية والحياتية والريادية التي يحتاجونها للمساهمة الفعالة في صياغة الواقع السياسي والاجتماعي والاقتصادي.",
    vision: "رؤيتنا",
    vision_text: "بناء مجتمع أردني متماسك وممكّن، يحظى فيه كافة المواطنين والمواطنات (من ذكور وإناث) بفرص متساوية وعادلة للعمل والريادة والعيش الفضيل، وترسيخ مبدأ العدالة الاجتماعية والمساواة الجندرية في كافة مناطق الأردن.",
    values_title: "قيمنا الجوهرية (ICARE)",
    values_subtitle: "المبادئ التي تقود مساعينا اليومية لبناء جسور التعاون والثقة المتبادلة والعدالة للجميع",
    services_diagram_title: "القطاعات السبعة لتنمية المؤسسات والأعمال",
    services_diagram_subtitle: "بناءً على الهيكل التنظيمي المعتمد لمركز مساواة (MCCSD)",
    filter_all: "عرض الكل",
    filter_youth: "تمكين الشباب والشابات",
    filter_women: "تمكين المرأة والفتيات",
    filter_livelihoods: "سبل العيش والأعمال للجنسين",
    filter_environment: "البيئة والمياه والصحة",
    filter_governance: "الحوكمة والمشاركة العادلة",
    donor_label: "الجهة المانحة / الشريك المانح:",
    key_highlights: "أهم ركائز الإنجاز:",
    reg_details: "معلومات التسجيل الرسمي",
    reg_no: "رقم التسجيل المركزي للمنظمة:",
    reg_date: "تاريخ التأسيس والترخيص:",
    rep_name: "الممثل القانوني والمدير العام:",
    contact_header: "تواصل مباشر مع الهيئة الإدارية",
    contact_subheader: "يسعدنا دائماً استقبال استفساراتكم وبناء شراكات جديدة لصنع فارق ملموس في المجتمعات المحلية.",
    form_name: "الاسم الكامل",
    form_email: "البريد الإلكتروني",
    form_phone: "رقم الهاتف",
    form_type: "نوع الاستفسار / طلب الشراكة",
    form_type_general: "استفسار روتيني عام",
    form_type_partnership: "بناء برامج وشراكة تنموية (للجهات المانحة)",
    form_type_volunteer: "طلب تطوع ومساهمة ميدانية (ذكور وإناث)",
    form_message: "نص الرسالة / تفاصيل فكرتك",
    form_submit: "إرسال رسالتك بصفة آمنة",
    form_success: "شكراً لتواصلك! تم حفظ رسالتك بنجاح في سجلات اتصالات MCCSD المحلية. سيقوم مدير الأعمال د. أحمد منصور أو مبعوث المركز بالتواصل معك قريباً.",
    form_submitting: "جاري الإرسال والمعاينة الإلكترونية...",
    form_required_err: "يرجى ملء جميع الحقول المطلوبة بشكل صحيح قبل الإرسال.",
    pledge_title: "محاكي التضامن والتبرع الميداني",
    pledge_subtitle: "اختر أحد برامج المركز وساهم افتراضياً أو تقدم بطلب للتطوع والدعم لتعزيز سبل العيش بالأردن.",
    pledge_btn: "تأكيد طلب التعبئة والتضامن",
    pledge_success_title: "شهادة تضامن فخرية وتعهد بالدعم",
    pledge_success_msg: "نشكر نبل مشاعرك ووعيك الإنساني العظيم! تم تسجيل مبادرتك للتضامن مع مركز مساواة. معاً نصنع مستقبلاً أفضل.",
    pledge_cert_title: "تعهد تضامن مجتمعي",
    pledge_cert_body: "تشهد إدارة مركز مساواة لتنمية المجتمع المدني بأن المتبرع/المتطوع الكريم قد أظهر كامل المسؤولية المجتمعية والالتزام بمبادئ تمكين المجتمع ودعم مشاريع التنمية المستدامة في المملكة الأردنية الهاشمية.",
    pledge_cert_footer: "هذه شهادة افتراضية رمزية لتوثيق فخرنا بك وبدافعيتك البناءة.",
    active_in: "نشطون ميدانياً في:",
    office_details_title: "مكاتبنا وغرف التجهيز",
    office_details_desc: "يمتلك مركز مساواة مقرات مجهزة بالكامل ومكاتب متكاملة مستقلة وقاعات تدريب تكنولوجية متقدمة في كل من محافظتي المفرق وإربد تتيح الإنترنت والاتصال السريع المجاني للشباب الباحث عن الريادة والحلول المستقلة.",
    footer_text: "© ٢٠٢٦ جميع الحقوق محفوظة لـ مركز مساواة لتنمية المجتمع المدني (MCCSD). مسجل رسمياً لدى وزارة التنمية الاجتماعية الأردنية تحت الرقابة الوطنية.",
    donor_logos_section_title: "شركاء المسيرة وداعمو الأثر",
    donor_logos_section_sub: "منظمات أممية ودولية ووزارات حكومية تحالفنا معها لتقديم حلول معيشية وتدريبية مستدامة للأردنيين واللاجئين",
    project_num_display: "إجمالي المشاريع المعروضة:",
    gender_equality_title: "مؤشر التكافؤ الجندري والشمول الاجتماعي في مركز مساواة",
    gender_equality_subtitle: "التزام راسخ من الهيئة الإدارية بضمان تكافؤ الفرص وتوزيع الدعم والمشاركة بين الذكور والإناث بالتساوي",
    gender_female_label: "الإناث المستفيدات",
    gender_male_label: "الذكور المستفيدون",
    gender_note: "تُصمم جميع تدخلات ومشاريع مركز مساواة (MCCSD) بناءً على تحليلات جندرية صارمة لضمان وصول المساعدات وفرص التدريب وبناء القدرات والتشغيل لكل من الذكور والإناث بعدالة وإنصاف."
  },
  en: {
    title: "Mossawah Center for Civil Society",
    subtitle: "Empowered Futures, Innovative Livelihoods & Dynamic Civic Engagement for Males & Females",
    tagline: "Since our establishment in 2009, we have trained thousands of young males and females, incubating startups, and combating poverty in the Hashemite Kingdom of Jordan.",
    home: "Home",
    about: "About Us",
    services: "Strategic Focus",
    projects: "Our Projects & Donors",
    contact: "Contact Us",
    volunteer: "Pledge & Volunteer Portal",
    stats_youth_title: "Trained Youth (Males & Females)",
    stats_beneficiaries_title: "Direct Beneficiaries (Males & Females)",
    stats_experience_title: "Years of Active Impact",
    stats_locations_title: "Governorates served",
    mission: "Our Mission",
    mission_text: "To provide individuals and local institutions (males and females equally) with the crucial knowledge, leadership, and life skills they need to actively shape together the political, social, and economic context in which they thrive.",
    vision: "Our Vision",
    vision_text: "Building a resilient, socially integrated Jordanian society where everyone (males and females alike) enjoys fair economic chances, stable livelihoods, and dignified leadership with absolute gender equity across all state governorates.",
    values_title: "Our Core Values (ICARE)",
    values_subtitle: "The profound principles guiding our operations, validated by rigorous global humanitarian benchmarks and equal opportunity controls",
    services_diagram_title: "The 7 Strategic Sectors of Institutional Development",
    services_diagram_subtitle: "Derived from MCCSD's official visual organizational structure",
    filter_all: "View All",
    filter_youth: "Youth & Gen-Z (Males & Females)",
    filter_women: "Women & Girls Empowerment",
    filter_livelihoods: "Inclusive Livelihoods & MSMEs",
    filter_environment: "Eco-Water & Circularity",
    filter_governance: "Social Integrity & CEP",
    donor_label: "Donor / Strategic Partner:",
    key_highlights: "Project Pillars & Milestones:",
    reg_details: "Official Registration Manifest",
    reg_no: "Central Registry No:",
    reg_date: "Incorporation Date:",
    rep_name: "Legal Representative / GM:",
    contact_header: "Connect with Administrative Board",
    contact_subheader: "We warmly welcome inquiries, collaborative program partnerships, and donor collaborations to expand our grassroots footprint.",
    form_name: "Full Name",
    form_email: "Email Address",
    form_phone: "Phone Number",
    form_type: "Inquiry / Partnership Type",
    form_type_general: "General Inquiry or Info request",
    form_type_partnership: "Strategic Institutional Partnership (Donors/NGOs)",
    form_type_volunteer: "Volunteer Application (Males & Females)",
    form_message: "Message Body / Partnership Request details",
    form_submit: "Securely Submit Message",
    form_success: "Thank you! Your message has been safely saved in the MCCSD local registers. Business Director Dr. Ahmad Mansour or one of our representatives will contact you shortly.",
    form_submitting: "Securing connection and transmitting...",
    form_required_err: "Please fill in all required fields accurately before submitting.",
    pledge_title: "Solidarity & Action Simulator",
    pledge_subtitle: "Join our network! Choose a project field to mock-pledge resources or express field-volunteering interest directly to our team.",
    pledge_btn: "Confirm Action & Generate Certificate",
    pledge_success_title: "Honorary Solidarity Commendation Generated",
    pledge_success_msg: "We are deeply inspired by your civic spirit! Your symbolic token of support has been successfully logged with Mossawah. Let's build a better world together.",
    pledge_cert_title: "Community Solidarity Honor Roll",
    pledge_cert_body: "This is to certify that the bearer has demonstrated deep commitment to the values of civic advancement, social cohesion, and the economic integration models of Mossawah Center within Jordan.",
    pledge_cert_footer: "MCCSD Legal Council - Dr. Ahmad Mansour, Business Director",
    active_in: "Actively Mobilized in:",
    office_details_title: "Furnished Hubs & Infrastructure",
    office_details_desc: "We own and operate spacious, fully-equipped independent offices and modern computer training rooms in both Irbid and Mafraq governorates. These environments provide free internet access and professional spaces for local youth who lack personal IT equipment.",
    footer_text: "© 2026 All Rights Reserved for Mossawah Center for Civil Society Development (MCCSD). Registered under the Jordanian Ministry of Social Development with central auditing mandates.",
    donor_logos_section_title: "Our Trusted Allies & Donors",
    donor_logos_section_sub: "Globally esteemed agencies, ministries, and entities that have sponsored and partnered with MCCSD to construct stable community platforms",
    project_num_display: "Total Projects Filtered:",
    gender_equality_title: "Gender Equality & Social Inclusion Index at Mossawah",
    gender_equality_subtitle: "A resolute administrative commitment to ensuring equal resources, distribution, and active representation for males and females",
    gender_female_label: "Female Beneficiaries",
    gender_male_label: "Male Beneficiaries",
    gender_note: "All Mossawah Center (MCCSD) interventions are designed through rigorous gender-sensitive planning to ensure training, employment support, and capacity building are delivered fairly to both males and females."
  }
};
