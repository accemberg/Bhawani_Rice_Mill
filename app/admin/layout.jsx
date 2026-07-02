"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { watchAuthState } from "@/lib/firebase/auth";

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = watchAuthState((currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Agar login nahi hai aur login page pe nahi hai, to bhej do login pe
      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // Jab tak check ho raha hai, loading dikhao
  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  return <div>{children}</div>;
}