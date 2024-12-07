import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgImage: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  bgImage,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl aspect-[4/3]",
        "text-left transition-all duration-500",
        "hover:scale-[1.02] focus-visible:scale-[1.02]",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-wine-500/50",
        // Updated shadow for more depth and material feel
        "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-[rgba(0,_0,_0,_0.4)_0px_0px_16px]",
        "hover:shadow-[rgba(17,_17,_26,_0.2)_0px_8px_24px] dark:hover:shadow-[rgba(0,_0,_0,_0.5)_0px_8px_24px]",
        // Glass morphism effect
        "before:absolute before:inset-0 before:z-10",
        "before:bg-gradient-to-b",
        "before:from-black/0 before:via-black/40 before:to-black/90",
        "before:backdrop-blur-[2px]",
        "before:transition-opacity before:duration-500",
        "before:opacity-80 hover:before:opacity-70"
      )}
      aria-label={`Book ${title}`}
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-20 h-full p-6 sm:p-8 flex flex-col justify-end">
        {/* Icon Container */}
        <div className="mb-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div 
            className={cn(
              "w-12 h-12 rounded-xl",
              "bg-white/10 backdrop-blur-md",
              "flex items-center justify-center",
              "border border-white/20",
              "shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
            )}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className={cn(
            "text-2xl font-bold text-white",
            "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-base text-white/90",
            "line-clamp-2 group-hover:line-clamp-none",
            "transition-all duration-500",
            "drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          )}>
            {description}
          </p>
        </div>

        {/* Interactive Elements */}
        <div className="absolute top-4 right-4 flex space-x-1.5" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-lg" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200 shadow-lg" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-300 shadow-lg" />
        </div>
      </div>

      {/* Screen Reader Description */}
      <span className="sr-only">
        {description}. Click to book this service.
      </span>
    </button>
  );
};

export default ServiceCard;