import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/how-it-works', label: 'How it Works' },
    { to: '/browse-skills', label: 'Browse Skills' },
    { to: '/login', label: 'Login/SignUp' },
  ];

  return (
    <nav className="w-full bg-black px-4 py-3 flex items-center justify-between shadow-none">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-9 h-9 bg-accent flex items-center justify-center rounded-full">
          <span className="text-white text-xl font-bold">S</span>
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">SkillLoop</span>
      </Link>
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-lg font-medium transition-colors px-2 py-1 rounded-lg ${location.pathname === link.to ? 'text-accent' : 'text-white hover:text-accent'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white text-2xl focus:outline-none ml-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-2 py-4 z-50 shadow-lg md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg font-medium transition-colors px-2 py-1 rounded-lg ${location.pathname === link.to ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar; 