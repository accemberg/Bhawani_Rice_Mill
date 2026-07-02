import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

interface Enquiry {
  id: string;
  createdAt?: any;
  [key: string]: any;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const snapshot = await getDocs(collection(db, "enquiries"));

  const enquiries: Enquiry[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  enquiries.sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return b.createdAt.toDate() - a.createdAt.toDate();
  });

  return enquiries;
}