
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell, MessageCircle, User } from 'lucide-react';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-tagalong-purple transition-transform duration-300 hover:scale-105"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4.5C16 5.88071 14.8807 7 13.5 7C12.1193 7 11 5.88071 11 4.5C11 3.11929 12.1193 2 13.5 2C14.8807 2 16 3.11929 16 4.5Z" fill="#9b87f5"/>
            <path d="M9 6L9 19M9 19H7M9 19H12M14 16L17 22L22 15" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L3 9L6 12" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal">
            TagAlong
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`relative px-2 py-1 font-medium transition-colors duration-300 ${isActive('/') ? 'text-tagalong-purple' : 'text-gray-600 hover:text-tagalong-purple'}`}
            >
              Home
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tagalong-purple animate-scale-in" />
              )}
            </Link>
            <Link 
              to="/find-ride" 
              className={`relative px-2 py-1 font-medium transition-colors duration-300 ${isActive('/find-ride') ? 'text-tagalong-purple' : 'text-gray-600 hover:text-tagalong-purple'}`}
            >
              Find a Ride
              {isActive('/find-ride') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tagalong-purple animate-scale-in" />
              )}
            </Link>
            <Link 
              to="/offer-ride" 
              className={`relative px-2 py-1 font-medium transition-colors duration-300 ${isActive('/offer-ride') ? 'text-tagalong-purple' : 'text-gray-600 hover:text-tagalong-purple'}`}
            >
              Offer a Ride
              {isActive('/offer-ride') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tagalong-purple animate-scale-in" />
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-tagalong-purple hover:bg-tagalong-purple/10 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-tagalong-accent rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-tagalong-purple hover:bg-tagalong-purple/10 transition-colors"
              asChild
            >
              <Link to="/chat">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-tagalong-purple hover:bg-tagalong-purple/10 transition-colors"
              asChild
            >
              <Link to="/profile">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-gray-600"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 flex flex-col gap-4 animate-fade-in md:hidden">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md ${isActive('/') ? 'bg-tagalong-purple/10 text-tagalong-purple' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/find-ride" 
              className={`px-4 py-2 rounded-md ${isActive('/find-ride') ? 'bg-tagalong-purple/10 text-tagalong-purple' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find a Ride
            </Link>
            <Link 
              to="/offer-ride" 
              className={`px-4 py-2 rounded-md ${isActive('/offer-ride') ? 'bg-tagalong-purple/10 text-tagalong-purple' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Offer a Ride
            </Link>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <Button 
                variant="ghost"
                size="icon" 
                className="text-gray-600"
                asChild
              >
                <Link to="/notifications">
                  <Bell className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost"
                size="icon" 
                className="text-gray-600"
                asChild
              >
                <Link to="/chat">
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost"
                size="icon" 
                className="text-gray-600"
                asChild
              >
                <Link to="/profile">
                  <User className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
