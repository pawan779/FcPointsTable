import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Fixture } from "@/constants/DummyData";
import { useFixtures } from "@/context/FixtureContext";

const ResultsScreen = () => {
  const renderItem = ({ item }: { item: Fixture }) => {
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
        data={sortedFixtures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1c1c1c",
  },
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  teamNames: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
});

export default ResultsScreen;
