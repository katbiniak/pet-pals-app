import { jest, describe, beforeEach, expect, it, } from '@jest/globals';
import { renderHook, waitFor  } from '@testing-library/react';
import { Booking } from '../types/global';

type BookingsDatabase = Booking;
type SelectResponse = { data: BookingsDatabase[] | null, error: { message: string } | null };

const mockData: BookingsDatabase[] = [
  { 
    id: 1,
    first_name: 'Jane',
    last_name: 'Doe',
    animal_name: 'Spike',
    animal_type: 'dog', hours: 4,
    total_price: 60,
    service_date: '2026-10-07',
    completed: false
  }];

const mockSelect = jest.fn<(columns?: string) => Promise<SelectResponse>>();
const mockFrom = jest.fn((_table: string) => ({ select: mockSelect }));

jest.unstable_mockModule('../lib/supabaseClient', () => ({
  supabase: { from: mockFrom },
}));

const { useGetBookings } = await import('./getBookings');

describe('useGetAnimalTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully and update state', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useGetBookings());

    expect(result.current.bookings).toEqual([]);

    await waitFor(() => {
      expect(result.current.bookings).toEqual(mockData);
    });

    expect(mockFrom).toHaveBeenCalledWith('Bookings');
  });

  it('should handle errors gracefully', async () => {
    mockSelect.mockResolvedValue({ data: null, error: { message: 'Database Error' } });

    const { result } = renderHook(() => useGetBookings());

    await waitFor(() => {
      expect(result.current.fetchError).toEqual('Database Error');
    });

    expect(result.current.bookings).toEqual([]);
  });
});
