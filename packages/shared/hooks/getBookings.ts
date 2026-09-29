"use client";

import React from "react";
import { supabase } from "../lib/supabaseClient";
import { Booking } from "../types/global";

export function useGetBookings() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [fetchError, setFetchError] = React.useState('');

  React.useEffect(() => {
    getBookings();
  },[]);


  async function getBookings() {
    let { data, error } = await supabase
      .from('Bookings')
      .select('*')

    if (error) {
      setFetchError(error.message);
      return;
    }

    const bookingsData:Booking[] = data?.map((booking) => ({
      id: booking.id,
      'first_name': booking.first_name,
      'last_name': booking.last_name,
      'animal_name': booking.animal_name,
      'animal_type': booking.animal_type,
      hours: booking.hours,
      'service_date': booking.service_date,
      'total_price': booking.total_price,
      completed: booking.completed
    } as Booking)) || [];
    
    setBookings(bookingsData)
  }

  return {
    bookings,
    fetchError,
    getBookings
  }
}