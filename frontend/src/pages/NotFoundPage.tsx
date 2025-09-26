// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-2xl mt-4 font-semibold text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild className="mt-6">
        <Link to="/home">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;