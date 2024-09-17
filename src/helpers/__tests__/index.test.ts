import {debounce, getAverageTemperatureForDay, getDayNameFromDate} from '..';

jest.useFakeTimers();

describe('Helper Functions', () => {
  describe('getAverageTemperatureForDay', () => {
    it('should correctly calculate the average temperature', () => {
      const min = 10;
      const max = 30;
      const result = getAverageTemperatureForDay(min, max);
      expect(result).toBe('20.0');
    });

    it('should handle negative temperatures', () => {
      const min = -5;
      const max = 5;
      const result = getAverageTemperatureForDay(min, max);
      expect(result).toBe('0.0');
    });

    it('should correctly format the result to 1 decimal place', () => {
      const min = 12.3;
      const max = 15.7;
      const result = getAverageTemperatureForDay(min, max);
      expect(result).toBe('14.0');
    });
  });

  describe('getDayNameFromDate', () => {
    it('should return the correct day name', () => {
      const date = '2024-09-17';
      const result = getDayNameFromDate(date);
      expect(result).toBe('Tue');
    });

    it('should handle different date formats', () => {
      const date = '2024-12-25';
      const result = getDayNameFromDate(date);
      expect(result).toBe('Wed');
    });

    it('should handle invalid dates', () => {
      const invalidDate = 'invalid-date';
      const result = getDayNameFromDate(invalidDate);
      expect(result).toBe('Invalid Date');
    });
  });

  describe('debounce', () => {
    it('should call the function after the specified delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not call the function if invoked repeatedly within the delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      jest.advanceTimersByTime(500);
      debouncedFn();

      jest.advanceTimersByTime(500);

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should clear the previous timeout if called again before delay finishes', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      jest.advanceTimersByTime(500);
      debouncedFn();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
});
