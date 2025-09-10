import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bot } from 'lucide-react'; // --- NEW: Imported Bot icon ---
import ProfileDropdown from './ProfileDropdown';
import { motion, AnimatePresence } from 'framer-motion';
import black1 from '@/assets/black1.png'; // --- NEW: For animations ---

// (The getRoleDetails helper function remains the same)
const getRoleDetails = (role, hasCompletedProfile) => {
    if (hasCompletedProfile) {
        return { link: '/dashboard', linkText: 'Go to Dashboard' };
    }
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

    // --- NEW: State to manage the chatbot popup's visibility ---
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    
    // --- NEW: The URL for your Gradio Chatbot ---
    const chatbotUrl = "https://42741c3227023c7d5c.gradio.live/";

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsOpen(false);
        window.location.href = '/login';
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Story', href: '/story' },
        { name: 'Network', href: '/network' },
        { name: 'Fleet Strength', href: '/fleet-strength' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Legal', href: '/legal' },
    ];

    const isActive = (path) => location.pathname === path;
    const mobileLinkDetails = user ? getRoleDetails(user.role, user.hasCompletedProfile) : null;
    
    // --- NEW: Animation variants for the popup window ---
    const popupVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <> {/* Use a Fragment to wrap the nav and the popup elements */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left Side: Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                {/* <span className="text-2xl font-bold text-red-600">CodFleet</span> */}
                                <img src={black1} alt="codfleet-logo" className='h-8 w-auto'></img>






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
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <ProfileDropdown user={user} onLogout={handleLogout} />
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-red-600 hover:text-red-800">Login</Link>
                                    <Button asChild className="bg-red-600 hover:bg-red-700"><Link to="/join">Join Now</Link></Button>
                                </>
                            )}
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
                            {navigation.map(/* ... */)}
                            <div className="border-t border-gray-200 mt-4 pt-4 px-3 py-2 space-y-3">
                                {user ? (
                                    // ... Logged-in mobile view
                                    <>
                                        <div className="px-1 pb-3 border-b"><p className="text-sm font-semibold text-gray-900">{user.name}</p><p className="text-xs text-gray-500 capitalize">{user.role}</p></div>
                                        <Link to={mobileLinkDetails.link} onClick={() => setIsOpen(false)} className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">{mobileLinkDetails.linkText}</Link>
                                        <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">Logout</Button>
                                    </>
                                ) : (
                                    // ... Logged-out mobile view
                                    <>
                                        <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">Register</Link>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md">Login</Link>
                                        <Button asChild className="w-full bg-red-600 hover:bg-red-700"><Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link></Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- NEW: Floating Chat Button and Popup Window --- */}
            {/* These are rendered by the Navbar but positioned relative to the whole screen */}
            
            {/* The Floating Action Button (Chat Bubble) */}
            <AnimatePresence>
                {!isChatbotOpen && (
                    <motion.button
                        onClick={() => setIsChatbotOpen(true)}
                        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        title="Open Chat Assistant"
                    >
                        <Bot size={32} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* The Chatbot Popup Window */}
            <AnimatePresence>
                {isChatbotOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-white rounded-xl shadow-2xl w-[calc(100%-3rem)] sm:w-96 h-[70vh] max-h-[600px] flex flex-col overflow-hidden border border-gray-200"
                        variants={popupVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Chat with Assistant</h3>
                            <button
                                onClick={() => setIsChatbotOpen(false)}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        {/* Iframe Content */}
                        <div className="flex-1 overflow-auto">
                            <iframe
                                src={chatbotUrl}
                                title="CodFleet Chatbot"
                                className="w-full h-full border-0"
                                allow="microphone; camera"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
