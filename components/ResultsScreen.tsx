import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { results, Result } from "@/constants/DummyData"; // Import the dummy data

const ResultsScreen = () => {
  const renderItem = ({ item }: { item: Result }) => (
    <View style={styles.card}>
      <Text style={styles.teamNames}>
        {item.homeTeam} {item.homeScore} - {item.awayScore} {item.awayTeam}
      </Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
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
