import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LayoutDashboard, UserCircle, Building, School } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown'; // Make sure you have this component

/**
 * A smart helper function to determine the correct link and text for a user.
 * It checks if the user's profile setup is complete.
 * @param {string} role - The user's role ('freelancer', 'company', etc.).
 * @param {boolean} hasCompletedProfile - The flag indicating profile status.
 * @returns {object} An object with the correct link and link text.
 */
const getRoleDetails = (role, hasCompletedProfile) => {
    // If the profile is already complete, the primary action is to go to the dashboard.
    if (hasCompletedProfile) {
        return { link: '/dashboard', linkText: 'Go to Dashboard' };
    }
    
    // If the profile is NOT complete, direct the user to the correct setup form.
    switch (role) {
        case 'freelancer': 
            return { link: '/freelancer-profile', linkText: 'Complete Profile' };
        case 'company': 
            return { link: '/company-profile-setup', linkText: 'Complete Profile' };
        case 'institute': 
            return { link: '/institute-register', linkText: 'Complete Profile' };
        default: 
            return { link: '/dashboard', linkText: 'Go to Dashboard' };
    }
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Effect to check for logged-in user on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Handles user logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsOpen(false);
        // Force a full page reload to reset all application state
        window.location.href = '/login';
    };

    const navigation = [
        { name: 'Dashboard  ', href: '/dashboard' },
        { name: 'Story', href: '/story' },
        { name: 'Network', href: '/network' },
        { name: 'Fleet Strength', href: '/fleet-strength' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Legal', href: '/legal' },
    ];

    const isActive = (path) => location.pathname === path;

    // Get dynamic link details for the mobile view
    const mobileLinkDetails = user ? getRoleDetails(user.role, user.hasCompletedProfile) : null;

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left Side: Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-red-600">CodFleet</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'text-red-600 border-b-2 border-red-600'
                                        : 'text-gray-700 hover:text-red-600 hover:border-gray-300'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        
                        {/* Desktop Auth Section */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                // If user is logged in, show the profile dropdown
                                <ProfileDropdown user={user} onLogout={handleLogout} />
                            ) : (
                                // If user is logged out, show login buttons
                                <>
                                    <Link to="/login" className="text-sm font-medium text-red-600 hover:text-red-800">
                                        Login
                                    </Link>
                                    <Button asChild className="bg-red-600 hover:bg-red-700">
                                        <Link to="/join">Join Now</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-red-600">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`block px-3 py-2 text-base font-medium transition-colors ${
                                    isActive(item.href) ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Mobile Auth Section */}
                        <div className="border-t border-gray-200 mt-4 pt-4 px-3 py-2 space-y-3">
                            {user ? (
                                // If user is logged in
                                <>
                                    <div className="px-1 pb-3 border-b">
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                    </div>
                                    <Link 
                                        to={mobileLinkDetails.link} 
                                        onClick={() => setIsOpen(false)} 
                                        className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
                                    >
                                        {mobileLinkDetails.linkText}
                                    </Link>
                                    <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                // If user is logged out
                                <>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">Register</Link>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">Login</Link>
                                    <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                                        <Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;