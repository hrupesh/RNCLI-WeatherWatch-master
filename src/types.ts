import {WeatherCode} from './helpers/getWeatherImage';

export interface ILocation {
  latitude: string | number;
  longitude: string | number;
  name: string;
}

export interface IWeatherData {
  latitude?: number;
  longitude?: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_units: CurrentUnits;
  current: Current;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  weather_code: string;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: WeatherCode;
}

export interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weathercode: string;
}

export interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: WeatherCode[];
}

export interface IGeocodingSearchResult {
  results: IGeocodingData[];
  generationtime_ms: number;
}

export interface IGeocodingData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  timezone?: string;
  population?: number;
  country_id?: number;
  country?: string;
  admin1?: string;
}
