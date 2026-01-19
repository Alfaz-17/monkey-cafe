"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, Utensils, Store, Building, Globe, ArrowRight, RefreshCcw, Sparkles, Minus, Check, ShieldCheck, QrCode } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import Navbar from "@/components/Navbar";

const plans = [
  {
    id: "basic",
    name: "Starter",
    fullName: "Basics to get you started",
    price: "₹10k – ₹25k",
    period: "PER YEAR",
    purpose: "Essential digital menu",
    color: "text-zinc-500",
    accent: "bg-[#6F4E37]",
    border: "border-zinc-200/60",
    shadow: "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    bestFor: ["Small Restaurants", "Cafés", "Kiosks"],
    includes: [
      "Your Branded QR Menu",
      "Easy Management",
      "High-Speed Setup",
      "Daily Sales Reports",
      "Regular Support",
    ],
    variesOn: ["Menu Size", "Number of Items"],
  },
  {
    id: "comfort",
    name: "Growing",
    fullName: "For busy restaurants",
    price: "₹30k – ₹60k",
    period: "PER YEAR",
    purpose: "Comfortable guest experience",
    color: "text-zinc-800",
    accent: "bg-[#6F4E37]",
    border: "border-zinc-300",
    shadow: "shadow-[0_20px_50px_rgba(111,78,55,0.05)]",
    bestFor: ["Family Dining", "Large Cafés", "Bistros"],
    includes: [
      "Everything in Starter",
      "Custom Family Layout",
      "Large Menu Support",
      "Better Order Flow",
      "Priority Support",
    ],
    variesOn: ["Custom Design", "Guest Volume"],
  },
  {
    id: "smart",
    name: "Pro",
    fullName: "For premium dining",
    price: "₹80k – ₹1.4L",
    period: "PER YEAR",
    purpose: "Premium brand experience",
    color: "text-[#6F4E37]",
    accent: "bg-[#6F4E37]",
    border: "border-[#6F4E37]/30",
    shadow: "shadow-[0_32px_64px_rgba(111,78,55,0.1)]",
    recommended: true,
    bestFor: ["Fine Dining", "Luxury Venues", "Busy Areas"],
    includes: [
      "Everything in Growing",
      "Luxury Design & Motion",
      "Advanced Sales Insights",
      "Predictive Ordering",
      "Dedicated Manager",
    ],
    variesOn: ["Custom Animations", "Extra Features"],
  },
  {
    id: "premium",
    name: "Group",
    fullName: "For large brands",
    price: "₹1.8L – ₹3L+",
    period: "PER YEAR",
    purpose: "Multi-location control",
    color: "text-zinc-900",
    accent: "bg-zinc-900",
    border: "border-zinc-900/10",
    shadow: "shadow-[0_48px_100px_rgba(0,0,0,0.08)]",
    bestFor: ["Hotels", "National Chains", "Large Groups"],
    includes: [
      "Everything in Pro",
      "All-Brand Control",
      "Unlimited Themes",
      "Business Strategy Help",
      "On-Site Training",
    ],
    variesOn: ["Number of Outlets", "Custom Needs"],
  },
];

const faqs = [
  {
    question: "The philosophy behind range-based pricing?",
    answer: "Crafting a digital experience is not one-size-fits-all. A boutique café with 15 signature items requires a different investment level than an enterprise with a multi-cuisine, multi-lingual portfolio. Our ranges ensure precision in value.",
  },
  {
    question: "Establishing the final investment level?",
    answer: "We conduct a digital audit of your current menu complexity, expected guest load, and brand objectives. This allows us to provide a fixed annual quote that fits perfectly within your chosen tier's range.",
  },
  {
    question: "Annual vs. Subscription models?",
    answer: "True hospitality excellence requires consistency. Our annual model guarantees continuous uptime, proactive updates, and dedicated strategic support, allowing you to focus on your guests while we handle the intelligence.",
  },
];

