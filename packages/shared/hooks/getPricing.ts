"use client";

import React from "react";
import { supabase } from "../lib/supabaseClient";
import { Animal, Price } from "../types/global";

export function useGetPricing() {
  const [totalPrice, setTotalPrice] = React.useState<number>();
  const [fetchError, setFetchError] = React.useState('');

  async function getPricing() {
    let { data, error } = await supabase
      .from('Prices')
      .select('*')

    if (error) {
      setFetchError(error.message);
      return;
    }

    const pricesData:Price[] = data?.map((price) => ({
      'animal_type': price.animal_type,
      base: price.base,
      hourly: price.hourly,
    } as Price)) || [];

    return pricesData;
  }

  async function calculateTotalPrice(animalType: Animal, hours: number) {
    const prices = await getPricing()

    if (prices && prices?.length > 0) {
      const currentPriceValues:Price | undefined = prices.find((price) => price.animal_type === animalType);
      if (currentPriceValues) {
        const getTotalPrice = currentPriceValues.base + (currentPriceValues.hourly * hours);
        setTotalPrice(getTotalPrice)
      }
    }
  }

  return {
    totalPrice,
    setTotalPrice,
    fetchError,
    calculateTotalPrice
  }
}