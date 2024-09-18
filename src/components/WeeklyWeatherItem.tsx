import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getAverageTemperatureForDay, getDayNameFromDate } from "../helpers";
import getWeatherImage from "../helpers/getWeatherImage";
import { IWeatherData } from "../types";

const WeeklyWeatherItem = ({
  item,
  index,
  weatherData,
}: {
  item: string;
  index: number;
  weatherData: IWeatherData | null;
}) => {
  const {
    daily: { temperature_2m_max, temperature_2m_min, weathercode },
  } = weatherData as IWeatherData;
  return (
    <View style={styles.weatherItem}>
      <Text style={styles.subText}>{getDayNameFromDate(item)}</Text>
      <Image
        source={{ uri: getWeatherImage(weathercode?.[index]) }}
        height={46}
        width={46}
      />
      <Text style={styles.subText}>
        {`${getAverageTemperatureForDay(
          temperature_2m_min?.[index],
          temperature_2m_max?.[index]
        )}${weatherData?.daily_units?.temperature_2m_max}`}
      </Text>
    </View>
  );
};

export default memo(WeeklyWeatherItem);

const styles = StyleSheet.create({
  subText: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.2,
    color: "#444",
  },
  weatherItem: {
    alignItems: "center",
    marginRight: 6,
  },
});