const quizSteps = [
  {
    id: "type",
    title: "What is your business model?",
    subtitle: "Different service models require specialized ordering flows.",
    options: [
      { id: "cafe", label: "Cafe / Bakery", description: "Quick service, over-the-counter", score: 1, base: 12000, icon: Store },
      { id: "restaurant", label: "Full Restaurant", description: "Table service, complex menu", score: 2, base: 42000, icon: Utensils },
      { id: "luxury", label: "Fine Dining", description: "Upscale service, brand focused", score: 3, base: 92000, icon: Sparkles },
      { id: "group", label: "Multi-Unit Group", description: "Centralized multi-brand control", score: 4, base: 175000, icon: Building },
    ],
  },
  {
    id: "size",
    title: "How deep is your menu?",
    subtitle: "The number of categories and items impacts system load.",
    options: [
      { id: "small", label: "Small Menu", description: "Under 50 items", score: 1, multiplier: 1, icon: RefreshCcw },
      { id: "medium", label: "Medium Menu", description: "50 to 150 items", score: 2, multiplier: 1.2, icon: Utensils },
      { id: "large", label: "Large Menu", description: "Over 150 items", score: 3, multiplier: 1.5, icon: Globe },
    ],
  },
  {
    id: "capacity",
    title: "How big is your place?",
    subtitle: "Seating capacity helps us understand your daily load.",
    options: [
      { id: "small", label: "Up to 10 Tables", description: "Small place or kiosk", score: 1, surcharge: 0, icon: Store },
      { id: "mid", label: "10 - 40 Tables", description: "Standard mid-sized place", score: 2, surcharge: 15000, icon: Utensils },
      { id: "large", label: "40+ Tables", description: "Large restaurant", score: 3, surcharge: 38000, icon: Building },
    ],
  },
];

