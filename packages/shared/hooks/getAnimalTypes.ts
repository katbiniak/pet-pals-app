"use client";

import React from "react";
import { supabase } from "../lib/supabaseClient";
import { Animal } from "../types/global";

export function useGetAnimalTypes() {
  const [animalTypes, setAnimalTypes] = React.useState<Animal[]>([]);
  const [fetchError, setFetchError] = React.useState('');

  React.useEffect(() => {
    getAnimalTypes();
  },[]);


  async function getAnimalTypes() {
    let { data, error } = await supabase
      .from('Animal')
      .select('*')

    if (error) {
      setFetchError(error.message);
      return;
    }

    const animalTypeData:Animal[] = data?.map((animal) => animal.animal_type as Animal) || [];
    
    setAnimalTypes(animalTypeData)
  }

  return {
    animalTypes,
    fetchError,
    getAnimalTypes
  }
}