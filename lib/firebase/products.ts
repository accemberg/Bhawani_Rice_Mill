import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export async function getProducts() {
  const snapshot = await getDocs(collection(db, "Products"));
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}