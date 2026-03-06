"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db, googleProvider } from "@/lib/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2, AlertCircle, Chrome, X, Eye, EyeOff } from "lucide-react";
import TeacherApplicationModal from "../dashboards/TeacherApplicationModal";

const ROLES = [
  { value: "parent", label: "Parent" },
  { value: "teacher", label: "Teacher" },
  { value: "principal", label: "Principal" },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const redirectedRef = useRef(false);

  const [tab, setTab] = useState<"signin" | "student" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [studentAuthLoading, setStudentAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [newTeacherUid, setNewTeacherUid] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

 /* =====================================================
   AUTH STATE LISTENER (FIXED PERMISSION GUARD)
   ===================================================== */

   console.log("MODAL STATE:", showTeacherModal, newTeacherUid);
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {

    console.log("AUTH STATE CHANGED:", user?.uid);

    if (!user) {
      setLoading(false);
      return;
    }

    try {

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      console.log("USER DOC EXISTS:", snap.exists());

      if (!snap.exists()) {
        setLoading(false);
        return;
      }

      const data = snap.data();

      console.log("USER DATA:", data);

      // ✅ FORCE MODAL OPEN
      if (data.role === "teacher" && data.applicationStatus === "pending") {

        console.log("OPENING TEACHER MODAL");

        setNewTeacherUid(user.uid);

        // IMPORTANT: use functional update to guarantee render
        setShowTeacherModal(() => true);

        setLoading(false);

        return;
      }

      // redirects
      if (data.role === "teacher") {
        navigate("/teacher-dashboard");
      }

      if (data.role === "parent") {
        navigate("/parent-dashboard");
      }

      if (data.role === "principal") {
        navigate("/principal-dashboard");
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }

  });

  return () => unsub();

}, []);

  /* =====================================================
     GOOGLE AUTH (SIGN IN & REGISTER)
     ===================================================== */
const handleGoogle = async () => {
  if (authLoading) return;

  // 1. Role requirement logic
  if (tab === "signup" && !selectedRole) {
    setError("Please select a role before continuing with Google");
    return;
  }

  setError(null);
  setAuthLoading(true);

  try {
    googleProvider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    // 2. Existing User Check
 if (snap.exists()) {
  const data = snap.data();

  if (data.role === "teacher" && data.applicationStatus === "pending") {
    setNewTeacherUid(user.uid);
    setShowTeacherModal(true);
    setLoading(false); // ← ADD THIS
  }

  setAuthLoading(false); // ← ADD THIS
  return;
}

    // 3. New User Creation
    // Default to 'parent' if they used the Sign In tab for a first-time login
    const finalRole = selectedRole || "parent"; 
    
    const newUserProfile = {
      uid: user.uid,
      email: user.email,
      role: finalRole,
      applicationStatus: finalRole === "teacher" ? "pending" : "approved",
      createdAt: serverTimestamp(),
    };

    await setDoc(ref, newUserProfile);

    // 4. Immediate Teacher Modal Trigger
    // This bypasses the useEffect delay for a smoother registration UX
    if (finalRole === "teacher") {
  setNewTeacherUid(user.uid);
  setShowTeacherModal(true);
  setLoading(false);
}

setAuthLoading(false);

  } catch (err: any) {
    console.error("Google Auth Error:", err);
    setError(err.message || "Google sign-in failed");
    setAuthLoading(false); 
  }
};

  /* =====================================================
     STUDENT LOGIN (CUSTOM LOCAL STORAGE SESSION)
     ===================================================== */
