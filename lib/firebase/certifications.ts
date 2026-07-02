import { db } from "./config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

interface Certification {
  id: string;
  active?: boolean;
  title?: string;
  year?: string | number;
  [key: string]: any;
}

export async function getCertifications(): Promise<Certification[]> {
  const snapshot = await getDocs(collection(db, "Certifications"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    active: false, // default agar field missing hai
    ...doc.data(),
  }));
}

export async function toggleCertificationStatus(id: string, newStatus: boolean) {
  await updateDoc(doc(db, "Certifications", id), { active: newStatus });
}