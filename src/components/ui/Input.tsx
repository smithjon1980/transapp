import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className, 
  id, 
  icon: Icon, 
  required,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          {label}
          {required && <span className="text-wine-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-navy-400 dark:text-tan-300" />
          </div>
        )}
        <input
          id={id}
          className={cn(
            "block w-full rounded-xl border transition-all duration-300",
            "bg-white/95 dark:bg-navy-800/95 backdrop-blur-sm",
            "shadow-sm",
            "placeholder:text-navy-400 dark:placeholder:text-tan-300",
            Icon && "pl-11",
            error
              ? "border-wine-300 focus:border-wine-500 focus:ring-2 focus:ring-wine-500/20"
              : "border-tan-200 dark:border-navy-600 focus:border-navy-500 focus:ring-2 focus:ring-navy-500/20",
            "py-3 px-4",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p 
          className="text-sm text-wine-600 mt-1" 
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;