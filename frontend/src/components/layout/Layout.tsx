// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          SmartScan Pro
        </Link>
        <nav>
          <Link 
            to="/profile" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="User Profile"
          >
            <UserCircle2 className="text-gray-600" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;