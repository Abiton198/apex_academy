"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  MapPin, 
  MessageSquare, 
  LayoutDashboard, 
  Zap, 
  MousePointerClick,
  ShieldCheck,
  RefreshCcw,
  Video,
  ChevronLeft,
  X,
  Smartphone
} from "lucide-react";

const LearningPlatform: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 md:px-6 md:py-12 relative overflow-hidden">
      
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

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <Zap size={14} className="fill-white" />
            Hybrid Education 2.0
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-[#002b5c] tracking-tighter leading-tight">
            One College. <br className="hidden md:block" /> 
            Two Ways to <span className="text-blue-600">Succeed.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Apex Academic College offers a seamless digital ecosystem for <strong>Matric Re-writes</strong>. 
            Whether you attend our Gqeberha campus or join us online, you receive the same elite tuition.
          </p>
        </div>

        {/* The Hybrid Freedom Section */}
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-900">
            <Globe size={300} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-[#002b5c]">Freedom of Choice</h2>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  Relocating or working full-time? Our platform ensures <strong>academic continuity</strong>. 
                  Switch between our physical campus and virtual classroom seamlessly whenever your circumstances change.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-blue-400 transition-all">
                  <div className="bg-[#002b5c] text-white p-3 rounded-2xl"><MapPin size={24}/></div>
                  <div>
                    <h4 className="font-black text-[#002b5c]">Gqeberha Campus</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Glendinningvale Premises</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-blue-50/50 rounded-3xl border border-blue-100 group hover:border-blue-400 transition-all">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl"><Globe size={24}/></div>
                  <div>
                    <h4 className="font-black text-[#002b5c]">Virtual Classroom</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Interactive Online Portal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#002b5c] rounded-[2.5rem] p-10 text-white space-y-6 shadow-2xl border-b-8 border-blue-500">
              <div className="flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-[10px]">
                <RefreshCcw size={16} /> Total Mobility
              </div>
              <h3 className="text-2xl font-bold italic text-white leading-snug">
                "Working a part-time job? Catch the live evening sessions or watch the recordings on your lunch break. 
                Your matric, your schedule."
              </h3>
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Smartphone className="text-blue-400" size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-tighter opacity-70">Mobile-Optimized Learning App</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Digital Core (LMS) */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#002b5c]">The Apex Digital Advantage</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">One-Click Access to Excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Streaming */}
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-4 border-blue-500">
              <Video size={40} className="text-blue-500 mb-6" />
              <h3 className="text-xl font-black text-[#002b5c] mb-3">Live Streaming</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Don't just watch videos—participate. Our live classes allow you to ask questions 
                in real-time, just like being in a physical classroom.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase">
                <ShieldCheck size={14} /> HD Quality Video
              </div>
            </motion.div>

            {/* In-App Communication */}
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-4 border-slate-900">
              <MessageSquare size={40} className="text-slate-900 mb-6" />
              <h3 className="text-xl font-black text-[#002b5c] mb-3">Tutor Support</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Direct access to subject specialists via our integrated chat. Stuck on a 
                maths problem at 8 PM? Drop a message in the subject forum.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 uppercase">
                <ShieldCheck size={14} /> Direct Student-Teacher Chat
              </div>
            </motion.div>

            {/* Smart Dashboards */}
            <motion.div whileHover={{ y: -10 }} className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-4 border-blue-300">
              <LayoutDashboard size={40} className="text-blue-400 mb-6" />
              <h3 className="text-xl font-black text-[#002b5c] mb-3">Result Tracking</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Visual dashboards for tracking your mock exam progress. Identify your weak 
                spots before the final NSC examinations begin.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase">
                <ShieldCheck size={14} /> Live Gradebook
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Platform Concept Diagram Placeholders */}
        <div className="py-8">
          
        </div>

        {/* Final Registration CTA */}
        <div className="text-center">
          <div className="bg-[#002b5c] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">
              Registration for 2026 Open
            </h2>
            <p className="text-blue-100/70 text-lg max-w-2xl mx-auto mb-10 relative z-10 font-light">
              Secure your place for the 2026 intake. Classes started <strong>21 January 2026</strong>. 
              Join the future of matric upgrading today.
            </p>
            
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-blue-500 text-white font-black text-xl px-12 py-5 rounded-2xl hover:bg-white hover:text-[#002b5c] transition-all duration-300 shadow-xl relative z-10"
            >
              Start Your Online Application <Zap size={20} className="fill-current" />
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pb-8">
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

export default LearningPlatform;