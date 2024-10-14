import { Image, StyleSheet, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import PointsTableTabs from "@/components/PointsTableTabs";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <PointsTableTabs />
    </View>
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#000", dark: "#141616" }}
    //   headerImage={
    //     <Image
    //       source={require("@/assets/images/banner.jpg")}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <PointsTableTabs />
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 200,
    width: "100%",

    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
