import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, BarChart2, User, Home } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">FundVision</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" isActive={isActive('/')}>
              <Home className="h-5 w-5 mr-1" />
              Home
            </NavLink>
            <NavLink to="/profile" isActive={isActive('/profile')}>
              <User className="h-5 w-5 mr-1" />
              Profile
            </NavLink>
            <NavLink to="/recommendations" isActive={isActive('/recommendations')}>
              <BarChart2 className="h-5 w-5 mr-1" />
              Recommendations
            </NavLink>
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu - would be toggled */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/" isActive={isActive('/')}>Home</MobileNavLink>
          <MobileNavLink to="/profile" isActive={isActive('/profile')}>Profile</MobileNavLink>
          <MobileNavLink to="/recommendations" isActive={isActive('/recommendations')}>Recommendations</MobileNavLink>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-indigo-800 text-white'
          : 'text-gray-100 hover:bg-indigo-800 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-indigo-800 text-white'
          : 'text-gray-100 hover:bg-indigo-800 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;