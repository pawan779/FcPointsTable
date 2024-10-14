import { tintColorLight } from "@/constants/Colors";
import { Fixture } from "@/constants/DummyData";
import { useFixtures } from "@/context/FixtureContext";
import { useNavigation } from "expo-router";
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

const FixtureGeneratorScreen = () => {
  const [fixtureName, setFixtureName] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [matchesPerTeam, setMatchesPerTeam] = useState<number | null>(null);
  const { fixtures, setFixtures } = useFixtures();
  const navigation = useNavigation();

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
          const randomHomeFirst = Math.random() < 0.5;
          newFixtures.push({
            id: newFixtures.length + 1,
            homeTeam: randomHomeFirst ? teams[i] : teams[j],
            awayTeam: randomHomeFirst ? teams[j] : teams[i],
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
    }

    setFixtures(newFixtures);
    navigation.goBack();
  };

  const resetPlayer = () => {
    setPlayerNames([]);
    setMatchesPerTeam(null);
    setFixtures([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixture Generator</Text>

      {/* Fixture Name Input */}
      {/* <Text>Enter Fixture Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Fixture Name"
        value={fixtureName}
        onChangeText={(text) => setFixtureName(text)}
      /> */}

      {/* Block further inputs until fixture name is set */}
      {/* {fixtureName.length > 0 && ( */}
      <View>
        <Text style={styles.txt}>How many players?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor={"#555555"}
          placeholder="Number of Players"
          onChangeText={(text) => {
            setNumberOfPlayers(Number(text));
            resetPlayer();
          }}
        />

        {Array.from({ length: numberOfPlayers }).map((_, index) => (
          <TextInput
            key={index}
            placeholder={`Player ${index + 1} Name`}
            style={styles.input}
            onChangeText={(text) => handlePlayerNameChange(text, index)}
            placeholderTextColor={"#555555"}
          />
        ))}

        <Text style={styles.txt}>How many matches per team?</Text>
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
      </View>
      <TouchableOpacity style={styles.button} onPress={generateFixtures}>
        <Text style={styles.buttonText1}>Generate Fixtures</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  txt: {
    fontSize: 15,
    marginBottom: 5,
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
    marginVertical: 20,
  },
  matchButton: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: tintColorLight,
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
  button: {
    backgroundColor: "#000", // Dark button color
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: "center", // Centers the text
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FixtureGeneratorScreen;
