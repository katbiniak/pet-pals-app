"use client";

import React from "react";
import { supabase } from "../lib/supabaseClient";
import { Booking } from "../types/global";

export function useCreateBooking() {
  const [fetchError, setFetchError] = React.useState('');

  async function createBooking(formData:Omit<Booking, "id">) {
    const { data, error } = await supabase
    .from('Bookings')
    .insert([
      formData,
    ])
    .select()

    if (error) {
      setFetchError(error.message);
      return;
    }

    const newBooking:Booking = data?.[0] as Booking || {};
    return newBooking;
  }

  return {
    fetchError,
    createBooking
  }
}