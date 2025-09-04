import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, LogOut, FileText, Building, School, LayoutDashboard } from 'lucide-react'; // Added Dashboard icon

// --- MODIFIED HELPER FUNCTION ---
// It now accepts 'hasCompletedProfile' to make a smarter decision
const getRoleDetails = (role, hasCompletedProfile) => {
    // If profile is already complete, always point to the dashboard
    if (hasCompletedProfile) {
        return {
            icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
            link: '/dashboard',
            linkText: 'Go to Dashboard'
        };
    }
    
    // If profile is NOT complete, point to the respective setup form
    switch (role) {
        case 'freelancer':
            return { icon: <UserCircle className="w-4 h-4 mr-2" />, link: '/freelancer-profile', linkText: 'View Form Details' };
        case 'company':
            return { icon: <Building className="w-4 h-4 mr-2" />, link: '/company-register', linkText: 'View Form Details' };
        case 'institute':
            return { icon: <School className="w-4 h-4 mr-2" />, link: '/institute-register', linkText: 'View Form Details' };
        default:
            return { icon: <UserCircle className="w-4 h-4 mr-2" />, link: '/dashboard', linkText: 'Go to Dashboard' };
    }
};

const ProfileDropdown = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    // --- MODIFIED HELPER CALL ---
    // Pass the user's completion status to the helper function
    const roleDetails = getRoleDetails(user.role, user.hasCompletedProfile);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                <UserCircle className="w-6 h-6 text-gray-600" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <div className="px-4 py-2 border-b">
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize flex items-center mt-1">
                                {getRoleDetails(user.role).icon} {user.role}
                            </p>
                        </div>
                        <div className="py-1">
                            {/* --- DYNAMIC LINK AND TEXT --- */}
                            <Link
                                to={roleDetails.link}
                                onClick={handleLinkClick}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {roleDetails.icon}
                                {roleDetails.linkText}
                            </Link>
                            <button
                                onClick={onLogout}
                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;