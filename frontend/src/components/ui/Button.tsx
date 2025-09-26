// src/components/ui/Button.tsx
import React from 'react';
import styles from './Button.module.css'; // Import the CSS module
import cn from '../../utils/cn'; // We can still use cn for combining classes

// Define props for our new variants
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    // Combine the base button class with the variant class
    const buttonClasses = cn(styles.button, styles[variant], className);
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };