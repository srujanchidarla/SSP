import React from 'react';
import classnames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  disabled = false,
}) => {
  const baseStyles = 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const buttonClasses = classnames(
    baseStyles,
    variantStyles[variant],
    { 'opacity-50 cursor-not-allowed': disabled },
    className
  );

  return (
    <button type={type} onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;