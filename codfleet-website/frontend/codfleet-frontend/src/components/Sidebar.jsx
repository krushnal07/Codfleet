import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, FileText, ShieldAlert } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Use window.location to force a full refresh to the login page
    window.location.href = '/login'; 
  };

  const sidebarLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Freelancers', href: '/freelancers', icon: Users },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Compliance', href: '/compliance', icon: ShieldAlert },
  ];

  // Style for active NavLink
  const activeLinkStyle = {
    backgroundColor: '#DC2626', // red-600
    color: 'white',
  };

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 text-white">
      <h2 className="text-3xl font-semibold text-center text-red-500">CodFleet</h2>
      
      <div className="flex flex-col justify-between mt-6 flex-1">
        <nav>
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="flex items-center px-4 py-2 mt-5 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
              <link.icon className="w-5 h-5" />
              <span className="mx-4 font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-5 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;