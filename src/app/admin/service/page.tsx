"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Sidebar from "../components/sidebar";
import Service from "../components/service/service";

const ServicePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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
          <Service />
        </div>
      </div>
    );
  }

  return null;
};

export default ServicePage;
