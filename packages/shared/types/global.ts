export type Animal = 'dog' | 'cat' | 'pig';

export interface Account {
  email: string | null;
}

export interface Price {
  animal_type: Animal;
  hourly: number;
  base: number;
}

export interface Booking {
  id: number;
  first_name: string | null;
  last_name: string | null;
  animal_name: string | null;
  animal_type: Animal;
  hours: number;
  service_date: string | null; //YYYY-MM-DD
  total_price: number;
  completed: boolean;
}