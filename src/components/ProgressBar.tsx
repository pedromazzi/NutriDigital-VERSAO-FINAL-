import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, className }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5 mb-6", className)}>
      <div
        className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;