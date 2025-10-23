import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  variant?: 'info' | 'goal' | 'food-category';
}

const Card: React.FC<CardProps> = ({
  children,
  onClick,
  selected = false,
  variant = 'info',
  className,
  ...props
}) => {
  const baseClasses = 'p-4 rounded-lg shadow-sm transition-all duration-200 cursor-pointer';
  
  const variantClasses = {
    info: 'bg-white border border-gray-200 hover:shadow-md',
    goal: 'bg-white border border-gray-200 hover:border-green-500',
    'food-category': 'bg-white border border-gray-200 hover:border-green-500',
  };

  const selectedClasses = selected ? 'border-green-500 ring-2 ring-green-500' : '';

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], selectedClasses, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;