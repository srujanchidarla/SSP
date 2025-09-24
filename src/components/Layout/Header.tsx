import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      <Link to={user ? "/dashboard" : "/"} className="text-xl font-bold text-primary-600">
        Smart Scan Pro
      </Link>
      {user && (
        <button
          onClick={logout}
          className="flex items-center text-gray-600 hover:text-primary-600"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      )}
    </header>
  );
};

export default Header;