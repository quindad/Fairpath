import React from 'react';

interface LogoFinalProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  showText?: boolean;
  className?: string;
}

// Main LogoFinal component used throughout the application
export default function LogoFinal({ 
  size = 'md', 
  variant = 'light',
  showText = true,
  className = '' 
}: LogoFinalProps) {
  const sizeMap = {
    sm: { height: 32, fontSize: '12px', subFontSize: '8px' },
    md: { height: 50, fontSize: '20px', subFontSize: '10px' },
    lg: { height: 70, fontSize: '28px', subFontSize: '12px' },
    xl: { height: 100, fontSize: '36px', subFontSize: '14px' }
  };

  const dimensions = sizeMap[size];
  
  const colors = variant === 'light' 
    ? { primary: '#FFFFFF', secondary: '#A8F32C', accent: '#7BC41A' }
    : { primary: '#000000', secondary: '#A8F32C', accent: '#7BC41A' };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <svg 
        height={dimensions.height} 
        width={dimensions.height} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Rising Steps/Pathway */}
        <path 
          d="M40 140 L70 140 L70 110 L100 110 L100 80 L130 80 L130 50 L160 50" 
          stroke={colors.secondary} 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Step Platforms */}
        <rect x="40" y="140" width="30" height="4" fill={colors.accent} rx="2" />
        <rect x="70" y="110" width="30" height="4" fill={colors.accent} rx="2" />
        <rect x="100" y="80" width="30" height="4" fill={colors.accent} rx="2" />
        <rect x="130" y="50" width="30" height="4" fill={colors.accent} rx="2" />
        
        {/* Forward Arrow */}
        <path 
          d="M155 50 L170 50 L165 45 M170 50 L165 55" 
          stroke={colors.primary} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className="font-bold leading-none"
            style={{ 
              color: colors.primary, 
              fontSize: dimensions.fontSize 
            }}
          >
            FairPath
          </span>
          <span 
            className="tracking-wider leading-none mt-1"
            style={{ 
              color: colors.secondary, 
              fontSize: dimensions.subFontSize,
              fontWeight: 500
            }}
          >
            INDUSTRIES
          </span>
        </div>
      )}
    </div>
  );
}
