// src/components/layout/Footer.tsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 text-center">
      <p className="text-sm text-gray-500">
        &copy; {currentYear} SmartScan Pro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;