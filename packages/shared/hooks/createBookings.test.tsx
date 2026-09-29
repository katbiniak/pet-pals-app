import { jest, describe, beforeEach, expect, it, } from '@jest/globals';
import { renderHook, waitFor, act } from '@testing-library/react';
import { Booking } from '../types/global';

type BookingsDatabase = Omit<Booking, 'id'>;
type SelectResponse = { data: BookingsDatabase[] | null, error: { message: string } | null };

const mockData: BookingsDatabase[] = [
  {
    first_name: 'Jane',
    last_name: 'Doe',
    animal_name: 'Spike',
    animal_type: 'dog', hours: 4,
    total_price: 60,
    service_date: '2026-10-07',
    completed: false
  }];

const mockSelect = jest.fn<(columns?: string) => Promise<SelectResponse>>();
const mockInsert = jest.fn<(_args: any) => { select: typeof mockSelect }>((_args) => ({
  select: mockSelect
}));
const mockFrom = jest.fn((_table: string) => ({ select: mockSelect, insert: mockInsert }));

jest.unstable_mockModule('../lib/supabaseClient', () => ({
  supabase: { from: mockFrom },
}));

const { useCreateBooking } = await import('./createBooking');

describe('useGetAnimalTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully and update state', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useCreateBooking());

    let booking;

    await act(async () => {
      booking = await result.current.createBooking(mockData[0]);
    })

    expect(booking).toEqual(mockData[0]);
    expect(mockFrom).toHaveBeenCalledWith('Bookings');
  });

  it('should handle errors gracefully', async () => {
    mockSelect.mockResolvedValue({ data: null, error: { message: 'Database Error' } });

    const { result } = renderHook(() => useCreateBooking());

    let booking;

    await act(async () => {
      booking = await result.current.createBooking(mockData[0]);
    })
    expect(booking).toBeUndefined();
    expect(result.current.fetchError).toEqual('Database Error');
  });
});
