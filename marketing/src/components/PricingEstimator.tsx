"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, Store, ChefHat, Building2, Crown, Factory, Gauge, Zap } from "lucide-react";

// --- Configuration ---

type BusinessLevel = 'cafe' | 'growing' | 'restaurant' | 'premium' | 'chain';

const BUSINESS_LEVELS: { id: BusinessLevel; label: string; icon: any; range: string; desc: string }[] = [
  { id: 'cafe', label: "Small Café", icon: Store, range: "₹10k - ₹50k", desc: "Single outlet, essential features" },
  { id: 'growing', label: "Growing Brand", icon: ChefHat, range: "₹30k - ₹1L", desc: "QSR / Expanding outlet" },
  { id: 'restaurant', label: "Full Service", icon: Building2, range: "₹1L - ₹2.5L", desc: "Fine dine, multiple tables" },
  { id: 'premium', label: "Premium / High Vol", icon: Crown, range: "₹2.5L - ₹5L", desc: "Complex operations, high footfall" },
  { id: 'chain', label: "Enterprise Chain", icon: Factory, range: "₹5L - ₹10L+", desc: "Multi-outlet, central control" },
];

interface Feature {
  id: string;
  label: string;
  prices: { [key in BusinessLevel]: number };
}

interface FeatureGroup {
  id: string;
  label: string;
  desc: string;
  features: Feature[];
  baseRequiredLevel?: BusinessLevel; // If set, this group is typical for this level+
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: "menu_ai",
    label: "Menu & AI Essentials",
    desc: "The digital foundation every business needs.",
    features: [
      { id: "qr_menu", label: "QR Digital Menu", prices: { cafe: 5000, growing: 6000, restaurant: 8000, premium: 10000, chain: 15000 } },
      { id: "online_ordering", label: "Online Ordering", prices: { cafe: 7000, growing: 9000, restaurant: 12000, premium: 15000, chain: 20000 } },
      { id: "ai_basic", label: "AI Foody (Basic)", prices: { cafe: 6000, growing: 8000, restaurant: 10000, premium: 14000, chain: 18000 } },
      { id: "ai_adv", label: "AI Foody (Advanced)", prices: { cafe: 12000, growing: 15000, restaurant: 18000, premium: 25000, chain: 30000 } },
    ]
  },
  {
    id: "sales",
    label: "Sales & Experience",
    desc: "Tools to increase average order value.",
    features: [
      { id: "smart_desc", label: "Smart Descriptions", prices: { cafe: 4000, growing: 5000, restaurant: 8000, premium: 12000, chain: 15000 } },
      { id: "combos", label: "Combo & Upsell Engine", prices: { cafe: 6000, growing: 8000, restaurant: 12000, premium: 16000, chain: 20000 } },
      { id: "bestseller", label: "Best-seller Highlight", prices: { cafe: 3000, growing: 4000, restaurant: 6000, premium: 8000, chain: 10000 } },
      { id: "whatsapp", label: "WhatsApp Alerts", prices: { cafe: 3000, growing: 4000, restaurant: 5000, premium: 6000, chain: 8000 } },
    ]
  },
  {
    id: "ops",
    label: "Operations & Automation",
    desc: "Streamline the kitchen and billing.",
    features: [
      { id: "kds", label: "Kitchen Display (KDS)", prices: { cafe: 25000, growing: 30000, restaurant: 35000, premium: 50000, chain: 80000 } },
      { id: "billing", label: "Automated Billing", prices: { cafe: 30000, growing: 35000, restaurant: 40000, premium: 60000, chain: 100000 } },
      { id: "gst", label: "GST & Tax Setup", prices: { cafe: 10000, growing: 12000, restaurant: 15000, premium: 20000, chain: 30000 } },
      { id: "payments", label: "Payment Integrations", prices: { cafe: 15000, growing: 18000, restaurant: 20000, premium: 30000, chain: 50000 } },
    ]
  },
  {
    id: "control",
    label: "Control & Analytics",
    desc: "For owners who want deep insights.",
    features: [
      { id: "dashboard", label: "Owner Dashboard", prices: { cafe: 15000, growing: 20000, restaurant: 25000, premium: 40000, chain: 70000 } },
      { id: "reports", label: "Sales Reports", prices: { cafe: 12000, growing: 15000, restaurant: 20000, premium: 35000, chain: 60000 } },
      { id: "customer_data", label: "CRM System", prices: { cafe: 10000, growing: 12000, restaurant: 15000, premium: 25000, chain: 40000 } },
      { id: "inventory", label: "Inventory Tracking", prices: { cafe: 20000, growing: 25000, restaurant: 30000, premium: 45000, chain: 75000 } },
    ]
  },
  {
    id: "enterprise",
    label: "Enterprise Scale",
    desc: "Multi-outlet power tools.",
    features: [
      { id: "multi_branch", label: "Multi-branch Control", prices: { cafe: 0, growing: 0, restaurant: 80000, premium: 100000, chain: 150000 } },
      { id: "central_reports", label: "Central Reports", prices: { cafe: 0, growing: 0, restaurant: 40000, premium: 50000, chain: 75000 } },
      { id: "workflows", label: "Custom Workflows", prices: { cafe: 0, growing: 0, restaurant: 50000, premium: 75000, chain: 100000 } },
    ]
  }
];

