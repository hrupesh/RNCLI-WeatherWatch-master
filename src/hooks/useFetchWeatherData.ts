import { useCallback, useEffect, useState } from "react";
import { ILocation, IWeatherData } from "../types";
import { DEFAULT_LOCATION_LAT_LNG } from "../screens/constants";
import { getWeatherData } from "../api";

export const useFetchWeatherData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>(
    DEFAULT_LOCATION_LAT_LNG
  );
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true);
    const res = await getWeatherData(selectedLocation);
    setWeatherData(res);
    setIsLoading(false);
  }, [selectedLocation]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return {
    isLoading,
    selectedLocation,
    setSelectedLocation,
    weatherData,
    fetchWeatherData,
  };
};
