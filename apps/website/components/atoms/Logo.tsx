import { cn } from '@/utils/cn';
import Image from 'next/image';
import PetPalLogo from '@/public/logo.svg';
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> =
({
  className,
}) => {
  return (
    <div className="relative w-60.5 h-16.5">
    <Image
      src={PetPalLogo}
      alt={'Pet Pals Logo'}
      fill
      className={cn("object-cover max-w-60.5 max-h-16.5", className)}
    />
    </div>
  );
}

export default Logo;