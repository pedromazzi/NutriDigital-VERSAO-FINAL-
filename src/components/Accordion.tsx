import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  className,
  headerClassName,
  contentClassName,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(prev => !prev);
    }
  };

  return (
    <div className={cn("border border-gray-200 rounded-lg bg-white shadow-sm", className)}>
      <button
        className={cn(
          "flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800",
          "hover:bg-gray-50 transition-colors duration-200",
          isOpen ? "rounded-t-lg" : "rounded-lg",
          headerClassName
        )}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform duration-200",
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>
      {isOpen && (
        <div className={cn("p-4 border-t border-gray-200", contentClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;