import {getLocationData, getWeatherData} from '..'; // Import the helper functions
import {ILocation} from '../../types'; // Import the necessary types
import {
  OPEN_METEO_FORECAST_URL,
  OPEN_METEO_GEOCODING_URL,
} from '../URLConstants';

// Mock the global fetch function
global.fetch = jest.fn();

describe('API Helper Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  describe('getWeatherData', () => {
    const mockLocation: ILocation = {
      latitude: 35.6895,
      longitude: 139.6917,
      name: 'Tokyo',
    };

    it('should fetch weather data successfully', async () => {
      const mockWeatherData = {
        current: {
          temperature_2m: 22,
          weather_code: 1,
        },
        daily: {
          temperature_2m_max: [25, 27],
          temperature_2m_min: [17, 19],
          weathercode: [1, 2],
        },
      };

      // Mock a successful response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockWeatherData),
      });

      const result = await getWeatherData(mockLocation);

      expect(global.fetch).toHaveBeenCalledWith(
        `${OPEN_METEO_FORECAST_URL}?latitude=35.6895&longitude=139.6917&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weathercode`,
      );
      expect(result).toEqual(mockWeatherData);
    });

    it('should return null if fetch fails', async () => {
      // Mock a failed response
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      const result = await getWeatherData(mockLocation);

      expect(result).toBeNull();
    });
  });

  describe('getLocationData', () => {
    const mockLocationName = 'Tokyo';

    it('should fetch location data successfully', async () => {
      const mockLocationData = {
        results: [
          {
            id: 1,
            name: 'Tokyo',
            latitude: 35.6895,
            longitude: 139.6917,
            country: 'Japan',
          },
        ],
      };

      // Mock a successful response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockLocationData),
      });

      const result = await getLocationData(mockLocationName);

      expect(global.fetch).toHaveBeenCalledWith(
        `${OPEN_METEO_GEOCODING_URL}?name=Tokyo`,
      );
      expect(result).toEqual(mockLocationData);
    });

    it('should return null if fetch fails', async () => {
      // Mock a failed response
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      const result = await getLocationData(mockLocationName);

      expect(result).toBeNull();
    });
  });
});
