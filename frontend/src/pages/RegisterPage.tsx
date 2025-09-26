// src/pages/RegisterPage.tsx
import React from 'react';
import { RegisterForm } from '../components/auth';

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;