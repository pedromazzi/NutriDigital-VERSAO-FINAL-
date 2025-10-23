import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'orange';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:scale-95',
    secondary: 'bg-gray-200 text-text-primary hover:bg-gray-300 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    orange: 'bg-secondary-orange text-white hover:bg-orange-600 active:scale-95',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={cn(baseClasses, variants[variant], widthClass, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;