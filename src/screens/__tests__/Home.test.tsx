import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {getLocationData, getWeatherData} from '../../api';
import {getAverageTemperatureForDay} from '../../helpers';
import {WeatherCode} from '../../helpers/getWeatherImage';
import {IGeocodingSearchResult, IWeatherData} from '../../types';
import {Home} from '../Home';

// Mocking API calls
jest.mock('../../api', () => ({
  getLocationData: jest.fn(),
  getWeatherData: jest.fn(),
}));
jest.mock('../../helpers/getWeatherImage', () =>
  jest.fn(() => 'mocked-image-url'),
);

describe('Home Component tests', () => {
  const mockedGetWeatherData = jest.mocked(getWeatherData);
  const mockedGetLocationData = jest.mocked(getLocationData);
  const mockWeatherData: IWeatherData = {
    current: {
      time: '2024-09-17T08:45',
      interval: 900,
      temperature_2m: 22,
      weather_code: '1' as WeatherCode,
    },
    current_units: {
      time: 'iso8601',
      interval: 'seconds',
      temperature_2m: '°C',
      weather_code: 'wmo code',
    },
    daily: {
      time: ['2024-09-18', '2024-09-19'],
      temperature_2m_max: [25, 27],
      temperature_2m_min: [17, 19],
      weathercode: ['1', '2'] as WeatherCode[],
    },
    daily_units: {
      time: 'iso8601',
      temperature_2m_max: '°C',
      temperature_2m_min: '°C',
      weathercode: 'wmo code',
    },
  };

  const mockSearchResults: IGeocodingSearchResult = {
    results: [
      {
        id: 1,
        name: 'Tokyo',
        latitude: 35.6895,
        longitude: 139.6917,
        country: 'Japan',
      },
      {
        id: 2,
        name: 'New York',
        latitude: 40.7128,
        longitude: -74.006,
        country: 'USA',
      },
    ],
    generationtime_ms: 0.20098686,
  };

  beforeEach(() => {
    mockedGetWeatherData.mockResolvedValue(mockWeatherData);
    mockedGetLocationData.mockResolvedValue(mockSearchResults);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display a loading indicator while fetching weather data', () => {
    const {getByText, getByTestId} = render(<Home />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
    expect(getByText('Loading....')).toBeTruthy();
  });

  it('should display weather data once it is fetched', async () => {
    const {getByText, getByTestId, queryByTestId} = render(<Home />);

    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

    expect(getByText('Mumbai')).toBeTruthy();
    expect(getByText('22 °C')).toBeTruthy();
    expect(getByTestId('weather-image').props.source.uri).toEqual(
      'mocked-image-url',
    );
  });

  it('should display weekly weather forecast', async () => {
    const {getByText} = render(<Home />);

    await waitFor(() => {
      expect(
        getByText(`${getAverageTemperatureForDay(17, 25)}°C`),
      ).toBeTruthy(); // First day avg temp
      expect(
        getByText(`${getAverageTemperatureForDay(19, 27)}°C`),
      ).toBeTruthy(); // Second day avg temp
    });
  });

  it('should search for a location when text input changes', async () => {
    const {getByPlaceholderText, getByText, queryByTestId} = render(<Home />);

    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

    const searchInput = getByPlaceholderText('Search Location');

    fireEvent.changeText(searchInput, 'New');
    await waitFor(() => expect(getByText('New York, USA')).toBeTruthy());

    fireEvent.press(getByText('New York, USA'));

    expect(getWeatherData).toHaveBeenCalledWith({
      latitude: 40.7128,
      longitude: -74.006,
      name: 'New York',
    });
  });

  it('should handle no search results', async () => {
    mockedGetLocationData.mockResolvedValue({results: []});

    const {getByPlaceholderText, getByText, queryByTestId} = render(<Home />);

    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());

    const searchInput = getByPlaceholderText('Search Location');

    fireEvent.changeText(searchInput, 'Unknown City');
    await waitFor(() =>
      expect(getByText('No Results Found for Unknown City')).toBeTruthy(),
    );
  });
});
