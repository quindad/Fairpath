import logoImage from 'figma:asset/f7484f29e9c54dddb6ad1de9222b37fdee06a1b3.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'default' | 'compact';
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
};

export default function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={logoImage} 
          alt="Friend A Felon" 
          className={sizeMap[size]}
        />
        {showText && (
          <div className="text-xs tracking-[0.3em] text-[#A8F32C]">
            FRIEND A FELON
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <img 
        src={logoImage} 
        alt="Friend A Felon" 
        className={sizeMap[size]}
      />
      {showText && (
        <div className="text-center">
          <div className="text-xs tracking-[0.3em] text-[#A8F32C] mb-1">
            FRIEND A FELON
          </div>
          <div className="text-[10px] text-white/40 tracking-wider">
            TAP INTO SECOND CHANCES
          </div>
        </div>
      )}
    </div>
  );
}
