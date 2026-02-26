"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Check, Globe, BookOpen, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { db, storage } from "@/lib/firebaseConfig";

/* ───────────────────────── TYPES ───────────────────────── */
interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  grade: string;
  curriculum: "British Curriculum";
  subjects: string[];
  status?: string;
}

/* ───────────────────────── CONSTANTS ───────────────────────── */

// Updated Grades to include South African Phases and the specific Rewrite focus
const GRADES = [
  "Grade 10 (FET Phase)", 
  "Grade 11 (FET Phase)", 
  "Grade 12 (NSC)", 
  "Matric Rewrite (Upgrade)", 
  "Technical Matric"
];

const SOUTH_AFRICAN_REWRITE_SUBJECTS = {
  // Compulsory subjects for NSC/Matric
  Core: [
    "English Home Language",
    "English First Additional Language",
    "Afrikaans First Additional Language",
    "isiZulu First Additional Language",
    "Mathematics",
    "Mathematical Literacy",
    "Life Orientation"
  ],
  // Science & Tech Stream (High demand for rewrites)
  Science_Tech: [
    "Physical Sciences",
    "Life Sciences",
    "Agricultural Sciences",
    "Information Technology (IT)",
    "Computer Applications Technology (CAT)",
    "Engineering Graphics and Design (EGD)",
    "Technical Mathematics",
    "Technical Sciences"
  ],
  // Commerce & Humanities
  Commerce_Humanities: [
    "Accounting",
    "Business Studies",
    "Economics",
    "History",
    "Geography",
    "Tourism",
    "Consumer Studies",
    "Religious Studies"
  ],
  // IEB / SACAI Specific Extras
  Advanced_Programmes: [
    "AP Mathematics (IEB)",
    "AP English (IEB)",
    "AP Physics"
  ]
};

/* ───────────────────────── COMPONENT ───────────────────────── */
export default function RegistrationSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  /* =========================
     STATE MANAGEMENT
  ========================= */
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [docs, setDocs] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");
  // Updated to reflect the SA context
  const [curriculum, setCurriculum] = useState<"CAPS" | "IEB" | "SACAI">("CAPS");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /* =========================
     LOGIC HANDLERS
  ========================= */
  
  // Dynamic Subject Filter based on Rewrite vs Standard Grade
  const getCategorizedSubjects = () => {
    // For 2026 Matric Rewrites, we show all NSC categories
    return {
      "Fundamental Core": SOUTH_AFRICAN_REWRITE_SUBJECTS.Core,
      "Science & Technology": SOUTH_AFRICAN_REWRITE_SUBJECTS.Science_Tech,
      "Commerce & Humanities": SOUTH_AFRICAN_REWRITE_SUBJECTS.Commerce_Humanities,
      "Advanced Programmes": curriculum === "IEB" ? SOUTH_AFRICAN_REWRITE_SUBJECTS.Advanced_Programmes : []
    };
  };

const toggleSubject = (sub: string) => {
  setSelectedSubjects((prev) =>
    prev.includes(sub) 
      ? prev.filter((s) => s !== sub) 
      : [...prev, sub]                
      );
};

