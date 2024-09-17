import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IGeocodingData,
  IGeocodingSearchResult,
  ILocation,
  IWeatherData,
} from '../types';
import {DEFAULT_LOCATION_LAT_LNG} from './constants';
import {getLocationData, getWeatherData} from '../api';
import getWeatherImage from '../helpers/getWeatherImage';
import {
  debounce,
  getAverageTemperatureForDay,
  getDayNameFromDate,
} from '../helpers';

const getKeyExtractor = (item: string) => item;
const getSearchKeyExtractor = (item: IGeocodingData) => item.id.toString();

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<ILocation>(
    DEFAULT_LOCATION_LAT_LNG,
  );
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] =
    useState<IGeocodingSearchResult | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setIsLoading(true);
    const res = await getWeatherData(selectedLocation);
    setWeatherData(res);
    setIsLoading(false);
  }, [selectedLocation]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

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

  const renderWeeklyWeatherItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const {
      daily: {temperature_2m_max, temperature_2m_min, weathercode},
    } = weatherData as IWeatherData;
    return (
      <View style={styles.weatherItem}>
        <Text style={styles.subText}>{getDayNameFromDate(item)}</Text>
        <Image
          source={{uri: getWeatherImage(weathercode?.[index])}}
          height={46}
          width={46}
        />
        <Text style={styles.subText}>
          {`${getAverageTemperatureForDay(
            temperature_2m_min?.[index],
            temperature_2m_max?.[index],
          )}${weatherData?.daily_units?.temperature_2m_max}`}
        </Text>
      </View>
    );
  };

  const handleLocationItemPress = (item: IGeocodingData) => () => {
    setSelectedLocation({
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
    });
    setSearchText('');
    setSearchResults(null);
    fetchWeatherData();
  };

  const renderSearchItem = ({item}: {item: IGeocodingData}): JSX.Element => {
    return (
      <TouchableOpacity
        style={styles.searchItem}
        onPress={handleLocationItemPress(item)}>
        <Text style={styles.text}>{`${item.name}${
          item?.admin1 ? ', ' + item?.admin1 : ''
        }${item?.country ? ', ' + item?.country : ''}`}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          testID="loading-indicator"
          color={'tomato'}
          size={'large'}
        />
        <Text style={styles.loadingText}>{'Loading....'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Search Location"
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={styles.textInput}
          placeholderTextColor={'#000'}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="web-search"
        />
      </View>

      {searchText.length ? (
        <View>
          {searchResults?.results?.length ? (
            <FlatList
              data={searchResults?.results}
              keyExtractor={getSearchKeyExtractor}
              renderItem={renderSearchItem}
              style={styles.ph16}
            />
          ) : (
            <Text
              style={[
                styles.text,
                styles.ph16,
              ]}>{`No Results Found for ${searchText}`}</Text>
          )}
        </View>
      ) : (
        <>
          <View style={styles.centered}>
            <Text style={styles.text}>{selectedLocation?.name}</Text>
            <Text
              style={
                styles.temperatureText
              }>{`${weatherData?.current?.temperature_2m} ${weatherData?.current_units?.temperature_2m}`}</Text>
            <Image
              testID="weather-image"
              source={{
                uri: getWeatherImage(weatherData?.current?.weather_code!),
              }}
              height={100}
              width={100}
            />
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={weatherData?.daily?.time}
            keyExtractor={getKeyExtractor}
            renderItem={renderWeeklyWeatherItem}
            style={styles.list}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  centered: {
    alignItems: 'center',
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.4,
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1.2,
    color: '#444',
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginTop: 12,
  },
  weatherItem: {
    alignItems: 'center',
    marginRight: 6,
  },
  list: {marginVertical: 16},
  textInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff4',
    width: Dimensions.get('window').width - 32,
    alignSelf: 'center',
    marginBottom: 12,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  searchItem: {
    marginVertical: 8,
  },
});
