import { jest, describe, beforeEach, afterEach, expect, it } from '@jest/globals';

import { minDate } from "./minDate";
import { dateExpired } from "./dateExpired"

describe("Utils", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-09-29T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("minDate returns tomorrow", () => {
    const currentMinDate = minDate();
    expect(currentMinDate).toBe('2026-09-30');
  })

  it("minDate processes end of month", () => {
    jest.setSystemTime(new Date('2026-10-31T12:00:00Z'));
    const currentMinDate = minDate();
    expect(currentMinDate).toBe('2026-11-01');
  })

  it("dateExpired true for yesterday", () => {
    const isDateExpired = dateExpired("2026-09-28");
    expect(isDateExpired).toBeTruthy();
  })

  it("dateExpired false for today", () => {
    const isDateExpired = dateExpired("2026-09-29");
    expect(isDateExpired).toBeFalsy();
  })

  it("dateExpired false for tomorrow", () => {
    const isDateExpired = dateExpired("2026-09-30");
    expect(isDateExpired).toBeFalsy();
  })

})