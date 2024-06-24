// pages/index.tsx

"use client";

import Sidebar from "../components/sidebar";
import Service from "../components/service/service"

const Dashboard = () => {
  {
    return (
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-4 flex-grow">
          <Service></Service>
        </div>
      </div>
    );
  }

  return null;
};
export default Dashboard;
