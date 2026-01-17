"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Calendar, Phone, Store, Clock, MapPin, User } from "lucide-react";

export default function TrialForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    restaurantName: "",
    contactNumber: "",
    location: "",
    preferredDate: "",
    preferredTime: ""
  });

  // Generate time slots with 30-minute intervals (9 AM to 8 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 20 && minute === 30) break;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        slots.push({ value: time, label: `${displayHour}:${minute.toString().padStart(2, '0')} ${period}` });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Combine date and time for submission
    const submissionData = {
      ...formData,
      preferredTime: `${formData.preferredDate} at ${formData.preferredTime}`
    };
    
    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again later.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-6 border border-zinc-100"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-zinc-900">Request Received!</h3>
          <p className="text-zinc-500 font-medium">
            Hi <span className="text-[#6F4E37] font-bold">{formData.name}</span>, our team will contact you shortly on <span className="text-[#6F4E37] font-bold">{formData.contactNumber}</span> to set up your 7-day trial.
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="text-sm font-bold text-[#6F4E37] hover:underline"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-transparent md:bg-white p-2 md:p-10 rounded-3xl md:shadow-xl md:border md:border-zinc-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#6F4E37]/5 rounded-bl-[100px] -z-0 hidden md:block" />
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'name' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Your Name <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform -translate-y-1' : ''}`}>
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <input
                required
                type="text"
                placeholder="e.g. Rajesh Kumar"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Restaurant Name Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'restaurantName' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Restaurant / Cafe Name <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'restaurantName' ? 'transform -translate-y-1' : ''}`}>
              <Store className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'restaurantName' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <input
                required
                type="text"
                placeholder="e.g. The Saffron Kitchen"
                onFocus={() => setFocusedField('restaurantName')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium"
                value={formData.restaurantName}
                onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
              />
            </div>
          </div>

          {/* Contact Number Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'contactNumber' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Contact Number <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'contactNumber' ? 'transform -translate-y-1' : ''}`}>
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'contactNumber' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <input
                required
                type="tel"
                placeholder="e.g. 9876543210"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
                maxLength={10}
                onFocus={() => setFocusedField('contactNumber')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium"
                value={formData.contactNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, contactNumber: value });
                }}
              />
            </div>
          </div>

          {/* Location Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'location' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Location <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'location' ? 'transform -translate-y-1' : ''}`}>
              <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'location' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <input
                required
                type="text"
                placeholder="e.g. Mumbai, Maharashtra"
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          {/* Preferred Date Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'preferredDate' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Preferred Date <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'preferredDate' ? 'transform -translate-y-1' : ''}`}>
              <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'preferredDate' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <input
                required
                type="date"
                min={getMinDate()}
                onFocus={() => setFocusedField('preferredDate')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              />
            </div>
          </div>

          {/* Preferred Time Slot Field */}
          <div>
            <label className={`block text-left text-[11px] font-black uppercase tracking-[0.15em] mb-2.5 transition-colors duration-300 ${focusedField === 'preferredTime' ? 'text-[#3E2723]' : 'text-zinc-500'}`}>
              Preferred Time <span className="text-red-500 font-black">*</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'preferredTime' ? 'transform -translate-y-1' : ''}`}>
              <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'preferredTime' ? 'text-[#6F4E37]' : 'text-zinc-400'}`} />
              <select
                required
                onFocus={() => setFocusedField('preferredTime')}
                onBlur={() => setFocusedField(null)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#6F4E37]/10 focus:border-[#6F4E37] transition-all font-medium appearance-none cursor-pointer"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.label}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          disabled={status === "submitting"}
          type="submit"
          className="w-full bg-[#6F4E37] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#5A3E2B] transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-[#6F4E37]/20 disabled:opacity-50 disabled:scale-100"
        >
          {status === "submitting" ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Request Free 7-Day Trial <Send className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest bg-zinc-100/50 py-2 rounded-full">
          No credit card required • Zero commitment
        </p>
      </form>
    </motion.div>
  );
}
