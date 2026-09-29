import { cn } from '@/utils/cn';
import { Button } from '@/components/atoms/Button';
import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';

interface EntryBoxProps {
  className?: string;
}

export const EntryBox: React.FC<EntryBoxProps> =
({
  className,
}) => {
  return (
    <div className={cn(`relative w-full h-full flex flex-col justify-center items-center gap-8`, className)}>
      <Logo />
      <div className="flex flex-col gap-4" >
        <Button buttonVariant='primary'>
          <Link href="/create">+ New Booking</Link>
        </Button>
        <Button buttonVariant='secondary' >
          <Link href="/bookings">Admin Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default EntryBox;