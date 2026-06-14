import React, { useState, useEffect } from "react";
import { 
  Users, 
  HelpingHand, 
  GraduationCap, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  BadgeInfo, 
  ChevronRight, 
  Sparkles, 
  Briefcase, 
  PhoneCall, 
  Bookmark, 
  UserCheck, 
  ExternalLink 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { firebaseAPI, ServiceInquiry } from "../lib/firebase";

interface OrganizationalServicesProps {
  lang: "ar" | "en";
}

export default function OrganizationalServices({ lang }: OrganizationalServicesProps) {
  const isAr = lang === "ar";

  // Auth States
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  
  // Booking status track
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  // Active service dialog modal: null | 'mock_interview' | 'career_coaching' | 'training_workshop'
  const [activeBooking, setActiveBooking] = useState<"mock_interview" | "career_coaching" | "training_workshop" | null>(null);

  // Custom Form fields
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formNotes, setFormNotes] = useState("");

  useEffect(() => {
    const unsub = firebaseAPI.onAuthChanged((user) => {
      setCurrentUser(user);
      if (user) {
        setFormName(user.displayName || "");
        setFormEmail(user.email || "");
      }
    });
    return () => unsub();
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBooking) return;

    if (!formName.trim() || !formEmail.trim() || !formPhone.trim() || !formDate) {
      alert(isAr ? "الرجاء تعبئة كافة الحقول المطلوبة لتأكيد الطلب." : "Please fill out all mandatory fields to secure your slot.");
      return;
    }

    setBookingStatus("submitting");

    try {
      const payload = {
        userId: currentUser?.uid || "anonymous",
        userName: formName,
        userEmail: formEmail,
        userPhone: formPhone,
        serviceType: activeBooking,
        preferredDate: formDate,
        notes: formNotes
      };

      await firebaseAPI.submitInquiry(payload);
      setBookingStatus("success");
      
      // Clear form inputs
      setFormNotes("");
      setFormDate("");
      
      setTimeout(() => {
        setBookingStatus(null);
        setActiveBooking(null);
      }, 3000);
    } catch (err) {
      console.error(err);
      setBookingStatus("error");
      setTimeout(() => setBookingStatus(null), 4000);
    }
  };

  const servicesData = [
    {
      id: "mock_interview" as const,
      title: { ar: "جلسات محاكاة المقابلات المهنية", en: "Professional Mock Interview Simulations" },
      subtitle: { ar: "تدريب عملي وجهاً لوجه", en: "F2F and Online Panel Trainings" },
      icon: Users,
      color: "from-blue-500 to-blue-600",
      accent: "text-blue-600",
      bgLight: "bg-blue-50/45",
      description: {
        ar: "تعد مقابلات العمل الخطوة الحاسمة للتعيين. نوفر لك في مركز مساواة لجان محاكاة متخصصة في قطاعات العمل الإنساني، المشاريع الدولية، الريادة والرقمنة، مع تزويدك بتقييم مباشر لثغرات الأداء.",
        en: "Interviews are the bottleneck for quality employment. We organize simulated recruitment panels mimicking real international NGOs, humanitarian bodies, and businesses, giving you direct, actionable scorecard feedback."
      },
      benefits: {
        ar: ["محاكاة لأساليب ومقابلات الجهات الدولية المعتمدة بالأردن", "تقييم مهني فوري للغة الجسد وصياغة الإجابات الـ STAR", "جلسات فردية مسجّلة للمراجعة الذاتية الفنية"],
        en: ["Simulates donor & foreign mission interview formats", "Expert evaluations of body language & STAR method execution", "Recorded individual simulation archives for self-review"]
      }
    },
    {
      id: "career_coaching" as const,
      title: { ar: "الاستشارات المهنية والتمكين الوظيفي", en: "Individual Career Coaching & Consultation" },
      subtitle: { ar: "تجاوز عقبات سوق العمل المحلي", en: "Navigate Local Economy Opportunities" },
      icon: HelpingHand,
      color: "from-amber-500 to-amber-600",
      accent: "text-amber-600",
      bgLight: "bg-amber-50/40",
      description: {
        ar: "خدمة إرشاد مهني فردية ترسم لك خريطة العبور إلى سوق العمل. نساعد خريجي الشمال والجنوب، الشباب، والبادية الأردنية في مواءمة مهاراتهم، واكتشاف ثغرات ملف الـ LinkedIn المهني بالشراكة مع الأخصائيين.",
        en: "Personalized mentorship targeting Jordan's complex market. We consult fresh graduates and young professional seekers in northern and southern governorates on structural alignment, LinkedIn visibility, and career strategies."
      },
      benefits: {
        ar: ["جلسات استشارة مخصصة مدتها 30 دقيقة مجاناً", "بناء خطة استقطاب وسيرة مهنية مخصصة بمفاتيح وظيفية فاعلة", "توجيه مهني خاص لفرص التشغيل المنزلي وريادة الأعمال MSMEs"],
        en: ["Completely free customized 30-minute mentoring consultations", "In-depth career alignment pathways and active keyword guides", "Dedicated guidance for home-based projects and MSME grants"]
      }
    },
    {
      id: "training_workshop" as const,
      title: { ar: "الورش والبرامج التدريبية لتنمية المهارات", en: "Target Livelihood Skills & Programs" },
      subtitle: { ar: "قاعات المفرق وإربد التدريبية والمختبرات", en: "Classrooms in Mafraq & Irbid Labs" },
      icon: GraduationCap,
      color: "from-slate-800 to-slate-900",
      accent: "text-slate-900",
      bgLight: "bg-slate-100/50",
      description: {
        ar: "فصول وتدريبات متطورة في مكاتبنا بالمفرق وإربد أو عن بُعد عبر الويب. تغطي مهارات إدارة وتحليل المشاريع التنموية، كورس كتابة مقترحات المشاريع التنموية والمقترحات التمويلية للجهات الدولية، وأدوات العمل الرقمية.",
        en: "Fully-equipped physical classrooms in Mafraq and Irbid or hybrid Web formats. We focus extensively on Project Management frameworks, grant proposal creation, community needs analysis, and key workplace computer tools."
      },
      benefits: {
        ar: ["شهادات حضور معتمدة وصادرة رسمياً عن المركز", "تطبيقات حية على أدوات الرصد والتقييم وتحليل الأثر المعاصر", "تحسين فرص الربط الفوري مع مشاريع تمكين المرأة والشباب"],
        en: ["Official accredited McCsd course completion credentials", "Practical applications on M&E software models", "Direct integration pipelines linking to international agency missions"]
      }
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-brand-blue text-xs font-black uppercase tracking-widest block mb-1">
          🤝 {isAr ? "خدماتنا الميدانية والتوجيهية" : "MCCSD Professional Footprint"}
        </span>
        <h3 className="text-2xl font-black text-brand-navy">
          {isAr ? "الخدمات المهنية والتمكين التنموي المباشر" : "Interactive Livelihood & Capacity Services"}
        </h3>
        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
          {isAr 
            ? "نحن لا نكتفي بإنشاء السير الذاتية؛ بل نسلحك بكافة المهارات والجاهزية لمواجهة المقابلات، ورسم سياقك المهني المتميز بخطوات عملية."
            : "Beyond CV scanning, we configure physical simulations, individual guidance blocks, and certified workshops in our governorate offices to boost your economic growth."}
        </p>
      </div>

      {/* Services Grid cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {servicesData.map((serv) => {
          const IconComponent = serv.icon;
          return (
            <div 
              key={serv.id} 
              className={`rounded-3xl border border-slate-150 p-6 flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300 ${serv.bgLight}`}
            >
              <div className="space-y-4">
                {/* Icon & Mini titles */}
                <div className="flex justify-between items-start">
                  <div className={`p-3 bg-gradient-to-br ${serv.color} text-white rounded-2xl shadow-xs`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans tracking-wide font-bold uppercase mt-1">
                    {serv.subtitle[lang]}
                  </span>
                </div>

                {/* Heading */}
                <div className="space-y-1">
                  <h4 className="text-base font-black text-brand-navy leading-snug">
                    {serv.title[lang]}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-650 leading-relaxed text-justify text-slate-600">
                  {serv.description[lang]}
                </p>

                {/* Benefits Bullet items */}
                <div className="space-y-2 pt-2">
                  <span className="block text-[10px] uppercase font-sans font-black text-slate-400 tracking-wider">
                    {isAr ? "ميزات الخدمة المكتسبة:" : "Key Deliverables & Value:"}
                  </span>
                  <ul className="space-y-2 text-xs">
                    {serv.benefits[lang].map((b, i) => (
                      <li key={i} className="flex gap-2 text-[11px] text-slate-700 leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action trigger button */}
              <div className="pt-6">
                <button
                  onClick={() => setActiveBooking(serv.id)}
                  className="w-full py-3 px-4 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isAr ? "احجز موعداً أو سجل اهتمامك" : "Secure Your Schedule / Register"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Form Overlay Dialog using Framer-style Motion */}
      <AnimatePresence>
        {activeBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBooking(null)}
              className="absolute inset-0 bg-black/50"
            />

            {/* Content sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-slate-100"
              style={{ direction: isAr ? "rtl" : "ltr" }}
            >
              {/* Header */}
              <div className="bg-brand-navy text-white p-6 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-base">
                    {activeBooking === "mock_interview" && (isAr ? "طلب جلسة محاكاة مقابلة عمل" : "Request Mock Panel Interview")}
                    {activeBooking === "career_coaching" && (isAr ? "طلب استشارة مهنية وتوجيه" : "Request Career Consultation Slot")}
                    {activeBooking === "training_workshop" && (isAr ? "سجل اهتمامك بالورش التدريبية" : "Workshop Course Pre-Registration")}
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-1">
                    {isAr 
                      ? "يرجى تقديم بياناتك وسيتابع معك منسق التوظيف بالمركز خلال 24 ساعة."
                      : "Provide credentials. MCCSD team will coordinate scheduling with you shortly."}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveBooking(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-sm font-sans"
                >
                  ×
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                
                {/* Save status notice */}
                {bookingStatus && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
                    bookingStatus === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" :
                    bookingStatus === "error" ? "bg-rose-50 text-rose-800 border border-rose-100" : "bg-blue-50 text-blue-800 border border-blue-100"
                  }`}>
                    {bookingStatus === "submitting" && <Clock className="w-4 h-4 animate-spin text-blue-600" />}
                    {bookingStatus === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    <div>
                      {bookingStatus === "submitting" && (isAr ? "جاري إرسال حجزك وقيده وقائع التوثيق..." : "Submitting inquiry to registry...")}
                      {bookingStatus === "success" && (isAr ? "تم تسجيل طلبك بنجاح! شكراً لاختيارك مركز مساواة." : "Inquiry registered successfully! Thank you.")}
                      {bookingStatus === "error" && (isAr ? "عذراً، لم نتمكن من الحفظ. يرجى مراجعة الحقول." : "Submitting failed. Please verify dates.")}
                    </div>
                  </div>
                )}

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? "الاسم الرباعي الكامل" : "Applicant Legitimate Name"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      placeholder={isAr ? "مثال: مروان يوسف الخالدي" : "E.g. Marwan Yusef Al-Khaldi"}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {isAr ? "البريد الإلكتروني" : "Email Address"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                        placeholder="username@mossawah.org"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-left"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {isAr ? "رقم الهاتف الفعال (WhatsApp)" : "WhatsApp Mobile Number"} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={e => setFormPhone(e.target.value)}
                        placeholder="0776XXXXXX"
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl outline-none focus:border-brand-blue text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? "التاريخ المقترح / توقيت الجلسة المناسب" : "Preferred Booking Date"} *
                    </label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={e => setFormDate(e.target.value)}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl outline-none focus:border-brand-blue font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {isAr ? "ملاحظات إضافية / المسمى الوظيفي والاحتياجات" : "Additional Brief / Specific Career Needs"}
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={e => setFormNotes(e.target.value)}
                      placeholder={isAr 
                        ? "أرغب في مقابلتي لوظيفة منسق برامج في المفرق باللغة العربية والإنجليزية..."
                        : "Highlight what specific role, NGO, or project certifications you are aiming to target..."}
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl outline-none focus:border-brand-blue leading-relaxed"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveBooking(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {isAr ? "إلغاء الموعد" : "Dismiss"}
                  </button>
                  <button
                    type="submit"
                    disabled={bookingStatus === "submitting"}
                    className="px-6 py-2.5 bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isAr ? "حجز وتأكيد" : "Confirm Slot Booking"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
