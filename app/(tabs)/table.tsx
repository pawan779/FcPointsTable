import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import PointsTableScreen from "@/components/PointsTable";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#000", dark: "#000" }}
      headerImage={
        <View style={styles.headerImage}>
          <Ionicons size={200} name="football" color={"#23f65c"} />
          <Text
            style={{
              color: "#fff",
              fontSize: "25",
              marginBottom: 30,
              fontFamily: "monospace",
            }}
          >
            Points Table
          </Text>
        </View>
      }
    >
      <PointsTableScreen />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
