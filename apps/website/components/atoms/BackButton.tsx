"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Back from '@/public/back.svg';
import React from 'react';
import { cn } from '@/utils/cn';

interface BackButtonProps {
  alt?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> =
({
  className
}) => {

  const router = useRouter();

  return (
    <button className={cn("w-10 h-10 hover:opacity-50 cursor-pointer", className)} onClick={() => router.back()}>
      <Image
        src={Back}
        alt={'Back Button'}
        fill
        className="object-cover"
      />
    </button>
  );
}

export default BackButton;