import { cn } from '@/utils/cn';
import Image from 'next/image';
import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export const BaseImage: React.FC<ImageProps> =
({
  src,
  alt = '',
  className,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
    />
  );
}

export default BaseImage;