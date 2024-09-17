import {ILocation} from '../types';
import {
  OPEN_METEO_FORECAST_URL,
  OPEN_METEO_GEOCODING_URL,
} from './URLConstants';

export const getWeatherData = async (location: ILocation) => {
  try {
    const response = await fetch(
      `${OPEN_METEO_FORECAST_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weathercode`,
    );
    const data = await response?.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getLocationData = async (name: string) => {
  try {
    const response = await fetch(`${OPEN_METEO_GEOCODING_URL}?name=${name}`);
    const data = await response?.json();
    return data;
  } catch (error) {
    return null;
  }
};
