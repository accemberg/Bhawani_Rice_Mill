import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export async function getStats() {
  const snapshot = await getDocs(collection(db, "Stats"));

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}