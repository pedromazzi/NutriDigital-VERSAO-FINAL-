import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: string;
}

const Input: React.FC<InputProps> = ({ label, error, suffix, className, id, ...props }) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : undefined);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            'w-full p-3 border rounded-lg focus:outline-none focus:ring-2',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500',
            suffix ? 'pr-10' : '', // Add padding for suffix
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;