export default function PricingEstimator() {
  const [level, setLevel] = useState<BusinessLevel>('cafe');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(["qr_menu", "online_ordering", "ai_basic"]));
  const [capacityMul, setCapacityMul] = useState(1);

  // Helper to get total price
  const totalPrice = useMemo(() => {
    let total = 0;
    FEATURE_GROUPS.forEach(group => {
      group.features.forEach(feat => {
        if (selectedFeatures.has(feat.id)) {
           // If price is 0 for that level (e.g. enterprise features for small cafe), it just adds 0.
           total += feat.prices[level];
        }
      });
    });
    return Math.round(total * capacityMul);
  }, [level, selectedFeatures, capacityMul]);

  const toggleFeature = (id: string) => {
    const newSet = new Set(selectedFeatures);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedFeatures(newSet);
  };

  const currentLevelIndex = BUSINESS_LEVELS.findIndex(l => l.id === level);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-zinc-100 overflow-hidden">
      
      {/* Header / Level Selector */}
      <div className="bg-zinc-900 text-white p-8 md:p-12">
         <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-6 border border-white/10">
               <Zap className="w-4 h-4 text-amber-400" />
               <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">Fair Pricing Engine</span>
            </div>
            <h2 className="font-outfit font-black text-3xl md:text-5xl mb-4">You don't pay for what you don't use.</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
               Our pricing works like an electricity bill. A small cafe pays for small usage. A factory pays for factory usage. Transparent & Fair.
            </p>
         </div>

         {/* Level Slider */}
         <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {BUSINESS_LEVELS.map((bl, idx) => {
                  const Icon = bl.icon;
                  const isActive = level === bl.id;
                  return (
                     <button
                        key={bl.id}
                        onClick={() => setLevel(bl.id)}
                        className={`relative p-4 rounded-xl border transition-all duration-300 text-left group ${
                           isActive 
                             ? "bg-[#D4A373] border-[#D4A373] text-zinc-900 transform scale-105 shadow-xl shadow-black/20" 
                             : "bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800"
                        }`}
                     >
                        <Icon className={`w-8 h-8 mb-3 ${isActive ? "text-zinc-900" : "text-zinc-500"}`} />
                        <div className="font-black text-sm uppercase tracking-wide mb-1">{bl.label}</div>
                        <div className={`text-[10px] font-bold ${isActive ? "text-zinc-800/70" : "text-zinc-600"}`}>Range: {bl.range}</div>
                     </button>
                  );
               })}
            </div>
         </div>
         
         {/* Capacity Slider */}
         <div className="max-w-3xl mx-auto mt-12 bg-zinc-800/50 p-6 rounded-2xl border border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                    <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-5 h-5 text-zinc-400" />
                        <h4 className="font-bold text-lg">Capacity & Volume</h4>
                    </div>
                    <p className="text-zinc-400 text-sm">More tables = Higher utility. Adjust to see impact.</p>
                </div>
                <div className="flex-1 w-full md:max-w-xs flex items-center gap-4">
                    <span className="text-xs font-bold text-zinc-500">Low</span>
                    <input 
                        type="range" 
                        min="0.8" 
                        max="1.5" 
                        step="0.1" 
                        value={capacityMul}
                        onChange={(e) => setCapacityMul(parseFloat(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#D4A373]"
                    />
                    <span className="text-xs font-bold text-zinc-500">High</span>
                </div>
            </div>
         </div>
      </div> 

      <div className="grid grid-cols-1 lg:grid-cols-3">
         
         {/* Feature Selection */}
         <div className="lg:col-span-2 p-8 md:p-12 bg-zinc-50 space-y-12">
            
            {FEATURE_GROUPS.map((group) => (
               <div key={group.id}>
                  <div className="mb-6">
                     <h3 className="font-outfit font-black text-xl text-zinc-900">{group.label}</h3>
                     <p className="text-zinc-500 text-sm">{group.desc}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {group.features.map((feat) => {
                        const price = feat.prices[level];
                        const isSelected = selectedFeatures.has(feat.id);
                        const isAvailable = price > 0;
                        
                        return (
                           <button
                              key={feat.id}
                              draggable="false"
                              onClick={() => isAvailable && toggleFeature(feat.id)}
                              className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                                 !isAvailable ? "opacity-40 cursor-not-allowed bg-zinc-100 border-zinc-200" :
                                 isSelected 
                                    ? "bg-white border-zinc-900 shadow-md ring-1 ring-zinc-900" 
                                    : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm"
                              }`}
                           >
                              <div className="flex items-center gap-3">
                                 <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    isSelected ? "bg-zinc-900 border-zinc-900" : "border-zinc-300"
                                 }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                 </div>
                                 <span className={`font-bold text-sm ${isSelected ? "text-zinc-900" : "text-zinc-600"}`}>
                                    {feat.label}
                                 </span>
                              </div>
                              {isAvailable && (
                                <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
                                   +₹{(price/1000).toFixed(0)}k
                                </span>
                              )}
                           </button>
                        );
                     })}
                  </div>
               </div>
            ))}
         </div>

         {/* Sticky Estimator Sidebar */}
         <div className="bg-white border-t lg:border-t-0 lg:border-l border-zinc-200 p-8 md:p-12 sticky bottom-0 lg:sticky lg:top-0 h-fit lg:min-h-full flex flex-col">
            <div className="mb-8">
               <h3 className="font-outfit font-black text-2xl mb-2">Estimated Investment</h3>
               <p className="text-zinc-500 text-sm">One-time setup & license fee.</p>
            </div>

            <div className="flex-1 flex flex-col justify-center mb-8">
               <div className="relative">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={totalPrice}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="font-outfit font-black text-6xl text-zinc-900 tracking-tighter"
                     >
                        ₹{(totalPrice).toLocaleString()}
                     </motion.div>
                  </AnimatePresence>
                  
                  {/* Gauge Visualization */}
                  <div className="mt-8">
                     <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400 mb-2">
                        <span>Cafe</span>
                        <span>Enterprise</span>
                     </div>
                     <div className="h-3 bg-zinc-100 rounded-full overflow-hidden relative">
                        {/* Background Zones */}
                        <div className="absolute inset-0 flex">
                            <div className="flex-1 bg-green-500/20" />
                            <div className="flex-1 bg-yellow-500/20" />
                            <div className="flex-1 bg-red-500/20" />
                        </div>
                        {/* Indicator */}
                        <motion.div 
                           className="absolute top-0 bottom-0 w-2 bg-zinc-900 rounded-full shadow-lg"
                           animate={{ 
                              left: `${Math.min(Math.max((totalPrice / 1000000) * 100, 0), 98)}%` 
                           }}
                           transition={{ type: "spring", stiffness: 100 }}
                        />
                     </div>
                     <div className="mt-4 flex gap-2 items-center text-xs text-zinc-500 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <p>This is an estimate. Final pricing adjusts based on table count & exact requirements.</p>
                     </div>
                  </div>
            </div>
            
            <div className="mt-8 space-y-4">
               <button className="w-full bg-[#6F4E37] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#5D4030] transition-all shadow-xl shadow-[#6F4E37]/20 hover:shadow-2xl hover:scale-[1.02] active:scale-95">
                  Book Free Consultation
               </button>
               <p className="text-center text-xs text-zinc-400 font-medium">
                  Matches your level: <span className="text-zinc-900 font-bold">{BUSINESS_LEVELS[currentLevelIndex].label}</span>
               </p>
            </div>
         </div>
      </div>
    </div>
    </div>
  );
}
