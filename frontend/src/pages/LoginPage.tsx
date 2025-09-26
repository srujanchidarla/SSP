// src/pages/LoginPage.tsx
import React from 'react';
import { LoginForm } from '../components/auth';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <LoginForm />
    </div>
  );
};

export default LoginPage;