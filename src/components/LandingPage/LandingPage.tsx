import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-primary-600 mb-4">Welcome to Smart Scan Pro</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-md">
        The future of retail is here. Scan, pay, and go in seconds. Skip the checkout lines forever.
      </p>
      <div className="w-full max-w-xs space-y-4">
        <Link to="/login">
            <Button variant="primary">Login</Button>
        </Link>
        <Link to="/register">
            <Button variant="secondary">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;