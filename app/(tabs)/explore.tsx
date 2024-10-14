import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Text } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#131313", dark: "#131313" }}
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
    ></ParallaxScrollView>
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
