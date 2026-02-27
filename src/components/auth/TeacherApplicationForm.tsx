"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/components/auth/AuthProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, FileText, Loader2, CheckCircle2, BookOpen, ShieldCheck } from "lucide-react";

/* ======================================================
   TYPES & CONSTANTS
====================================================== */
type CurriculumType = "CAPS" | "IEB" | "SACAI" | "British Curriculum";

interface Subject {
  name: string;
  curriculum: CurriculumType;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  yearsOfExperience: number;
  gradePhase: "Primary" | "Secondary" | "Matric Rewrite";
  subjects: Subject[];
  
}

interface Documents {
  idDoc?: FileList | null;
  qualification?: FileList | null;
  cv?: FileList | null;
}

const CURRICULA_OPTIONS: CurriculumType[] = ["CAPS", "IEB", "SACAI", "British Curriculum"];

// Aligned with Student Registration Subject Groups
const SUBJECT_DATABASE: Record<CurriculumType, string[]> = {
  "CAPS": [
    "English Home Language", "English First Additional Language", 
    "Afrikaans FAL", "isiZulu FAL", "Mathematics", "Mathematical Literacy", "Computer Applications Technology",
    "Physical Sciences", "Life Sciences", "Accounting", "Business Studies", 
    "Economics", "Geography", "History", "Technical Mathematics", "Technical Sciences"
  ],
  "IEB": [
    "English HL (IEB)", "Mathematics (IEB)", "Physical Sciences (IEB)", 
    "Life Sciences (IEB)", "Accounting (IEB)", "Advanced Programme Mathematics", 
    "Advanced Programme English", "Advanced Programme Physics", "Information Technology (IT)", "Computer Applications Technology (IEB)"
  ],
  "SACAI": [
    "Mathematics (SACAI)", "Mathematical Literacy (SACAI)", "Physical Sciences (SACAI)", 
    "Life Sciences (SACAI)", "Agricultural Sciences", "Tourism", "Consumer Studies", 
    "Coding and Programming", "Computer Studies"
  ],
  "British Curriculum": [
    "Mathematics (IGCSE/A-Level)", "Physics (IGCSE/A-Level)", "Chemistry (IGCSE/A-Level)", 
    "Biology (IGCSE/A-Level)", "English Language & Literature", "Computer Science", "Economics"
  ]
};

