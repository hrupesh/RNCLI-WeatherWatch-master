import { useCallback, useState } from "react";
import { getLocationData } from "../api";
import { debounce } from "../helpers";
import { IGeocodingData, IGeocodingSearchResult, ILocation } from "../types";

export const useSearchLocation = ({
  setSelectedLocation,
  fetchWeatherData,
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<ILocation>>;
  fetchWeatherData: () => Promise<void>;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<IGeocodingSearchResult | null>(null);

  const searchForLocation = async (text: string) => {
    const res = await getLocationData(text);
    setSearchResults(res);
  };

  const handleSearchTextChange = useCallback((text: string) => {
    setSearchText(text);
    if (!text) {
      setSearchResults(null);
      return;
    }
    debounce(searchForLocation(text), 1000);
  }, []);

  const handleLocationItemPress = (item: IGeocodingData) => () => {
    setSelectedLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
    });
    setSearchText("");
    setSearchResults(null);
    fetchWeatherData();
  };

  return {
    searchText,
    searchResults,
    setSearchText,
    setSearchResults,
    handleSearchTextChange,
    handleLocationItemPress,
  };
};
