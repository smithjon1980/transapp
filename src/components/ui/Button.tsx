import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-br from-wine-600 to-wine-700 hover:from-wine-700 hover:to-wine-800 text-white shadow-lg shadow-wine-500/25 hover:shadow-xl hover:shadow-wine-500/30",
    secondary: "bg-tan-100 text-navy-900 hover:bg-tan-200 shadow-sm",
    outline: "border-2 border-navy-600 text-navy-600 hover:bg-navy-50 shadow-sm dark:border-tan-200 dark:text-tan-200 dark:hover:bg-navy-800"
  };

  const sizes = {
    sm: "text-sm px-4 py-2 rounded-xl",
    md: "text-base px-6 py-3 rounded-xl",
    lg: "text-lg px-8 py-4 rounded-xl"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

export default Button;