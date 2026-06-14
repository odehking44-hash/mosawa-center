import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Sparkles, 
  Plus, 
  Trash2, 
  Printer, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  History, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Loader2, 
  BadgeCheck, 
  Share2, 
  ChevronRight, 
  Award, 
  Languages 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { firebaseAPI, ResumeData, ScanHistory } from "../lib/firebase";

interface AtsResumeBuilderProps {
  lang: "ar" | "en";
}

export default function AtsResumeBuilder({ lang }: AtsResumeBuilderProps) {
  const isAr = lang === "ar";

  // Auth States
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab: 'builder' | 'scanner' | 'history'
  const [activeTab, setActiveTab] = useState<"builder" | "scanner" | "history">("builder");

  // Load Saved Resumes List
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [savedScans, setSavedScans] = useState<ScanHistory[]>([]);

  // Form State for Resume Builder
  const [resumeForm, setResumeForm] = useState<Omit<ResumeData, "updatedAt" | "id">>({
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    skills: [],
    languages: [],
    experience: [],
    education: []
  });

  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);

  // Input helpers for Skills & Languages (tag additions)
  const [skillInput, setSkillInput] = useState("");
  const [langInput, setLangInput] = useState("");

  // Input helpers for new job experience
  const [newExp, setNewExp] = useState({ title: "", company: "", duration: "", description: "" });
  const [newEdu, setNewEdu] = useState({ degree: "", school: "", year: "", details: "" });

  // Scanner States
  const [scanResumeText, setScanResumeText] = useState("");
  const [scanJobDesc, setScanJobDesc] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Omit<ScanHistory, "userId" | "createdAt" | "resumeTitle"> | null>(null);

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Listen to Auth Changes
  useEffect(() => {
    const unsubscribe = firebaseAPI.onAuthChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setResumeForm(prev => ({ ...prev, userId: user.uid }));
        loadUserData(user.uid);
      } else {
        setResumeForm(prev => ({
          ...prev,
          userId: "anonymous",
          fullName: "",
          email: "",
          phone: "",
          location: "",
          linkedin: ""
        }));
        setSavedResumes([]);
        setSavedScans([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid: string) => {
    try {
      const resumes = await firebaseAPI.getResumesByUser(uid);
      setSavedResumes(resumes);
      if (resumes.length > 0 && !activeResumeId) {
        // Pre-fill with latest resume
        const latest = resumes[0];
        setActiveResumeId(latest.id || null);
        setResumeForm({
          userId: latest.userId,
          fullName: latest.fullName,
          email: latest.email,
          phone: latest.phone,
          location: latest.location,
          linkedin: latest.linkedin,
          summary: latest.summary,
          skills: latest.skills || [],
          languages: latest.languages || [],
          experience: latest.experience || [],
          education: latest.education || []
        });
      }

      const scans = await firebaseAPI.getScansByUser(uid);
      setSavedScans(scans);
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      await firebaseAPI.loginWithGoogle();
    } catch (err) {
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    try {
      await firebaseAPI.logout();
      setActiveResumeId(null);
      setResumeForm({
        userId: "anonymous",
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        summary: "",
        skills: [],
        languages: [],
        experience: [],
        education: []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  // Add tag functions
  const handleAddSkill = () => {
    if (skillInput.trim() && !resumeForm.skills.includes(skillInput.trim())) {
      setResumeForm(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (term: string) => {
    setResumeForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== term)
    }));
  };

  const handleAddLang = () => {
    if (langInput.trim() && !resumeForm.languages.includes(langInput.trim())) {
      setResumeForm(prev => ({
        ...prev,
        languages: [...prev.languages, langInput.trim()]
      }));
      setLangInput("");
    }
  };

  const handleRemoveLang = (term: string) => {
    setResumeForm(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== term)
    }));
  };

  // Add Job/Education
  const handleAddExperience = () => {
    if (newExp.title && newExp.company && newExp.duration) {
      setResumeForm(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExp }]
      }));
      setNewExp({ title: "", company: "", duration: "", description: "" });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setResumeForm(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAddEducation = () => {
    if (newEdu.degree && newEdu.school && newEdu.year) {
      setResumeForm(prev => ({
        ...prev,
        education: [...prev.education, { ...newEdu }]
      }));
      setNewEdu({ degree: "", school: "", year: "", details: "" });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setResumeForm(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Calculate live compliance scoring
  const getProgressScore = () => {
    let score = 15; // baseline starting
    if (resumeForm.fullName.length > 3) score += 10;
    if (resumeForm.email.includes("@")) score += 5;
    if (resumeForm.phone.length > 5) score += 5;
    if (resumeForm.summary.length > 20) score += 15;
    if (resumeForm.skills.length >= 3) score += 15;
    if (resumeForm.experience.length >= 1) score += 20;
    if (resumeForm.education.length >= 1) score += 15;
    return Math.min(score, 100);
  };

  // Save draft
  const handleSaveResume = async () => {
    if (!resumeForm.fullName.trim()) {
      alert(isAr ? "الرجاء إدخال الاسم الكامل لحفظ السير الذاتية" : "Please input your full name to save the CV");
      return;
    }

    setSaveStatus("saving");
    try {
      const payload = {
        ...resumeForm,
        id: activeResumeId || undefined,
        userId: currentUser?.uid || "anonymous"
      };
      const resumeId = await firebaseAPI.saveResume(payload);
      setActiveResumeId(resumeId);
      
      // reload list
      if (currentUser) {
        await loadUserData(currentUser.uid);
      }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Load a resume draft into form
  const handleLoadResume = (res: ResumeData) => {
    setActiveResumeId(res.id || null);
    setResumeForm({
      userId: res.userId,
      fullName: res.fullName,
      email: res.email,
      phone: res.phone,
      location: res.location,
      linkedin: res.linkedin,
      summary: res.summary,
      skills: res.skills || [],
      languages: res.languages || [],
      experience: res.experience || [],
      education: res.education || []
    });
    setActiveTab("builder");
  };

  // Run ATS scan match via Backend Express Route
  const handleAtsEvaluation = async () => {
    if (!scanResumeText.trim() || !scanJobDesc.trim()) {
      alert(isAr ? "الرجاء لصق السيرة الذاتية والوصف الوظيفي قبل المتابعة" : "Please paste both your resume and job description to continue");
      return;
    }

    setScanning(true);
    setScanResult(null);

    try {
      const response = await fetch("/api/ats/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: scanResumeText,
          jobDescription: scanJobDesc,
          lang: lang
        })
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate matching algorithm from server side");
      }

      const rawData = await response.json();
      setScanResult(rawData);

      // Save history log automatically
      const historyPayload = {
        userId: currentUser?.uid || "anonymous",
        resumeTitle: resumeForm.fullName || (isAr ? "فحص سريع" : "Quick Audit Scan"),
        jobDescription: scanJobDesc.substr(0, 500) + "...",
        matchPercentage: rawData.matchPercentage,
        analysis: rawData.analysis,
        strengthBulletPoints: rawData.strengthBulletPoints,
        missingKeywords: rawData.missingKeywords,
        optimizationRecommendations: rawData.optimizationRecommendations
      };

      await firebaseAPI.saveScanHistory(historyPayload);
      if (currentUser) {
        loadUserData(currentUser.uid);
      }
    } catch (err) {
      console.error(err);
      alert(isAr ? "عذراً، حدث خطأ أثناء الاتصال بخادم الذكاء الاصطناعي." : "Failed to connect to AI audit backend.");
    } finally {
      setScanning(false);
    }
  };

  // Print friendly layout triggering
  const triggerPrint = () => {
    const printContent = document.getElementById("ats-resume-print-area");
    if (!printContent) return;

    // Open native browser print window on this layout
    window.print();
  };

  const progressValue = getProgressScore();

  return (
    <div className="bg-slate-50 rounded-3xl border border-slate-200 shadow-sm overflow-hidden" id="ats-section">
      {/* Header and Authorization status */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-blue text-white rounded-2xl">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-sans">
              {isAr ? "منشئ ومحلل السير الذاتية الذكي (ATS)" : "Smart ATS Resume Builder & Deep Scanner"}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {isAr 
                ? "بوابتك المهنية للوصول إلى الوظيفة المثالية. أنشئ سيرة ذاتية متوافقة مع أنظمة الفرز، أو طابق ملفك الحالي مع أي وصف وظيفي باستخدام الذكاء الاصطناعي (Gemini)."
                : "Build clean machine-scannable CVs or analyze compatibility matching metrics against target job vacancies powered by Gemini API."}
            </p>
          </div>
        </div>

        {/* User login toggle */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
              <img 
                src={currentUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.displayName || 'M'}`} 
                alt="Profile" 
                className="w-5 h-5 rounded-full"
              />
              <span className="hidden sm:inline font-bold">
                {currentUser.displayName || (isAr ? "حساب المسودات" : "Jordan Member")}
              </span>
              <button 
                onClick={handleLogout} 
                className="text-amber-400 hover:text-amber-300 ml-1.5 cursor-pointer font-sans"
                title={isAr ? "تسجيل الخروج" : "Log out"}
              >
                <LogOut className="w-4 h-4 inline" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="flex items-center gap-2 bg-brand-blue hover:bg-blue-600 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              {authLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{isAr ? "حفظ سحابي ومسودات (Google)" : "Cloud Sync & History (Google)"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setActiveTab("builder")}
          className={`flex-1 py-4 px-6 text-center text-sm font-bold flex justify-center items-center gap-2 transition-all cursor-pointer ${
            activeTab === "builder" 
              ? "text-brand-blue border-b-2 border-brand-blue bg-blue-50/20" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isAr ? "منشئ السيرة الذاتية الفني" : "ATS Professional Builder"}</span>
        </button>

        <button
          onClick={() => setActiveTab("scanner")}
          className={`flex-1 py-4 px-6 text-center text-sm font-bold flex justify-center items-center gap-2 transition-all cursor-pointer ${
            activeTab === "scanner" 
              ? "text-brand-blue border-b-2 border-brand-blue bg-blue-50/20" 
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? "محلل ومطابق السيرة الذاتية" : "Deep ATS Scan & Match"}</span>
        </button>

        {currentUser && (
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-4 px-6 text-center text-sm font-bold flex justify-center items-center gap-2 transition-all cursor-pointer ${
              activeTab === "history" 
                ? "text-brand-blue border-b-2 border-brand-blue bg-blue-50/20" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <History className="w-4 h-4" />
            <span>{isAr ? "سجل الفحوصات والمسودات" : "Saved CVs & Scans"}</span>
          </button>
        )}
      </div>

      {/* Main Container Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: ATS RESUME BUILDER */}
          {activeTab === "builder" && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Form Input Columns */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Save message notification block */}
                {saveStatus && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
                    saveStatus === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" :
                    saveStatus === "error" ? "bg-rose-50 text-rose-800 border border-rose-150" : "bg-blue-50 text-blue-800 border border-blue-100"
                  }`}>
                    {saveStatus === "saving" && <Loader2 className="w-5 h-5 animate-spin" />}
                    {saveStatus === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {saveStatus === "error" && <AlertCircle className="w-5 h-5 text-rose-600" />}
                    <div>
                      {saveStatus === "saving" && (isAr ? "جاري مزامنة وحفظ المسودة إلى الخادم..." : "Synchronizing blueprint to server...")}
                      {saveStatus === "success" && (isAr ? "تم حفظ السيرة الذاتية والمسودة بنجاح وتأمينها!" : "ATS draft successfully saved & synchronized!")}
                      {saveStatus === "error" && (isAr ? "فشل حفظ الملف. تحقق من جودة الاتصال." : "Failed to synchronized file. Check network parameters.")}
                    </div>
                  </div>
                )}

                {/* Section 1: Personal Profile */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
                      {isAr ? "المعلومات الشخصية والاتصال" : "Personal Details & Registry"}
                    </h4>
                    {/* Live indicator of builder filled state */}
                    <span className="text-[10px] bg-sky-50 text-brand-blue py-1 px-2.5 rounded-full font-bold">
                      {isAr ? `جاهزية الملف: ${progressValue}%` : `CV Fill: ${progressValue}%`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                      <input
                        type="text"
                        value={resumeForm.fullName}
                        onChange={e => setResumeForm(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder={isAr ? "رائد خالد الخالدي" : "Raid Khaled Al-Khaldi"}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{isAr ? "المسمى الوظيفي المستهدف" : "Target Job Title"}</label>
                      <input
                        type="text"
                        placeholder={isAr ? "منسق برامج تنموية" : "Developmental Projects Coordinator"}
                        value={resumeForm.location} // reusable field for location or job
                        onChange={e => setResumeForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
                      <input
                        type="email"
                        value={resumeForm.email}
                        onChange={e => setResumeForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="example@mossawah.org"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{isAr ? "رقم الهاتف والاتصال" : "Phone / Mobile"}</label>
                      <input
                        type="tel"
                        value={resumeForm.phone}
                        onChange={e => setResumeForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="077XXXXXXX"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none text-right"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{isAr ? "رابط حساب العمل LinkedIn / Portfolio" : "LinkedIn Profile URL"}</label>
                      <input
                        type="url"
                        value={resumeForm.linkedin}
                        onChange={e => setResumeForm(prev => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none text-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Summary */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
                    {isAr ? "البيان والملخص المهني" : "Professional Statement & Profile"}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {isAr 
                      ? "اكتب نصاً مركّزاً من 3-4 جمل يوضح خبراتك الفريدة، وقدرتك على تلبية متطلبات المشاريع والمجتمعات التنموية."
                      : "Draft a concise 3-4 sentence narrative highlighting your specific sector expertise, coordination capabilities, and key project values."}
                  </p>
                  <textarea
                    rows={4}
                    value={resumeForm.summary}
                    onChange={e => setResumeForm(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder={isAr 
                      ? "أخصائي تنمية مجتمعية متميز بخبرة تفوق الـ 5 سنوات في إدارة البرامج الشبابية وتحسين الأمن المعيشي في شمال وجنوب الأردن بالتعاون مع المنظمات الدولية والمحلية..."
                      : "Adaptable community development specialist with over 5 years of rich experience launching livelihood enablement programs in Jordan, holding deep synergies with international humanitarian agencies..."}
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none leading-relaxed"
                  />
                </div>

                {/* Section 3: Professional Experiences */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
                    {isAr ? "الخبرات والمسيرة المهنية" : "Employment & Experience Track"}
                  </h4>

                  {/* Existing experiences lists */}
                  {resumeForm.experience.length > 0 && (
                    <div className="space-y-3.5 mb-4">
                      {resumeForm.experience.map((exp, index) => (
                        <div key={index} className="flex justify-between items-start bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs">
                          <div className="space-y-1">
                            <span className="font-bold text-brand-navy block">{exp.title}</span>
                            <span className="text-slate-500 font-semibold block">{exp.company} | {exp.duration}</span>
                            <p className="text-slate-600 mt-1 leading-relaxed text-[11px] whitespace-pre-wrap">{exp.description}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveExperience(index)}
                            className="text-rose-500 hover:text-rose-700 p-1 bg-white rounded-lg border border-slate-200 hover:shadow-xs transition cursor-pointer"
                            title={isAr ? "حذف الوظيفة" : "Remove job"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new experience form */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-dashed border-slate-200 space-y-3 text-xs">
                    <span className="font-bold text-slate-700 block text-xs">{isAr ? "إضافة خبرة جديدة" : "Add Job Opportunity"}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder={isAr ? "المسمى الوظيفي (مثال: منسق ميداني)" : "Title (e.g. Field Coordinator)"}
                        value={newExp.title}
                        onChange={e => setNewExp(prev => ({ ...prev, title: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                      <input
                        type="text"
                        placeholder={isAr ? "الجهة المشغلة (الشركة/المؤسسة)" : "Institution/Employer"}
                        value={newExp.company}
                        onChange={e => setNewExp(prev => ({ ...prev, company: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                      <input
                        type="text"
                        placeholder={isAr ? "الفترة (مثال: 2024 - الحالي)" : "Duration (e.g. 2024 - Present)"}
                        value={newExp.duration}
                        onChange={e => setNewExp(prev => ({ ...prev, duration: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                    <textarea
                      rows={2.5}
                      placeholder={isAr ? "تفصيل المهام والتأثيرات (المتوافقة مع لغة الـ ATS)..." : "Outline target responsibilities, numbers, and impact ratios..."}
                      value={newExp.description}
                      onChange={e => setNewExp(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAr ? "إدراج هذه الخبرة في الملف" : "Insert Job Record"}</span>
                    </button>
                  </div>
                </div>

                {/* Section 4: Education & Qualifications */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-blue rounded-full"></span>
                    {isAr ? "التعليم والشهادات الأكاديمية" : "Education & Academic Track"}
                  </h4>

                  {/* Education Listing */}
                  {resumeForm.education.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {resumeForm.education.map((edu, index) => (
                        <div key={index} className="flex justify-between items-start bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs">
                          <div className="space-y-1">
                            <span className="font-bold text-brand-navy block">{edu.degree}</span>
                            <span className="text-slate-500 font-semibold block">{edu.school} | {edu.year}</span>
                            {edu.details && <p className="text-slate-500 text-[11px] font-sans">{edu.details}</p>}
                          </div>
                          <button
                            onClick={() => handleRemoveEducation(index)}
                            className="text-rose-500 hover:text-rose-700 p-1 bg-white rounded-lg border border-slate-200 hover:shadow-xs transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Education Frame */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-dashed border-slate-200 space-y-3 text-xs">
                    <span className="font-bold text-slate-700 block text-xs">{isAr ? "إضافة شهادة أو مؤهل" : "Add Qualification"}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder={isAr ? "المؤهل العلمي (بكالوريوس تنمية)" : "Degree (e.g. BA Social Studies)"}
                        value={newEdu.degree}
                        onChange={e => setNewEdu(prev => ({ ...prev, degree: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                      <input
                        type="text"
                        placeholder={isAr ? "المؤسسة التعليمية (مثال: جامعة اليرموك)" : "University / Institution"}
                        value={newEdu.school}
                        onChange={e => setNewEdu(prev => ({ ...prev, school: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                      <input
                        type="text"
                        placeholder={isAr ? "سنة التخرج (مثال: 2022)" : "Graduation Year"}
                        value={newEdu.year}
                        onChange={e => setNewEdu(prev => ({ ...prev, year: e.target.value }))}
                        className="p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={isAr ? "تفاصيل إضافية / تخصص فرعي / امتياز" : "Additional details or honors"}
                      value={newEdu.details}
                      onChange={e => setNewEdu(prev => ({ ...prev, details: e.target.value }))}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-none text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-bold transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAr ? "إدراج هذا المؤهل في الملف" : "Insert Academic Record"}</span>
                    </button>
                  </div>
                </div>

                {/* Section 5: Skills & Languages (With Tags) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Skills Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                    <h4 className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <Award className="w-4 h-4 text-brand-blue" />
                      {isAr ? "المهارات الفنية والمقترحة" : "Technical & Core Skills"}
                    </h4>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isAr ? "خبرة (الرصد والتقييم)..." : "E.g. Project Delivery..."}
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAddSkill()}
                        className="flex-1 text-xs p-2 bg-slate-55 border border-slate-200 rounded-xl outline-none"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="p-2 bg-brand-navy text-white rounded-xl cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {resumeForm.skills.length === 0 ? (
                        <p className="text-[10px] text-slate-400">{isAr ? "لم يتم إدراج مهارات بعد." : "No skills registered yet."}</p>
                      ) : (
                        resumeForm.skills.map(skill => (
                          <span key={skill} className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-semibold text-[10px] px-2.5 py-1 rounded-full">
                            {skill}
                            <button onClick={() => handleRemoveSkill(skill)} className="text-blue-700 hover:text-rose-500 font-bold ml-1">×</button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Languages Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-4">
                    <h4 className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <Languages className="w-4 h-4 text-brand-blue" />
                      {isAr ? "اللغات" : "Languages"}
                    </h4>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={isAr ? "العربية، الإنجليزية..." : "E.g. English, Arabic..."}
                        value={langInput}
                        onChange={e => setLangInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleAddLang()}
                        className="flex-1 text-xs p-2 bg-slate-55 border border-slate-200 rounded-xl outline-none"
                      />
                      <button
                        onClick={handleAddLang}
                        className="p-2 bg-brand-navy text-white rounded-xl cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {resumeForm.languages.length === 0 ? (
                        <p className="text-[10px] text-slate-400">{isAr ? "العربية (تلقائياً)" : "Arabic (Default tag)"}</p>
                      ) : (
                        resumeForm.languages.map(language => (
                          <span key={language} className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-semibold text-[10px] px-2.5 py-1 rounded-full">
                            {language}
                            <button onClick={() => handleRemoveLang(language)} className="text-amber-900 hover:text-rose-500 font-bold ml-1">×</button>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Action Controllers */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleSaveResume}
                    disabled={saveStatus === "saving"}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl font-bold transition shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isAr ? "حفظ التغييرات والمسودة" : "Save CV & Draft"}</span>
                  </button>

                  <button
                    onClick={triggerPrint}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition shadow-xs cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isAr ? "معاينة الطباعة / تصدير PDF" : "Print Setup / Export PDF"}</span>
                  </button>
                </div>

              </div>

              {/* Live Mock Sheet Preview of the CV (ATS optimized standard) */}
              <div className="lg:col-span-5">
                <div className="sticky top-6 space-y-4">
                  <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">
                      📄 {isAr ? "معاينة سيرة الـ ATS القياسية" : "Standard ATS Scannable Sheet Preview"}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-slate-900 font-bold rounded">
                      {isAr ? "جاهز للفلترة" : "ATS READY"}
                    </span>
                  </div>

                  {/* Document Container Sheet (Printed in minimalist formats) */}
                  <div 
                    id="ats-resume-print-area" 
                    className="bg-white border border-slate-200 shadow-md p-6 sm:p-8 font-serif leading-relaxed text-slate-800 max-h-[800px] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-0"
                    style={{ direction: isAr ? "rtl" : "ltr" }}
                  >
                    {/* Minimal Core Header */}
                    <div className="text-center space-y-1 pb-4 border-b border-slate-300">
                      <h1 className="text-2xl font-black text-slate-900 uppercase font-sans tracking-wide">
                        {resumeForm.fullName || (isAr ? "اسم المتقدم الكامل" : "Applicant Full Name")}
                      </h1>
                      <div className="text-[11px] font-sans flex flex-wrap justify-center gap-3 text-slate-650 font-semibold selection:bg-blue-150">
                        {resumeForm.location && <span>📍 {resumeForm.location}</span>}
                        {resumeForm.phone && <span>📞 {resumeForm.phone}</span>}
                        {resumeForm.email && <span>✉️ {resumeForm.email}</span>}
                        {resumeForm.linkedin && <span className="underline">{resumeForm.linkedin}</span>}
                      </div>
                    </div>

                    {/* Objective / Summary section */}
                    <div className="py-4">
                      <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 font-sans tracking-wider">
                        {isAr ? "البيان المهني والخلاصة" : "Professional Core Statement"}
                      </h2>
                      <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                        {resumeForm.summary || (isAr ? "اكتب بيانك المهني هنا لإقناع مسؤولي التوظيف والفرز." : "Provide professional statement detailing your competitive background values.")}
                      </p>
                    </div>

                    {/* Experience Track block */}
                    <div className="py-2">
                      <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2.5 font-sans tracking-wider">
                        {isAr ? "الخبرات العملية والمهنية" : "Professional Experience"}
                      </h2>

                      {resumeForm.experience.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic">
                          {isAr ? "لم تدرج وظائف بعد. ستظهر هنا مهيكلة زمنياً." : "Structure your chronological history items."}
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {resumeForm.experience.map((exp, ind) => (
                            <div key={ind} className="space-y-1">
                              <div className="flex justify-between items-start text-[11px]">
                                <span className="font-bold text-slate-950 font-sans">{exp.title}</span>
                                <span className="text-slate-500 font-sans text-[10px] uppercase font-semibold">{exp.duration}</span>
                              </div>
                              <span className="block text-[10.5px] italic text-slate-650 font-sans font-medium">{exp.company}</span>
                              <p className="text-[10.5px] text-slate-700 leading-relaxed pl-1 whitespace-pre-wrap">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Academic Qualification Block */}
                    <div className="py-4">
                      <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2.5 font-sans tracking-wider">
                        {isAr ? "التعليم والمؤهلات الاكاديمية" : "Education & Qualifications"}
                      </h2>

                      {resumeForm.education.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic">
                          {isAr ? "لم تدرج مستويات تعليمية بعد." : "No education records added."}
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {resumeForm.education.map((edu, ind) => (
                            <div key={ind} className="text-[11px] space-y-0.5">
                              <div className="flex justify-between items-start">
                                <span className="font-bold text-slate-900 font-sans">{edu.degree}</span>
                                <span className="text-slate-550 font-sans text-[10px]">{edu.year}</span>
                              </div>
                              <span className="block text-[10.5px] text-slate-650 font-sans">{edu.school}</span>
                              {edu.details && <p className="text-[10px] text-slate-600 font-sans italic">{edu.details}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Skills & Langs Block */}
                    <div className="py-2 grid grid-cols-2 gap-4">
                      {/* Skills column */}
                      <div>
                        <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 font-sans tracking-wider">
                          {isAr ? "المهارات والتخصص الفني" : "Technological Skills"}
                        </h2>
                        {resumeForm.skills.length === 0 ? (
                          <span className="text-[10px] text-slate-450 italic">{isAr ? "أضف مهارات للتقييم..." : "No skills added."}</span>
                        ) : (
                          <p className="text-[10.5px] text-slate-700 leading-relaxed font-sans font-medium">
                            {resumeForm.skills.join(" • ")}
                          </p>
                        )}
                      </div>

                      {/* Langs column */}
                      <div>
                        <h2 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2 font-sans tracking-wider">
                          {isAr ? "اللغات المعتمدة" : "Languages"}
                        </h2>
                        {resumeForm.languages.length === 0 ? (
                          <p className="text-[10.5px] text-slate-700 font-sans font-medium">{isAr ? "العربية (اللغة الأم)" : "Arabic (Native)"}</p>
                        ) : (
                          <p className="text-[10.5px] text-slate-700 leading-relaxed font-sans font-medium">
                            {resumeForm.languages.join(" • ")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Professional legal disclaimer bottom printed */}
                    <div className="border-t border-slate-200 pt-3 mt-6 text-center text-[8px] font-sans text-slate-400 hidden print:block">
                      {isAr 
                        ? `تم إنشاء وتنسيق هذه السيرة الذاتية عبر مركز مساواة لتنمية المجتمع المدني ${new Date().getFullYear()} ©`
                        : `ATS Document formatted & optimized via McCsd Career Placement Systems ${new Date().getFullYear()} ©`}
                    </div>
                  </div>

                  {/* Helpful Quick advice tips */}
                  <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl flex gap-3 text-xs leading-relaxed">
                    <AlertCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-white block">{isAr ? "نصيحة نظام الفرز المهني (ATS):" : "ATS Scannability Rule:"}</span>
                      <p className="text-slate-300 transform scale-95 origin-top-right">
                        {isAr 
                          ? "تفادى كلياً استخدام الجداول المعقدة، الرسوم البيانية، أو الجرافيكس. أنظمة الفرز الروبوتية مثل Taleo تفضل التصاميم المبنية على عمود واحد سلس وخطوط نظيفة للتألق في استخراج بياناتك بنجاح."
                          : "Avoid complex multi-column grid containers, images, progress bars or logos. Systems rely strictly on plaintext-friendly single columns to parse tags securely."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}


          {/* TAB 2: DEEP ATS SCANNER (Gemini-Powered evaluation) */}
          {activeTab === "scanner" && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Entry Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Resume Source paste box */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-3">
                  <span className="font-bold text-slate-800 text-sm block">
                    📄 {isAr ? "محتوى سيرتك الذاتية الحالية (لصق النص)" : "Current Resume Content (Paste Text)"}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {isAr 
                      ? "الصق النص الكامل لسيرتك الذاتية الحالية (أو انسخ حقول المعاينة في التبويب الأول)."
                      : "Paste clean text copied from your current CV document."}
                  </p>
                  
                  <div className="relative">
                    <textarea
                      rows={10}
                      value={scanResumeText}
                      onChange={e => setScanResumeText(e.target.value)}
                      placeholder={isAr 
                        ? "انسخ نص سيرتك الذاتية هنا لتتمكن خوارزمية مساواة الذكية من استخراج المهارات ووزنها..."
                        : "Paste resume text here..."}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none leading-relaxed font-mono"
                    />
                    {resumeForm.fullName && !scanResumeText && (
                      <button
                        onClick={() => {
                          // Pre-fill using data in builder as convenient shortcut
                          const expText = resumeForm.experience.map(e => `${e.title} @ ${e.company}: ${e.description}`).join("\n");
                          const eduText = resumeForm.education.map(e => `${e.degree} - ${e.school}`).join("\n");
                          const combined = `${resumeForm.fullName}\n${resumeForm.location}\n\nSUMMARY:\n${resumeForm.summary}\n\nEXPERIENCE:\n${expText}\n\nEDUCATION:\n${eduText}\n\nSKILLS:\n${resumeForm.skills.join(", ")}`;
                          setScanResumeText(combined);
                        }}
                        className="absolute bottom-4 right-4 text-[10px] bg-brand-sky text-brand-blue font-bold py-1 px-3 rounded-xl border border-blue-200 transition-all hover:bg-brand-blue hover:text-white cursor-pointer"
                      >
                        {isAr ? "⚡ استخدام بيانات المنشئ أعلاه" : "⚡ Pull data from CV Builder"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Job vacancy paste box */}
                <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-xs space-y-3">
                  <span className="font-bold text-slate-800 text-sm block">
                    💼 {isAr ? "وصف الوظيفة المستهدفة أو الإعلان" : "Target Job Description (Paste Vacancy)"}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {isAr 
                      ? "الصق متطلبات الوظيفة الشاغرة لتحليل درجة التوافق والمهارات الناقصة المفتاحية."
                      : "Paste the role profile or employer's advertisement text."}
                  </p>
                  <textarea
                    rows={10}
                    value={scanJobDesc}
                    onChange={e => setScanJobDesc(e.target.value)}
                    placeholder={isAr 
                      ? "مثال: مطلوب منسق مشاريع في المفرق، خبرة في كتابة التقارير الأممية، شهادة جامعية، مهارات رصد وتقييم وتحليل إحصائي للمستفيدين..."
                      : "E.g. Seeking Program Officer holding 3+ years in Jordanian NGO management, database tracking, UNICEF Reporting formats..."}
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-blue outline-none leading-relaxed font-mono"
                  />
                </div>

              </div>

              {/* Action trigger button */}
              <div className="flex justify-center">
                <button
                  onClick={handleAtsEvaluation}
                  disabled={scanning}
                  className="flex items-center justify-center gap-2 px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm transition shadow-md disabled:opacity-50 cursor-pointer min-w-[250px]"
                >
                  {scanning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{isAr ? "جاري تدقيق ومطابقة السيرة بالذكاء الاصطناعي..." : "AI Auditing Alignment..."}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>{isAr ? "فحص نسبة مطابقة الـ ATS باستخدام Gemini" : "Scan Match Compliance Score"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* RESULTS VISUAL PANEL */}
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-150 pb-6">
                    {/* Circle Score dial */}
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke="#f1f5f9"
                          strokeWidth="10"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke={scanResult.matchPercentage >= 75 ? "#10b981" : scanResult.matchPercentage >= 50 ? "#f59e0b" : "#f43f5e"}
                          strokeWidth="10"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 60}
                          initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - scanResult.matchPercentage / 100) }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute text-center space-y-0.5">
                        <span className="text-3xl font-black text-slate-900 font-sans block">{scanResult.matchPercentage}%</span>
                        <span className="text-[9px] text-slate-450 uppercase font-bold tracking-wider">{isAr ? "المطابقة" : "ATS Match"}</span>
                      </div>
                    </div>

                    {/* AI Narrative Breakdown */}
                    <div className="space-y-3 flex-1 text-center md:text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-brand-blue rounded-full text-xs font-bold">
                        <BadgeCheck className="w-4 h-4 text-brand-blue" />
                        {isAr ? "التقييم الفني الشامل" : "AI Career Match Rating"}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        {scanResult.matchPercentage >= 75 
                          ? (isAr ? "الملف جاهز ومطابق بنسبة عالية!" : "High Compatibility Match Profile!")
                          : scanResult.matchPercentage >= 50 
                            ? (isAr ? "توافق متوسط - ينصح بإضافة كلمات مفتاحية" : "Medium Alignment - Add Recommended Terms")
                            : (isAr ? "بحاجة لتحرير عميق لزيادة القبول" : "Low Compliance - Critical Action Required")}
                      </h4>
                      <p className="text-xs text-slate-650 leading-relaxed text-slate-600">
                        {scanResult.analysis}
                      </p>
                    </div>
                  </div>

                  {/* Recommendations Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Column 1: Strengths */}
                    <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 flex flex-col h-full space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{isAr ? "نقاط القوة والمطابقة المضيئة" : "Identified Strengths"}</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-slate-700 leading-relaxed list-disc list-inside mt-1 flex-1">
                        {scanResult.strengthBulletPoints.map((point, index) => (
                          <li key={index} className="text-slate-650 font-medium leading-relaxed">{point}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Column 2: Missing Keywords */}
                    <div className="bg-rose-50/30 p-5 rounded-2xl border border-rose-100 flex flex-col h-full space-y-3">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        <span>{isAr ? "شروط وكلمات مفتاحية مفقودة" : "Missing Vital Keywords"}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 italic">
                        {isAr ? "أنظمة الفرز تبحث بدقة عن هذه المصطلحات:" : "ATS engine searches explicitly for these phrases:"}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1 flex-1 align-content-start">
                        {scanResult.missingKeywords.map((kw, index) => (
                          <span key={index} className="bg-white border border-rose-200 text-rose-800 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Recommendations */}
                    <div className="bg-blue-50/35 p-5 rounded-2xl border border-blue-100 flex flex-col h-full space-y-3">
                      <div className="flex items-center gap-2 text-brand-blue font-bold text-xs">
                        <Sparkles className="w-5 h-5 text-brand-blue shrink-0" />
                        <span>{isAr ? "خريطة طريق التعديل الفوري" : "Actionable Action Items"}</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-slate-700 leading-relaxed list-disc list-inside mt-1 flex-1">
                        {scanResult.optimizationRecommendations.map((rec, index) => (
                          <li key={index} className="text-slate-650 font-medium leading-relaxed">{rec}</li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              )}

            </motion.div>
          )}


          {/* TAB 3: USER DRAFTS ARCHIVE (Logged users) */}
          {activeTab === "history" && currentUser && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              class="space-y-6"
            >
              {/* Draft Resumes lists */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150">
                <span className="font-bold text-slate-950 text-sm block mb-4">
                  💾 {isAr ? "مسودات السير الذاتية المحفوظة" : "Saved CV Drafts"}
                </span>

                {savedResumes.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    {isAr 
                      ? "لا توجد سير ذاتية محفوظة بعد. املأ المنشئ واضغط على 'حفظ'."
                      : "No saved resumes in your account directory."}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedResumes.map((res) => (
                      <div key={res.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-blue hover:shadow-xs transition">
                        <div className="space-y-1.5">
                          <span className="block font-bold text-slate-900 text-sm">{res.fullName}</span>
                          {res.location && <span className="block text-[11px] text-slate-500 font-sans">📌 {res.location}</span>}
                          <span className="block text-[10px] text-slate-400 font-sans">
                            🕒 {isAr ? "تحديث:" : "Saved:"} {new Date(res.updatedAt).toLocaleDateString(isAr ? "ar-JO" : "en-US")}
                          </span>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => handleLoadResume(res)}
                            className="text-xs font-bold text-brand-blue hover:text-blue-700 bg-white border border-blue-200 px-3 py-1.5 rounded-lg cursor-pointer flex-1 text-center"
                          >
                            {isAr ? "تحميل في المنشئ" : "Edit Details"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scans list historic logs */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150">
                <span className="font-bold text-slate-950 text-sm block mb-4">
                  📊 {isAr ? "سجل تحليلات المطابقة التاريخي" : "Historical Job Scans Archive"}
                </span>

                {savedScans.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center italic">
                    {isAr ? "لم تقم بفحوصات مطابقة مسجلة بعد." : "No historic evaluation records logged."}
                  </p>
                ) : (
                  <div className="space-y-3.5">
                    {savedScans.map((scan) => (
                      <div key={scan.id} className="p-4 bg-slate-50/50 border border-slate-200 rounded-xl flex justify-between items-center gap-3">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-800 text-xs block">{scan.resumeTitle}</span>
                          <p className="text-[10px] text-slate-500 max-w-xl truncate">{scan.jobDescription}</p>
                          <span className="block text-[9px] text-slate-400 font-sans">
                            🕒 {new Date(scan.createdAt).toLocaleString(isAr ? "ar-JO" : "en-US")}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`inline-block font-sans font-black text-sm px-3 py-1 rounded-full ${
                            scan.matchPercentage >= 75 ? "bg-emerald-50 text-emerald-700" :
                            scan.matchPercentage >= 50 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                          }`}>
                            {scan.matchPercentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
