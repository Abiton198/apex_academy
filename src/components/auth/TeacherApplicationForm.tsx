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

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { X, GraduationCap, FileText, Loader2, CheckCircle2, ShieldCheck, Briefcase, BookOpen } from "lucide-react";

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

interface TeacherApplicationFormProps {
  applicationId?: string | null; 
  onClose: () => void;           
  onSubmitted?: () => void;      
  userId?: string | null;
}

const CURRICULA_OPTIONS: CurriculumType[] = ["CAPS", "IEB", "SACAI", "British Curriculum"];

const SUBJECT_DATABASE: Record<CurriculumType, string[]> = {
  "CAPS": [
    "Mathematics (FET)", "Mathematical Literacy (FET)", "Physical Sciences (FET)", 
    "Life Sciences (FET)", "Accounting (FET)", "Business Studies (FET)", "Economics (FET)",
    "English HL", "Afrikaans FAL", "isiZulu FAL", "Geography (FET)", "History (FET)"
  ],
  "IEB": [
    "Mathematics (IEB)", "Physical Sciences (IEB)", "Life Sciences (IEB)", 
    "Advanced Programme Mathematics", "Advanced Programme English", "Accounting (IEB)",
    "English HL (IEB)", "Business Studies (IEB)", "Information Technology (IEB)"
  ],
  "SACAI": [
    "Mathematics (SACAI)", "Mathematical Literacy (SACAI)", "Physical Sciences (SACAI)",
    "Life Sciences (SACAI)", "Technical Mathematics", "Technical Sciences", "Tourism"
  ],
  "British Curriculum": [
    "Mathematics (IGCSE/A-Level)", "Physics (IGCSE/A-Level)", "Chemistry (IGCSE/A-Level)",
    "Biology (IGCSE/A-Level)", "English Language", "Computer Science", "Business Studies"
  ]
};

