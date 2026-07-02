import { db } from "./config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export async function getStats() {
  const snapshot = await getDocs(collection(db, "Stats"));

  if (snapshot.empty) {
    return null;
  }

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function updateStats(newData: Record<string, any>) {
  const snapshot = await getDocs(collection(db, "Stats"));

  if (snapshot.empty) {
    throw new Error("Stats document not found");
  }

  const docId = snapshot.docs[0].id;
  await updateDoc(doc(db, "Stats", docId), newData);
}