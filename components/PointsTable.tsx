import { useFixtures } from "@/context/FixtureContext";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "@expo/vector-icons/AntDesign";

const PointsTableScreen = () => {
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const [selectedFixture, setSelectedFixture] = useState<string | null>(null);
  const { fixtures } = useFixtures();

  const sortedFixtures = () => {
    const data = fixtures.sort((a, b) => {
      // Compare dates in descending order
      if (!a?.date || !b?.date) return 0;
      return new Date(b?.date).getTime() - new Date(a?.date).getTime();
    });
    return data[0];
  };

  const calculatePoints = (selectedItem?: string) => {
    const table: any = {};
    let pointTable = [];
    if (selectedItem) {
      pointTable = fixtures.find((fixture) => fixture?.id === selectedItem);
    } else {
      pointTable = sortedFixtures();
    }

    // Iterate over the fixtures and calculate points for each team
    pointTable?.fixtures.forEach((fixture) => {
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

  useEffect(() => {
    calculatePoints();
  }, [fixtures]);

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
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
      <Text style={styles.cell}>{item.goalDifference}</Text>
      <Text style={styles.cell}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View>
        {fixtures.map((fixture) => (
          <View>
            <Text key={fixture.id} style={{ color: "#fff" }}>
              {fixture.fixtureName}
            </Text>
          </View>
        ))}
      </View> */}

      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedFixture(value);
          calculatePoints(value);
        }}
        items={fixtures.map((fixture) => ({
          label: fixture.fixtureName,
          value: fixture.id,
        }))}
        // value={sortedFixtures().id}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        Icon={() => {
          return <AntDesign name="caretdown" size={15} color="#e8e8e8" />;
        }}
      />

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.teamHeaderCell}>Team</Text>
        <Text style={styles.headerCell}>P</Text>
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

  input: {
    color: "#fff",
    backgroundColor: "#444",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  selectedContainer: {
    marginTop: 16,
  },
  selectedText: {
    color: "#fff",
  },
});

export default PointsTableScreen;
