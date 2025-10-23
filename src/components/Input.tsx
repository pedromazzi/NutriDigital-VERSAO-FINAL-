import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: string;
  labelClassName?: string; // Adicionado para permitir estilizar o label
}

const Input: React.FC<InputProps> = ({ label, error, suffix, className, id, labelClassName, ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className={cn("mb-5", className)}>
      {label && (
        <label htmlFor={inputId} className={cn("block mb-2 text-text-primary font-medium", labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'w-full px-3 py-3 text-base border rounded-lg transition-colors',
            error ? 'border-red-500' : 'border-gray-200', // Alterado de border-border-light para border-gray-200
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            suffix ? 'pr-12' : '',
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;