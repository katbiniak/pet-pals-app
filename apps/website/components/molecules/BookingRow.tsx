import { cn } from '@/utils/cn';
import React from 'react';
import { Booking, dateExpired } from '@pet-pals/shared';

interface BookingRowProps {
  className?: string;
  booking: Booking;
}

export const BookingRow: React.FC<BookingRowProps> =
({
  booking,
  className,
}) => {

  const isExpired = booking.service_date ? dateExpired(booking.service_date) : true;
  const formattedAnimalType = booking.animal_type ? booking.animal_type.charAt(0).toUpperCase() + booking.animal_type.slice(1) : '';

  const BookingGridCell = ({ text = '' }:{ text: string; }) => {
    return (
      <p className="w-1/2 text-charcoal text-base">{text}</p>
    );
  }

  return (
    <div className={cn(`w-full flex flex-col justify-center items-center gap-8 border-t border-t-blossom`, className)}>
      <div className={cn("w-full flex flex-row justify-between pt-4 text-xl",
        isExpired ? "text-error" : "text-charcoal"
      )}>
        <h2>{`#${booking.id}`}</h2>
        <p>{booking.service_date}</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div className="col-span-1 flex flex-row flex-wrap gap-y-4">
          <BookingGridCell text="Owner Name:" />
          <BookingGridCell text={`${booking.first_name} ${booking.last_name}` || ''} />
          <BookingGridCell text="Pet Name:" />
          <BookingGridCell text={booking.animal_name || ''} />
          <BookingGridCell text="Pet Type:" />
          <BookingGridCell text={formattedAnimalType} />
        </div>
        <div className="col-span-1 flex flex-row flex-wrap gap-y-4">
          <BookingGridCell text="Hours Requested:" />
          <BookingGridCell text={`${booking.hours} hrs` || ''} />
          <BookingGridCell text="Total Price:" />
          <BookingGridCell text={`$${booking.total_price}` || ''} />
          <BookingGridCell text="Completed:" />
          <BookingGridCell text={`${booking.completed}` || ''} />
        </div>
      </div>
    </div>
  );
}

export default BookingRow;