"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Atom, 
  TrendingUp, 
  Award,
  CheckCircle2,
  ChevronLeft,
  X,
  Languages,
  Calculator,
  Microscope,
  Briefcase
} from "lucide-react";

const SubjectsOffered: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 px-4 py-8 md:px-6 md:py-12 relative">
      
      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 md:mb-16">
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

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#002b5c] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 text-white shadow-2xl text-center relative overflow-hidden border-b-8 border-blue-500"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BookOpen size={200} />
          </div>
          <div className="relative z-10 space-y-6">
            <span className="bg-blue-500 px-4 py-1 rounded-full text-[10px] font-black tracking-[0.3em] uppercase">
              CAPS • IEB • SACAI Support
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Expert Tuition for <br />
              <span className="text-blue-400 font-serif italic">Matric Excellence</span>
            </h2>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto font-light">
              Strategic subject support designed to help you upgrade your symbols and 
              secure your spot at NMU, UCT, or any leading university.
            </p>
            <div className="pt-4">
              <Link
                to="/about/fees"
                className="inline-flex items-center gap-2 bg-white text-[#002b5c] font-black px-10 py-5 rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-xl transform hover:scale-105"
              >
                View Fee Structure <TrendingUp size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Introduction */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-[#002b5c] tracking-tight">
            High-Impact Subjects Offered
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            We focus on the gateway subjects that hold the most weight for university points (APS). 
            Available through both our Gqeberha campus and our Virtual platform.
          </p>
        </div>

        {/* The Core 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* STEM Pillar */}
          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-blue-600">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Microscope size={28} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-4">Sciences</h3>
            <ul className="space-y-3 text-sm text-slate-500 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Mathematics</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Physical Sciences</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Life Sciences</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-blue-500"/> Technical Sciences</li>
            </ul>
          </motion.div>

          {/* Commerce Pillar */}
          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-emerald-500">
            <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-4">Commerce</h3>
            <ul className="space-y-3 text-sm text-slate-500 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Accounting</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Business Studies</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Economics</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500"/> Mathematical Literacy</li>
            </ul>
          </motion.div>

          {/* Languages Pillar */}
          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-rose-500">
            <div className="bg-rose-50 w-14 h-14 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
              <Languages size={28} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-4">Languages</h3>
            <ul className="space-y-3 text-sm text-slate-500 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-rose-500"/> English HL/FAL</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-rose-500"/> Afrikaans FAL</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-rose-500"/> IsiXhosa HL/FAL</li>
            </ul>
          </motion.div>

          {/* Humanities Pillar */}
          <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-yellow-500">
            <div className="bg-yellow-50 w-14 h-14 rounded-2xl flex items-center justify-center text-yellow-600 mb-6">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-black text-[#002b5c] mb-4">Humanities</h3>
            <ul className="space-y-3 text-sm text-slate-500 font-bold">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500"/> History</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500"/> Geography</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500"/> Life Orientation</li>
            </ul>
          </motion.div>
        </div>

        {/* Career Pathways Info Diagram */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-blue-50 text-center space-y-8">
            <h3 className="text-2xl font-black text-[#002b5c]">Strategic University Pathways</h3>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                We help you select subject combinations that maximize your APS (Admission Point Score) 
                for specific career fields.
            </p>
            
        </div>

        {/* Final CTA */}
        <div className="text-center py-8 space-y-8">
          <div className="inline-block p-1 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-800 rounded-3xl shadow-2xl">
            <Link
              to="/login"
              className="block bg-white text-[#002b5c] font-black text-xl md:text-2xl px-12 py-6 rounded-[1.4rem] hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Secure Your 2026 Spot <Award className="inline ml-2" />
            </Link>
          </div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
            Classes Start 21 January 2026 • Limited Physical Seats Available
          </p>
        </div>

        {/* Back Navigation */}
        <div className="text-center">
          <Link
            to="/about"
            className="text-slate-400 font-bold hover:text-[#002b5c] transition-all underline decoration-2 underline-offset-8"
          >
            ← Back to About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubjectsOffered;