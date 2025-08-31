import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { useUserProfile } from '../../contexts/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { userProfile, isLoading } = useUserProfile();
  
  // Debug: Log user profile state
  console.log('Header - User Profile:', { userProfile, isLoading });
  console.log('Header - Role check:', { 
    role: userProfile?.role, 
    shouldShowBeASeller: userProfile?.role !== 'seller',
    isLoading 
  });
  
  // Also check localStorage for debugging
  const storedRole = localStorage.getItem('userRole');
  console.log('Header - localStorage role:', storedRole);

  const navigation = [
    { name: 'Explore', href: '/explore' },
    { name: 'Creators', href: '/influencers' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Support', href: '/support' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Socyads Logo" 
              className="h-8 w-auto object-contain transform group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 md:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creators, services..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-slate-900 ${
                  isActive(item.href) ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Be a Seller Button - Only show if user is not already a seller */}
            {!isLoading && userProfile && userProfile.role !== 'seller' && (
              <Link
                to="/become-seller"
                className="ml-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors duration-200 shadow"
              >
                Be a Seller
              </Link>
            )}
            
            {/* Seller Dashboard Link - Show if user is already a seller */}
            {!isLoading && userProfile && userProfile.role === 'seller' && (
              <Link
                to="/seller-dashboard"
                className="ml-4 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors duration-200 shadow"
              >
                Seller Dashboard
              </Link>
            )}
            
            {/* Loading state for buttons */}
            {isLoading && (
              <div className="ml-4 px-4 py-2 rounded-lg bg-gray-300 text-gray-500 text-sm font-semibold animate-pulse">
                Loading...
              </div>
            )}
          </nav>

          {/* User Actions & Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3 transition-all duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />
      <nav
        className={`lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Mobile menu"
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/logo.png" 
              alt="Socyads Logo" 
              className="h-7 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 py-2 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {/* Be a Seller Button (Mobile) - Only show if user is not already a seller */}
          {!isLoading && userProfile && userProfile.role !== 'seller' && (
            <Link
              to="/become-seller"
              className="block mt-2 text-center px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors duration-200 shadow"
              onClick={() => setIsMenuOpen(false)}
            >
              Be a Seller
            </Link>
          )}
          
          {/* Seller Dashboard Link (Mobile) - Show if user is already a seller */}
          {!isLoading && userProfile && userProfile.role === 'seller' && (
            <Link
              to="/seller-dashboard"
              className="block mt-2 text-center px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow"
              onClick={() => setIsMenuOpen(false)}
            >
              Seller Dashboard
            </Link>
          )}
          
          {/* Loading state for mobile buttons */}
          {isLoading && (
            <div className="block mt-2 text-center px-4 py-2 rounded-lg bg-gray-300 text-gray-500 font-semibold animate-pulse">
              Loading...
            </div>
          )}
        </div>
        <div className="px-4 pb-6">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;