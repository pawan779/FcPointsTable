import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { fixtures, Fixture } from "@/constants/DummyData"; // Import the dummy data
import { tintColorLight } from "@/constants/Colors";

const FixtureScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const renderItem = ({ item }: { item: Fixture }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedFixture(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.teamNames}>
        {item.homeTeam} vs {item.awayTeam}
      </Text>
      <Text style={styles.date}>{"Match " + item.id}</Text>
    </TouchableOpacity>
  );

  const handleScoreSubmit = () => {
    // You can handle score submission here
    console.log(
      `Scores submitted: ${selectedFixture?.homeTeam} ${homeScore} - ${selectedFixture?.awayTeam} ${awayScore}`
    );
    setModalVisible(false);
    setHomeScore("");
    setAwayScore("");
    setSelectedFixture(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={fixtures}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setAwayScore("");
          setHomeScore("");
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedFixture?.homeTeam} vs {selectedFixture?.awayTeam}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={selectedFixture?.homeTeam + " Score"}
              keyboardType="number-pad"
              value={homeScore}
              onChangeText={setHomeScore}
              placeholderTextColor={"#cacaca"}
            />
            <TextInput
              style={styles.input}
              placeholder={selectedFixture?.awayTeam + " Score"}
              keyboardType="number-pad"
              value={awayScore}
              onChangeText={setAwayScore}
              placeholderTextColor={"#cacaca"}
            />

            <TouchableOpacity style={styles.button} onPress={handleScoreSubmit}>
              <Text style={[styles.buttonText, { color: tintColorLight }]}>
                Submit Score
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.buttonText, { color: "#bdbdbd" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#202323",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#282828",
    borderRadius: 10,
    backgroundColor: "#000",
    color: "#fff",
  },
  button: {
    backgroundColor: "#3a3a3a",
    borderRadius: 4,
    padding: 10,
    marginVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default FixtureScreen;
