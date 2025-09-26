// src/components/ui/Input.tsx
import React from 'react';
import styles from './Input.module.css';
import cn from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, name, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <input
          type={type}
          id={name}
          name={name}
          className={cn(styles.input, className)}
          ref={ref}
          {...props}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };