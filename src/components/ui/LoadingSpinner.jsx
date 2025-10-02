import { FaSpinner } from 'react-icons/fa';
import { cn } from '@/utils/helpers';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <FaSpinner
        className={cn(
          'animate-spin text-blue-600',
          sizeStyles[size],
          className
        )}
      />
    </div>
  );
};