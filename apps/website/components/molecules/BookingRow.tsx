import { cn } from '@/utils/cn';
import React from 'react';
import { Booking } from '@pet-pals/shared';

interface BookingRowProps {
  className?: string;
  booking: Booking;
}

export const BookingRow: React.FC<BookingRowProps> =
({
  booking,
  className,
}) => {
  return (
    <div className={cn(`w-full flex flex-col justify-center items-center gap-8. border-top border-top-blossom`, className)}>
      <div>
        <h2>{`#${booking.id}`}</h2>
        <p>{booking.service_date}</p>
      </div>

    </div>
  );
}

export default BookingRow;