"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Globe, 
  RotateCw, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  Zap,
  ArrowRight,
  MapPin,
  ChevronLeft,
  X,
  Target,
  BarChart3
} from "lucide-react";

const WhyChoose: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 md:px-6 md:py-12 relative overflow-hidden">
      
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

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#002b5c] rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border-b-8 border-blue-500"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10 text-center space-y-6">
            <span className="bg-blue-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Result-Driven Tuition • 2026 Intake
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              The Apex Advantage: <br /> <span className="text-blue-400 font-serif italic">Your Success, Simplified.</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto font-light leading-relaxed">
              Apex Academic College isn't just a tuition center—it's a high-performance 
              environment built to bridge the gap between your current results and 
              your <strong>University Degree</strong>.
            </p>
            <div className="pt-4">
              <Link
                to="/enrolment"
                className="inline-flex items-center gap-3 bg-white text-[#002b5c] font-black px-12 py-5 rounded-2xl hover:bg-blue-400 hover:text-white transition-all shadow-xl transform hover:scale-105"
              >
                Apply for 2026 <Zap size={18} className="fill-current"/>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-[#002b5c] tracking-tight">
            Why Students Choose Apex
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base italic">
            "Professional academics, hybrid flexibility, and a singular focus on university entrance."
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Hybrid Flexibility */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-blue-600 group hover:bg-blue-600 transition-all duration-300">
            <RotateCw className="text-blue-600 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">Hybrid Freedom</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-blue-100">
              Seamlessly switch between our <strong>Gqeberha Campus</strong> and our <strong>Virtual Classroom</strong>. 
              Ideal for students balancing work, family, or travel.
            </p>
          </div>

          {/* CAPS/NSC Focus */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-slate-900 group hover:bg-slate-900 transition-all duration-300">
            <Target className="text-slate-900 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">NSC Specialist Tuition</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300">
              We focus on the <strong>CAPS/NSC</strong> curriculum, ensuring your school-based 
              assessments (SBA) and exam prep are perfectly aligned with SACAI and DBE standards.
            </p>
          </div>

          {/* Career Mapping */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-blue-400 group hover:bg-blue-400 transition-all duration-300">
            <BarChart3 className="text-blue-400 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">APS Score Boosting</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-blue-50">
              Our tuition is strategic. We target the subjects that move the needle for your 
              <strong>Admission Point Score (APS)</strong>, helping you qualify for specific degrees.
            </p>
          </div>

          {/* Exam Centres */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-emerald-500 group hover:bg-emerald-500 transition-all duration-300">
            <MapPin className="text-emerald-500 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">National Reach</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-emerald-50">
              Virtual students write exams at <strong>accredited centers nationwide</strong>. 
              We handle the registration logistics so you can focus on your studies.
            </p>
          </div>

          {/* Competitive Pricing */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-yellow-500 group hover:bg-yellow-500 transition-all duration-300">
            <Award className="text-yellow-600 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">Elite, Not Expensive</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-yellow-50">
              Access premium private tuition from <strong>R450 per subject</strong>. 
              Transparent, per-subject billing with no locked-in long-term contracts.
            </p>
          </div>

          {/* Platform */}
          <div className="p-8 bg-white rounded-[2.5rem] shadow-xl border-t-8 border-purple-500 group hover:bg-purple-500 transition-all duration-300">
            <UserCheck className="text-purple-600 mb-6 group-hover:text-white" size={36} />
            <h2 className="text-xl font-black text-[#002b5c] mb-3 group-hover:text-white">Expert Tutors</h2>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-purple-50">
              Learn from subject specialists who have a proven track record of helping 
              students jump from "Fail" to "Distinction" levels.
            </p>
          </div>

        </div>

        {/* Reassurance Section */}
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="space-y-4 flex-1">
              <h3 className="text-3xl font-black">Peace of Mind for Upgraders</h3>
              <p className="text-slate-400 leading-relaxed font-light">
                Whether you are a 2025 matriculant needing better marks or a working adult 
                completing your certificate, Apex provides <strong>stability and results</strong>. 
                Our platform tracks every assessment, so you always know where you stand.
              </p>
            </div>
            
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12 space-y-8">
          <p className="text-2xl font-black text-[#002b5c] tracking-tight">
            One College. <span className="text-blue-600 italic">Total Access.</span>
          </p>
          <Link
            to="/enrolment"
            className="inline-flex items-center gap-3 bg-[#002b5c] text-white font-black text-xl px-12 py-6 rounded-2xl shadow-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Upgrade <ArrowRight />
          </Link>
          <div className="flex flex-wrap justify-center gap-6 opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">NSC Accredited Pathway</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">SACAI / DBE Support</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Registration Open</p>
          </div>
        </div>

        {/* Back */}
        <div className="text-center pb-8">
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

export default WhyChoose;