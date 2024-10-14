import { useFixtures } from "@/context/FixtureContext";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const PointsTableScreen = () => {
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const { fixtures } = useFixtures();

  useEffect(() => {
    const calculatePoints = () => {
      const table: any = {};

      // Iterate over the fixtures and calculate points for each team
      fixtures.forEach((fixture) => {
        if (fixture.isCompleted) {
          // Initialize teams if they don't exist in the table
          if (!table[fixture.homeTeam]) {
            table[fixture.homeTeam] = {
              name: fixture.homeTeam,
              played: 0,
              won: 0,
              drawn: 0,
              lost: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              goalDifference: 0,
              points: 0,
            };
          }
          if (!table[fixture.awayTeam]) {
            table[fixture.awayTeam] = {
              name: fixture.awayTeam,
              played: 0,
              won: 0,
              drawn: 0,
              lost: 0,
              goalsFor: 0,
              goalsAgainst: 0,
              goalDifference: 0,
              points: 0,
            };
          }

          // Update played matches for both teams
          table[fixture.homeTeam].played += 1;
          table[fixture.awayTeam].played += 1;

          // Update goals for and against
          table[fixture.homeTeam].goalsFor += fixture.homeGoal;
          table[fixture.homeTeam].goalsAgainst += fixture.awayGoal;
          table[fixture.awayTeam].goalsFor += fixture.awayGoal;
          table[fixture.awayTeam].goalsAgainst += fixture.homeGoal;

          // Determine the result and update points
          if (fixture.homeGoal > fixture.awayGoal) {
            // Home team wins
            table[fixture.homeTeam].won += 1;
            table[fixture.homeTeam].points += 3;
            table[fixture.awayTeam].lost += 1;
          } else if (fixture.awayGoal > fixture.homeGoal) {
            // Away team wins
            table[fixture.awayTeam].won += 1;
            table[fixture.awayTeam].points += 3;
            table[fixture.homeTeam].lost += 1;
          } else {
            // Draw
            table[fixture.homeTeam].drawn += 1;
            table[fixture.awayTeam].drawn += 1;
            table[fixture.homeTeam].points += 1;
            table[fixture.awayTeam].points += 1;
          }
        }
      });

      // Calculate Goal Difference for each team
      Object.values(table).forEach((team) => {
        team.goalDifference = team.goalsFor - team.goalsAgainst;
      });

      // Convert the table object to an array and sort by points in descending order
      const sortedTable = Object.values(table).sort(
        (a, b) => b.points - a.points || b.goalDifference - a.goalDifference
      );
      setPointsTable(sortedTable);
    };

    calculatePoints();
  }, [fixtures]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.played}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.teamCell}>
        {item.name}
      </Text>
      <Text style={styles.cell}>{item.won}</Text>
      <Text style={styles.cell}>{item.drawn}</Text>
      <Text style={styles.cell}>{item.lost}</Text>
      <Text style={styles.cell}>
        {item.goalsFor}-{item.goalsAgainst}
      </Text>
      <Text style={styles.cell}>{item.goalDifference}</Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>P</Text>
        <Text style={styles.teamHeaderCell}>Team</Text>
        <Text style={styles.headerCell}>W</Text>
        <Text style={styles.headerCell}>D</Text>
        <Text style={styles.headerCell}>L</Text>
        <Text style={styles.headerCell}>+/-</Text>
        <Text style={styles.headerCell}>GD</Text>
        <Text style={styles.headerCell}>Pts</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={pointsTable}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
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
