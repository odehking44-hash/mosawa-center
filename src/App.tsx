/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lightbulb,
  Heart,
  ShieldAlert,
  Users,
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  FileText,
  Briefcase,
  Sprout,
  Scale,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Building2,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  Globe,
  Calendar,
  Printer,
  ChevronRight,
  BookOpen,
  Facebook
} from "lucide-react";

import {
  CENTER_INFO,
  PROJECTS_LIST,
  STRATEGIC_SERVICES,
  CORE_VALUES,
  GENERAL_TRANSLATIONS,
  Project
} from "./data";

import MCCSDLogo from "./components/MCCSDLogo";
import AtsResumeBuilder from "./components/AtsResumeBuilder";
import OrganizationalServices from "./components/OrganizationalServices";

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [whatsappOpen, setWhatsappOpen] = useState<boolean>(false);
  const [whatsappNotification, setWhatsappNotification] = useState<boolean>(true);
  
  // Projects filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "general",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [storedSubmissions, setStoredSubmissions] = useState<any[]>([]);

  // Action Pledge state
  const [pledgeName, setPledgeName] = useState<string>("");
  const [pledgeSector, setPledgeSector] = useState<string>("proj_unicef_digital");
  const [pledgeType, setPledgeType] = useState<string>("volunteer");
  const [pledgeSuccess, setPledgeSuccess] = useState<boolean>(false);
  const [certifiedName, setCertifiedName] = useState<string>("");

  // Sync RTL direction and lang properties globally in DOM
  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.title = lang === "ar" 
      ? "مركز مساواة لتنمية المجتمع المدني | MCCSD" 
      : "Mossawah Center for Civil Society Development | MCCSD";
  }, [lang]);

  const t = GENERAL_TRANSLATIONS[lang];

  // Filter projects list based on chosen category and search query
  const filteredProjects = PROJECTS_LIST.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const titleMatch = (proj.title[lang] || "").toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = (proj.description[lang] || "").toLowerCase().includes(searchQuery.toLowerCase());
    const donorMatch = (proj.donor[lang] || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (titleMatch || descMatch || donorMatch);
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(t.form_required_err);
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
    
    // Mimic database insert locally
    const newSubmission = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(lang === "ar" ? "ar-JO" : "en-US")
    };
    const updated = [newSubmission, ...storedSubmissions];
    setStoredSubmissions(updated);
    
    // Clear fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "general",
      message: ""
    });
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;
    setCertifiedName(pledgeName);
    setPledgeSuccess(true);
  };

  // Helper to map Value item to illustrative Icon component
  const getValueIcon = (iconName: string) => {
    switch (iconName) {
      case "Lightbulb": return <Lightbulb className="w-8 h-8 text-blue-600" />;
      case "Heart": return <Heart className="w-8 h-8 text-rose-500" />;
      case "ShieldAlert": return <ShieldAlert className="w-8 h-8 text-amber-500" />;
      case "Users": return <Users className="w-8 h-8 text-emerald-600" />;
      case "Award": return <Award className="w-8 h-8 text-indigo-600" />;
      default: return <Award className="w-8 h-8 text-blue-600" />;
    }
  };

  // Helper for category label icons inside filter
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "youth": return <Users className="w-4 h-4" />;
      case "women": return <Heart className="w-4 h-4" />;
      case "livelihoods": return <Briefcase className="w-4 h-4" />;
      case "environment": return <Sprout className="w-4 h-4" />;
      case "governance": return <Scale className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen text-slate-800 selection:bg-brand-navy selection:text-white flex flex-col transition-colors duration-300`}>
      {/* Upper bar with central registration and legal notice */}
      <div className="bg-brand-dark text-slate-200 text-xs py-2 px-4 shadow-inner border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-white/10 text-white rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              {t.reg_details}
            </span>
            <span>📍 {CENTER_INFO.country[lang]}</span>
            <span className="hidden sm:inline">|</span>
            <span>📋 {t.reg_no} <strong>{CENTER_INFO.registrationNumber}</strong></span>
            <span className="hidden sm:inline">|</span>
            <span>📅 {t.reg_date} <strong>{CENTER_INFO.incorporationDate}</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-90">{t.rep_name} <strong className="text-white">{CENTER_INFO.representative[lang]}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo area */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setActiveTab("home");
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <MCCSDLogo variant="icon" className="h-12 w-12 shrink-0 transition-transform duration-300 group-hover:scale-105" />
              <div className="hidden lg:block">
                <span className="text-[17px] font-black text-brand-navy tracking-tight block leading-tight">
                  {CENTER_INFO.name[lang]}
                </span>
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider mt-0.5">
                  Civil Society Development
                </span>
              </div>
              <div className="block lg:hidden">
                <span className="text-base font-black text-brand-navy tracking-tight leading-none block">
                  {lang === "ar" ? "مركز مساواة" : "Mossawah Center"}
                </span>
                <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-tight mt-0.5">
                  Jordan • الأردن
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: "home", label: t.home },
                { id: "about", label: t.about },
                { id: "services", label: t.services },
                { id: "projects", label: t.projects },
                { id: "volunteer", label: t.volunteer },
                { id: "contact", label: t.contact }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-brand-navy text-white shadow-sm shadow-brand-navy/10"
                      : "text-slate-600 hover:text-brand-navy hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Control buttons (Language & Mobile menu) */}
            <div className="flex items-center gap-3">
              {/* Facebook Page Button */}
              <a
                href={CENTER_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/15 border border-sky-200/40 text-xs font-bold text-[#1877F2] transition-all duration-200 shadow-xs"
                title={lang === "ar" ? "تابعنا على فيسبوك" : "Follow us on Facebook"}
              >
                <Facebook className="w-3.5 h-3.5 fill-[#1877F2]" />
                <span className="hidden sm:inline">{lang === "ar" ? "فيسبوك" : "Facebook"}</span>
              </a>

              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-brand-navy hover:bg-slate-150 bg-white hover:border-brand-navy transition-all duration-200 shadow-xs cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
                <span>{lang === "ar" ? "English" : "عربي"}</span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-slate-200 bg-white shadow-xl"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {[
                  { id: "home", label: t.home },
                  { id: "about", label: t.about },
                  { id: "services", label: t.services },
                  { id: "projects", label: t.projects },
                  { id: "volunteer", label: t.volunteer },
                  { id: "contact", label: t.contact }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                      document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block w-full text-start px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-brand-navy text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pb-16 pt-24 md:pb-24 overflow-hidden bg-brand-dark text-slate-100 shadow-md">
        {/* Soft background glow circles */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-brand-navy/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Descriptive Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-blue/30 text-slate-100 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
                ⭐ {CENTER_INFO.country[lang]} | {t.title}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                {t.subtitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-350 max-w-2xl leading-relaxed">
                {t.tagline}
              </p>

              {/* Dynamic Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-600/10 cursor-pointer transition-all"
                >
                  {lang === "ar" ? "استعراض المشاريع والانجازات" : "Explore Active Projects"}
                </button>
                <button
                  onClick={() => document.getElementById("volunteer")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl font-bold cursor-pointer transition-all"
                >
                  {lang === "ar" ? "بوابة التضامن مع المركز" : "Volunteer Pledge"}
                </button>
              </div>

              {/* Scope listing */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-center lg:justify-start text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {lang === "ar" ? "رعاية وتثقيف اللاجئين" : "Refugee Uplift"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {lang === "ar" ? "تمكين المرأة اقتصاديًا" : "Women Economic Shift"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {lang === "ar" ? "الرعاية والتدريب المهني" : "TVET & Vocations"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {lang === "ar" ? "العدالة البيئية والمائية" : "Eco-Water Security"}
                </span>
              </div>
            </div>

            {/* Visual Card Display representing MCCSD Core Achievements */}
            <div className="lg:col-span-5 relative">
              <div className="bg-slate-900/50 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md shadow-2xl relative">
                <div className="absolute top-0 right-0 transform -translate-y-3 translate-x-3 bg-brand-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  MCCSD {CENTER_INFO.incorporationDate.slice(-4)}-2026
                </div>
                
                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                  {lang === "ar" ? "سجل التمكين الميداني" : "Field Mobilization Index"}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {lang === "ar" ? "مخيم الزعتري والبلديات المضيفة" : "Za'atari Camp & Host Councils"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === "ar" ? "إعالة العائلات بالنقد مقابل فرز وتدوير النفايات." : "Direct employment in waste segregation & eco-care details."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {lang === "ar" ? "+13,000 مهني تقني مدرب" : "13,000+ Vocationally Guided"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === "ar" ? "تدريب مهني على صيانة الخلويات وتطبيقات الويب." : "Advanced hardware and code training modules for Jordanian youth."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {lang === "ar" ? "وحدة توفير عمل الفتيات (ETSO)" : "ETSO Female Job Unit"}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {lang === "ar" ? "وصل الخريجات بالصناعات والمهن الحقيقية." : "Active placement unit offering careers in northern governorates."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                  <span>{lang === "ar" ? "المدير العام للمركز:" : "Executive Director:"}</span>
                  <span className="text-white font-semibold">{CENTER_INFO.representative[lang]}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Animated Statistics Shelf */}
      <div className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
          
          <div className="text-center p-2 border-r border-slate-100 last:border-0">
            <span className="block text-2xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              +13,000
            </span>
            <span className="block text-xs sm:text-sm font-medium text-slate-500 mt-1">
              {t.stats_youth_title}
            </span>
          </div>

          <div className="text-center p-2 border-r border-slate-100 last:border-0">
            <span className="block text-2xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
              +20,000
            </span>
            <span className="block text-xs sm:text-sm font-medium text-slate-500 mt-1">
              {t.stats_beneficiaries_title}
            </span>
          </div>

          <div className="text-center p-2 border-r border-slate-100 last:border-0">
            <span className="block text-2xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
              17+
            </span>
            <span className="block text-xs sm:text-sm font-medium text-slate-500 mt-1">
              {t.stats_experience_title}
            </span>
          </div>

          <div className="text-center p-2 last:border-0">
            <span className="block text-2xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
              9
            </span>
            <span className="block text-xs sm:text-sm font-semibold text-emerald-600 py-0.5 px-2 bg-emerald-50 rounded-full w-max mx-auto my-1">
              {t.active_in}
            </span>
            <span className="block text-xs text-slate-500">
              {CENTER_INFO.governorates[lang].slice(0, 5).join(", ")}...
            </span>
          </div>

        </div>
      </div>

      {/* About Us & Vision & Mission */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-55 rounded-full">
              {lang === "ar" ? "أصالة المسيرة منذ 2009" : "Established In 2009"}
            </span>
            <h2 className="text-3xl font-black text-brand-navy mt-3">
              {lang === "ar" ? "عن مركز مساواة لتنمية المجتمع المدني" : "About Mossawah Center"}
            </h2>
            <div className="w-16 h-1 bg-brand-navy mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Logo Showcase Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/60 shadow-xl shadow-slate-100/50 mb-16 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#002060] bg-[#002060]/5 border border-[#002060]/10 rounded-full px-3.5 py-1 mb-6 text-center">
              {lang === "ar" ? "الشعار الرسمي المعتمد لمؤسستنا" : "Official Authorized Emblem"}
            </span>
            <div className="w-full p-3 bg-slate-50 rounded-2xl border border-slate-120 hover:border-blue-205 hover:bg-white transition-all duration-300">
              <MCCSDLogo variant="full" className="w-full" />
            </div>
            <p className="text-xs text-slate-500 text-center mt-5 font-bold leading-relaxed max-w-md">
              {lang === "ar" 
                ? "الشعار الرسمي المعتمد لمركز مساواة لتنمية المجتمع المدني لدى كافة الوزارات الأردنية والمنظمات التنموية الدولية الشريكة."
                : "The officially mandated standard emblem of MCCSD across active ministries in the Kingdom of Jordan and international NGO allies."}
            </p>
          </div>

          {/* Vision and Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-500 w-1.5 h-full"></div>
              <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-brand-navy mb-4">
                {t.mission}
              </h3>
              <p className="text-slate-650 leading-relaxed text-base">
                {t.mission_text}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-emerald-500 w-1.5 h-full"></div>
              <div className="bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-brand-navy mb-4">
                {t.vision}
              </h3>
              <p className="text-slate-650 leading-relaxed text-base">
                {t.vision_text}
              </p>
            </div>

          </div>

          {/* Gender Equality & Balance Index Card */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/75 shadow-xl shadow-slate-100/40 relative overflow-hidden mb-16">
            {/* Background absolute graphic accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-50 to-transparent -z-10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-sky-50 to-transparent -z-10 rounded-tr-full"></div>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 space-y-4 text-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-700 uppercase tracking-widest">
                  <svg className="w-3 h-3 text-indigo-600 fill-indigo-600/10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  {lang === "ar" ? "معايير الحوكمة الجندرية وتكافؤ الفرص" : "Gender Governance & Equal Opportunity"}
                </span>
                <h3 className="text-2xl font-black text-brand-navy tracking-tight leading-tight">
                  {t.gender_equality_title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t.gender_equality_subtitle}
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                    {t.gender_note}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                {/* Visual Ratio Row */}
                <div className="space-y-2 text-start">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-indigo-700">
                      <span className="h-3 w-3 rounded-full bg-indigo-600 inline-block animate-pulse"></span>
                      {t.gender_female_label} (52%)
                    </span>
                    <span className="flex items-center gap-1.5 text-sky-750">
                      {t.gender_male_label} (48%)
                      <span className="h-3 w-3 rounded-full bg-sky-500 inline-block animate-pulse"></span>
                    </span>
                  </div>

                  {/* Progressive track bar representing the scale */}
                  <div className="h-5 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner p-0.5 border border-slate-200">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-1000 rounded-l-full" style={{ width: "52%" }}></div>
                    <div className="h-full bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-1000 rounded-r-full" style={{ width: "48%" }}></div>
                  </div>
                </div>

                {/* Grid showing breakdown details with labels */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50/55 hover:bg-indigo-50/80 p-4 rounded-2xl border border-indigo-120 transition-all duration-200 text-center">
                    <span className="text-lg sm:text-2xl font-black text-indigo-900 block font-sans">52%</span>
                    <span className="text-[10px] sm:text-xs font-black text-indigo-700 block mt-1 uppercase tracking-wide">
                      {lang === "ar" ? "إناث" : "Female (Girls/Women)"}
                    </span>
                  </div>

                  <div className="bg-sky-50/55 hover:bg-sky-50/80 p-4 rounded-2xl border border-sky-120 transition-all duration-200 text-center">
                    <span className="text-lg sm:text-2xl font-black text-sky-900 block font-sans">48%</span>
                    <span className="text-[10px] sm:text-xs font-black text-sky-700 block mt-1 uppercase tracking-wide">
                      {lang === "ar" ? "ذكور" : "Male (Boys/Men)"}
                    </span>
                  </div>
                </div>

                {/* Additional Gender Equality Stamp Text */}
                <span className="block text-[9px] text-center text-slate-400 font-extrabold uppercase tracking-widest mt-4">
                  {lang === "ar" 
                    ? "✓ تمكين الذكور والإناث بالتكامل والتساوي لكفاءة البرامج الميدانية." 
                    : "✓ Active field collaboration of males & females equally across Jordan."}
                </span>
              </div>
            </div>
          </div>

          {/* ICARE values list */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-brand-navy">
                {t.values_title}
              </h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
                {t.values_subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {CORE_VALUES.map((val) => (
                <div
                  key={val.id}
                  className="bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 shadow-inner">
                    {getValueIcon(val.icon)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800">
                    {val.title[lang]}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-4 leading-relaxed">
                    {val.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Suleiman Khawaldeh Profile block */}
          <div className="mt-16 bg-gradient-to-br from-brand-sky/60 to-blue-50 p-8 rounded-3xl border border-blue-100/50 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-2xl bg-brand-navy text-white text-3xl font-extrabold flex items-center justify-center shadow-lg shrink-0">
              {lang === "ar" ? "س خ" : "SA"}
            </div>
            <div className="space-y-3">
              <span className="px-2.5 py-1 bg-blue-100/75 text-blue-800 rounded font-bold text-xs uppercase">
                {lang === "ar" ? "كلمة الإدارة العامة" : "Executive Statement"}
              </span>
              <h3 className="text-xl font-bold text-slate-800">
                {CENTER_INFO.representative[lang]} - {lang === "ar" ? "الممثل العام لـ MCCSD" : "Director-General of MCCSD"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                {lang === "ar" 
                  ? "«يعمل مركز مساواة بشكل وثيق من أجل تلبية متطلبات الاستجابة الأردنية للنمو الاقتصادي والأمن المعيشي. نسعى لإلهام الفئات المستفيدة في محافظات الشمال والجنوب والبادية، وتدشين تحالفات قوية مع المنظمات الأممية UNICEF وGIZ وحفز التمكين الاقتصادي المجد للجميع.»"
                  : "“Mossawah stands strictly dedicated to supporting Jordanian national goals, integrating refugees, and boosting livelihoods. By fostering solid synergies with UNHCR, Oxfam, GIZ and UNICEF, we build professional pipelines enabling communities to rise above vulnerability.”"}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Strategic Focus / Circular Services Model from page 3 of PDF */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-brand-navy">
              {t.services_diagram_title}
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              {t.services_diagram_subtitle}
            </p>
            <div className="w-16 h-1 bg-brand-navy mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Interactive display of 7 organizational fields */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Circular Flow Panel */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-slate-100 bg-slate-50 shadow-inner flex items-center justify-center p-6 animate-spin-gentle">
                
                {/* Center Core */}
                <div className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-brand-navy text-white flex flex-col items-center justify-center text-center shadow-lg animate-pulse">
                  <span className="text-[10px] font-sans opacity-85 uppercase tracking-wider block">JORDAN</span>
                  <span className="text-sm font-black font-sans block">MOSSAWAH</span>
                  <span className="text-[9px] block">مساواة</span>
                </div>

                {/* 7 Orbiting Dots acting as labels */}
                {STRATEGIC_SERVICES.map((serv, index) => {
                  const angle = (index * 360) / STRATEGIC_SERVICES.length;
                  const radius = 100; // translate radius
                  return (
                    <div
                      key={serv.id}
                      className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-brand-blue hover:text-white rounded-full flex items-center justify-center text-brand-navy shadow-md border border-slate-200 transition-all duration-300 group cursor-pointer"
                      style={{
                        transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`
                      }}
                      title={serv.title[lang]}
                    >
                      <span className="text-xs font-serif font-black">{index + 1}</span>
                      
                      {/* Floating mini tooltips */}
                      <span className="absolute hidden group-hover:block whitespace-nowrap bg-brand-dark text-slate-100 text-[10px] py-1 px-2 rounded -bottom-8 left-1/2 -translate-x-1/2 opacity-95 z-40">
                        {serv.title[lang]}
                      </span>
                    </div>
                  );
                })}

                {/* Concentric rings decoration */}
                <div className="absolute w-44 h-44 rounded-full border border-dashed border-slate-300"></div>
                <div className="absolute w-64 h-64 rounded-full border border-slate-200"></div>
              </div>
            </div>

            {/* List and explanations for the 7 sectors */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-bold text-slate-500 mb-2 max-w-max">
                {lang === "ar" ? "رقم المرجع / القطاع التنموي" : "Strategic Reference List"}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STRATEGIC_SERVICES.map((serv, ind) => (
                  <div
                    key={serv.id}
                    className="p-5 bg-white border border-slate-150 rounded-2xl hover:border-brand-navy shadow-xs transition-all flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-sky text-brand-navy flex items-center justify-center font-bold font-sans text-sm shrink-0">
                      0{ind + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-sm">
                        {serv.title[lang]}
                      </h4>
                      <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                        {serv.description[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* New Interactive ATS & Career Services Section */}
          <div className="mt-20 space-y-16" id="ats-career-portal">
            <AtsResumeBuilder lang={lang} />
            <div className="w-full border-t border-slate-200"></div>
            <OrganizationalServices lang={lang} />
          </div>

          {/* Infrastructure Desk */}
          <div className="mt-16 bg-slate-900 text-slate-100 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-650/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1 bg-white/10 text-white rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                  🏢 {lang === "ar" ? "جاهزية البنية التحتية" : "Operational Readiness"}
                </span>
                <h3 className="text-2xl font-black text-white">
                  {t.office_details_title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.office_details_desc}
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-center">
                  <span className="block text-2xl font-black text-white">📍 {lang === "ar" ? "المفرق" : "Mafraq"}</span>
                  <span className="block text-xs text-slate-400 mt-1">{lang === "ar" ? "قاعات وسيرفر مستقل" : "Furnished Training Halls"}</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-center">
                  <span className="block text-2xl font-black text-white">📍 {lang === "ar" ? "إربد" : "Irbid"}</span>
                  <span className="block text-xs text-slate-400 mt-1">{lang === "ar" ? "مكاتب ريادة أعمال" : "Co-working & Business Labs"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Projects and Experiences Listing Section */}
      <section id="projects" className="py-20 bg-slate-50 border-t border-b border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-10 bg-white border rounded-full">
              {lang === "ar" ? "شركاء الإنجاز ووكالات الإعالة" : "Proven Track Of Success"}
            </span>
            <h2 className="text-3xl font-black text-brand-navy mt-3">
              {t.projects}
            </h2>
            <div className="w-16 h-1 bg-brand-navy mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Search and Filters panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6 mb-8">
            
            {/* Real Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder={lang === "ar" ? "ابحث بالاسم، المانح، أو موضوع المشاركة..." : "Search by project name, donor agency, key word..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
              />
              <span className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "left-3" : "right-3"}`}>
                🔍
              </span>
            </div>

            {/* Category Filter buttons */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 mt-4 h-auto">
              {[
                { id: "all", label: t.filter_all, icon: <LayoutGridIcon className="w-3.5 h-3.5" /> },
                { id: "youth", label: t.filter_youth, icon: getCategoryIcon("youth") },
                { id: "women", label: t.filter_women, icon: getCategoryIcon("women") },
                { id: "livelihoods", label: t.filter_livelihoods, icon: getCategoryIcon("livelihoods") },
                { id: "environment", label: t.filter_environment, icon: getCategoryIcon("environment") },
                { id: "governance", label: t.filter_governance, icon: getCategoryIcon("governance") }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-brand-navy text-white shadow-sm"
                      : "bg-slate-50 text-slate-650 hover:bg-slate-100 hover:text-brand-navy"
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
              <span>{t.project_num_display}</span>
              <span className="bg-brand-sky text-brand-navy px-2.5 py-1 rounded-full">{filteredProjects.length}</span>
            </div>
          </div>

          {/* Projects rendering grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={proj.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Upper Category Badges */}
                    <div className="flex justify-between items-center">
                      <span className="px-2.5 py-1 bg-brand-sky text-brand-navy text-[10px] font-black uppercase rounded">
                        MCCSD {proj.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold font-serif">
                        {getCategoryIcon(proj.category)}
                        {proj.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-brand-navy leading-snug">
                      {proj.title[lang]}
                    </h3>

                    {/* Donor representation */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {t.donor_label}
                      </span>
                      <span className="font-semibold text-xs text-slate-700 leading-normal block mt-0.5">
                        {proj.donor[lang]}
                      </span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {proj.description[lang]}
                    </p>

                    {/* Highlight Section */}
                    {proj.keyFacts && (
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedProject(expandedProject === proj.id ? null : proj.id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-brand-navy cursor-pointer"
                        >
                          <span>{expandedProject === proj.id ? (lang === "ar" ? "إخفاء التفاصيل" : "Hide Details") : (lang === "ar" ? "اضغط لعرض الركائز والإنجازات" : "View Key Highlights")}</span>
                          {expandedProject === proj.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        <AnimatePresence>
                          {expandedProject === proj.id && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 bg-blue-50/50 rounded-xl p-4 border border-blue-100 space-y-2 text-xs"
                            >
                              <span className="block font-bold text-blue-800 mb-1">{t.key_highlights}</span>
                              {(lang === "ar" ? proj.keyFactsAr : proj.keyFacts)?.map((fact, index) => (
                                <li key={index} className="flex gap-2 items-start">
                                  <span className="text-blue-600 select-none shrink-0 font-bold">✔</span>
                                  <span className="text-slate-750 font-medium leading-relaxed">{fact}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-semibold font-sans">MCCSD Registry v0.9</span>
                    <button 
                      onClick={() => {
                        setPledgeSector(proj.id);
                        document.getElementById("volunteer")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy hover:text-blue-600 cursor-pointer"
                    >
                      <span>{lang === "ar" ? "تضامن مع هذا البرنامج" : "Pledge Support"}</span>
                      {lang === "ar" ? <ChevronRight className="w-3.5 h-3.5 rotate-180" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Donor agency trust grid */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-lg font-bold text-slate-700 tracking-tight uppercase">
                {t.donor_logos_section_title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.donor_logos_section_sub}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
              {[
                "UNICEF Jordan", "UNHCR", "EU Trust Fund", "USAID Power", "US MEPI", "GIZ / BMZ", "OXFAM", "Canada Fund CFLI", "UNDP", "Ministry of Digital Economy (MoDEE)", "RUWWAD", "Ministry of Social Development"
              ].map((partner, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-white rounded-xl border border-slate-150 text-[11px] font-black text-slate-500 shadow-xs uppercase tracking-wide hover:border-brand-navy hover:text-brand-navy transition-all hover:-translate-y-0.5"
                >
                  🤝 {partner}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Solidarity Action & Volunteer Pledge Certificate Generator */}
      <section id="volunteer" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">
              {lang === "ar" ? "مشاركة تآزرية فاعلة" : "Dynamic Civic Alliance"}
            </span>
            <h2 className="text-3xl font-black text-brand-navy mt-3">
              {t.pledge_title}
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              {t.pledge_subtitle}
            </p>
            <div className="w-16 h-1 bg-brand-navy mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Input Form Fields for Pledge */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-155 shadow-inner">
              <form onSubmit={handlePledgeSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {lang === "ar" ? "الاسم الكريم / الجهة المتعهدة" : "Donor Key Name / Bearer"} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ar" ? "مثال: ريم العكور" : "e.g., Jennifer Smith"}
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {lang === "ar" ? "البرنامج المراد مساندته فخرياً" : "Focused Core Sector"}
                  </label>
                  <select
                    value={pledgeSector}
                    onChange={(e) => setPledgeSector(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                  >
                    {PROJECTS_LIST.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    {lang === "ar" ? "نوع التضامن / المساهمة الميدانية" : "Pledge Type / Form of Action"}
                  </label>
                  <div className="space-y-2 pt-1 font-semibold text-xs text-slate-700">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pledgetype"
                        checked={pledgeType === "volunteer"}
                        onChange={() => setPledgeType("volunteer")}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{lang === "ar" ? "التطوع كمدرّب تقني أو منسق ميداني" : "Apply as tech trainer / program supervisor"}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pledgetype"
                        checked={pledgeType === "expert"}
                        onChange={() => setPledgeType("expert")}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{lang === "ar" ? "تقديم استشارات وتوجيه أعمال للمشاريع المنزلية" : "Provide free mentoring & plans to home startups"}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pledgetype"
                        checked={pledgeType === "cultural"}
                        onChange={() => setPledgeType("cultural")}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>{lang === "ar" ? "نشر الوعي الثقافي والبيئي للأراضي الأردنية" : "Promote ecological & civic integrity on social spheres"}</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer text-sm"
                >
                  {t.pledge_btn}
                </button>

              </form>
            </div>

            {/* Generated Printable Certificate Box */}
            <div className="lg:col-span-7">
              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                
                {pledgeSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex gap-3 items-center">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-650" />
                      <div>
                        <h4 className="text-sm font-bold">{t.pledge_success_title}</h4>
                        <p className="text-xs mt-0.5">{t.pledge_success_msg}</p>
                      </div>
                    </div>

                    {/* Highly polished golden certificate wrapper */}
                    <div id="pledge-certificate" className="bg-white p-8 rounded-xl border-8 border-double border-amber-600/40 relative overflow-hidden shadow-md text-slate-800">
                      
                      {/* Ornamental background watermark logo */}
                      <div className="absolute inset-0 opacity-5 flex items-center justify-center font-sans font-black text-6xl text-brand-navy select-none rotate-12">
                        MCCSD
                      </div>

                      <div className="text-center relative z-10 space-y-6">
                        <div className="flex justify-between items-center border-b border-amber-200 pb-3">
                          <span className="text-[9px] font-bold text-amber-800 uppercase tracking-wider font-sans">Mossawah Center (MCCSD)</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded">JORDAN</span>
                        </div>

                        <h3 className="text-lg font-black text-amber-800 tracking-tight">
                          📜 {t.pledge_cert_title}
                        </h3>

                        <div className="text-center space-y-2">
                          <span className="text-slate-400 text-xs italic block">{lang === "ar" ? "تُمنح هذه اللوحة الرمزية بفخر إلى:" : "This honor has been conferred upon:"}</span>
                          <h4 className="text-2xl font-black text-brand-navy tracking-tight py-2 border-b border-dashed border-slate-250 w-max mx-auto px-6 class-arabic-title">
                            {certifiedName}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-650 leading-relaxed max-w-xl mx-auto font-medium">
                          {t.pledge_cert_body} <strong>{PROJECTS_LIST.find(pr => pr.id === pledgeSector)?.title[lang]}</strong>.
                        </p>

                        <div className="text-xs text-slate-400 pt-3 border-t border-slate-150 flex justify-between items-center">
                          <div className="text-start">
                            <span className="block text-[10px] text-slate-400">{lang === "ar" ? "تاريخ التعهد الافتراضي:" : "Date of Pledge:"}</span>
                            <span className="font-bold text-slate-700">2026-05-25</span>
                          </div>
                          
                          <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 bg-amber-100/50 flex items-center justify-center font-extrabold text-[9px] text-amber-800 rotate-12 select-none">
                            MCCSD SEAL
                          </div>

                          <div className="text-end">
                            <span className="block text-[10px] text-slate-400">{lang === "ar" ? "المدير العام والترخيص:" : "Registrar Authorized:"}</span>
                            <span className="font-bold text-brand-navy">{CENTER_INFO.representative[lang]}</span>
                          </div>
                        </div>

                        <p className="text-[9px] text-slate-400 italic">
                          {t.pledge_cert_footer}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold border border-slate-350 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer transition-all"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{lang === "ar" ? "طباعة هذه الشهادة" : "Print Certificate"}</span>
                      </button>
                      <button
                        onClick={() => setPledgeSuccess(false)}
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-blue-600 hover:text-brand-navy cursor-pointer"
                      >
                        <span>{lang === "ar" ? "إنشاء تعهد جديد" : "Generate Another"}</span>
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-inner">
                      📋
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-600">{lang === "ar" ? "في انتظار ملء معلومات تعهدك التضامني" : "Awaiting Pledge Submission"}</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">{lang === "ar" ? "املأ اسمك واختر نوع المبادرة والبرنامج على اليمين لتوليد شهادة التضامن المعتمدة للمملكة في متصفحك مباشرة." : "Type your name and select program fields in the left-hand form to dynamically render a custom civil certificate of solidarity."}</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Contact Us + Map Section */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest px-3 py-1 bg-blue-10 bg-white border rounded-full">
              {lang === "ar" ? "تواصل مباشر وبناء شراكات" : "Connect With Mossawah"}
            </span>
            <h2 className="text-3xl font-black text-brand-navy mt-3">
              {t.contact_header}
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              {t.contact_subheader}
            </p>
            <div className="w-16 h-1 bg-brand-navy mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left/Right Directory Block: Legal registries and emails */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-brand-navy pb-3 border-b border-slate-100">
                  {lang === "ar" ? "دليل الاتصال المباشر" : "Direct Contact Directory"}
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "ar" ? "اسم المنشأة المسجلة:" : "Registered Entity Name:"}</span>
                      <span className="text-sm font-semibold text-slate-800">{CENTER_INFO.name[lang]}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "ar" ? "البريد الإلكتروني للإدارة العامة:" : "Administrative Emails:"}</span>
                      {CENTER_INFO.emails.map((m, ind) => (
                        <a key={ind} href={`mailto:${m}`} className="block text-xs font-bold text-blue-600 hover:underline">{m}</a>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "ar" ? "أرقام الهواتف الخلوية للتواصل:" : "Contact Phone Numbers:"}</span>
                      {CENTER_INFO.phones.map((tel, ind) => (
                        <a key={ind} href={`tel:${tel}`} className="block text-xs font-bold text-slate-800 hover:underline mt-0.5 block">{tel}</a>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Support Row */}
                  <div className="flex gap-3 items-start p-3.5 bg-emerald-50 rounded-2xl border border-emerald-150 shadow-xs">
                    <svg className="w-5 h-5 text-emerald-600 fill-emerald-600/10 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.407 1.259 4.848l-1.302 4.753a.311.311 0 0 0 .38.38l4.754-1.302c1.44.8 3.09 1.259 4.848 1.259 5.506 0 9.969-4.463 9.969-9.969S17.518 2 12.012 2zm4.72 13.56c-.23.65-1.12 1.22-1.8 1.34-.62.11-1.42.19-3.95-.81-2.9-1.14-4.83-4.14-4.97-4.34-.14-.2-1.18-1.57-1.18-3a3.1 3.1 0 0 1 .98-2.31c.28-.24.62-.31.83-.31.2 0 .41.01.59.02.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03.87.78 1.61 1.02 1.91 1.17.3.15.47.13.65-.08.18-.21.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.28.1.28c.3.11 1.17.55 1.54.73s1.21.6 1.31.78c.1.18.1.86-.13 1.51z" strokeWidth="0" />
                    </svg>
                    <div>
                      <span className="block text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider">{lang === "ar" ? "دردشة واتساب المعتمدة:" : "Verified WhatsApp Chat:"}</span>
                      <a 
                        href={`https://wa.me/962776338484?text=${encodeURIComponent(lang === "ar" ? "السلام عليكم مركز مساواة، أرغب بالتواصل بخصوص برامج ومشاريع التنمية." : "Hello Mossawah, I would like to connect regarding your programs & field projects.")}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-xs font-black text-emerald-700 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>0776338484 ({lang === "ar" ? "انقر لبدء محادثة فورية" : "Click to chat"})</span>
                        <ExternalLink className="w-3 h-3 text-emerald-600" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Facebook className="w-5 h-5 text-[#1877F2] fill-[#1877F2]/10 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "ar" ? "الصفحة الرسمية على فيسبوك:" : "Official Facebook Page:"}</span>
                      <a href={CENTER_INFO.facebook} target="_blank" rel="noopener noreferrer" className="block text-xs font-bold text-[#1877F2] hover:underline flex items-center gap-1">
                        <span>{lang === "ar" ? "مركز مساواة على فيسبوك" : "Mossawah Center on Facebook"}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 bg-blue-50/55 rounded-2xl border border-blue-150 shadow-xs">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-blue-800 font-extrabold uppercase tracking-wider">{lang === "ar" ? "الموقع الجغرافي للمقر الرئيسي:" : "Official HQ Location (Google Maps):"}</span>
                      <a 
                        href="https://maps.app.goo.gl/jVWdNMwkgE7g8zvU8?g_st=ac"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block text-xs font-black text-blue-700 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>{lang === "ar" ? "انقر للذهاب إلى الخريطة" : "Click to view on Maps"}</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lang === "ar" ? "أبرز محافظات العمل الميداني والترخيص:" : "Primary Areas of Field Operations:"}</span>
                      <span className="text-xs font-medium text-slate-650 inline-block bg-slate-50 px-2 py-1 rounded border mt-1">
                        {CENTER_INFO.governorates[lang].join(" • ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stored message box showing interactive local state triggers */}
              {storedSubmissions.length > 0 && (
                <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    🟢 {lang === "ar" ? "إشعارات الرسائل المحلية النشطة" : "Active Local Submissions Logged"} ({storedSubmissions.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {storedSubmissions.map((sub) => (
                      <div key={sub.id} className="text-xs border-b border-white/5 pb-2 last:border-0">
                        <div className="flex justify-between font-bold text-white mb-0.5">
                          <span>{sub.name}</span>
                          <span className="text-[10px] text-slate-400 font-serif">{sub.date}</span>
                        </div>
                        <span className="block text-slate-300 font-medium italic truncate">{sub.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* In-depth Interactive Contact Form */}
            <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-150 shadow-sm">
              
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy">
                    {lang === "ar" ? "تم استلام ونمذجة رسالتك بنجاح!" : "Message Submitted Successfully!"}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    {t.form_success}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-brand-navy cursor-pointer mt-4"
                  >
                    <span>{lang === "ar" ? "إرسال رسالة جديدة" : "Send Another Message"}</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  
                  {formError && (
                    <div className="bg-rose-50 text-rose-800 p-4 rounded-xl text-xs font-bold border border-rose-100">
                      ⚠ {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.form_name} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "ar" ? "أدخل اسمك الكامل" : "Your Full Name"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.form_email} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.form_phone}
                      </label>
                      <input
                        type="tel"
                        placeholder="07XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.form_type}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                      >
                        <option value="general">{t.form_type_general}</option>
                        <option value="partnership">{t.form_type_partnership}</option>
                        <option value="volunteer">{t.form_type_volunteer}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      {t.form_message} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder={lang === "ar" ? "اكتب رسالتك أو فكرة الشراكة بالتفصيل هنا..." : "Type your message or project partnership idea..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-navy hover:bg-black text-white rounded-xl font-bold transition-all shadow-md shadow-brand-navy/10 cursor-pointer text-sm"
                  >
                    {t.form_submit}
                  </button>

                </form>
              )}

            </div>

          </div>

          {/* Fully Interactive Virtual Map & Location Card */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/75 shadow-xl shadow-slate-100/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 -z-10 rounded-bl-full opacity-60"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Main Location Pin Card */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between text-start">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-700 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
                    {lang === "ar" ? "الموقع الجغرافي الرسمي للمقر" : "Official HQ Location"}
                  </span>
                  
                  <h3 className="text-2xl font-black text-brand-navy tracking-tight leading-tight">
                    {lang === "ar" ? "تفضل بزيارة مقر التخطيط والمشاركة" : "Visit Our Direct Mobilization Hub"}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    {lang === "ar" 
                      ? "يسعدنا استقبالكم في مقرنا الرسمي للتنسيق والتشاور ريادياً ومجتمعياً. لقد وفّرنا قاعات مجهّزة بالكامل بكافة الأدوات التكنولوجية والإنترنت السريع لخدمة شبابنا وشاباتنا."
                      : "We look forward to welcoming you at our certified headquarters for community collaboration. Our hubs are fully equipped with IT networks to empower young citizens."}
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex gap-2 items-center text-xs text-slate-700 font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      <span>{lang === "ar" ? "الموقع الجغرافي مسجل رسمياً وجاهز للاستقبال" : "HQ Location verified & open for visits"}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Web Link for Navigation instructions */}
                <div className="pt-4">
                  <a
                    href="https://maps.app.goo.gl/jVWdNMwkgE7g8zvU8?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-brand-navy active:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-black tracking-wide transition-all shadow-lg shadow-blue-500/15 w-full justify-center group"
                    id="open-google-maps-btn"
                  >
                    <svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{lang === "ar" ? "عرض اتجاهات الطريق والموقع على Google Maps" : "Open Driving Directions on Google Maps"}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-85" />
                  </a>
                </div>
              </div>

              {/* Geographic Mobilization Grid Map with Interactive Coordinates Style */}
              <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-brand-navy tracking-wider uppercase mb-4 text-start flex items-center gap-2">
                    🗺️ {lang === "ar" ? "نطاق المحافظات والانتشار الميداني المعتمد" : "Governorates & Active Local Workspaces"}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-start">
                    {CENTER_INFO.governorates.en.map((govEn, index) => {
                      const govAr = CENTER_INFO.governorates.ar[index];
                      const isMainCenter = govEn === "Mafraq" || govEn === "Irbid";
                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-xl border transition-all ${
                            isMainCenter 
                            ? "bg-blue-50/70 border-blue-250 shadow-xs shadow-blue-500/5 ring-1 ring-blue-100" 
                            : "bg-white border-slate-150 hover:border-slate-350"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-[8px] font-bold uppercase ${isMainCenter ? 'text-blue-700' : 'text-slate-400'}`}>
                              {isMainCenter ? (lang === "ar" ? "المقر التدريبي" : "Core Office") : `MCCSD 0${index + 1}`}
                            </span>
                            {isMainCenter && <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping"></span>}
                          </div>
                          <span className="block text-slate-900 font-bold text-xs mt-1">
                            {lang === "ar" ? govAr : govEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-600 block"></span>
                    {lang === "ar" ? "الموقع الجغرافي مدبلج بخرائط قوقل" : "Google-mapped headquarters enabled"}
                  </span>
                  <span>
                    {lang === "ar" ? "مرخص وموثق بموجب القوانين الناظمة" : "Registered civil society infrastructure - Jordan"}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Structured Footer */}
      <footer className="bg-brand-dark text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <MCCSDLogo variant="icon" color="#ffffff" className="h-10 w-10 shrink-0 opacity-90" />
              <div>
                <span className="text-base font-bold text-white tracking-tight block">
                  {CENTER_INFO.name[lang]}
                </span>
                <span className="text-[10px] block text-slate-400">
                  {lang === "ar" ? "مرخص لدى الوزارات الأردنية المعنية" : "Licensed under Jordanian regulatory oversight"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              <button
                onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.home}
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.about}
              </button>
              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.services}
              </button>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.projects}
              </button>
              <button
                onClick={() => document.getElementById("volunteer")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.volunteer}
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-white transition-all cursor-pointer"
              >
                {t.contact}
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p className="text-center sm:text-start leading-relaxed">
              {t.footer_text}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 font-sans font-bold items-center text-slate-400">
              <span className="flex items-center gap-1" title={lang === "ar" ? "الهاتف الرسمي للمركز" : "Official Support Number"}><Phone className="w-3.5 h-3.5" /> 0777790680</span>
              <span>•</span>
              <a 
                href={`https://wa.me/962776338484?text=${encodeURIComponent(lang === "ar" ? "أهلاً مركز مساواة، أود التواصل معكم." : "Hello Mossawah, I would like to chat.")}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 hover:underline transition-all"
                title={lang === "ar" ? "دردشة واتساب الفورية" : "Launch WhatsApp Chat"}
              >
                <svg className="w-3.5 h-3.5 fill-emerald-500/10" viewBox="0 0 24 24" fill="currentColor" style={{ display: "inline-block" }}>
                  <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.407 1.259 4.848l-1.302 4.753a.311.311 0 0 0 .38.38l4.754-1.302c1.44.8 3.09 1.259 4.848 1.259 5.506 0 9.969-4.463 9.969-9.969S17.518 2 12.012 2zm4.72 13.56c-.23.65-1.12 1.22-1.8 1.34-.62.11-1.42.19-3.95-.81-2.9-1.14-4.83-4.14-4.97-4.34-.14-.2-1.18-1.57-1.18-3a3.1 3.1 0 0 1 .98-2.31c.28-.24.62-.31.83-.31.2 0 .41.01.59.02.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03.87.78 1.61 1.02 1.91 1.17.3.15.47.13.65-.08.18-.21.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.28.1.28c.3.11 1.17.55 1.54.73s1.21.6 1.31.78c.1.18.1.86-.13 1.51z" />
                </svg>
                <span>0776338484 (واتساب / WhatsApp)</span>
              </a>
              <span>•</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> mossawah@yahoo.com</span>
              <span>•</span>
              <a href={CENTER_INFO.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#1877F2] hover:text-blue-400 hover:underline transition-all">
                <Facebook className="w-3.5 h-3.5 fill-[#1877F2]/10" />
                <span>{lang === "ar" ? "فيسبوك" : "Facebook"}</span>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Interactive WhatsApp Chat Widget */}
      <div 
        className="fixed bottom-6 z-50 flex flex-col gap-3 items-end max-w-[340px] sm:max-w-md"
        style={{
          left: lang === "ar" ? "24px" : "auto", 
          right: lang === "ar" ? "auto" : "24px"
        }}
      >
        <AnimatePresence>
          {/* Notification Alert Balloon */}
          {whatsappNotification && !whatsappOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl p-3.5 border border-slate-150 relative flex items-start gap-2.5 max-w-[280px]"
            >
              <button 
                onClick={() => setWhatsappNotification(false)}
                className="absolute top-1.5 left-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 p-0.5 text-[10px] leading-tight"
                title={lang === "ar" ? "إغلاق التنبیه" : "Close notification"}
              >
                ✕
              </button>
              <div className="bg-[#25D366]/10 p-2 rounded-xl text-[#25D366] shrink-0 mt-0.5">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.407 1.259 4.848l-1.302 4.753a.311.311 0 0 0 .38.38l4.754-1.302c1.44.8 3.09 1.259 4.848 1.259 5.506 0 9.969-4.463 9.969-9.969S17.518 2 12.012 2zm4.72 13.56c-.23.65-1.12 1.22-1.8 1.34-.62.11-1.42.19-3.95-.81-2.9-1.14-4.83-4.14-4.97-4.34-.14-.2-1.18-1.57-1.18-3a3.1 3.1 0 0 1 .98-2.31c.28-.24.62-.31.83-.31.2 0 .41.01.59.02.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03.87.78 1.61 1.02 1.91 1.17.3.15.47.13.65-.08.18-.21.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.28.1.28c.3.11 1.17.55 1.54.73s1.21.6 1.31.78c.1.18.1.86-.13 1.51z" />
                </svg>
              </div>
              <div className="text-start pr-2">
                <span className="block text-xs font-black text-brand-navy leading-none mb-1">
                  {lang === "ar" ? "د. أحمد منصور" : "Dr. Ahmad Mansour"}
                </span>
                <p className="text-[11px] font-bold text-slate-500 leading-tight">
                  {lang === "ar" ? "أهلاً بك! راسلنا مباشرة بخصوص مشاريع المركز والتنمية." : "Welcome! Text us directly regarding center projects & grants."}
                </p>
              </div>
            </motion.div>
          )}

          {/* Interactive Chat window popover popup */}
          {whatsappOpen && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 w-[310px] sm:w-[335px] flex flex-col relative"
            >
              {/* Green Whatsapp Header block */}
              <div className="bg-[#075E54] p-4 text-white flex items-center gap-3">
                <MCCSDLogo variant="icon" className="h-9 w-9 shrink-0 outline outline-2 outline-white/30 rounded-xl" />
                <div className="text-start">
                  <h4 className="text-sm font-black tracking-tight flex items-center gap-1.5">
                    <span>{lang === "ar" ? "مركز مساواة - الإدارة" : "MCCSD Executive Dept"}</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  </h4>
                  <span className="text-[10px] opacity-80 block mt-0.5">
                    {lang === "ar" ? "د. أحمد منصور (غالباً يرد في دقائق)" : "Dr. Ahmad Mansour (Replies quickly)"}
                  </span>
                </div>
                <button 
                  onClick={() => setWhatsappOpen(false)}
                  className="mr-auto ml-0 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
                  title={lang === "ar" ? "إغلاق" : "Minimize"}
                >
                  ✕
                </button>
              </div>

              {/* Chat body containing beautiful bubble replies */}
              <div 
                className="p-4 bg-slate-50 min-h-[170px] space-y-3 overflow-y-auto max-h-60"
                style={{
                  backgroundImage: "radial-gradient(#128c7e09 1.1px, transparent 1.1px)",
                  backgroundSize: "16px 16px"
                }}
              >
                {/* Simulated message 1 */}
                <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-xs text-xs text-slate-800 text-start border border-slate-100 max-w-[90%]">
                  <p className="leading-relaxed">
                    {lang === "ar" 
                      ? "أهلاً ومرحباً بمحب الخير والتنمية! 👋 يسعدني شخصياً الإجابة على استفساراتكم ونقاش سبل التعاون الميداني وتداول الفوائد."
                      : "Welcome to Mossawah Center! 👋 I would be delighted to guide you, answer questions, and explore partnership pipelines."}
                  </p>
                  <span className="block text-[8px] text-slate-400 mt-1.5 text-right font-serif">12:48 PM</span>
                </div>

                {/* Simulated message 2 */}
                <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-xs text-xs text-slate-800 text-start border border-slate-100 max-w-[90%]">
                  <p className="leading-relaxed">
                    {lang === "ar" 
                      ? "اضغط أدناه ليفتح لك رقم هاتفي المباشر 0776338484 في واتساب لنبدأ الحوار فوراً 📲" 
                      : "Click below to trigger my direct workspace chat on number 0776338484 instantly! 📲"}
                  </p>
                  <span className="block text-[8px] text-slate-400 mt-1.5 text-right font-serif">12:49 PM</span>
                </div>
              </div>

              {/* Call to action direct chat button */}
              <div className="p-3 bg-slate-50/55 border-t border-slate-150 text-center">
                <a
                  href={`https://wa.me/962776338484?text=${encodeURIComponent(lang === "ar" ? "السلام عليكم د. أحمد منصور، أرغب بالتواصل بخصوص برامج مركز مساواة." : "Hello Dr. Ahmad Mansour, I would like to inquire about MCCSD initiatives.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1ca34d] text-white rounded-xl text-xs font-bold font-sans tracking-wide transition-all shadow-md shadow-emerald-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.407 1.259 4.848l-1.302 4.753a.311.311 0 0 0 .38.38l4.754-1.302c1.44.8 3.09 1.259 4.848 1.259 5.506 0 9.969-4.463 9.969-9.969S17.518 2 12.012 2zm4.72 13.56c-.23.65-1.12 1.22-1.8 1.34-.62.11-1.42.19-3.95-.81-2.9-1.14-4.83-4.14-4.97-4.34-.14-.2-1.18-1.57-1.18-3a3.1 3.1 0 0 1 .98-2.31c.28-.24.62-.31.83-.31.2 0 .41.01.59.02.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03.87.78 1.61 1.02 1.91 1.17.3.15.47.13.65-.08.18-.21.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.28.1.28c.3.11 1.17.55 1.54.73s1.21.6 1.31.78c.1.18.1.86-.13 1.51z" />
                  </svg>
                  <span>{lang === "ar" ? "ارسل رسالة الآن على الواتساب" : "Send WhatsApp Message Now"}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing Trigger WhatsApp Button */}
        <button
          onClick={() => {
            setWhatsappOpen(!whatsappOpen);
            setWhatsappNotification(false);
          }}
          className={`h-14 w-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative z-50 ${
            whatsappOpen ? "bg-[#075E54] rotate-90" : "bg-[#25D366] hover:bg-[#20ba59]"
          }`}
          title={lang === "ar" ? "راسلنا على واتساب" : "Chat on WhatsApp"}
        >
          {whatsappOpen ? (
            <span className="text-xl font-bold font-sans">✕</span>
          ) : (
            <>
              {/* Outer Pulsing Glow Rings */}
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35"></span>
              <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.969 4.463-9.969 9.969 0 1.758.459 3.407 1.259 4.848l-1.302 4.753a.311.311 0 0 0 .38.38l4.754-1.302c1.44.8 3.09 1.259 4.848 1.259 5.506 0 9.969-4.463 9.969-9.969S17.518 2 12.012 2zm4.72 13.56c-.23.65-1.12 1.22-1.8 1.34-.62.11-1.42.19-3.95-.81-2.9-1.14-4.83-4.14-4.97-4.34-.14-.2-1.18-1.57-1.18-3a3.1 3.1 0 0 1 .98-2.31c.28-.24.62-.31.83-.31.2 0 .41.01.59.02.18 0 .42-.07.66.5.24.58.82 2.01.89 2.15.07.14.12.31.02.5-.1.19-.15.3-.29.47-.14.17-.3.38-.43.51-.15.15-.3.32-.13.62.17.3.76 1.25 1.63 2.03.87.78 1.61 1.02 1.91 1.17.3.15.47.13.65-.08.18-.21.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.28.1.28c.3.11 1.17.55 1.54.73s1.21.6 1.31.78c.1.18.1.86-.13 1.51z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Inline custom LayoutGrid icon fallback to reduce extra package imports
function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}
