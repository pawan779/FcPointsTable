import { pointsTable, PointsTable } from "@/constants/DummyData";
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PointsTableScreen = () => {
  const renderItem = ({ item }: { item: PointsTable }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.teamCell}>
        {item.name}
      </Text>
      <Text style={styles.cell}>{item.played}</Text>
      <Text style={styles.cell}>{item.won}</Text>
      <Text style={styles.cell}>{item.drawn}</Text>
      <Text style={styles.cell}>{item.lost}</Text>
      <Text style={styles.cell}>
        {item.goalsFor}-{item.goalsAgainst}
      </Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.teamHeaderCell}>Team</Text>
        <Text style={styles.headerCell}>P</Text>
        <Text style={styles.headerCell}>W</Text>
        <Text style={styles.headerCell}>D</Text>
        <Text style={styles.headerCell}>L</Text>
        <Text style={styles.headerCell}>+/-</Text>
        <Text style={styles.headerCell}>Pts</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={pointsTable}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 3,
  },
  headerRow: {
    flexDirection: "row",
    marginVertical: 0.5,
    backgroundColor: "#161616",
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    marginVertical: 0.5,
    backgroundColor: "#161616",
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  headerCell: {
    flex: 1,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
    fontSize: 13,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 11,
  },
  teamHeaderCell: {
    flex: 4,
    fontWeight: "800",
    textAlign: "left",
    color: "#fff",
    fontSize: 13,
    paddingLeft: 10,
  },
  teamCell: {
    flex: 4,
    textAlign: "left",
    color: "#fff",
    fontSize: 11,
    paddingLeft: 10,
  },
});

export default PointsTableScreen;
