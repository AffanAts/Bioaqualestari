"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Sidebar from "../components/sidebar";
import Client from "../components/client/client";

const ClientPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('/api/auth/session');
      const data = await response.json();
      if (!data || !data.user) {
        router.push('/api/auth/signin');
      }
    };

    // Periksa sesi setiap 30 detik
    const interval = setInterval(checkSession, 30000);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-4 flex-grow">
          <Client />
        </div>
      </div>
    );
  }

  return null;
};

export default ClientPage;
