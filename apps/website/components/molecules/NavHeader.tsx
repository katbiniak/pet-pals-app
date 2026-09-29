import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms/Button';
import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { BackButton } from '../atoms/BackButton';

interface NavHeaderProps {
  className?: string;
}

export const NavHeader: React.FC<NavHeaderProps> =
({
  className,
}) => {
  return (
    <div className={cn(`w-full h-36.5 bg-blush flex justify-center`, className)}>
      <div className="relative max-w-240 w-full flex flex-col justify-center items-center">
        <BackButton className="absolute top-15 left-3" />
        <Logo />
      </div>
    </div>
  );
}

export default NavHeader;