// pages/index.tsx

"use client";

import Sidebar from "../components/sidebar";
import Client from "../components/client";

const Dashboard = () => {
  {
    return (
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-4 flex-grow">
          {/* Konten halaman Anda */}
          <Client></Client>
        </div>
      </div>
    );
  }
};
export default Dashboard;
