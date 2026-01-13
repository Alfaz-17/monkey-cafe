"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, IndianRupee } from "lucide-react";

// Business Level Definitions (Indian Market Optimized)
const BUSINESS_LEVELS = [
  { id: 'cafe', name: 'Small Café / QSR', range: [8000, 30000], multiplier: 0.6 },
  { id: 'qsr', name: 'Growing Restaurant', range: [30000, 75000], multiplier: 1 },
  { id: 'restaurant', name: 'Premium Restaurant', range: [75000, 140000], multiplier: 1.3 },
  { id: 'premium', name: 'Multi-Location Chain', range: [140000, 250000], multiplier: 1.7 },
];

// Feature Groups - Indian Market Pricing
const FEATURE_GROUPS = {
  menu: {
    name: "Menu & Ordering",
    features: [
      { id: 'qr_menu', name: 'QR Digital Menu', isMandatory: true, pricing: { cafe: 3000, qsr: 5000, restaurant: 7000, premium: 9000 } },
      { id: 'online_ordering', name: 'Online Ordering', isMandatory: false, pricing: { cafe: 4000, qsr: 6000, restaurant: 9000, premium: 12000 } },
      { id: 'ai_basic', name: 'AI Smart Recommendations', isMandatory: false, pricing: { cafe: 4000, qsr: 7000, restaurant: 10000, premium: 13000 } },
      { id: 'customization', name: 'Menu Customization', isMandatory: false, pricing: { cafe: 3000, qsr: 5000, restaurant: 8000, premium: 10000 } },
    ]
  },
  sales: {
    name: "Sales & Marketing",
    features: [
      { id: 'upsell', name: 'Smart Upselling', isMandatory: false, pricing: { cafe: 4000, qsr: 6000, restaurant: 9000, premium: 12000 } },
      { id: 'bestseller', name: 'Bestseller Badges', isMandatory: false, pricing: { cafe: 2000, qsr: 3000, restaurant: 5000, premium: 6000 } },
      { id: 'combos', name: 'Combo Deals', isMandatory: false, pricing: { cafe: 3000, qsr: 5000, restaurant: 7000, premium: 9000 } },
      { id: 'whatsapp', name: 'WhatsApp Notifications', isMandatory: false, pricing: { cafe: 2000, qsr: 3000, restaurant: 4000, premium: 5000 } },
    ]
  },
  operations: {
    name: "Kitchen & Operations",
    features: [
      { id: 'kitchen_display', name: 'Kitchen Display (KOT)', isMandatory: true, pricing: { cafe: 0, qsr: 18000, restaurant: 25000, premium: 32000 } },
      { id: 'auto_billing', name: 'Auto Billing & Invoicing', isMandatory: true, pricing: { cafe: 0, qsr: 20000, restaurant: 28000, premium: 35000 } },
      { id: 'gst_tax', name: 'GST Compliance', isMandatory: false, pricing: { cafe: 0, qsr: 8000, restaurant: 12000, premium: 15000 } },
      { id: 'payments', name: 'Payment Gateway Integration', isMandatory: false, pricing: { cafe: 0, qsr: 10000, restaurant: 15000, premium: 18000 } },
    ]
  },
  control: {
    name: "Analytics & Management",
    features: [
      { id: 'dashboard', name: 'Owner Dashboard', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 12000, premium: 18000 } },
      { id: 'reports', name: 'Sales Reports', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 10000, premium: 15000 } },
      { id: 'customer_data', name: 'Customer Database', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 8000, premium: 12000 } },
      { id: 'inventory', name: 'Inventory Tracking', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 15000, premium: 20000 } },
      { id: 'staff', name: 'Staff Management', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 10000, premium: 14000 } },
    ]
  },
  enterprise: {
    name: "Multi-Location Features",
    features: [
      { id: 'multi_branch', name: 'Multi-Branch Dashboard', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 0, premium: 30000 } },
      { id: 'central_reporting', name: 'Consolidated Reports', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 0, premium: 20000 } },
      { id: 'central_menu', name: 'Central Menu Control', isMandatory: false, pricing: { cafe: 0, qsr: 0, restaurant: 0, premium: 18000 } },
    ]
  },
};

