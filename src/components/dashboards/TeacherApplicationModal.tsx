"use client";

import TeacherApplicationForm from "../auth/TeacherApplicationForm";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { X, ShieldAlert } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void; 
  applicationId?: string | null;
  userId: string
}

export default function TeacherApplicationModal({
  open,
  onClose,
  onSubmitted,
  applicationId,
  
}: Props) {
  if (!open) return null;

  // Use the applicationId (the UID) as the primary key
  const activeId = applicationId || auth.currentUser?.uid;

  const handleForcedExit = async () => {
    // If they exit without submitting, we sign them out to prevent
    // them from being "half-logged-in" without a completed profile.
    await signOut(auth);
    onClose();
    // Optional: window.location.reload(); // Force clear states
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#002b5c]/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative animate-in zoom-in-95 fade-in duration-300">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#002b5c] tracking-tight">Teacher Registry</h2>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">Complete your 2026 Profile</p>
            </div>
          </div>
          <button 
            onClick={handleForcedExit}
            className="group p-3 hover:bg-rose-500 hover:text-white text-slate-400 rounded-2xl transition-all duration-300"
            title="Cancel Application"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {!activeId ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-slate-500 font-medium">Authenticating Secure Session...</p>
            </div>
          ) : (
            <TeacherApplicationForm
              applicationId={activeId}
              userId={activeId} 
              onClose={onClose}
              onSubmitted={onSubmitted}
            />
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            Apex Academic College • Secure Educator Onboarding
          </p>
        </div>
      </div>
    </div>
  );
}