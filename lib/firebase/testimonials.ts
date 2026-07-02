import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export interface Testimonial {
  id: string;
  name?: string;
  rating?: number;
  review?: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const snapshot = await getDocs(collection(db, "testimonials"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Testimonial[];
}