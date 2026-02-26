"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Tag, 
  ChevronLeft, 
  X,
  Plus,
  Minus,
  Info,
  ArrowRight
} from "lucide-react";

const FeesStructure: React.FC = () => {
  const navigate = useNavigate();
  const [subjectCount, setSubjectCount] = useState(3);
  
  // Competitive SA Pricing Logic
  const pricePerSubject = 1350; 
  const registrationFee = 500;
  
  // Discount: 15% off total if 3 or more subjects
  const isDiscounted = subjectCount >= 3;
  const rawTotal = subjectCount * pricePerSubject;
  const discountAmount = isDiscounted ? rawTotal * 0.15 : 0;
  const finalMonthly = rawTotal - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 px-4 py-8 md:px-6 md:py-12 relative">
      
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-blue-100 text-[#002b5c] hover:bg-[#002b5c] hover:text-white transition-all"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back</span>
        </button>
        <Link
          to="/"
          className="p-2 bg-white/90 rounded-full shadow-sm border border-blue-100 text-slate-400 hover:text-rose-500 transition-all"
        >
          <X size={24} />
        </Link>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
          >
            <Tag size={12} />
            Most Competitive Rates in SA
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-[#002b5c] tracking-tighter">
            Simple, Per-Subject <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            At Apex, we believe in paying only for what you need. Whether you are rewriting one subject 
            or a full matric, our fees are designed to be accessible.
          </p>
        </div>

        {/* Interactive Fee Calculator Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-blue-50 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5">
            
            {/* Left: Calculator Input */}
            <div className="md:col-span-3 p-8 md:p-12 space-y-8">
              <div>
                <h3 className="text-xl font-black text-[#002b5c] mb-2">Subject Selection</h3>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">How many subjects are you upgrading?</p>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <button 
                  onClick={() => setSubjectCount(Math.max(1, subjectCount - 1))}
                  className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#002b5c] hover:bg-rose-50 hover:text-rose-500 transition-all"
                >
                  <Minus size={24} />
                </button>
                <div className="text-center">
                  <span className="text-5xl font-black text-[#002b5c]">{subjectCount}</span>
                  <p className="text-[10px] font-black text-blue-600 uppercase mt-1">Subjects</p>
                </div>
                <button 
                  onClick={() => setSubjectCount(Math.min(7, subjectCount + 1))}
                  className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#002b5c] hover:bg-emerald-50 hover:text-emerald-500 transition-all"
                >
                  <Plus size={24} />
                </button>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span>Standard Rate: <strong>R{pricePerSubject}</strong> per subject</span>
                 </div>
                 {isDiscounted && (
                    <div className="flex items-center gap-3 text-sm text-blue-600 font-bold bg-blue-50 p-3 rounded-xl border border-blue-100">
                        <Zap size={18} className="fill-blue-600" />
                        <span>Combo Discount Applied: 15% OFF for 3+ subjects!</span>
                    </div>
                 )}
              </div>
            </div>

            {/* Right: Summary Display */}
            <div className="md:col-span-2 bg-[#002b5c] p-8 md:p-12 text-white flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CreditCard size={100} />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold opacity-60 uppercase tracking-widest">Monthly Total</h3>
                <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black">R{finalMonthly.toLocaleString()}</span>
                        <span className="text-blue-300 font-bold">/pm</span>
                    </div>
                    {isDiscounted && <p className="text-xs text-emerald-400 font-bold italic line-through opacity-50">Was R{rawTotal}</p>}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest opacity-60">
                    <span>Registration (Once-off)</span>
                    <span>R{registrationFee}</span>
                </div>
                <Link to="/login" className="flex items-center justify-center gap-2 w-full py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-900/40">
                    Select Plan <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-50 flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><ShieldCheck /></div>
                <div>
                    <h4 className="font-black text-[#002b5c] mb-1">No Hidden Costs</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Our fee includes full LMS access, face-to-face tuition, and internal assessments. No "app fees" or "tech surcharges".</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-blue-50 flex items-start gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Info /></div>
                <div>
                    <h4 className="font-black text-[#002b5c] mb-1">Exam Entry Guidance</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">While exam fees are paid to the assessment body (SACAI/DBE), we handle all the paperwork for you at no extra cost.</p>
                </div>
            </div>
        </div>

        {/* Secure Payments Footer */}
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center space-y-6 border-b-8 border-blue-600">
            <h3 className="text-white text-xl font-black">Safe & Verified Payments</h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-60">
                <div className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">EFT Payments</div>
                <div className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">PayFast Secure</div>
                <div className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">PCI-DSS Compliant</div>
            </div>
            <p className="text-slate-500 text-[10px] max-w-xl mx-auto">
                All monthly fees are billed on the 1st of the month. Termly and Yearly payment options are available upon request for additional savings.
            </p>
        </div>

        {/* Back Navigation */}
        <div className="text-center pb-12">
          <Link
            to="/about"
            className="text-slate-400 font-bold hover:text-blue-600 transition underline decoration-2 underline-offset-4"
          >
            ← Back to About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeesStructure;