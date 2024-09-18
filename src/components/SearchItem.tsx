import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { IGeocodingData } from "../types";

const SearchItem = ({
  item,
  handleLocationItemPress,
}: {
  item: IGeocodingData;
  handleLocationItemPress: (item: IGeocodingData) => () => void;
}): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={handleLocationItemPress(item)}
    >
      <Text style={styles.text}>{`${item.name}${
        item?.admin1 ? ", " + item?.admin1 : ""
      }${item?.country ? ", " + item?.country : ""}`}</Text>
    </TouchableOpacity>
  );
};

export default memo(SearchItem);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.4,
  },
  searchItem: {
    marginVertical: 8,
  },
});
