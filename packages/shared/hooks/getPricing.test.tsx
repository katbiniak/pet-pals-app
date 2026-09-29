import { jest, describe, beforeEach, expect, it, } from '@jest/globals';
import { renderHook, waitFor , act } from '@testing-library/react';

type PricingDatabase = { id: number, animal_type: string, hourly: number, base: number };
type SelectResponse = { data: PricingDatabase[] | null, error: { message: string } | null };

const mockData: PricingDatabase[] = [
  { id: 1, animal_type: 'dog', hourly: 10, base: 20 },
  { id: 2, animal_type: 'cat', hourly: 0, base: 20 },
  { id: 3, animal_type: 'pig', hourly: 10, base: 0 },
];

const mockSelect = jest.fn<(columns?: string) => Promise<SelectResponse>>();
const mockFrom = jest.fn((_table: string) => ({ select: mockSelect }));

jest.unstable_mockModule('../lib/supabaseClient', () => ({
  supabase: { from: mockFrom },
}));

const { useGetPricing } = await import('./getPricing');

describe('useGetPricing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully and update state', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useGetPricing());

    expect(result.current.totalPrice).toBeUndefined();

    act(() => {
      result.current.calculateTotalPrice('dog', 4);
    })

    await waitFor(() => {
      expect(result.current.totalPrice).toEqual(60);
    });

    expect(mockFrom).toHaveBeenCalledWith('Prices');
  });

  it('should handle errors gracefully', async () => {
    mockSelect.mockResolvedValue({ data: null, error: { message: 'Database Error' } });

    const { result } = renderHook(() => useGetPricing());

    act(() => {
      result.current.calculateTotalPrice('dog', 4);
    })

    await waitFor(() => {
      expect(result.current.fetchError).toEqual('Database Error');
    });

    expect(result.current.totalPrice).toBeUndefined();
  });

  it('should handle 0 hourly rate', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useGetPricing());

    act(() => {
      result.current.calculateTotalPrice('cat', 8);
    })

    await waitFor(() => {
      expect(result.current.totalPrice).toEqual(20);
    });
  });

  it('should handle 0 base rate', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useGetPricing());

    act(() => {
      result.current.calculateTotalPrice('pig', 3);
    })

    await waitFor(() => {
      expect(result.current.totalPrice).toEqual(30);
    });
  });
});
