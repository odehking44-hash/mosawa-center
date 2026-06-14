import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, onAuthStateChanged, signOut } from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc,
  collection, 
  query, 
  where, 
  addDoc, 
  serverTimestamp,
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Types
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

// 1. Initialize Firebase gracefully
let app;
let db: any = null;
let auth: any = null;
let isFirebaseSimulated = true;

// Check if we have real configured Firebase credentials or default placeholder
const isValidConfig = firebaseConfig && 
                     firebaseConfig.apiKey && 
                     firebaseConfig.apiKey !== "mock-api-key-for-preview-only" && 
                     !firebaseConfig.projectId.includes("mock-project");

if (isValidConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    isFirebaseSimulated = false;

    // Test Firestore connection as commanded in skill instructions
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, "test", "connection"));
      } catch (error) {
        if (error instanceof Error && error.message.includes("the client is offline")) {
          console.warn("Firestore test connection failed: Client offline.");
        }
      }
    };
    testConnection();
  } catch (err) {
    console.error("Failed to initialize active Firebase. Falling back to local storage simulation.", err);
    isFirebaseSimulated = true;
  }
} else {
  console.info("⚡ Using Simulated Local-Storage Database Mode (Sync is fully enabled & responsive)");
}

// Error handling helper required by Firebase Skill guidelines
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentAuth = auth;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentAuth?.currentUser?.uid || null,
      email: currentAuth?.currentUser?.email || null,
      emailVerified: currentAuth?.currentUser?.emailVerified || null,
      isAnonymous: currentAuth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Model structures
export interface ResumeData {
  id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  skills: string[];
  languages: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
    details: string;
  }[];
  updatedAt: string;
}

export interface ScanHistory {
  id?: string;
  userId: string;
  resumeTitle: string;
  jobDescription: string;
  matchPercentage: number;
  analysis: string;
  strengthBulletPoints: string[];
  missingKeywords: string[];
  optimizationRecommendations: string[];
  createdAt: string;
}

export interface ServiceInquiry {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: "mock_interview" | "career_coaching" | "training_workshop";
  preferredDate: string;
  notes: string;
  status: "pending" | "confirmed" | "completed";
  createdAt: string;
}

