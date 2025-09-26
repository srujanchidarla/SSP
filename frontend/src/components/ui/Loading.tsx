// src/components/ui/Loading.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import cn from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, className }) => {
  return (
    <Loader2
      size={size}
      className={cn('animate-spin text-indigo-600', className)}
    />
  );
};

export const FullPageLoader: React.FC = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <LoadingSpinner size={48} />
        </div>
    )
}

export default LoadingSpinner;