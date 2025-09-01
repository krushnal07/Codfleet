import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Story', href: '/story' },
    { name: 'Network', href: '/network' },
    { name: 'Fleet Strength', href: '/fleet-strength' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Legal', href: '/legal' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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

            {/* Register / Login Buttons */}
            <Link to="/register" className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out">
              Register
            </Link>
            <Link to="/login" className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-150 ease-in-out">
              Login
            </Link>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link to="/join">Join Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
            <Link to="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Register</Link>
              <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Login</Link>
              <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                <Link to="/join" onClick={() => setIsOpen(false)}>Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;