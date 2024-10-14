import { tintColorLight } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PointsTableScreen from "./PointsTable";
import FixtureScreen from "./FixtureScreen";
import ResultsScreen from "./ResultsScreen";

// Define the initial routes for the TabView
const initialLayout = { width: Dimensions.get("window").width };

const PointsTableTabs = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "fixture", title: "Fixture" },
    { key: "results", title: "Results" },
  ]);

  const renderScene = SceneMap({
    fixture: FixtureScreen,
    results: ResultsScreen,
  });

  // Custom TabBar styling
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      swipeEnabled={true}
      style={{ flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1, // Ensure each scene fills the available space
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161616",
    padding: 20,
  },
  tabBar: {
    backgroundColor: "#161616",
  },
  indicator: {
    backgroundColor: tintColorLight,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PointsTableTabs;
