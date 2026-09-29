"use client";

import { BookingRow } from "@/components/molecules/BookingRow";
import { NavHeader } from "@/components/molecules/NavHeader";
import { useGetBookings } from "@pet-pals/shared";

export default function Bookings() {

  const { bookings, fetchError } = useGetBookings();

  return (
    <main className="w-full h-full pb-12">
      <NavHeader />
      <div className="w-full h-full flex justify-center">
        <div  className="w-full max-w-240 px-8 lg:px-0 flex flex-col gap-6">
          <h1 className="text-charcoal text-4xl pt-6">Bookings</h1>
          {bookings && !fetchError &&
            bookings.map((booking) => (
              <BookingRow key={`${booking.animal_name}-${booking.id}`} booking={booking} className="" />
            ))
          }
          {!bookings && !fetchError && (
            <div className="text-plum/50 text-2xl border-t border-t-blossom text-center pt-14">
              <p> Please wait, bookings are loading... </p>
            </div>
          )}
          {fetchError && (
            <div className="text-error text-2xl border-t border-t-blossom text-center pt-14">
              <p>An error has occurred while attempting to fetch bookings. Please try again. </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}