const handleStudentLogin = async () => {
  if (!username || !password) {
    setError("Please enter both username and password.");
    return;
  }

  setStudentAuthLoading(true);
  setError(null);

  try {
    // 1. Search Firestore for the student
    const q = query(
      collection(db, "students"),
      where("username", "==", username.toLowerCase().trim())
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Student account not found.");
    }

    const studentDoc = querySnapshot.docs[0];
    const studentData = studentDoc.data();

    // 2. Verify Password (Base64 match)
    const encodedInput = btoa(password);
    if (encodedInput !== studentData.passwordHash) {
      throw new Error("Invalid username or password.");
    }

    // 3. Check if account is active
    if (studentData.loginEnabled === false) {
      throw new Error("This account has been disabled by the parent.");
    }

    // 4. CONSTRUCT SESSION DATA
    // We include BOTH names and check for lowercase fallbacks (firstname/lastname)
    const studentSession = {
      uid: studentDoc.id,
      role: "student",
      firstName: studentData.firstName || studentData.firstname || "Student",
      lastName: studentData.lastName || studentData.lastname || "",
      parentId: studentData.parentId || "",
      loginTime: Date.now(),
    };

    // 5. SAVE TO SESSION STORAGE (Tab-Specific)
    // This allows different tabs to have different users logged in
    sessionStorage.setItem("studentSession", JSON.stringify(studentSession));

    // 6. REDIRECT
    window.location.href = `/student-dashboard/${studentDoc.id}`;

  } catch (err: any) {
    console.error("Student Login Error:", err);
    setError(err.message || "An error occurred during login.");
  } finally {
    setStudentAuthLoading(false);
  }
};
  /* =====================================================
     EMAIL SIGN IN (STAFF/PARENTS)
     ===================================================== */
  const handleEmailPasswordSignIn = async () => {
    if (authLoading) return;
    setError(null);
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError("Invalid email or password.");
      setAuthLoading(false);
    }
  };

  const handleTeacherSubmitted = async () => {
    if (!newTeacherUid) return;
    try {
      await updateDoc(doc(db, "users", newTeacherUid), {
        applicationStatus: "submitted",
        profileCompleted: true,
        submittedAt: serverTimestamp(),
      });
      setShowTeacherModal(false);
      navigate("/teacher-dashboard", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
}

  return (
    <>
     <div
  className="
  min-h-screen
  bg-gradient-to-br from-indigo-50 to-blue-50
  flex
  justify-center
  items-start
  p-4
"
>

  <Card
    className="
    w-full
    max-w-md
    rounded-3xl
    shadow-xl
    my-6
    flex
    flex-col
  "
  >

    {/* HEADER */}
    <CardHeader
      className="
      relative
      bg-gradient-to-r
      from-indigo-600
      to-purple-600
      text-white
      text-center
      py-6
    "
    >

      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        className="absolute top-4 right-4 rounded-full bg-white/20 p-2 hover:bg-white/40 transition"
      >
        <X size={20} />
      </button>

      <CardTitle className="text-3xl font-bold">
        APEX Academy
      </CardTitle>

      <CardDescription className="text-indigo-100">
        Portal Access
      </CardDescription>

    </CardHeader>

    {/* CONTENT */}
    <CardContent className="p-6 space-y-6">

      {error && (
        <Alert variant="destructive" className="rounded-xl">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* TABS */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>

        <TabsList className="grid grid-cols-3 bg-indigo-50 rounded-xl p-1">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="signup">Register</TabsTrigger>
        </TabsList>

        {/* SIGN IN */}
        <TabsContent value="signin" className="space-y-4 mt-6">

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="name@school.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2 relative">
            <Label>Password</Label>

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            className="w-full"
            disabled={authLoading}
            onClick={handleEmailPasswordSignIn}
          >
            {authLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>

        </TabsContent>

        {/* STUDENT */}
        <TabsContent value="student" className="space-y-4 mt-6">

          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="firstname.lastname"
            />
          </div>

          <div className="space-y-2 relative">
            <Label>Password</Label>

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            className="w-full bg-indigo-600"
            disabled={studentAuthLoading}
            onClick={handleStudentLogin}
          >
            {studentAuthLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Access Portal"
            )}
          </Button>

        </TabsContent>

        {/* REGISTER */}
        <TabsContent value="signup" className="space-y-4 mt-6">

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3">

            <Label className="text-[10px] font-black uppercase text-indigo-600">
              Select Your Role
            </Label>

            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger className="rounded-xl border-none">
                <SelectValue placeholder="I am a..." />
              </SelectTrigger>

              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>

            </Select>

          </div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold"
            onClick={handleGoogle}
            disabled={!selectedRole || authLoading}
          >
            {authLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Chrome className="mr-2" size={18} />
            )}

            Register with Google
          </Button>

        </TabsContent>

      </Tabs>

      {/* SOCIAL LOGIN */}
      <div className="relative py-2">

        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-[10px] uppercase">
          <span className="bg-white px-2 text-slate-400">
            Social Login
          </span>
        </div>

      </div>

      <Button
        variant="outline"
        className="w-full rounded-xl h-12 mb-80"
        onClick={handleGoogle}
        disabled={authLoading}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="mr-3 h-4 w-4"
          alt="G"
        />

        Google Sign In
      </Button>

    </CardContent>

  </Card>

</div>

         <TeacherApplicationModal 
  open={showTeacherModal}
  userId={newTeacherUid}
  applicationId={newTeacherUid}
  onClose={() => setShowTeacherModal(false)}
  onSubmitted={() => {
    setShowTeacherModal(false);
    window.location.href = "/teacher-dashboard";
  }}
/>
    </>
  );
}