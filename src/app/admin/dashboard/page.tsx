"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="flex">
        <Sidebar />
        <div className="p-4 flex-grow">
          {/* Konten halaman Anda */}
          <div>Welcome, {session?.user?.name}! You are logged in.</div>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
