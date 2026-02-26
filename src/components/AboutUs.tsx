"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  X, 
  Globe, 
  BookOpen, 
  Users, 
  CreditCard, 
  Target, 
  Trophy, 
  Zap,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  MousePointer2
} from "lucide-react";

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 md:px-6 md:py-12 relative overflow-hidden text-[#002b5c]">
      
      {/* Navigation Controls */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 relative z-20">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center space-x-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-blue-100 text-[#002b5c] hover:bg-[#002b5c] hover:text-white transition-all"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back to Home</span>
        </button>
        <Link
          to="/"
          className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-blue-100 text-slate-400 hover:text-rose-500 transition-all"
        >
          <X size={24} />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Main Heading */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full"
          >
            <ShieldCheck size={14} /> Established Excellence Since 2017
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            The Apex <br /> <span className="text-blue-600 font-serif italic">Standard.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
            We don't just teach; we <strong>reclaim futures</strong>. As Gqeberha’s premier hub for 
            Matric Upgrading, we bridge the gap between where you are and where you belong.
          </p>
        </div>

        {/* The Urgency Banner */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-[#002b5c] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden border-b-[12px] border-blue-500"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GraduationCap size={300} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                2026 Intake <br /><span className="text-blue-400">Now Processing.</span>
              </h2>
              <p className="text-blue-100/70 text-lg font-light leading-relaxed">
                Admissions for the 21 January 2026 academic year are 65% full. 
                Secure your subject choices now to avoid the late-registration waiting list.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about/enrolment"
                  className="bg-blue-500 text-white font-black px-8 py-4 rounded-xl hover:bg-white hover:text-[#002b5c] transition-all shadow-lg flex items-center gap-2 group"
                >
                  Apply Online <Zap size={18} className="group-hover:fill-current" />
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-300">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> Live Enrollment Active
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 space-y-6">
                <p className="text-sm font-bold text-blue-300 uppercase tracking-widest">Why wait another year?</p>
                <blockquote className="text-2xl font-serif italic">
                    "I improved my Maths from 42% to 78% in one year at Apex. I'm now studying Engineering at NMU."
                </blockquote>
                <p className="text-xs font-black uppercase">— Class of 2024 Alumni</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Exploration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* LINK TO VISION */}
          <Link to="/about/vision" className="group">
            <div className="h-full p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <Target className="text-blue-600 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Our Mission</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Discover our commitment to academic recovery and how we target university entry points.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                View Vision <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* LINK TO SUBJECTS */}
          <Link to="/about/subjects" className="group">
            <div className="h-full p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <BookOpen className="text-blue-600 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Gateway Subjects</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  From Physics to Accounting—see the high-impact subjects we offer for NSC and IEB.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                See Subjects <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* LINK TO WHY CHOOSE */}
          <Link to="/about/why-choose" className="group">
            <div className="h-full p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:border-blue-500 transition-all flex flex-col justify-between">
              <div>
                <Trophy className="text-blue-600 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">The Advantage</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Why do 90% of our students recommend us? Explore our hybrid model and tutor support.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Why Apex? <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* LINK TO FEES */}
          <Link to="/about/fees" className="group">
            <div className="h-full p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:border-emerald-500 transition-all flex flex-col justify-between">
              <div>
                <CreditCard className="text-emerald-500 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Investment</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Transparent per-subject billing and registration fees. High-quality private tuition made accessible.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Check Fees <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* LINK TO PLATFORM */}
          <Link to="/about/learning-platform" className="group">
            <div className="h-full p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 group-hover:border-purple-500 transition-all flex flex-col justify-between">
              <div>
                <Globe className="text-purple-600 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-3">Virtual Campus</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Not in Gqeberha? Experience our 2026 Digital Core for live-streaming and recorded lessons.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Explore Tech <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* LINK TO CONTACT */}
          <div className="h-full p-8 bg-slate-900 rounded-[2.5rem] shadow-xl flex flex-col justify-between text-white">
            <div>
              <Users className="text-blue-400 mb-6" size={40} />
              <h3 className="text-2xl font-black mb-3">Visit Us</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Glendinningvale, Gqeberha. <br />
                Open Mon-Fri: 08:00 - 16:30.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-1">
                <span className="text-blue-400 font-black text-lg">083 355 2297</span>
                <span className="text-[10px] uppercase font-black tracking-widest opacity-50 text-white">Call / WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Career Pathway Visual */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-blue-50 text-center">
            <h3 className="text-2xl font-black mb-6">Your Path to University Starts Here</h3>
            
            <p className="text-slate-400 text-sm mt-6 max-w-xl mx-auto">
                Our diagnostic approach ensures you only spend time on the content that will 
                actually improve your final exam marks.
            </p>
        </div>

        {/* Final CTA - The "Urge" */}
        <div className="text-center py-12 space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">
              Don’t let your marks <br /> define your <span className="text-blue-600">destiny.</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
              Registration Window Open
            </p>
          </div>
          
          <div className="relative inline-block">
            <Link
                to="/about/enrolment"
                className="inline-flex items-center gap-4 bg-[#002b5c] text-white font-black text-2xl md:text-3xl px-16 py-8 rounded-[2.5rem] shadow-2xl hover:bg-blue-600 transition-all transform hover:scale-105"
            >
                Secure My 2026 Spot <MousePointer2 size={28} />
            </Link>
            <div className="absolute -top-4 -right-4 bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-full rotate-12 animate-bounce">
                LIMITED SEATS
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;