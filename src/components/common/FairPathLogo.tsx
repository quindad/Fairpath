import React from 'react';

interface LogoProps {
  size?: number;
  variant?: 'dark' | 'light';
  className?: string;
}

// Main Corporate Logo
export default function FairPathLogo({ size = 200, variant = 'dark', className = '' }: LogoProps) {
  const colors = variant === 'light' 
    ? { primary: '#FFFFFF', secondary: '#A8F32C', accent: '#7BC41A' }
    : { primary: '#000000', secondary: '#A8F32C', accent: '#7BC41A' };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
      
      {/* Text */}
      <text 
        x="100" 
        y="175" 
        textAnchor="middle" 
        fill={colors.primary} 
        fontSize="24" 
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        FairPath
      </text>
      <text 
        x="100" 
        y="190" 
        textAnchor="middle" 
        fill={colors.secondary} 
        fontSize="10" 
        fontWeight="500"
        letterSpacing="2"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        INDUSTRIES
      </text>
    </svg>
  );
}

// Horizontal Logo (Icon + Text side-by-side for navigation)
export function FairPathLogoHorizontal({ 
  height = 50, 
  variant = 'dark',
  className = '' 
}: { 
  height?: number; 
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const colors = variant === 'light' 
    ? { primary: '#FFFFFF', secondary: '#A8F32C', accent: '#7BC41A' }
    : { primary: '#000000', secondary: '#A8F32C', accent: '#7BC41A' };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Icon Only */}
      <svg 
        height={height} 
        width={height} 
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
      <div className="flex flex-col leading-none">
        <span 
          className="font-bold tracking-tight"
          style={{ 
            color: colors.primary,
            fontSize: `${height * 0.4}px`
          }}
        >
          FairPath
        </span>
        <span 
          className="font-semibold tracking-widest mt-1"
          style={{ 
            color: colors.secondary,
            fontSize: `${height * 0.16}px`,
            letterSpacing: '0.1em'
          }}
        >
          INDUSTRIES
        </span>
      </div>
    </div>
  );
}

// Icon Only (for app icons, favicons, etc.)
export function FairPathIcon({ 
  size = 100, 
  variant = 'dark',
  className = '' 
}: { 
  size?: number; 
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const colors = variant === 'light' 
    ? { primary: '#FFFFFF', secondary: '#A8F32C', accent: '#7BC41A' }
    : { primary: '#000000', secondary: '#A8F32C', accent: '#7BC41A' };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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
  );
}

// Wordmark Only (text without icon)
export function FairPathWordmark({ 
  size = 'md',
  variant = 'dark',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const colors = variant === 'light' 
    ? { primary: '#FFFFFF', secondary: '#A8F32C' }
    : { primary: '#000000', secondary: '#A8F32C' };

  const sizes = {
    sm: { main: 'text-lg', sub: 'text-[8px]' },
    md: { main: 'text-2xl', sub: 'text-[10px]' },
    lg: { main: 'text-4xl', sub: 'text-sm' },
    xl: { main: 'text-6xl', sub: 'text-lg' },
  };

  const config = sizes[size];

  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span 
        className={`font-bold tracking-tight ${config.main}`}
        style={{ color: colors.primary }}
      >
        FairPath
      </span>
      <span 
        className={`font-semibold tracking-widest mt-1 ${config.sub}`}
        style={{ 
          color: colors.secondary,
          letterSpacing: '0.2em'
        }}
      >
        INDUSTRIES
      </span>
    </div>
  );
}
