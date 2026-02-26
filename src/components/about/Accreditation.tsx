"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  ClipboardCheck,
  ChevronLeft,
  X,
  Globe
} from "lucide-react";

const Accreditation: React.FC = () => {
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
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-2"
          >
            Academic Integrity
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#002b5c] tracking-tighter"
          >
            Registration & <span className="text-blue-600">Exam Pathways</span>
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Apex Academic College is a premier **Tuition and Support Center**. We bridge the gap 
            between learners and official assessment bodies (CAPS, IEB, SACAI) by providing 
            expert-led preparation and administrative registration support.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Official Curricula */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-blue-600 relative overflow-hidden group hover:shadow-2xl transition-all">
            <BookOpen className="absolute -right-4 -bottom-4 text-blue-50 opacity-20 group-hover:scale-110 transition-transform" size={140} />
            <h2 className="text-2xl font-black text-[#002b5c] mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" /> Recognized Syllabi
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
              Our tuition programs strictly follow the <strong>Department of Basic Education (CAPS)</strong>, 
              <strong> IEB</strong>, and <strong>SACAI</strong> requirements. This ensures that every hour 
              spent at Apex translates directly to your final NSC results.
            </p>
          </div>

          {/* Exam Center Support */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-blue-400 relative overflow-hidden group hover:shadow-2xl transition-all">
            <MapPin className="absolute -right-4 -bottom-4 text-blue-50 opacity-20 group-hover:scale-110 transition-transform" size={140} />
            <h2 className="text-2xl font-black text-[#002b5c] mb-4 flex items-center gap-2">
              <ClipboardCheck className="text-blue-400" /> Center Facilitation
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed relative z-10">
              We assist students in registering at <strong>accredited examination centers</strong> 
              within Gqeberha (PE) and across South Africa. Whether writing as a full-time 
              or part-time candidate, we manage the administrative hurdles for you.
            </p>
          </div>
        </div>

        {/* Campus Identity */}
        <div className="bg-[#002b5c] text-white rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 border-b-8 border-blue-500">
          <div className="bg-white/10 p-6 rounded-[2rem]">
            <Building2 size={48} className="text-blue-300" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-2xl font-black">Our Home Base</h3>
            <p className="text-blue-100/70 italic text-lg font-light">
              "Based in the heart of Glendinningvale, Gqeberha, our physical campus serves as a 
              structured environment where potential is discovered and excellence is realized."
            </p>
          </div>
        </div>

        {/* Roadmap */}
        <div className="space-y-10">
          <h2 className="text-3xl font-black text-center text-[#002b5c]">Your Success Roadmap</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Assessment", desc: "Evaluating your previous results to identify areas for upgrading." },
              { step: "02", title: "Tuition", desc: "Face-to-face or Online sessions with our subject specialists." },
              { step: "03", title: "Registration", desc: "Managing your exam entry with official bodies (Department/SACAI)." },
              { step: "04", title: "Results", desc: "Writing your finals and improving your symbols for University entry." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-lg border border-blue-50 hover:border-blue-300 transition-all">
                <span className="text-4xl font-black text-blue-100 block mb-4">{item.step}</span>
                <h4 className="font-black text-[#002b5c] mb-2">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Apex Advantage */}
        <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-2xl border border-blue-50 overflow-hidden relative">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-3/5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Beyond the Syllabus
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#002b5c]">The University Edge</h2>
              <p className="text-slate-600 leading-relaxed">
                At Apex, we don't just teach for the exam. We prepare you for what comes next. 
                Our upgrading students gain access to <strong>University entrance preparation</strong> 
                and workshops designed to secure admission into competitive degrees.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "NBT Preparation Support", 
                  "University Application Guidance", 
                  "Career Path Discovery", 
                  "Mock Exam Simulations"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="text-blue-500" size={18} /> {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="lg:w-2/5 hidden lg:flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 blur-xl opacity-50"></div>
                    <Globe size={240} className="text-blue-600 relative z-10 opacity-20" strokeWidth={1} />
                </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-10 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#002b5c] tracking-tighter">Ready to Upgrade Your Future?</h2>
            <p className="text-slate-500 font-medium italic">"An educated choice starts here."</p>
          </div>
          
          <Link
            to="/login"
            className="bg-[#002b5c] text-white font-black text-xl px-12 py-5 rounded-2xl shadow-2xl hover:bg-blue-600 transition-all transform hover:scale-105 inline-flex items-center gap-3"
          >
            Start Your Journey <ArrowRight />
          </Link>
          
          <div className="pt-4">
             <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
               2026 Intake • CAPS • IEB • SACAI
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Accreditation;