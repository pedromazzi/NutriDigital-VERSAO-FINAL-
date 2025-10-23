import React, { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  variant?: 'default' | 'outlined' | 'elevated' | 'goal' | 'food-category'; // Mantendo as variantes existentes e adicionando as novas
}

const Card: React.FC<CardProps> = ({
  children,
  onClick,
  selected = false,
  variant = 'default',
  className,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variants = {
    default: 'bg-white border border-gray-200', // Alterado de border-border-light para border-gray-200
    outlined: selected 
      ? 'bg-primary-light border-2 border-primary' 
      : 'bg-white border border-gray-200 hover:border-primary/50', // Alterado de border-border-light para border-gray-200
    elevated: selected
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5'
      : 'bg-white border border-gray-200 shadow-card hover:shadow-card-hover', // Alterado de border-border-light para border-gray-200
    // Mantendo as variantes 'goal' e 'food-category' para compatibilidade, mas mapeando para 'outlined' ou 'elevated' se necessário
    goal: selected 
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5' 
      : 'bg-white border border-gray-200 shadow-card hover:shadow-card-hover', // Alterado de border-border-light para border-gray-200
    'food-category': selected 
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5' 
      : 'bg-white border border-gray-200 shadow-card hover:shadow-card-hover', // Alterado de border-border-light para border-gray-200
  };

  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={cn(baseClasses, variants[variant], clickableClasses, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;