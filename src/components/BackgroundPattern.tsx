import React from 'react';

const BackgroundPattern: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-tan-50/95 via-tan-100/90 to-tan-50/95 dark:from-navy-900/95 dark:via-navy-800/90 dark:to-navy-900/95" />

      {/* Animated Patterns */}
      <div className="absolute inset-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern 
                id="grid" 
                width="32" 
                height="32" 
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(30)"
              >
                <path 
                  d="M0 0h32v32H0z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  strokeDasharray="2,4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {/* Large Decorative Circle */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-wine-500/5 dark:bg-wine-500/3 blur-3xl animate-float" />
          
          {/* Medium Decorative Circle */}
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-navy-500/5 dark:bg-navy-500/3 blur-2xl animate-float-delayed" />
          
          {/* Small Decorative Circle */}
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-tan-300/5 dark:bg-tan-300/3 blur-xl animate-float" />
        </div>

        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern 
                id="mesh" 
                width="60" 
                height="60" 
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <path 
                  d="M0 0h60v60H0z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  strokeDasharray="4,8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mesh)" />
          </svg>
        </div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tan-50/30 to-tan-50/50 dark:via-navy-900/30 dark:to-navy-900/50" />
      </div>

      {/* Accent Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Right Accent */}
        <div className="absolute -top-24 right-0 w-96 h-96 bg-wine-500/10 dark:bg-wine-500/5 rounded-full blur-3xl transform rotate-12 translate-x-1/4" />
        
        {/* Bottom Left Accent */}
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-navy-500/10 dark:bg-navy-500/5 rounded-full blur-3xl transform -rotate-12 -translate-x-1/4" />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </div>
  );
};

export default BackgroundPattern;