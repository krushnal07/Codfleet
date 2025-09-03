import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {/* The Outlet will render the specific page component (e.g., DashboardPage) */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;