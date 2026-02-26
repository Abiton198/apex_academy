"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Calculator, 
  User, 
  BookOpen, 
  CreditCard,
  Send,
  Info
} from "lucide-react";

const ApplicationPortal: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Application State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Campus", // Campus or Virtual
    selectedSubjects: [] as string[]
  });

  const subjects = [
    { id: "math", name: "Mathematics", stream: "Science" },
    { id: "phys", name: "Physical Sciences", stream: "Science" },
    { id: "life", name: "Life Sciences", stream: "Science" },
    { id: "acc", name: "Accounting", stream: "Commerce" },
    { id: "bus", name: "Business Studies", stream: "Commerce" },
    { id: "econ", name: "Economics", stream: "Commerce" },
    { id: "eng", name: "English HL/FAL", stream: "Language" },
    { id: "afr", name: "Afrikaans FAL", stream: "Language" },
  ];

  // Fee Calculation Logic (Matching your Fees Page)
  const pricePerSubject = 450;
  const regFee = 500;
  const subjectCount = formData.selectedSubjects.length;
  const isDiscounted = subjectCount >= 3;
  const subtotal = subjectCount * pricePerSubject;
  const discount = isDiscounted ? subtotal * 0.15 : 0;
  const monthlyTotal = subtotal - discount;

  const toggleSubject = (name: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(name)
        ? prev.selectedSubjects.filter(s => s !== name)
        : [...prev.selectedSubjects, name]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#002b5c] font-sans">
      {/* Progress Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <h1 className="font-black text-xl tracking-tighter">2026 Application</h1>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 w-8 rounded-full transition-all ${step >= s ? "bg-blue-600" : "bg-slate-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 text-blue-600 mb-2">
                  <User size={24} />
                  <h2 className="text-2xl font-black">Student Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Enter your name"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="081 234 5678"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preferred Learning Mode</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Campus", "Virtual"].map(mode => (
                      <button
                        key={mode}
                        onClick={() => setFormData({...formData, mode})}
                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${formData.mode === mode ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                disabled={!formData.name || !formData.phone}
                onClick={() => setStep(2)} 
                className="w-full py-5 bg-[#002b5c] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50 transition-all"
              >
                Next: Select Subjects <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Subject Selection */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="flex items-center gap-3 text-blue-600 mb-6">
                  <BookOpen size={24} />
                  <h2 className="text-2xl font-black">Choose Your Subjects</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subjects.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => toggleSubject(sub.name)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${formData.selectedSubjects.includes(sub.name) ? "border-blue-600 bg-blue-50" : "border-slate-50 hover:border-slate-200"}`}
                    >
                      <div className="text-left">
                        <p className={`font-bold text-sm ${formData.selectedSubjects.includes(sub.name) ? "text-blue-700" : "text-slate-700"}`}>{sub.name}</p>
                        <p className="text-[10px] uppercase text-slate-400 font-bold">{sub.stream}</p>
                      </div>
                      {formData.selectedSubjects.includes(sub.name) && <CheckCircle2 size={18} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Calculator Feedback */}
              
              <div className="bg-blue-600 rounded-[2rem] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Estimated Monthly Fee</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">R{monthlyTotal}</span>
                    <span className="text-sm font-bold opacity-70">for {subjectCount} subjects</span>
                  </div>
                </div>
                <div className="text-right">
                  <button onClick={() => setStep(3)} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-black hover:bg-blue-50 transition-all">
                    Review & Submit
                  </button>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="text-slate-400 font-bold text-sm flex items-center gap-2 mx-auto"><ChevronLeft size={16}/> Go Back</button>
            </motion.div>
          )}

          {/* STEP 3: Review & Finalize */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-blue-50">
                <h2 className="text-2xl font-black mb-8 text-center">Application Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-400 text-sm font-bold uppercase">Applicant</span>
                    <span className="font-black">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-400 text-sm font-bold uppercase">Mode</span>
                    <span className="font-black text-blue-600">{formData.mode}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-slate-400 text-sm font-bold uppercase">Subjects Selected</span>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedSubjects.map(s => (
                        <span key={s} className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 bg-slate-900 rounded-3xl p-6 text-white space-y-4">
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Registration Fee (Once-off)</span>
                    <span>R{regFee}</span>
                  </div>
                  <div className="flex justify-between font-black text-xl pt-2 border-t border-white/10">
                    <span>First Month Due</span>
                    <span className="text-blue-400">R{monthlyTotal + regFee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase">
                    <Info size={12}/> Includes 15% Combo Discount
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-emerald-200 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3">
                  Submit to Admissions <Send size={24} />
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase">
                  <ShieldCheck size={14}/> Secure Application • 2026 Intake
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// Simple ShieldCheck icon for local use
const ShieldCheck = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default ApplicationPortal;