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
    <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-20 selection:bg-[#6F4E37]/10">
      <Navbar />
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Luxury Hero */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="h-px w-8 bg-[#6F4E37]/30"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#6F4E37]">The Investment Tiers</span>
            <div className="h-px w-8 bg-[#6F4E37]/30"></div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-black text-zinc-900 leading-[1.05] tracking-tight mb-8"
          >
            Pricing designed for <br className="hidden md:block" />
            <span className="text-[#6F4E37]">every restaurant.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed italic"
          >
            Plans start from <span className="text-[#6F4E37] font-black underline decoration-[#6F4E37]/20 underline-offset-8">₹10,000 per year</span>. Investment varies based on restaurant size, branding depth, and customization level.
          </motion.p>
        </div>

        {/* Discovery Quiz (Luxury Consultation Style) */}
        <div className="max-w-4xl mx-auto mb-32">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] border border-zinc-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] p-6 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F4E37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <AnimatePresence mode="wait">
                    {!isQuizComplete ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="relative z-10"
                        >
                            <div className="space-y-2 mb-12">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F4E37] opacity-60">Discovery Step 0{currentStep + 1}</div>
                                <VerticalCutReveal
                                  key={`q-${animationKey}`}
                                  splitBy="characters"
                                  staggerDuration={0.015}
                                  staggerFrom="first"
                                  transition={{ type: "spring", stiffness: 200, damping: 21 }}
                                  containerClassName="text-3xl font-black text-zinc-900"
                                >
                                  {quizSteps[currentStep].title}
                                </VerticalCutReveal>
                                <p className="text-zinc-500 font-medium">{quizSteps[currentStep].subtitle}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {quizSteps[currentStep].options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleNext(opt)}
                                        className="group p-5 md:p-8 rounded-[2rem] border border-zinc-100 hover:border-[#6F4E37]/40 hover:bg-[#6F4E37]/5 text-left transition-all duration-500 hover:shadow-xl hover:shadow-[#6F4E37]/5 flex gap-4 md:gap-6 items-center md:items-start"
                                    >
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100 group-hover:bg-[#6F4E37]/10 group-hover:border-[#6F4E37]/20 transition-colors">
                                            <opt.icon className="w-5 h-5 md:w-7 md:h-7 text-zinc-400 group-hover:text-[#6F4E37] transition-colors" />
                                        </div>
                                        <div>
                                            <div className="text-lg md:text-xl font-black text-zinc-900 mb-1 md:mb-2 group-hover:text-[#6F4E37] transition-colors">{opt.label}</div>
                                            <div className="text-xs md:text-sm text-zinc-400 font-medium">{opt.description}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center text-center max-w-4xl mx-auto"
                        >
                            {/* Formal Document Container */}
                            <div className="w-full bg-white rounded-[2rem] md:rounded-[3rem] border border-zinc-100 shadow-[0_50px_100px_rgba(0,0,0,0.04)] overflow-hidden relative mb-16">
                                {/* Letterhead Branding */}
                                <div className="bg-zinc-900 px-6 md:px-12 py-6 flex justify-between items-center text-white">
                                    <div className="flex flex-col items-start text-left">
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Proposed Architecture</div>
                                        <div className="font-outfit font-black text-xl italic text-[#D4A373]">Official Quotation</div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-[9px] font-black uppercase tracking-[0.2em]">{quoteId}</div>
                                        <div className="text-[9px] font-bold opacity-40">Valid: 14 Days</div>
                                    </div>
                                </div>
                                
                                <div className="p-6 md:p-20 flex flex-col items-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-50 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-6 md:mb-8 border border-zinc-100">
                                        <QrCode className="w-8 h-8 md:w-10 md:h-10 text-[#6F4E37] opacity-20" />
                                    </div>

                                    <h2 className="text-2xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tighter">Your Tailored Ecosystem.</h2>
                                    <p className="text-zinc-500 text-xs md:text-base font-medium mb-8 md:mb-12 max-w-sm mx-auto">Based on your operational profile, our analytics engine has generated the following specialized quotation.</p>

                                    <div className="w-full max-w-2xl bg-[#6F4E37]/5 px-4 md:px-12 py-8 md:py-12 rounded-[2rem] md:rounded-[2.5rem] border border-[#6F4E37]/10 mb-8 md:mb-12 relative overflow-hidden">
                                        {/* Verification Stamp */}
                                        <div className="absolute top-6 right-8 opacity-20 rotate-12 hidden md:block">
                                            <div className="border-4 border-[#6F4E37] rounded-full p-2 flex items-center justify-center">
                                                <div className="border-2 border-[#6F4E37] border-dashed rounded-full px-4 py-2 text-[10px] font-black text-[#6F4E37] uppercase">Verified Analytics</div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F4E37] mb-4">{analyticsCalculation?.plan.name} Package Configuration</div>
                                            <VerticalCutReveal
                                              key={`price-${analyticsCalculation?.plan.id}`}
                                              splitBy="characters"
                                              staggerDuration={0.03}
                                              containerClassName="text-4xl md:text-7xl font-black text-zinc-900 tracking-tighter mb-8"
                                            >
                                              {analyticsCalculation?.price || ""}
                                            </VerticalCutReveal>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-8 border-t border-[#6F4E37]/10">
                                                {analyticsCalculation?.breakdown.map((item, i) => (
                                                    <div key={i} className="text-center group">
                                                        <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-2 group-hover:text-[#6F4E37] transition-colors">{item.label}</div>
                                                        <div className="text-lg font-black text-zinc-900">{item.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center gap-6">
                                        <button 
                                            onClick={() => {
                                                const element = document.getElementById(analyticsCalculation?.plan.id || "");
                                                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            }}
                                            className="px-10 md:px-12 py-5 md:py-6 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">Authorized Selection</span>
                                            <div className="absolute inset-0 bg-[#6F4E37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        </button>
                                        <button 
                                            onClick={() => { setIsQuizComplete(false); setCurrentStep(0); setAnswers({}); }} 
                                            className="px-6 md:px-8 py-5 md:py-6 text-zinc-400 font-bold hover:text-zinc-900 transition-colors uppercase text-[10px] tracking-widest border-b-2 border-transparent hover:border-zinc-200"
                                        >
                                            Re-calculate Profile
                                        </button>
                                    </div>
                                </div>

                                {/* Formal footer */}
                                <div className="bg-zinc-50 border-t border-zinc-100 px-6 md:px-12 py-8 flex flex-wrap justify-center items-center gap-4 md:gap-6 opacity-40">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Enterprise Grade Architecture</span>
                                    </div>
                                    <div className="h-px w-8 bg-zinc-200 hidden md:block" />
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Hand-Crafted Configuration</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Real-World Premium Grid - Optimized for 2-Column Mobile */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 mb-32 max-w-6xl mx-auto px-2 md:px-0">
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
                className={`flex flex-col bg-white rounded-[2rem] md:rounded-[4rem] border border-zinc-100 overflow-hidden group hover:shadow-[0_40px_100px_rgba(0,0,0,0.04)] transition-all duration-700 h-full relative ${plan.recommended || isMatch ? 'ring-2 ring-[#6F4E37]/5 md:ring-1' : ''}`}
              >
                {/* Visual Badges */}
                <div className="absolute top-4 md:top-10 right-4 md:right-10 flex flex-col items-end gap-2">
                    {plan.recommended && !isMatch && (
                        <div className="px-2.5 md:px-6 py-1 md:py-2.5 bg-[#6F4E37] text-white text-[7px] md:text-xs font-black rounded-full uppercase tracking-widest shadow-xl">Best Value</div>
                    )}
                    {isMatch && (
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-2.5 md:px-6 py-1 md:py-2.5 bg-zinc-900 text-white text-[7px] md:text-xs font-black rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2"
                        >
                            <Check className="w-2 h-2 md:w-3 md:h-3" /> Profile Match
                        </motion.div>
                    )}
                </div>

              <div className="p-5 md:p-12 pb-0 md:pb-0">
                  <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <div className={`w-1.5 h-1.5 rounded-full ${plan.accent}`}></div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#6F4E37]">{plan.name}</span>
                  </div>
                  <h3 className="text-sm md:text-3xl font-black text-zinc-900 tracking-tight leading-tight mb-4 md:mb-4 h-8 md:h-auto overflow-hidden">{plan.fullName}</h3>
              </div>

              <div className="px-5 md:px-12 py-6 md:py-10 bg-[#FAFAFA]/50 border-y border-zinc-100/50 text-center md:text-left">
                  <div className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                    {isMatch ? "Your Precise Quote" : "Fixed Annual Quote"}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 justify-center md:justify-start">
                      <span className="text-xl md:text-5xl font-black text-zinc-900 tracking-tighter transition-all duration-1000">
                        {displayPrice}
                      </span>
                      <span className="text-[7px] md:text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em]">/ ANNUM</span>
                  </div>
              </div>

              <div className="p-5 md:p-12 space-y-8 md:space-y-12 flex-grow">
                  <div className="space-y-4">
                      <div className="text-[8px] md:text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                          <div className="h-px w-3 bg-zinc-200"></div> BEST FOR
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                          {plan.bestFor.map(item => (
                              <span key={item} className="text-[8px] md:text-xs font-bold text-zinc-500 bg-white border border-zinc-100 px-2.5 py-1 rounded-lg shadow-sm">{item}</span>
                          ))}
                      </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                      <div className="text-[8px] md:text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                        <div className="h-px w-3 bg-zinc-200"></div> DELIVERABLES
                      </div>
                      <ul className="space-y-3 md:space-y-4">
                          {plan.includes.slice(0, 4).map(item => (
                              <li key={item} className="flex items-center gap-3 md:gap-4 group/item">
                                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#6F4E37]/30 transition-all duration-300 group-hover/item:bg-[#6F4E37] group-hover/item:scale-150"></div>
                                  <span className="text-[10px] md:text-base text-zinc-600 font-semibold tracking-tight line-clamp-1 md:line-clamp-none">{item}</span>
                              </li>
                          ))}
                          {plan.includes.length > 4 && (
                              <li className="text-[8px] md:text-sm text-zinc-400 font-bold italic pl-4">+ and more in consultation</li>
                          )}
                      </ul>
                  </div>

                  <div className="pt-6 md:pt-10 mt-auto">
                      <Link 
                        href="/trial" 
                        className={`block w-full text-center py-4 md:py-7 rounded-xl md:rounded-[2rem] font-black uppercase text-[9px] md:text-xs tracking-[0.2em] transition-all active:scale-[0.98] ${plan.recommended || isMatch ? 'bg-[#6F4E37] text-white shadow-2xl shadow-[#6F4E37]/40 ring-4 ring-[#6F4E37]/10' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
                        >
                        {isMatch ? "Lock This Price" : "Select"}
                      </Link>
                  </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Why Range-Based? (Luxury Section) */}
        <div className="grid md:grid-cols-2 gap-20 items-center mb-32 p-12 md:p-24 bg-zinc-900 rounded-[4rem] text-white relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6F4E37] opacity-10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
             <div>
                <div className="text-[#6F4E37] font-black uppercase tracking-[0.4em] text-[10px] mb-6">THE PHILOSOPHY</div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight mb-8">Fairness through <span className="italic serif opacity-40">Precision.</span></h2>
                <div className="space-y-8">
                    {faqs.map((faq, i) => (
                        <div key={i} className="space-y-2 max-w-md">
                            <div className="text-zinc-400 font-black uppercase text-[10px] tracking-widest">Question {i+1}</div>
                            <div className="text-lg font-bold">"{faq.question}"</div>
                            <p className="text-zinc-500 font-medium text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
             </div>
             <div className="hidden md:flex flex-col gap-4">
                 <div className="p-8 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-xl">
                    <Utensils className="w-10 h-10 text-[#6F4E37] mb-6" />
                    <div className="text-2xl font-black mb-2">Hospitality First</div>
                    <p className="text-zinc-400 font-medium">We design for the bustle of the restaurant floor, not just the pixels of the screen.</p>
                 </div>
                 <div className="p-8 border border-white/10 rounded-[3rem] bg-white/5 backdrop-blur-xl translate-x-12">
                    <Globe className="w-10 h-10 text-[#6F4E37] mb-6" />
                    <div className="text-2xl font-black mb-2">Global Scale</div>
                    <p className="text-zinc-400 font-medium">From single bistros to multi-continental chains, our system adapts to your load.</p>
                 </div>
             </div>
        </div>

        {/* Final Luxury Call to Action */}
        <div className="text-center py-20 relative">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-12 tracking-tighter">Ready to Redefine Your Service?</h2>
            <Link 
                href="/trial" 
                className="inline-flex items-center gap-4 px-12 py-6 bg-[#6F4E37] text-white rounded-[2rem] font-black uppercase text-[10px] md:text-sm tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_rgba(111,78,55,0.3)] group"
            >
                Request Expert Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-10 text-[10px] font-black text-zinc-300 uppercase tracking-widest">Trusted by leading hospitality brands worldwide</div>
        </div>
      </div>
    </div>
  );
}
