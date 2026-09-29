import '@testing-library/jest-dom/jest-globals';
import { jest, describe, beforeEach, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Booking } from '@pet-pals/shared';

type SelectResponse = { data: Booking[] | null, error: { message: string } | null };

const expiredBooking: Booking = {
  id: 1,
  first_name: 'Jane',
  last_name: 'Doe',
  animal_name: 'Spike',
  animal_type: 'dog',
  hours: 4,
  total_price: 60,
  service_date: '2024-04-04',
  completed: false,
};

const mockSelect = jest.fn<(columns?: string) => Promise<SelectResponse>>();
const mockFrom = jest.fn((_table: string) => ({ select: mockSelect }));

jest.unstable_mockModule('../../../../../packages/shared/lib/supabaseClient', () => ({
  supabase: { from: mockFrom },
}));

jest.unstable_mockModule('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), prefetch: jest.fn() }),
}));

// Fix for Logo image using next/image as ESM
jest.unstable_mockModule('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// ESM static imports load before mocks are registered, so the page must be imported dynamically
const { default: Bookings } = await import('@/app/(admin)/bookings/page');

describe('Bookings page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders expired bookings with the error text color', async () => {
    mockSelect.mockResolvedValue({ data: [expiredBooking], error: null });

    render(<Bookings />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent('Bookings');


    // jsdom doesn't load Tailwind, so assert on the class rather than the computed color
    const bookingId = await screen.findByText('#1');
    expect(bookingId.parentElement).toHaveClass('text-error');
  });
});