// Capacity Multipliers
const getCapacityMultiplier = (tables: number) => {
  if (tables <= 5) return 0.8;
  if (tables <= 15) return 1;
  if (tables <= 30) return 1.2;
  if (tables <= 50) return 1.5;
  return 2;
};

export default function PricingEstimator() {
  const [businessLevel, setBusinessLevel] = useState('restaurant');
  const [tableCount, setTableCount] = useState(20);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['qr_menu', 'kitchen_display', 'auto_billing']);
  
  // AI Quiz State
  const [mode, setMode] = useState<'manual' | 'quiz'>('manual');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: '',
    volume: '',
    complexity: '',
    setup: ''
  });

  const quizQuestions = [
    {
        id: 'goal',
        question: "What is your primary goal?",
        options: [
            { label: "Increase Sales", value: 'sales', recommendations: ['upsell', 'ai_basic', 'bestseller'] },
            { label: "Improve Operations", value: 'ops', recommendations: ['kitchen_display', 'auto_billing', 'inventory'] },
            { label: "Expand & Scale", value: 'scale', recommendations: ['multi_branch', 'central_reporting', 'dashboard'] }
        ]
    },
    {
        id: 'volume',
        question: "Approximate daily order volume?",
        options: [
            { label: "Quick Service (High)", value: 'high', recommendations: ['whatsapp', 'auto_billing'] },
            { label: "Full Service (Medium)", value: 'medium', recommendations: ['customization', 'staff'] },
            { label: "Small / Minimal", value: 'low', recommendations: [] }
        ]
    },
    {
        id: 'complexity',
        question: "How do you manage taxes & payments?",
        options: [
            { label: "Need Full Automation", value: 'auto', recommendations: ['gst_tax', 'payments'] },
            { label: "Manual is Fine", value: 'manual', recommendations: [] }
        ]
    }
  ];

  const handleQuizAnswer = (value: string) => {
    const currentQuestion = quizQuestions[quizStep];
    const option = currentQuestion.options.find(o => o.value === value);
    
    // Add recommendations to selected features (excluding duplicates and mandatory)
    if (option?.recommendations) {
        setSelectedFeatures(prev => {
            const next = [...prev];
            option.recommendations.forEach(id => {
                if (!next.includes(id)) next.push(id);
            });
            return next;
        });
    }

    if (quizStep < quizQuestions.length - 1) {
        setQuizStep(prev => prev + 1);
    } else {
        setMode('manual');
        setQuizStep(0);
        // Scroll to results
        setTimeout(() => {
            document.getElementById('estimator-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  const toggleFeature = (featureId: string) => {
    // Prevent toggling mandatory features
    const allFeatures = Object.values(FEATURE_GROUPS).flatMap(g => g.features);
    const feature = allFeatures.find(f => f.id === featureId);
    if (feature?.isMandatory) return;

    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const { totalPrice, breakdown, recommendation } = useMemo(() => {
    let basePrice = 0;
    const featureBreakdown: Array<{name: string, price: number}> = [];

    // Calculate feature prices
    Object.values(FEATURE_GROUPS).forEach(group => {
      group.features.forEach(feature => {
        if (selectedFeatures.includes(feature.id)) {
          const price = feature.pricing[businessLevel as keyof typeof feature.pricing] || 0;
          if (price > 0) {
            basePrice += price;
            featureBreakdown.push({ name: feature.name, price });
          }
        }
      });
    });

    // Apply capacity multiplier
    const capacityMultiplier = getCapacityMultiplier(tableCount);
    const adjustedPrice = Math.round(basePrice * capacityMultiplier);

    // Generate recommendation
    const currentLevel = BUSINESS_LEVELS.find(l => l.id === businessLevel)!;
    let rec = "";
    if (adjustedPrice < currentLevel.range[0]) {
      rec = `This setup is light for a ${currentLevel.name}. Consider adding more features.`;
    } else if (adjustedPrice > currentLevel.range[1]) {
      rec = `This setup matches a higher business level. Great choice for scaling!`;
    } else {
      rec = `Perfect fit for ${currentLevel.name.toLowerCase()}.`;
    }

    return { totalPrice: adjustedPrice, breakdown: featureBreakdown, recommendation: rec };
  }, [businessLevel, tableCount, selectedFeatures]);

  return (
    <div id="estimator-root" className="max-w-5xl mx-auto scroll-mt-32">
      
      {/* Mode Toggle Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-zinc-100 p-1 rounded-2xl flex gap-1">
            <button 
                onClick={() => setMode('manual')}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'manual' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
                Manual Config
            </button>
            <button 
                onClick={() => {
                    setMode('quiz');
                    setQuizStep(0);
                }}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'quiz' ? 'bg-[#6F4E37] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
                ✨ AI Recommendation
            </button>
        </div>
      </div>

      {mode === 'quiz' ? (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#6F4E37]/10 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl shadow-[#6F4E37]/5"
        >
            <div className="mb-10 flex justify-center gap-2">
                {quizQuestions.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i <= quizStep ? 'w-8 bg-[#6F4E37]' : 'w-4 bg-zinc-100'}`} />
                ))}
            </div>

            <div className="max-w-lg mx-auto">
                <h3 className="text-2xl md:text-3xl font-black font-outfit mb-8 text-[#3E2723]">
                    {quizQuestions[quizStep].question}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {quizQuestions[quizStep].options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleQuizAnswer(option.value)}
                            className="w-full py-5 px-8 rounded-2xl bg-zinc-50 hover:bg-[#FAF7F2] border-2 border-transparent hover:border-[#6F4E37]/20 text-lg font-bold text-zinc-700 transition-all hover:scale-[1.02]"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={() => setMode('manual')}
                className="mt-12 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors"
            >
                Skip to manual configurator
            </button>
        </motion.div>
      ) : (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Business Level Selection - Cardless */}
            <div className="mb-12 md:mb-16">
        <label className="block text-base md:text-lg font-bold text-zinc-900 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F4E37] text-white text-sm font-black">1</span>
            Select Your Business Type
          </span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUSINESS_LEVELS.map(level => (
            <button
              key={level.id}
              onClick={() => setBusinessLevel(level.id)}
              className={`p-4 md:p-5 text-left transition-all relative overflow-hidden group ${
                businessLevel === level.id
                  ? 'bg-[#6F4E37] text-white shadow-lg'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-900 border border-zinc-200'
              }`}
            >
              <div className="relative z-10">
                <div className="font-bold text-base md:text-lg mb-1">{level.name}</div>
                <div className={`text-xs md:text-sm ${businessLevel === level.id ? 'text-white/80' : 'text-zinc-500'}`}>
                  ₹{(level.range[0] / 1000).toFixed(0)}k - ₹{(level.range[1] / 1000).toFixed(0)}k range
                </div>
              </div>
              {businessLevel === level.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity Slider - Minimalist */}
      <div className="mb-12 md:mb-16 pb-12 md:pb-16 border-b border-zinc-200">
        <label className="block text-base md:text-lg font-bold text-zinc-900 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F4E37] text-white text-sm font-black">2</span>
            Number of Tables
          </span>
        </label>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <input
              type="range"
              min="1"
              max="100"
              value={tableCount}
              onChange={(e) => setTableCount(Number(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-[#6F4E37]"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-2">
              <span>1-5</span>
              <span>50+</span>
            </div>
          </div>
          <div className="flex-shrink-0 min-w-[80px] text-right">
            <div className="text-3xl md:text-4xl font-black text-[#6F4E37]">{tableCount}</div>
            <div className="text-xs text-zinc-500">tables</div>
          </div>
        </div>
      </div>

      {/* Feature Groups - Clean List Design */}
      <div className="mb-12 md:mb-16">
        <label className="block text-base md:text-lg font-bold text-zinc-900 mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6F4E37] text-white text-sm font-black">3</span>
            Choose Your Features
          </span>
        </label>
        <div className="space-y-8 md:space-y-10">
          {Object.entries(FEATURE_GROUPS).map(([groupKey, group]) => (
            <div key={groupKey}>
              <h4 className="font-bold text-sm md:text-base text-zinc-700 mb-4 uppercase tracking-wider">{group.name}</h4>
              <div className="space-y-2">
                {group.features.map(feature => {
                  const price = feature.pricing[businessLevel as keyof typeof feature.pricing] || 0;
                  const isDisabled = price === 0;
                                    return (
                      <button
                        key={feature.id}
                        onClick={() => !isDisabled && toggleFeature(feature.id)}
                        disabled={isDisabled || feature.isMandatory}
                        className={`w-full p-4 md:p-5 text-left transition-all flex items-center justify-between group ${
                          isDisabled
                            ? 'bg-zinc-50 opacity-40 cursor-not-allowed'
                            : feature.isMandatory
                            ? 'bg-zinc-50 border-l-4 border-[#6F4E37]'
                            : selectedFeatures.includes(feature.id)
                            ? 'bg-green-50 border-l-4 border-green-500'
                            : 'bg-white hover:bg-zinc-50 border-l-4 border-transparent hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            feature.isMandatory
                              ? 'border-[#6F4E37] bg-[#6F4E37]'
                              : selectedFeatures.includes(feature.id) 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-zinc-300 group-hover:border-zinc-400'
                          }`}>
                            {(selectedFeatures.includes(feature.id) || feature.isMandatory) && (
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm md:text-base text-zinc-900">{feature.name}</span>
                            {feature.isMandatory && (
                              <span className="text-[9px] font-black uppercase tracking-widest text-[#6F4E37]">Included in Base System</span>
                            )}
                          </div>
                        </div>
                      {!isDisabled && (
                        <span className="text-sm md:text-base font-bold text-[#6F4E37]">+₹{(price / 1000).toFixed(0)}k</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Display - Bold & Clear */}
      <div id="estimator-results" className="bg-gradient-to-br from-zinc-900 via-[#3E2723] to-zinc-900 text-white p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6F4E37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="text-sm text-zinc-400 mb-2 uppercase tracking-wider">Total Investment</div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl md:text-7xl font-black font-outfit">₹{(totalPrice / 1000).toFixed(0)}k</span>
                <span className="text-base md:text-lg text-zinc-400">one-time</span>
              </div>
            </div>
            <a 
              href="https://wa.me/917285070757?text=Hi, I want to book a consultation for Media Masala."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-white text-zinc-900 px-8 py-4 font-bold text-base md:text-lg hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-xl group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Consultation
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Recommendation */}
          {totalPrice > 0 && (
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 mb-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm md:text-base mb-1">Recommendation</div>
                  <div className="text-xs md:text-sm text-zinc-300">{recommendation}</div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          {breakdown.length > 0 && (
            <div>
              <div className="text-xs md:text-sm font-bold text-zinc-400 mb-4 uppercase tracking-wider">Price Breakdown</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {breakdown.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex justify-between text-xs md:text-sm py-2 border-b border-white/10">
                    <span className="text-zinc-300">{item.name}</span>
                    <span className="text-white font-bold">₹{(item.price / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
              {breakdown.length > 6 && (
                <div className="text-xs text-zinc-400 italic mt-3">+{breakdown.length - 6} more features</div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )}
</div>
  );
}
