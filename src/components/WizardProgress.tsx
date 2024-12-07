import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface WizardProgressProps {
  steps: string[];
  currentStep: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full mb-6 sm:mb-8 px-2">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col sm:flex-row items-center flex-1">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full transition-colors',
                index <= currentStep
                  ? 'bg-navy-600 text-white'
                  : 'bg-tan-100 text-gray-500'
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span
              className={cn(
                'hidden sm:block ml-2 text-sm font-medium whitespace-nowrap',
                index === currentStep
                  ? 'text-navy-600 dark:text-tan-50'
                  : index < currentStep
                  ? 'text-navy-900 dark:text-tan-100'
                  : 'text-gray-500 dark:text-tan-300'
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-2',
                index < currentStep ? 'bg-navy-600' : 'bg-tan-100'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WizardProgress;