import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Fixture } from "@/constants/DummyData";
import { useFixtures } from "@/context/FixtureContext";

const ResultsScreen = () => {
  const renderItem = ({ item }) => {
    console.log("item", item);
    return (
      <View
        style={{
          backgroundColor: "#262626",
          borderRadius: 5,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "#a8a8a8",
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontWeight: "bold",
          }}
        >
          {item.fixtureName}
        </Text>

        {item.fixtures.map((fixture: Fixture) => (
          <ListItem key={fixture.id} item={fixture} />
        ))}
      </View>
    );
  };

  const ListItem = ({ item }: { item: Fixture }) => {
    let formattedDate = "";
    let formattedTime = "";
    if (item?.date) {
      formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      formattedTime = new Date(item?.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    return item.isCompleted ? (
      <View style={styles.card}>
        <Text style={styles.teamNames}>
          {item.homeTeam} {item.homeGoal} - {item.awayGoal} {item.awayTeam}
        </Text>
        <Text style={styles.date}>
          {formattedDate} {formattedTime}
        </Text>
      </View>
    ) : null;
  };

  const { fixtures, setFixtures } = useFixtures();

  const sortedFixtures = fixtures.sort((a, b) => {
    // Compare dates in descending order
    if (!a?.date || !b?.date) return 0;
    return new Date(b?.date).getTime() - new Date(a?.date).getTime();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={fixtures}
        renderItem={renderItem}
        // keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
  card: {
    backgroundColor: "#161616",
    paddingHorizontal: 10,
    paddingTop: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamNames: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
});

export default ResultsScreen;