/* =========================
   LOGIC HANDLERS
========================= */
const resetForm = () => {
  setFirstName("");
  setLastName("");
  setGrade("");
  setSelectedSubjects([]);
  setEditingId(null);
  setIsOpen(false);
  // If you added curriculum state:
  setCurriculum("CAPS"); 
};

  /* ... useEffect and data fetching logic remains identical to your provided code ... */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grade || selectedSubjects.length === 0) {
      alert("Please ensure Grade and Subjects are selected.");
      return;
    }

    const studentData = {
      firstName,
      lastName,
      grade,
      curriculum, // Now dynamic: CAPS, IEB, or SACAI
      subjects: selectedSubjects,
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "students", editingId), studentData);
      } else {
        const newStudentId = `std_${Date.now()}`;
        await setDoc(doc(db, "students", newStudentId), {
          ...studentData,
          parentId: user?.uid,
          parentEmail: user?.email,
          status: "pending",
          createdAt: serverTimestamp(),
        });
      }
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  /* =========================
     UI RENDER (Modified for Curricula Selection)
  ========================= */
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">
      {/* Navigation Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft size={16} /> Back
        </Button>
        <div className="text-center">
          <h2 className="text-lg font-black text-[#002b5c] uppercase tracking-tight">Matric Rewrite & Upgrade Registry</h2>
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Academic Year 2026 Intake</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate("/parent-dashboard")}>
          <X size={20} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registered Students List would go here - utilizing the same logic you provided */}

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden">
            <div className="bg-[#002b5c] p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-widest block">Enrollment Phase</span>
                <p className="text-[10px] text-blue-300 font-bold uppercase mt-1">CAPS • IEB • SACAI Accredited</p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setIsOpen(true)} className="rounded-xl h-10 px-6 font-bold text-[10px] bg-blue-600 text-white hover:bg-blue-500 border-none">
                {isOpen ? "ENROLLING..." : "NEW ENROLLMENT"}
              </Button>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-8 space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Student First Name</Label>
                      <Input className="rounded-xl bg-slate-50 border-none h-12" placeholder="Legal Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Student Last Name</Label>
                      <Input className="rounded-xl bg-slate-50 border-none h-12" placeholder="Surname" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Enrollment Grade</Label>
                      <Select value={grade} onValueChange={(v) => { setGrade(v); setSelectedSubjects([]); }}>
                        <SelectTrigger className="rounded-xl bg-slate-50 border-none h-12 font-bold"><SelectValue placeholder="Select Phase" /></SelectTrigger>
                        <SelectContent>
                          {GRADES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Examining Body (Curriculum)</Label>
                      <Select value={curriculum} onValueChange={(v: any) => setCurriculum(v)}>
                        <SelectTrigger className="rounded-xl bg-slate-50 border-none h-12 font-bold"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CAPS">Department of Education (CAPS)</SelectItem>
                          <SelectItem value="IEB">IEB (Independent)</SelectItem>
                          <SelectItem value="SACAI">SACAI (Comprehensive)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Dynamic Subjects Grid */}
                  {grade && (
                    <div className="space-y-8 pt-4 border-t border-slate-100">
                      {Object.entries(getCategorizedSubjects()).map(([category, list]) => (
                        list.length > 0 && (
                          <div key={category} className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none text-[8px] font-black uppercase tracking-widest px-2 py-1">
                                {category}
                              </Badge>
                              <div className="h-[1px] flex-1 bg-slate-100" />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {list.map((sub) => (
                                <label 
                                  key={sub} 
                                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                    selectedSubjects.includes(sub) 
                                      ? 'bg-blue-50 border-blue-200' 
                                      : 'bg-white border-slate-50 hover:border-slate-100'
                                  }`}
                                >
                                  <Checkbox 
                                    checked={selectedSubjects.includes(sub)} 
                                    onCheckedChange={() => toggleSubject(sub)} 
                                  />
                                  <span className="text-xs font-bold text-slate-700">{sub}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-6 border-t border-slate-100">
                    <Button type="submit" className="flex-1 h-14 bg-[#002b5c] hover:bg-blue-700 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-blue-100 transition-all">
                      {editingId ? "UPDATE ENROLLMENT" : "FINALIZE MATRIC REGISTRATION"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} className="h-14 rounded-2xl px-8 font-black text-xs text-slate-400 border-2">
                      CANCEL
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Verification Section */}
          <div className="bg-[#002b5c] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-blue-400 mb-2">Registry Compliance</h4>
            <p className="text-xs text-slate-300 mb-6 font-medium max-w-md">
              For 2026 Rewrites, we require a copy of your previous NSC Statement of Results and a valid ID/Passport.
            </p>
            {/* Upload logic stays the same */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ensure you import ShieldCheck from lucide-react
import { ShieldCheck } from "lucide-react";