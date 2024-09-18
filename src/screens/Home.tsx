import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SearchItem, WeeklyWeatherItem } from "../components";
import getWeatherImage from "../helpers/getWeatherImage";
import { useFetchWeatherData, useSearchLocation } from "../hooks";
import { IGeocodingData } from "../types";

const getKeyExtractor = (item: string) => item;
const getSearchKeyExtractor = (item: IGeocodingData) => item.id.toString();

export const Home: React.FC = () => {
  const {
    isLoading,
    selectedLocation,
    setSelectedLocation,
    weatherData,
    fetchWeatherData,
  } = useFetchWeatherData();
  const {
    searchText,
    searchResults,
    handleSearchTextChange,
    handleLocationItemPress,
  } = useSearchLocation({ fetchWeatherData, setSelectedLocation });

  const renderWeeklyWeatherItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <WeeklyWeatherItem item={item} index={index} weatherData={weatherData} />
  );

  const renderSearchItem = ({ item }: { item: IGeocodingData }) => (
    <SearchItem item={item} handleLocationItemPress={handleLocationItemPress} />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          testID="loading-indicator"
          color={"tomato"}
          size={"large"}
        />
        <Text style={styles.loadingText}>{"Loading...."}</Text>
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
          placeholderTextColor={"#000"}
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
              style={[styles.text, styles.ph16]}
            >{`No Results Found for ${searchText}`}</Text>
          )}
        </View>
      ) : (
        <>
          <View style={styles.centered}>
            <Text style={styles.text}>{selectedLocation?.name}</Text>
            <Text
              style={styles.temperatureText}
            >{`${weatherData?.current?.temperature_2m} ${weatherData?.current_units?.temperature_2m}`}</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  centered: {
    alignItems: "center",
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.4,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginTop: 12,
  },
  list: { marginVertical: 16 },
  textInput: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff4",
    width: Dimensions.get("window").width - 32,
    alignSelf: "center",
    marginBottom: 12,
  },
  ph16: {
    paddingHorizontal: 16,
  },
});
