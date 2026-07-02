import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";

export interface GalleryImage {
  id: string;
  category?: string;
  imageurl?: string;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const snapshot = await getDocs(collection(db, "gallery"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as GalleryImage[];
}

export async function addGalleryImage(category: string, imageurl: string) {
  return await addDoc(collection(db, "gallery"), { category, imageurl });
}

export async function deleteGalleryImage(id: string) {
  return await deleteDoc(doc(db, "gallery", id));
}