export default function TeacherApplicationForm({
  onClose,
  onSubmitted,
  userId
}: { onClose: () => void; onSubmitted?: () => void; userId?: string | null }) {
  
  const { user } = useAuth();
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>("CAPS");
  const [subjectKey, setSubjectKey] = useState(0); 
  
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    yearsOfExperience: 0,
    gradePhase: "Matric Rewrite",
    subjects: [],
  });

  const [documents, setDocuments] = useState<Documents>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Add Subject Logic
  const addSubject = (subjectName: string) => {
    if (!subjectName) return;
    const exists = form.subjects.some(
      (s) => s.name === subjectName && s.curriculum === selectedCurriculum
    );

    if (!exists) {
      setForm((prev) => ({
        ...prev,
        subjects: [...prev.subjects, { name: subjectName, curriculum: selectedCurriculum }],
      }));
    }
    setSubjectKey(prev => prev + 1); // Reset Subject Select
  };

  const removeSubject = (index: number) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (key: keyof Documents, files: FileList | null) =>
    setDocuments((prev) => ({ ...prev, [key]: files }));

 const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // 1. Capture the ID passed from the parent
    const docId = userId || user?.uid; 
    
    if (!docId) { 
      setError("User session not found. Please try logging in again."); 
      return; 
    }
    
    if (form.subjects.length === 0) { 
      setError("Please select at least one subject to teach."); 
      return; 
    }

    setLoading(true);
    setError("");

    try {
      // 2. SWITCHED TO setDoc: This uses docId as the Document Name
      const appRef = doc(db, "teacherApplications", docId);
      
      await setDoc(appRef, {
        uid: docId,
        applicationId: docId,
        email: form.email || user?.email,
        personalInfo: { ...form },
        status: "submitted",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true }); // merge: true prevents overwriting existing data fields

      // 3. Update the User profile to link them to this application
      const userRef = doc(db, "users", docId);
      await setDoc(userRef, {
        firstName: form.firstName,
        lastName: form.lastName,
        role: "teacher",
        applicationStatus: "submitted",
        profileCompleted: true,
        lastApplicationId: docId,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      // 4. Handle File Uploads
      const uploadedDocs: Record<string, string> = {};
      for (const [key, fileList] of Object.entries(documents)) {
        if (fileList && fileList[0]) {
          const file = fileList[0];
          // Organizes files in storage by the user's specific ID
          const fileRef = ref(storage, `teacherDocs/${docId}/${key}_${file.name}`);
          const uploadTask = await uploadBytesResumable(fileRef, file);
          uploadedDocs[key] = await getDownloadURL(uploadTask.ref);
        }
      }

      // If files were uploaded, attach the URLs to the application document
      if (Object.keys(uploadedDocs).length > 0) {
        await updateDoc(appRef, { documentUrls: uploadedDocs });
      }

      setSuccess(true);
      
      // Delay to show success message before closing
      setTimeout(() => { 
        if (onSubmitted) onSubmitted(); 
        else onClose(); 
      }, 2500);

    } catch (err: any) {
      console.error("Submission error:", err);
      setError("Failed to save application: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full bg-white max-h-[90vh] overflow-y-auto px-1">
      {success ? (
        <div className="flex flex-col items-center py-12 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-black text-[#002b5c]">Application Received</h3>
          <p className="text-slate-500 mt-2">Your 2026 teaching profile is now being verified.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <Alert variant="destructive"><AlertDescription className="font-bold">{error}</AlertDescription></Alert>}

          {/* PERSONAL INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">First Name</Label>
              <Input className="h-12 rounded-xl bg-slate-50 border-none" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">Last Name</Label>
              <Input className="h-12 rounded-xl bg-slate-50 border-none" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} required />
            </div>
          </div>

          {/* ACADEMIC SPECIALIZATION */}
          <div className="p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100 space-y-5">
            <div className="flex items-center gap-2 text-[#002b5c]">
              <BookOpen size={18} className="text-blue-600" />
              <h4 className="text-xs font-black uppercase tracking-widest">Academic Specialization</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-blue-600 uppercase">1. Select Curriculum</Label>
                <Select value={selectedCurriculum} onValueChange={(v: CurriculumType) => setSelectedCurriculum(v)}>
                  <SelectTrigger className="bg-white rounded-xl h-11 border-blue-100"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CURRICULA_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-blue-600 uppercase">2. Choose Subject</Label>
                <Select key={subjectKey} onValueChange={addSubject}>
                  <SelectTrigger className="bg-white rounded-xl h-11 border-blue-100">
                    <SelectValue placeholder="Add to your list..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECT_DATABASE[selectedCurriculum].map(s => (
                      <SelectItem key={`${selectedCurriculum}-${s}`} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SUBJECT BADGES */}
            <div className="flex flex-wrap gap-2 pt-2">
              {form.subjects.map((s, index) => (
                <Badge key={index} variant="secondary" className="bg-white border-blue-200 text-[#002b5c] font-bold py-2 px-3 rounded-xl gap-2 shadow-sm">
                  <span className="opacity-40 text-[9px] uppercase">{s.curriculum}</span> {s.name}
                  <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeSubject(index)} />
                </Badge>
              ))}
              {form.subjects.length === 0 && <p className="text-[10px] text-slate-400 italic ml-1">No subjects selected for 2026 intake.</p>}
            </div>
          </div>

          {/* EXPERIENCE & FOCUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">Years of Experience</Label>
              <Input type="number" className="h-12 rounded-xl bg-slate-50 border-none" value={form.yearsOfExperience || ""} onChange={(e) => setForm({...form, yearsOfExperience: parseInt(e.target.value) || 0})} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">Expertise Level</Label>
              <Select value={form.gradePhase} onValueChange={(v: any) => setForm({...form, gradePhase: v})}>
                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Matric Rewrite">Matric Rewrite / Upgrade Specialist</SelectItem>
                  <SelectItem value="Secondary">High School (Grade 8-12)</SelectItem>
                  {/* <SelectItem value="Primary">Primary (Foundation/Intermediate)</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* FILE UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">Professional CV (PDF)</Label>
              <Input type="file" accept=".pdf" className="h-12 rounded-xl bg-slate-50 border-none pt-4 text-[10px]" onChange={(e) => handleFileChange("cv", e.target.files)} />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-black uppercase text-slate-400">Qualifications (PDF)</Label>
              <Input type="file" accept=".pdf" className="h-12 rounded-xl bg-slate-50 border-none pt-4 text-[10px]" onChange={(e) => handleFileChange("qualification", e.target.files)} />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-[#002b5c] hover:bg-blue-700 text-white font-black tracking-widest shadow-xl transition-all">
              {loading ? <Loader2 className="animate-spin" /> : "SUBMIT APPLICATION"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose} className="text-slate-400 font-bold text-[10px] uppercase">
              Cancel and return to login
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}