import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert, // Import Alert
} from "react-native";
import { Fixture } from "@/constants/DummyData"; // Import the dummy data
import { tintColorLight } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useFixtures } from "@/context/FixtureContext";
import { ref, update } from "firebase/database";
import { database } from "@/firebaseConfig";

const FixtureScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const navigation = useNavigation();

  const { fixtures, setFixtures } = useFixtures();

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
          <ListItem key={fixture.id} item={fixture} selectedTitle={item} />
        ))}
      </View>
    );
  };

  const ListItem = ({
    item,
    selectedTitle,
  }: {
    item: Fixture;
    selectedTitle: string;
  }) => {
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
    return (
      <TouchableOpacity
        style={styles.card}
        disabled={item.isCompleted}
        onPress={() => {
          setSelectedFixture(item);
          setSelectedTitle(selectedTitle);
          setModalVisible(true);
        }}
      >
        {item.isCompleted ? (
          <Text style={styles.teamNames}>
            {item.homeTeam} {item.homeGoal} - {item.awayGoal} {item.awayTeam}
          </Text>
        ) : (
          <Text style={styles.teamNames}>
            {item.homeTeam} vs {item.awayTeam}
          </Text>
        )}

        <Text style={styles.date}>{"Match " + item.id}</Text>
      </TouchableOpacity>
    );
  };

  const handleScoreSubmit = async () => {
    console.log("Submitting score", selectedTitle);

    try {
      // Update the specific fixture in Firebase Realtime Database
      const fixtureRef = ref(
        database,
        `fixtures/${selectedTitle?.fixtureName}`
      );

      // Create the updated fixture object

      const index = selectedTitle.fixtures.findIndex(
        (fixture) => fixture.id === selectedFixture.id
      );
      selectedTitle.fixtures[index] = {
        homeGoal: Number(homeScore),
        awayGoal: Number(awayScore),
        isCompleted: true,
        id: selectedFixture.id,
        homeTeam: selectedFixture.homeTeam,
        awayTeam: selectedFixture.awayTeam,
        date: selectedFixture?.date || Date.now(),
      };

      const updatedFixture = selectedTitle;

      console.log("Updating fixture", updatedFixture);

      // Update only the specific fixture in the database
      await update(fixtureRef, updatedFixture);

      console.log("Fixture updated in Firebase Realtime Database");
    } catch (error) {
      console.error("Error updating fixture in Firebase:", error);
    }

    // Reset state
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

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("create")}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#161616",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
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
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#3a3a3a",
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: tintColorLight,
    fontSize: 30,
    lineHeight: 36,
  },
});

export default FixtureScreen;
