import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ListItem = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
  onPress,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3830";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.leftItemContainer}>
          <Image
            source={{
              uri: logoUrl,
            }}
            style={styles.image}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.rightItemContainer}>
          <Text style={styles.title}>
            ${currentPrice.toLocaleString("en-US", { currecy: "USD" })}
          </Text>
          <Text style={[styles.subtitle, { color: priceChangeColor }]}>
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftItemContainer: { flexDirection: "row", alignItems: "center" },
  titleContainer: { marginLeft: 8 },
  rightItemContainer: { alignItems: "flex-end" },
  image: { height: 48, width: 48, resizeMode: "contain" },
  title: { fontSize: 18 },
  subtitle: { fontSize: 14, color: "#A9ABB1", marginTop: 4 },
});

export default ListItem;
