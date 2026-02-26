"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  X,
  School, 
  CheckCircle2, 
  Zap, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Monitor,
  ArrowRight,
  ClipboardCheck

} from "lucide-react";
import { Globe } from "lucide-react";

const Enrolment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 px-4 py-8 md:px-6 md:py-12 relative">
      
      {/* Smooth Navigation Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
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

      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        
        {/* Urgent Opening Banner - Apex Styled */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-[#002b5c] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl border-b-8 border-blue-500"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 hidden md:block">
            <School size={200} />
          </div>
          <div className="relative z-10 text-center md:text-left space-y-6">
            <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              2026 Academic Intake
            </div>
            <h2 className="text-3xl md:text-6xl font-black leading-tight">
              Registration <span className="text-blue-400">Now Open</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:items-center text-blue-100/80">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-sm font-bold">Starts: 21 Jan 2026</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <ClipboardCheck size={18} className="text-blue-400" />
                    <span className="text-sm font-bold">CAPS • IEB • SACAI</span>
                </div>
            </div>
          </div>
        </motion.div>

        {/* Heading Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-[#002b5c] tracking-tight">
            Secure Your Academic Future
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Choose Gqeberha's leading matric rewrite centre. Whether you prefer the structure of a campus 
            or the flexibility of home, Apex Academic College delivers excellence.
          </p>
        </div>

        {/* Hybrid Choice Section - Mobile Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-50 flex flex-col items-center text-center group transition-all"
          >
            <div className="bg-blue-50 p-5 rounded-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <MapPin size={40} />
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#002b5c]">Gqeberha Campus</h3>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
              Face-to-Face classes at our Glendinningvale premises. Expert-led sessions in a focused environment.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-50 flex flex-col items-center text-center group transition-all"
          >
            <div className="bg-blue-50 p-5 rounded-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Monitor size={40} />
            </div>
            <h3 className="mt-6 text-2xl font-black text-[#002b5c]">Virtual Classroom</h3>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
              Live interactive online classes. The same high-quality tuition delivered to you anywhere in South Africa.
            </p>
          </motion.div>
        </div>

        {/* Application Process - Horizontal on Desktop, Vertical on Mobile */}
        <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#002b5c] text-center">3 Steps to Enroll</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { step: "1", title: "Apply Online", desc: "Submit your previous results and ID through our digital portal.", icon: <Globe className="text-blue-500" /> },
                    { step: "2", title: "Consultation", desc: "Meet our specialists to choose your subjects and curriculum path.", icon: <Users size={32} className="text-blue-500" /> },
                    { step: "3", title: "Confirm Spot", desc: "Pay the registration fee to secure your 2026 intake seat.", icon: <CreditCard className="text-blue-500" /> }
                ].map((item, i) => (
                    <div key={i} className="relative p-8 bg-white rounded-[2rem] shadow-lg border border-blue-50">
                        <span className="absolute top-4 right-6 text-5xl font-black text-blue-50">{item.step}</span>
                        <div className="mb-4">{item.icon || <CheckCircle2 className="text-blue-500" />}</div>
                        <h4 className="text-xl font-black text-[#002b5c] mb-2">{item.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Switch Mode Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-1 rounded-[2rem] shadow-xl">
          <div className="bg-white rounded-[1.9rem] p-6 md:p-8 text-center">
            <p className="text-base md:text-lg font-bold text-[#002b5c] flex flex-col md:flex-row items-center justify-center gap-3">
              <Zap className="text-yellow-500 fill-yellow-500" />
              <span><strong>Apex Flexibility:</strong> You can transition between Online and Campus learning at any point!</span>
            </p>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="text-center py-12 space-y-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-3 bg-[#002b5c] text-white font-black text-xl md:text-2xl px-12 py-6 rounded-3xl hover:bg-blue-600 transition-all shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Apply for 2026 Now <ArrowRight />
            </Link>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Calendar size={14} /> Limited seats available for Gqeberha Campus
            </p>
        </div>

      </div>
    </div>
  );
};

// Placeholder for Users icon if not imported from lucide-react above
const Users = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Enrolment;