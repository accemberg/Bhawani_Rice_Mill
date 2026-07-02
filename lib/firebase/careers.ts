import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export interface Applicant {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  resumeFileName?: string;
  status?: string;
  appliedAt?: any;
}

export interface JobListing {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  type?: string;
}

export async function getCareersData() {
  const snapshot = await getDocs(collection(db, "careers"));

  const applicants: Applicant[] = [];
  const jobListings: JobListing[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();

    // Check: agar resumeFileName field hai, toh yeh applicant hai
    if ("resumeFileName" in data) {
      applicants.push({ id: doc.id, ...data } as Applicant);
    } else {
      jobListings.push({ id: doc.id, ...data } as JobListing);
    }
  });

  // Applicants ko sabse naya pehle dikhao (agar appliedAt hai)
  applicants.sort((a, b) => {
    if (!a.appliedAt) return 1;
    if (!b.appliedAt) return -1;
    return b.appliedAt.toMillis() - a.appliedAt.toMillis();
  });

  return { applicants, jobListings };
}