// Modern Animation Variants
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [quoteId] = useState(() => `MS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);

  const analyticsCalculation = useMemo(() => {
    if (!isQuizComplete) return null;
    
    const typeOpt = quizSteps[0].options.find(o => o.id === answers.type) as any;
    const sizeOpt = quizSteps[1].options.find(o => o.id === answers.size) as any;
    const capacityOpt = quizSteps[2].options.find(o => o.id === answers.capacity) as any;

    const baseCost = typeOpt?.base || 0;
    const multiplier = sizeOpt?.multiplier || 1;
    const surcharge = capacityOpt?.surcharge || 0;

    const total = Math.round((baseCost * multiplier) + surcharge);
    const totalScore = Object.values(answers).reduce((a: any, b: any) => a + (b.score || 0), 0);
    
    let plan = plans[3];
    if (totalScore <= 4) plan = plans[0];
    else if (totalScore <= 6) plan = plans[1];
    else if (totalScore <= 8) plan = plans[2];

    return {
      price: `₹${(total / 1000).toFixed(1)}k`,
      exact: total,
      plan,
      breakdown: [
        { label: "Base Price", value: `₹${(baseCost / 1000).toFixed(0)}k` },
        { label: "Menu Size", value: `${multiplier}x` },
        { label: "Location Size", value: `+₹${(surcharge / 1000).toFixed(0)}k` }
      ]
    };
  }, [answers, isQuizComplete]);

  const handleNext = (opt: any) => {
    const newAnswers = { ...answers, [quizSteps[currentStep].id]: opt.id, [`${quizSteps[currentStep].id}_full`]: opt };
    setAnswers(newAnswers);
    setAnimationKey(prev => prev + 1);
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-20 md:pt-24 pb-16 md:pb-20 selection:bg-[#6F4E37]/10 overflow-x-hidden relative">
      {/* Layered Modern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6F4E37]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4A373]/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] bg-[#6F4E37]/3 rounded-full blur-[100px]" />
      </div>

      <Navbar />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Luxury Hero - Modern Elevation */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6 md:mb-8 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full border border-zinc-200/50 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#6F4E37]" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-[#6F4E37]">The Investment Tiers</span>
            <Sparkles className="w-3 h-3 text-[#6F4E37]" />
          </motion.div>
          
          <div className="relative">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-8xl font-black text-zinc-900 leading-tight md:leading-[1.05] tracking-tight mb-6 md:mb-8"
            >
                Simple, transparent <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6F4E37] to-[#A68966]">investment plans.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed"
          >
            Built for scale. Choose a plan that matches your current rhythm, or use our analytics engine for a precise configuration.
          </motion.p>
        </div>

        {/* Discovery Quiz (Luxury Consultation Style) - Modern Glass Elevation */}
        <div className="max-w-4xl mx-auto mb-20 md:mb-32 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6F4E37]/20 to-[#A68966]/20 rounded-[2rem] md:rounded-[3.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] p-4 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6F4E37]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <AnimatePresence mode="wait">
                    {!isQuizComplete ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, scale: 0.98, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.02, x: -20 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="relative z-10"
                        >
                            <div className="space-y-1 mb-10 md:mb-12">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F4E37] bg-[#6F4E37]/5 w-fit px-3 py-1 rounded-full mb-4">Step 0{currentStep + 1} of 03</div>
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 leading-tight tracking-tight">
                                  {quizSteps[currentStep].title}
                                </h2>
                                <p className="text-sm md:text-base text-zinc-500 font-medium">{quizSteps[currentStep].subtitle}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                                {quizSteps[currentStep].options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleNext(opt)}
                                        className="group p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-zinc-100 bg-white/50 hover:bg-white hover:border-[#6F4E37]/30 text-left transition-all duration-500 hover:shadow-2xl hover:shadow-[#6F4E37]/10 flex gap-4 md:gap-6 items-center md:items-start"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100 group-hover:bg-[#6F4E37]/10 group-hover:border-[#6F4E37]/20 group-hover:scale-110 transition-all duration-500">
                                            <opt.icon className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 group-hover:text-[#6F4E37] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-lg md:text-xl font-black text-zinc-900 mb-0.5 md:mb-2 group-hover:text-[#6F4E37] transition-colors">{opt.label}</div>
                                            <div className="text-[10px] md:text-sm text-zinc-400 font-medium leading-relaxed">{opt.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center text-center max-w-4xl mx-auto"
                        >
                            {/* Formal Document Container - Enhanced Physicality */}
                            <div className="w-full bg-white rounded-2xl md:rounded-[3rem] border border-zinc-100 shadow-[0_50px_100px_rgba(0,0,0,0.08)] overflow-hidden relative mb-10 md:mb-16 transform-gpu rotate-[-0.5deg]">
                                {/* Letterhead Branding */}
                                <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 px-6 md:px-12 py-5 md:py-8 flex justify-between items-center text-white">
                                    <div className="flex flex-col items-start text-left">
                                        <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#6F4E37] mb-1">Architecture Proposal</div>
                                        <div className="font-outfit font-black text-lg md:text-2xl italic tracking-tight">Official Quotation</div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">REF: {quoteId}</div>
                                        <div className="text-[8px] md:text-[9px] font-bold text-[#D4A373]">Valid for 14 Days</div>
                                    </div>
                                </div>
                                
                                <div className="p-8 md:p-24 flex flex-col items-center relative overflow-hidden">
                                    {/* Watermark Decoration */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none opacity-[0.03]">
                                        <QrCode className="w-[400px] h-[400px]" />
                                    </div>

                                    <motion.div 
                                        {...floatingAnimation}
                                        className="w-16 h-16 md:w-24 md:h-24 bg-zinc-50 rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 border border-zinc-100 shadow-sm relative z-10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#6F4E37]/10 to-transparent rounded-inherit" />
                                        <QrCode className="w-8 h-8 md:w-12 md:h-12 text-[#6F4E37] relative z-10" />
                                    </motion.div>

                                    <h2 className="text-3xl md:text-6xl font-black text-zinc-900 mb-2 md:mb-4 tracking-tight relative z-10 leading-none">Your Tailored Quote.</h2>
                                    <p className="text-zinc-500 text-sm md:text-lg font-medium mb-10 md:mb-16 max-w-md mx-auto relative z-10">Our engine has computed a specialized plan for your operational profile.</p>

                                    <div className="w-full max-w-2xl bg-gradient-to-b from-[#6F4E37]/5 to-white/30 px-6 md:px-12 py-10 md:py-14 rounded-[2.5rem] border border-[#6F4E37]/10 mb-10 md:mb-16 relative overflow-hidden shadow-inner backdrop-blur-sm">
                                        <div className="flex flex-col items-center">
                                            <div className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-[#6F4E37] mb-4">{analyticsCalculation?.plan.name} Configuration</div>
                                            <div className="text-5xl md:text-8xl font-black text-zinc-900 tracking-tighter mb-8 transition-all hover:scale-105 duration-500">
                                              {analyticsCalculation?.price || ""}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full pt-10 border-t border-[#6F4E37]/10">
                                                {analyticsCalculation?.breakdown.map((item, i) => (
                                                    <div key={i} className="text-center group flex md:flex-col items-center justify-between md:justify-center">
                                                        <div className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none md:mb-3 group-hover:text-[#6F4E37] transition-colors">{item.label}</div>
                                                        <div className="text-base md:text-xl font-black text-zinc-900">{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full relative z-10">
                                        <button 
                                            onClick={() => {
                                                const element = document.getElementById(analyticsCalculation?.plan.id || "");
                                                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                            className="w-full md:w-auto px-12 md:px-16 py-5 md:py-7 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-[1.03] active:scale-95 transition-all shadow-2xl hover:shadow-zinc-900/40"
                                        >
                                            View Package Details
                                        </button>
                                        <button 
                                            onClick={() => { setIsQuizComplete(false); setCurrentStep(0); setAnswers({}); }} 
                                            className="w-full md:w-auto px-8 py-5 md:py-7 text-zinc-400 font-bold hover:text-zinc-900 transition-colors uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 group"
                                        >
                                            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                                            Recalculate
                                        </button>
                                    </div>
                                </div>

                                {/* Formal footer - High Contrast */}
                                <div className="bg-zinc-50/80 backdrop-blur-md border-t border-zinc-200/50 px-6 md:px-12 py-8 md:py-10 flex flex-wrap justify-center items-center gap-6 md:gap-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shadow-inner">
                                            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-600">Enterprise Grade Architecture</span>
                                    </div>
                                    <div className="hidden md:block h-6 w-[1px] bg-zinc-200" />
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center shadow-lg">
                                            <Check className="w-3.5 h-3.5 text-[#D4A373]" />
                                        </div>
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-900">Hand-Crafted Configuration</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Real-World Premium Grid - Modern Cards Elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            const isMatch = analyticsCalculation?.plan.id === plan.id;
            const displayPrice = isMatch ? analyticsCalculation.price : plan.price;

            return (
              <motion.div
                id={plan.id}
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className={`flex flex-col bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-zinc-100 overflow-hidden group hover:shadow-[0_80px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 h-full relative ${plan.recommended || isMatch ? 'ring-2 ring-[#6F4E37]/20 shadow-[0_40px_80px_-15px_rgba(111,78,55,0.15)]' : 'hover:border-[#6F4E37]/30'}`}
              >
                {/* Visual Badges - Modern High Contrast */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10">
                    {plan.recommended && !isMatch && (
                        <div className="px-4 py-1.5 bg-[#6F4E37] text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">Recommended</div>
                    )}
                    {isMatch && (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-4 py-1.5 bg-zinc-900 text-white text-[9px] font-black rounded-full uppercase tracking-widest flex items-center gap-2 shadow-2xl"
                        >
                            <Sparkles className="w-3 h-3 text-[#D4A373]" /> Best Match
                        </motion.div>
                    )}
                </div>

              <div className="p-8 md:p-12 pb-6 relative relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                      <div className={`w-2 h-2 rounded-full ${plan.accent} shadow-sm group-hover:scale-150 transition-transform duration-500`}></div>
                      <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#6F4E37]">{plan.name}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight leading-none mb-2">{plan.fullName}</h3>
                  <div className="text-[10px] font-bold text-zinc-400/80 uppercase tracking-widest">{plan.purpose}</div>
              </div>

              <div className="px-8 md:px-12 py-8 bg-zinc-50/50 border-y border-zinc-100/50 group-hover:bg-white transition-colors duration-700">
                  <div className="text-[9px] font-black text-[#6F4E37]/40 uppercase tracking-[0.3em] mb-2 px-1">Annual Investment</div>
                  <div className="flex items-baseline gap-2">
                      <span className={`text-3xl md:text-4xl font-black ${isMatch ? 'text-[#6F4E37]' : 'text-zinc-900'} tracking-tighter`}>
                        {displayPrice}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">/ YEAR</span>
                  </div>
              </div>

              <div className="p-8 md:p-12 space-y-10 flex-grow relative z-10">
                  <div className="space-y-4">
                      <div className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-4">OPTIMAL FOR</div>
                      <div className="flex flex-wrap gap-2">
                          {plan.bestFor.map(item => (
                              <span key={item} className="text-[9px] md:text-[10px] font-black text-zinc-600 bg-white border border-zinc-100 px-3 py-1.5 rounded-xl shadow-sm hover:border-[#6F4E37]/30 transition-colors uppercase tracking-widest cursor-default">{item}</span>
                          ))}
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-4">SYSTEM DELIVERABLES</div>
                      <ul className="space-y-4">
                          {plan.includes.map(item => (
                              <li key={item} className="flex items-start gap-4 group/item">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#6F4E37]/20 mt-1.5 group-hover/item:bg-[#6F4E37] group-hover/item:scale-125 transition-all duration-300"></div>
                                  <span className="text-sm md:text-base text-zinc-600 font-semibold tracking-tight leading-snug group-hover/item:text-zinc-900 transition-colors">{item}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="pt-10 mt-auto">
                      <Link 
                        href="/trial" 
                        className={`block w-full text-center py-5 md:py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-95 shadow-xl ${plan.recommended || isMatch ? 'bg-[#6F4E37] text-white shadow-[#6F4E37]/20 hover:shadow-[#6F4E37]/40' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/10 hover:shadow-zinc-900/30'}`}
                        >
                        {isMatch ? "Authorize This Price" : "Initiate Setup"}
                      </Link>
                  </div>
              </div>

              {/* Decorative Subtle Gradient Background on Group Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6F4E37]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
            );
          })}
        </div>

        {/* Why Range-Based? (Luxury Section) - Mobile Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32 p-8 md:p-24 bg-zinc-900 rounded-[2rem] md:rounded-[4rem] text-white relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6F4E37] opacity-10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                <div className="text-[#6F4E37] font-black uppercase tracking-[0.4em] text-[10px] mb-6">THE PHILOSOPHY</div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight mb-8">Fairness through <span className="italic serif opacity-40">Precision.</span></h2>
                <div className="space-y-8 md:space-y-12">
                    {faqs.map((faq, i) => (
                        <div key={i} className="space-y-2 max-w-md">
                            <div className="text-zinc-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                              <span className="text-[#6F4E37]">0{i+1}</span> Question
                            </div>
                            <div className="text-lg md:text-xl font-bold">"{faq.question}"</div>
                            <p className="text-zinc-400 font-medium text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
             </div>
             <div className="flex flex-col gap-6 relative z-10">
                 <div className="p-8 border border-white/10 rounded-2xl md:rounded-[3rem] bg-white/5 backdrop-blur-xl">
                    <Utensils className="w-8 h-8 text-[#6F4E37] mb-6" />
                    <div className="text-xl md:text-2xl font-black mb-2">Hospitality First</div>
                    <p className="text-zinc-400 text-sm font-medium">Built for the restaurant floor, ensuring speed and clarity when things get busy.</p>
                 </div>
                 <div className="p-8 border border-white/10 rounded-2xl md:rounded-[3rem] bg-white/5 backdrop-blur-xl lg:translate-x-12">
                    <Globe className="w-8 h-8 text-[#6F4E37] mb-6" />
                    <div className="text-xl md:text-2xl font-black mb-2">Cloud Infrastructure</div>
                    <p className="text-zinc-400 text-sm font-medium">Lightning-fast performance powered by enterprise-grade server architecture.</p>
                 </div>
             </div>
        </div>

        {/* Final Luxury Call to Action - Mobile Optimized */}
        <div className="text-center py-12 md:py-20 relative px-4">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-8 md:mb-12 tracking-tight">Ready to transform?</h2>
            <Link 
                href="/trial" 
                className="inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 bg-[#6F4E37] text-white rounded-xl md:rounded-[2rem] font-black uppercase text-[10px] md:text-sm tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#6F4E37]/30 group w-full md:w-auto justify-center"
            >
                Launch Your System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-8 text-[9px] font-black text-zinc-300 uppercase tracking-widest leading-relaxed">
              Standard 24-hour setup window for basic plans <br className="md:hidden" /> • Verified Hospitality Tech
            </div>
        </div>
      </div>
    </div>
  );
}
