"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  Compass, 
  ShieldCheck, 
  Star, 
  Anchor, 
  Zap, 
  ArrowRight,
  ChevronLeft,
  X,
  Target,
  GraduationCap
} from "lucide-react";

const Vision: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-100 px-4 py-8 md:px-6 md:py-12 relative overflow-hidden">
      
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 relative z-20">
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

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Hero Banner - Focus on the Future */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#002b5c] rounded-[3rem] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden text-center border-b-8 border-blue-600"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Globe className="absolute -top-20 -right-20" size={450} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <motion.span 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-blue-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
            >
              The Apex Standard
            </motion.span>
            <h2 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter">
              Redefining <br /> <span className="text-blue-400 font-serif italic">Academic Recovery</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100/70 max-w-3xl mx-auto leading-relaxed font-light">
              One college, two ways to learn. Whether you are upgrading your matric 
              or starting fresh, we provide the ultimate roadmap to university entrance.
            </p>
            <div className="pt-4">
              <Link
                to="/enrolment"
                className="inline-flex items-center gap-3 bg-white text-[#002b5c] font-black px-12 py-5 rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-xl transform hover:scale-105"
              >
                Apply for 2026 <Zap size={20} className="fill-current" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Vision Statement Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-[#002b5c] leading-tight tracking-tighter">
                Our Vision: <br />
                <span className="text-blue-600">Unlocking the Gateway</span> <br /> 
                to Higher Learning.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                At <strong>Apex Academic College</strong>, we believe your matric results shouldn't be a 
                permanent ceiling, but a launchpad. Our vision is to be South Africa’s most 
                trusted <strong>Hybrid Tuition Center</strong>, specializing in symbols upgrades that 
                open doors to Medicine, Engineering, Law, and more.
              </p>
            </div>

            <div className="flex items-center gap-4 p-8 bg-white rounded-[2.5rem] shadow-xl border-l-8 border-blue-600">
              <Anchor size={40} className="text-blue-600 flex-shrink-0" />
              <p className="text-slate-700 font-bold text-sm md:text-base leading-relaxed">
                Our mission is to equip <strong>ambitious learners</strong> with the resilience 
                and results needed to thrive in a global economy through the NSC (CAPS/IEB) pathways.
              </p>
            </div>
          </div>
          
          {/* Visual Philosophy Card */}
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative border-t-8 border-blue-400">
            <h3 className="text-2xl font-bold mb-10 italic text-blue-100">"We envision a future where every South African student has a second chance at academic excellence."</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all"><Target size={24} /></div>
                <div>
                  <h4 className="font-black text-lg">Goal-Driven Learning</h4>
                  <p className="text-sm text-slate-400">Targeting the exact symbols required for your chosen degree.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-emerald-500/20 p-3 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all"><Compass size={24} /></div>
                <div>
                  <h4 className="font-black text-lg">Hybrid Flexibility</h4>
                  <p className="text-sm text-slate-400">Education that moves with you—campus-based or virtual classroom.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="bg-blue-400/20 p-3 rounded-2xl text-blue-300 group-hover:bg-blue-400 group-hover:text-white transition-all"><ShieldCheck size={24} /></div>
                <div>
                  <h4 className="font-black text-lg">Academic Integrity</h4>
                  <p className="text-sm text-slate-400">Strict adherence to national assessment standards and quality tuition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2rem] shadow-xl border-b-8 border-blue-600 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-600 mb-6">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-2">Tertiary Focused</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Our curriculum is specifically designed to bridge the gap between high school and university rigor.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2rem] shadow-xl border-b-8 border-slate-900 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl text-slate-900 mb-6">
              <RotateCw size={32} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-2">Agile Transition</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Students can pivot between physical and virtual classes termly based on their life and work needs.</p>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2rem] shadow-xl border-b-8 border-blue-400 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-2xl text-blue-400 mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-2">Proven Excellence</h3>
            <p className="text-slate-500 text-xs font-bold leading-relaxed">Leveraging years of tuition experience to ensure that symbols don't just move—they soar.</p>
          </motion.div>
        </div>

        {/* Diagnostic Hierarchy Diagram */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-blue-50">
            <h3 className="text-2xl font-black text-center text-[#002b5c] mb-10">The Apex Growth Model</h3>
            
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-slate-100 group hover:bg-[#002b5c] transition-all">
            <p className="text-4xl font-black text-blue-600 group-hover:text-white tracking-tighter">Jan 21</p>
            <p className="text-[10px] text-slate-400 group-hover:text-blue-300 uppercase font-black mt-2 tracking-widest">2026 Academic Start</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-slate-100 group hover:bg-[#002b5c] transition-all">
            <p className="text-4xl font-black text-blue-600 group-hover:text-white tracking-tighter">R450</p>
            <p className="text-[10px] text-slate-400 group-hover:text-blue-300 uppercase font-black mt-2 tracking-widest">Entry-Level Subject Fee</p>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl shadow-lg border border-slate-100 group hover:bg-[#002b5c] transition-all">
            <p className="text-4xl font-black text-blue-600 group-hover:text-white tracking-tighter">APS</p>
            <p className="text-[10px] text-slate-400 group-hover:text-blue-300 uppercase font-black mt-2 tracking-widest">University Score Focus</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-black text-[#002b5c] tracking-tight">
            Your second chance starts today.
          </h2>
          <Link
            to="/enrolment"
            className="inline-flex items-center gap-3 mt-8 bg-[#002b5c] text-white font-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Join Apex College <ArrowRight />
          </Link>
          <div className="mt-8">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
              Gqeberha • Online • Worldwide
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            to="/about"
            className="text-slate-400 font-bold hover:text-blue-600 transition underline decoration-2 underline-offset-8"
          >
            ← Back to About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper Icons
const RotateCw = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
  </svg>
);

export default Vision;