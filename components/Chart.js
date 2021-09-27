import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
  symbol,
}) => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;
    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#FF3830";
  const { width: SIZE } = Dimensions.get("window");
  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return `$${latestCurrentPrice.value.toLocaleString("en-US", {
        currecy: "USD",
      })}`;
    }
    const formatedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formatedValue;
  };
  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.chartContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.upperTitle}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subtitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
            </View>
            <Text style={styles.subtitle}>7d</Text>
          </View>
          <View style={styles.lowerTitle}>
            <ChartYLabel format={formatUSD} style={styles.boldTitle} />
            <Text style={[styles.title, { color: priceChangeColor }]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
        {chartReady ? (
          <View style={styles.chartLineContainer}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: "black" }} />
          </View>
        ) : null}
      </View>
    </ChartPathProvider>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 16,
  },
  titleContainer: {
    marginHorizontal: 16,
  },
  upperTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  lowerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  chartLineContainer: {
    marginTop: 40,
  },
});
