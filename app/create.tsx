import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

export type Fixture = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeGoal: number;
  awayGoal: number;
  isCompleted: boolean;
};

const FixtureGeneratorScreen = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [matchesPerTeam, setMatchesPerTeam] = useState<number | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const handlePlayerNameChange = (text: string, index: number) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = text;
    setPlayerNames(updatedNames);
  };

  const generateFixtures = () => {
    if (playerNames.length < 2) {
      Alert.alert("Error", "Please enter at least 2 players.");
      return;
    }

    if (matchesPerTeam === null) {
      Alert.alert("Error", "Please select the number of matches per team.");
      return;
    }

    const newFixtures: Fixture[] = [];
    const teams = [...playerNames];

    // Generate fixtures based on player count and matches per team
    if (matchesPerTeam === 1) {
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const isHomeFirst = Math.random() < 0.5;
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: isHomeFirst ? teams[i] : teams[j],
            awayTeam: isHomeFirst ? teams[j] : teams[i],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });
        }
      }
    } else if (matchesPerTeam === 2) {
      // Home and away fixtures for each match-up
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: teams[i],
            awayTeam: teams[j],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: teams[j],
            awayTeam: teams[i],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });
        }
      }
    } else if (matchesPerTeam === 3) {
      // Home, away, and a random fixture for each team
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: teams[i],
            awayTeam: teams[j],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: teams[j],
            awayTeam: teams[i],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });

          // Random fixture with random home/away assignment
          const randomHomeFirst = Math.random() < 0.5;
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: randomHomeFirst ? teams[i] : teams[j],
            awayTeam: randomHomeFirst ? teams[j] : teams[i],
            homeGoal: 0,
            awayGoal: 0,
            isCompleted: false,
          });
        }
      }
    }

    setFixtures(newFixtures);
  };

  const resetPLayer = () => {
    setPlayerNames([]);
    setMatchesPerTeam(null);
    setFixtures([]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixture Generator</Text>

      <Text>How many players?</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => {
          setNumberOfPlayers(Number(text));
          resetPLayer();
        }}
      />

      {Array.from({ length: numberOfPlayers }).map((_, index) => (
        <TextInput
          key={index}
          placeholder={`Player ${index + 1} Name`}
          style={styles.input}
          onChangeText={(text) => handlePlayerNameChange(text, index)}
        />
      ))}

      <Text>How many matches per team?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.matchButton,
            matchesPerTeam === 1 && styles.selectedButton,
          ]}
          onPress={() => setMatchesPerTeam(1)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.matchButton,
            matchesPerTeam === 2 && styles.selectedButton,
          ]}
          onPress={() => setMatchesPerTeam(2)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.matchButton,
            matchesPerTeam === 3 && styles.selectedButton,
          ]}
          onPress={() => setMatchesPerTeam(3)}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>

      <Button title="Generate Fixtures" onPress={generateFixtures} />

      <FlatList
        data={fixtures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fixtureItem}>
            <Text>
              {item.homeTeam} vs {item.awayTeam}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  matchButton: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#008CBA",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  fixtureItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
});

export default FixtureGeneratorScreen;
