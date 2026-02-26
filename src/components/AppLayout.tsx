"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import LoginForm from "./auth/LoginForm";
import ParentDashboard from "./dashboards/parent/ParentDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import PrincipalDashboard from "./dashboards/PrincipalDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import { Link } from "react-router-dom";

// Icons & UI
import { Info, ArrowRight, MapPin, Sparkles, BookOpen, Globe } from "lucide-react";

// Logos
import logo from "../img/apex.png";
// import ZoomableImage from "@/lib/ZoomableImage";

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#002b5c] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="font-medium tracking-wide">Connecting to Apex Academy...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#001a33] overflow-hidden">
        {/* Abstract "Apex" Background Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />

        {/* Navigation / Logo Area */}
        <nav className="relative z-20 flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
             <div className="w-16 h-16 bg-white rounded-xl p-1 shadow-2xl">
                <img src={logo} alt="Apex Logo" className="w-full h-full object-contain" />
             </div>
             <div>
                <h2 className="text-white font-black text-xl leading-none">APEX</h2>
                <p className="text-blue-400 text-[10px] tracking-[0.2em] font-bold uppercase">Academic College</p>
             </div>
          </div>
          <button 
            onClick={() => setShowLoginModal(true)}
            className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-sm font-semibold transition"
          >
            Portal Login
          </button>
        </nav>

        {/* Main Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-12 pb-24 px-6 text-center text-white">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-5 py-2 rounded-full border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Globe size={14} className="text-blue-400" />
            CAPS • IEB  • SACAI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black mb-4 tracking-tighter"
          >
            Bridging Gaps for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-300">
              Potential Discovery
            </span>
          </motion.h1>

          <h2 className="text-2xl md:text-4xl font-light text-blue-100/80 mb-10 italic">
            2026 Matric Re-Write & Upgrading
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mb-12 text-blue-100/60 leading-relaxed">
            Choose an educated choice with <strong>Face-to-Face & Online classes</strong>. 
            Offering full-time and part-time extra classes since 2017.
          </p>

          {/* Core Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
            {[
              { title: "Matric Re-Write", desc: "For candidates looking to complete their NSC.", icon: <BookOpen className="text-blue-400" /> },
              { title: "Matric Upgrading", desc: "Improve your existing results for university entry.", icon: <Sparkles className="text-blue-400" /> },
              { title: "Extra Classes", desc: "Targeted subject support for all high school learners.", icon: <Info className="text-blue-400" /> }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl text-left hover:bg-white/10 transition"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-blue-200/60">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-blue-900/50 flex items-center gap-3 text-lg"
            >
              Apply for 2026 Intake <ArrowRight />
            </motion.button>
            <div className="text-left">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Visit Our Campus</p>
                <p className="text-sm text-white flex items-center gap-2">
                    <MapPin size={14} /> Gqeberha (PE), Glendinningvale
                </p>
            </div>
          </div>
        </div>

        {/* Intake Badges */}
        <div className="flex justify-center gap-4 pb-20 px-6">
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-4 py-2 rounded-lg text-[10px] font-bold uppercase">May - June Intake Open</span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-2 rounded-lg text-[10px] font-bold uppercase">November Intake Open</span>
        </div>

        {/* Login Modal (Same Logic as before) */}
        <AnimatePresence>
          {showLoginModal && (
            <motion.div
              className="fixed inset-0 bg-[#001a33]/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-[2rem] shadow-2xl p-10 w-full max-w-md relative"
              >
                <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-gray-400">✕</button>
                <div className="text-center mb-8">
                    <img src={logo} alt="Apex" className="w-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-black text-[#002b5c]">Student Portal</h2>
                    <p className="text-gray-500 text-sm">Log in to access your dashboard</p>
                </div>
                <LoginForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  switch (user.role) {
    case "parent": return <ParentDashboard />;
    case "teacher": return <TeacherDashboard />;
    case "principal": return <PrincipalDashboard />;
    case "admin": return <AdminDashboard />;
    default: return <LoginForm />;
  }
};

const AppLayout: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col font-sans antialiased bg-[#001a33]">
        <AppContent />
        <footer className="bg-black/20 text-blue-200/40 py-12 border-t border-white/5 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-100/20 mb-2">Apex Academic College (PVT) LTD</p>
              <p className="text-[10px]">Cnr Canynham & Lennox street, Glendinningvale Gqeberha</p>
            </div>
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                <Link to="/privacy-policy" className="hover:text-blue-400 transition">Privacy</Link>
                <Link to="/delete-account-request" className="hover:text-rose-400 transition">Compliance</Link>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default AppLayout;