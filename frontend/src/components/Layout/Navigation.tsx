import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, ScanLine } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { user } = useAuth();

  // Don't render navigation if the user is not logged in
  if (!user) {
    return null;
  }

  // Common style for NavLink
  const linkStyle = "flex flex-col items-center justify-center w-full pt-2 pb-1 text-gray-500";
  const activeLinkStyle = { color: '#2563eb' }; // primary-600

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
      <div className="flex justify-around max-w-lg mx-auto">
        <NavLink
          to="/dashboard"
          className={linkStyle}
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          <Home size={24} />
          <span className="text-xs">Home</span>
        </NavLink>
        
        {/* This would open the ScannerModal, handled via state */}
        <button className={linkStyle}>
            <ScanLine size={24} />
            <span className="text-xs">Scan</span>
        </button>

        <NavLink
          to="/cart"
          className={linkStyle}
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          <ShoppingCart size={24} />
          <span className="text-xs">Cart</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;