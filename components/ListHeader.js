import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListHeader = () => {
  return (
    <View>
      <Text style={styles.largeTitle}>Markets</Text>
      <View style={styles.divider} />
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
});