export default function TeacherApplicationForm({
  applicationId,
  userId,
  onClose,
  onSubmitted,
}: TeacherApplicationFormProps) {
  
  const { user } = useAuth();
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>("CAPS");
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    yearsOfExperience: 0,
    gradePhase: "Secondary",
    subjects: [],
  });

  const [documents, setDocuments] = useState<Documents>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const handleChange = (key: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (key: keyof Documents, files: FileList | null) =>
    setDocuments((prev) => ({ ...prev, [key]: files }));

  const addSubject = (subjectName: string) => {
    // Check if subject already exists to prevent duplicates
    if (!form.subjects.some((s) => s.name === subjectName && s.curriculum === selectedCurriculum)) {
      setForm((prev) => ({
        ...prev,
        subjects: [...prev.subjects, { name: subjectName, curriculum: selectedCurriculum }],
      }));
    }
  };

  const removeSubject = (index: number) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const activeUid = userId || user?.uid;
    if (!activeUid) { setError("Security session not found."); return; }
    if (form.subjects.length === 0) { setError("Please select at least one subject."); return; }

    setError("");
    setLoading(true);

    try {
      const applicationPayload = {
        uid: activeUid,
        email: user?.email || form.email,
        personalInfo: { ...form },
        status: "submitted",
        updatedAt: serverTimestamp(),
      };

      const appRef = await addDoc(collection(db, "teacherApplications"), {
        ...applicationPayload,
        createdAt: serverTimestamp(),
      });

      const userRef = doc(db, "users", activeUid);
      await setDoc(userRef, {
        firstName: form.firstName,
        lastName: form.lastName,
        applicationStatus: "submitted", 
        profileCompleted: true,
        lastApplicationId: appRef.id,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      const uploadedDocs: Record<string, string> = {};
      for (const [key, fileList] of Object.entries(documents)) {
        if (fileList && fileList[0]) {
          const file = fileList[0];
          const fileRef = ref(storage, `teacherDocs/${activeUid}/${key}_${file.name}`);
          const uploadTask = await uploadBytesResumable(fileRef, file);
          const url = await getDownloadURL(uploadTask.ref);
          uploadedDocs[key] = url;
        }
      }

      if (Object.keys(uploadedDocs).length > 0) {
        await updateDoc(doc(db, "teacherApplications", appRef.id), { documentUrls: uploadedDocs });
      }

      setSuccess(true);
      setTimeout(() => { if (onSubmitted) onSubmitted(); else onClose(); }, 2500);

    } catch (err: any) {
      setError("Application failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {success ? (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in">
          <CheckCircle2 size={60} className="text-blue-600 mb-4" />
          <h3 className="text-2xl font-black text-[#002b5c]">Application Filed</h3>
          <p className="text-slate-500 text-sm mt-2">Redirecting to Staff Portal...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

          {/* IDENTITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-slate-400">First Name</Label>
              <Input className="h-11 rounded-xl bg-slate-50 border-none" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-slate-400">Last Name</Label>
              <Input className="h-11 rounded-xl bg-slate-50 border-none" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required />
            </div>
          </div>

          {/* CURRICULUM & SUBJECT SELECTION */}
          <div className="p-5 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="flex items-center gap-2 text-blue-700 mb-2">
              <BookOpen size={18} />
              <h4 className="text-xs font-black uppercase tracking-widest">Academic Specialization</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-blue-600 uppercase">1. Select Curriculum</Label>
                <Select value={selectedCurriculum} onValueChange={(v: any) => setSelectedCurriculum(v)}>
                  <SelectTrigger className="bg-white rounded-xl border-blue-100"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CURRICULA_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-blue-600 uppercase">2. Add Subjects</Label>
                <Select onValueChange={addSubject}>
                  <SelectTrigger className="bg-white rounded-xl border-blue-100"><SelectValue placeholder="Choose subject..." /></SelectTrigger>
                  <SelectContent>
                    {SUBJECT_DATABASE[selectedCurriculum].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CHIPS DISPLAY */}
            <div className="flex flex-wrap gap-2 pt-2">
              {form.subjects.map((s, index) => (
                <Badge key={`${s.name}-${index}`} className="bg-white text-blue-700 border-blue-200 px-3 py-1 rounded-lg gap-2 shadow-sm">
                  <span className="text-[9px] font-black opacity-50">{s.curriculum}:</span> {s.name}
                  <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => removeSubject(index)} />
                </Badge>
              ))}
              {form.subjects.length === 0 && <p className="text-[10px] text-slate-400 italic">No subjects added yet.</p>}
            </div>
          </div>

          {/* EXPERIENCE & PHASE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-slate-400">Experience (Years)</Label>
              <Input type="number" className="h-11 rounded-xl bg-slate-50 border-none" value={form.yearsOfExperience || ""} onChange={(e) => handleChange("yearsOfExperience", parseInt(e.target.value) || 0)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black uppercase text-slate-400">Grade Phase</Label>
              <Select value={form.gradePhase} onValueChange={(v: any) => handleChange("gradePhase", v)}>
                <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-none"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Secondary">High School (FET)</SelectItem>
                  <SelectItem value="Matric Rewrite">Matric Rewrite Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DocInput label="CV" onChange={(f) => handleFileChange("cv", f)} />
            <DocInput label="Qualifications" onChange={(f) => handleFileChange("qualification", f)} />
            <DocInput label="ID / Passport" onChange={(f) => handleFileChange("idDoc", f)} />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-[#002b5c] hover:bg-blue-600 text-white font-black tracking-widest shadow-xl">
            {loading ? <Loader2 className="animate-spin" /> : "SUBMIT APPLICATION"}
          </Button>
        </form>
      )}
    </div>
  );
}

function DocInput({ label, onChange }: { label: string; onChange: (f: FileList | null) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[9px] font-black uppercase text-slate-400 ml-1">{label}</Label>
      <div className="relative group">
        <Input type="file" accept=".pdf" className="rounded-xl bg-slate-50 border-none text-[10px] h-11 pt-4 file:hidden cursor-pointer" onChange={(e) => onChange(e.target.files)} />
        <FileText size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
      </div>
    </div>
  );
}