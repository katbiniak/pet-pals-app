import { z } from 'zod';
import { jest, describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import { minDate } from '@pet-pals/shared';

const createBookingSchemaMock = z.object({
  firstName: z.string().min(1, 'Please enter your First Name'),
  lastName: z.string().min(1, 'Please enter your Last Name'),
  petName: z.string().min(1, 'Please enter your Pet\'s Name'),
  animalType: z.enum(['dog', 'cat', 'pig'], 'Please select your pet\'s animal type.'),
  hours: z.coerce.number<number>().min(2, "Please enter a number between 2 - 8.").max(8, "Please enter a number between 2 - 8."),
  date: z.coerce.date<Date>().min(new Date(minDate()), "Please select a date in the future." )
})

const validBooking = {
  firstName: 'Jane',
  lastName: 'Doe',
  petName: 'Gooby',
  animalType: 'cat',
  hours: 4,
  date: new Date('2026-10-10'),
};

describe('createBookingSchemaMock Validation', () => {

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-09-29T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Validation Success', () => {
    it('should validate a correct booking object', () => {
      

      // safeParse is highly readable for success assertions
      const result = createBookingSchemaMock.safeParse(validBooking);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validBooking);
      }
    });
  });

  describe('Validation Failure', () => {
    it('should throw an error if first name is empty', () => {
      const invalidBooking = {
        ...validBooking,
        firstName: '',
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if last name is empty', () => {
      const invalidBooking = {
        ...validBooking,
        lastName: '',
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if pet name is empty', () => {
      const invalidBooking = {
        ...validBooking,
        petName: '',
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if animal type is different', () => {
      const invalidBooking = {
        ...validBooking,
        animalType: 'lizard',
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if hours are greater than 8', () => {
      const invalidBooking = {
        ...validBooking,
        hours: 20,
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if hours are less than 2', () => {
      const invalidBooking = {
        ...validBooking,
        hours: 1,
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });

    it('should throw an error if date is in the past', () => {
      const invalidBooking = {
        ...validBooking,
        date: new Date("2024-04-04")
      };

      expect(() => createBookingSchemaMock.parse(invalidBooking)).toThrow();
    });
  });
});