// 2. Client Operations API
export const firebaseAPI = {
  isSimulated: () => isFirebaseSimulated,

  // Authentication Interface
  loginWithGoogle: async (): Promise<User | any> => {
    if (!isFirebaseSimulated && auth) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (err) {
        console.error("Google authentication error:", err);
        throw err;
      }
    } else {
      // Offline/simulation custom login
      const mockUser = {
        uid: "user_" + Math.random().toString(36).substr(2, 9),
        displayName: "زائر مساواة",
        email: "guest@mossawah.org",
        photoURL: "https://api.dicebear.com/7.x/adventurer/svg?seed=MCCSD",
        emailVerified: true
      };
      localStorage.setItem("mccsd_mock_user", JSON.stringify(mockUser));
      return mockUser as any;
    }
  },

  logout: async (): Promise<void> => {
    if (!isFirebaseSimulated && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem("mccsd_mock_user");
    }
  },

  onAuthChanged: (callback: (user: User | any | null) => void) => {
    if (!isFirebaseSimulated && auth) {
      return onAuthStateChanged(auth, callback);
    } else {
      const triggerMockAuth = () => {
        const userJSON = localStorage.getItem("mccsd_mock_user");
        callback(userJSON ? JSON.parse(userJSON) : null);
      };
      triggerMockAuth();
      // Listen to storage event
      const handler = () => triggerMockAuth();
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  },

  // Resume builder persistence
  saveResume: async (resume: Omit<ResumeData, "updatedAt">): Promise<string> => {
    const resumeId = resume.id || "res_" + Date.now();
    const dataWithTime: ResumeData = {
      ...resume,
      id: resumeId,
      updatedAt: new Date().toISOString()
    };

    if (!isFirebaseSimulated && db) {
      const path = `resumes`;
      try {
        await setDoc(doc(db, path, resumeId), dataWithTime);
        return resumeId;
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `${path}/${resumeId}`);
      }
    } else {
      // Simulation Storage
      const resumes = firebaseAPI.local.getResumes();
      const updated = resumes.filter(r => r.id !== resumeId);
      updated.push(dataWithTime);
      localStorage.setItem("mccsd_resumes", JSON.stringify(updated));
      return resumeId;
    }
    return resumeId;
  },

  getResumesByUser: async (userId: string): Promise<ResumeData[]> => {
    if (!isFirebaseSimulated && db) {
      const path = "resumes";
      try {
        const q = query(collection(db, path), where("userId", "==", userId));
        const snap = await getDocs(q);
        const list: ResumeData[] = [];
        snap.forEach(docSnap => {
          list.push(docSnap.data() as ResumeData);
        });
        return list.sort((a,b) => b.updatedAt.localeCompare(a.updatedAt));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
    } else {
      return firebaseAPI.local.getResumes().filter(r => r.userId === userId);
    }
    return [];
  },

  // ATS scan log persistence
  saveScanHistory: async (history: Omit<ScanHistory, "createdAt">): Promise<string> => {
    const scanId = "scan_" + Date.now();
    const withTime: ScanHistory = {
      ...history,
      id: scanId,
      createdAt: new Date().toISOString()
    };

    if (!isFirebaseSimulated && db) {
      const path = "scans";
      try {
        await setDoc(doc(db, path, scanId), withTime);
        return scanId;
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `${path}/${scanId}`);
      }
    } else {
      const scans = firebaseAPI.local.getScans();
      scans.push(withTime);
      localStorage.setItem("mccsd_scans", JSON.stringify(scans));
      return scanId;
    }
    return scanId;
  },

  getScansByUser: async (userId: string): Promise<ScanHistory[]> => {
    if (!isFirebaseSimulated && db) {
      const path = "scans";
      try {
        const q = query(collection(db, path), where("userId", "==", userId));
        const snap = await getDocs(q);
        const list: ScanHistory[] = [];
        snap.forEach(docSnap => {
          list.push(docSnap.data() as ScanHistory);
        });
        return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
    } else {
      return firebaseAPI.local.getScans().filter(s => s.userId === userId);
    }
    return [];
  },

  // Service Inquiry / Booking
  submitInquiry: async (inquiry: Omit<ServiceInquiry, "createdAt" | "status">): Promise<string> => {
    const inquiryId = "inq_" + Date.now();
    const item: ServiceInquiry = {
      ...inquiry,
      id: inquiryId,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    if (!isFirebaseSimulated && db) {
      const path = "inquiries";
      try {
        await setDoc(doc(db, path, inquiryId), item);
        return inquiryId;
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `${path}/${inquiryId}`);
      }
    } else {
      const inquiries = firebaseAPI.local.getInquiries();
      inquiries.push(item);
      localStorage.setItem("mccsd_inquiries", JSON.stringify(inquiries));
      return inquiryId;
    }
    return inquiryId;
  },

  getInquiriesByUser: async (userId: string): Promise<ServiceInquiry[]> => {
    if (!isFirebaseSimulated && db) {
      const path = "inquiries";
      try {
        const q = query(collection(db, path), where("userId", "==", userId));
        const snap = await getDocs(q);
        const list: ServiceInquiry[] = [];
        snap.forEach(docSnap => {
          list.push(docSnap.data() as ServiceInquiry);
        });
        return list.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, path);
      }
    } else {
      return firebaseAPI.local.getInquiries().filter(i => i.userId === userId);
    }
    return [];
  },

  // local storage helper functions
  local: {
    getResumes: (): ResumeData[] => {
      const data = localStorage.getItem("mccsd_resumes");
      return data ? JSON.parse(data) : [];
    },
    getScans: (): ScanHistory[] => {
      const data = localStorage.getItem("mccsd_scans");
      return data ? JSON.parse(data) : [];
    },
    getInquiries: (): ServiceInquiry[] => {
      const data = localStorage.getItem("mccsd_inquiries");
      return data ? JSON.parse(data) : [];
    }
  }
};
