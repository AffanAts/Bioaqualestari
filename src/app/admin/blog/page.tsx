// pages/index.tsx

"use client";

import Sidebar from "../components/sidebar";
import Blog from "../components/blog/blog"

const Dashboard = () => {
  {
    return (
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-4 flex-grow">
          <Blog></Blog>
        </div>
      </div>
    );
  }

  return null;
};
export default Dashboard;
