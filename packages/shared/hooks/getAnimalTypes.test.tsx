import { jest, describe, beforeEach, expect, it, } from '@jest/globals';
import { renderHook, waitFor  } from '@testing-library/react';

type AnimalDatabase = { id: number, animal_type: string };
type SelectResponse = { data: AnimalDatabase[] | null, error: { message: string } | null };

const mockData: AnimalDatabase[] = [{ id: 1, animal_type: 'dog' }];

const mockSelect = jest.fn<(columns?: string) => Promise<SelectResponse>>();
const mockFrom = jest.fn((_table: string) => ({ select: mockSelect }));

jest.unstable_mockModule('../lib/supabaseClient', () => ({
  supabase: { from: mockFrom },
}));

const { useGetAnimalTypes } = await import('./getAnimalTypes');

describe('useGetAnimalTypes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data successfully and update state', async () => {
    mockSelect.mockResolvedValue({ data: mockData, error: null });

    const { result } = renderHook(() => useGetAnimalTypes());

    expect(result.current.animalTypes).toEqual([]);

    await waitFor(() => {
      expect(result.current.animalTypes).toEqual(['dog']);
    });

    expect(mockFrom).toHaveBeenCalledWith('Animal');
  });

  it('should handle errors gracefully', async () => {
    mockSelect.mockResolvedValue({ data: null, error: { message: 'Database Error' } });

    const { result } = renderHook(() => useGetAnimalTypes());

    await waitFor(() => {
      expect(result.current.fetchError).toEqual('Database Error');
    });

    expect(result.current.animalTypes).toEqual([]);
  });
});
