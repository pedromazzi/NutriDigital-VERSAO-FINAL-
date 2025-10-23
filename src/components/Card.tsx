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
    default: 'bg-white border border-border-light',
    outlined: selected 
      ? 'bg-primary-light border-2 border-primary' 
      : 'bg-white border border-border-light hover:border-primary/50',
    elevated: selected
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5'
      : 'bg-white border border-border-light shadow-card hover:shadow-card-hover',
    // Mantendo as variantes 'goal' e 'food-category' para compatibilidade, mas mapeando para 'outlined' ou 'elevated' se necessário
    goal: selected 
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5' 
      : 'bg-white border border-border-light shadow-card hover:shadow-card-hover',
    'food-category': selected 
      ? 'bg-primary-light border-2 border-primary shadow-card-hover transform -translate-y-0.5' 
      : 'bg-white border border-border-light shadow-card hover:shadow-card-hover',
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