import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "@/firebaseConfig";
import { ref, onValue, set } from "firebase/database";

// Define the structure for Fixture
interface Fixture {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeGoal: number;
  awayGoal: number;
  date: string;
  isCompleted: boolean;
}

interface FixtureContextType {
  fixtures: Fixture[];
  setFixtures: React.Dispatch<React.SetStateAction<Fixture[]>>;
}

const FixtureContext = createContext<FixtureContextType | undefined>(undefined);

export const FixtureProvider: React.FC = ({ children }) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  // Load fixtures from Firebase and AsyncStorage when the app starts
  useEffect(() => {
    const loadFixtures = async () => {
      try {
        // Fetch fixtures from Firebase
        const fixtureRef = ref(database, "fixtures");
        onValue(fixtureRef, (snapshot) => {
          const firebaseData = snapshot.val();
          if (firebaseData) {
            const fixtureList = Object.values(firebaseData) as Fixture[];
            setFixtures(fixtureList); // Update the local state with Firebase data
          }
        });

        // // Load fixtures from AsyncStorage
        // const storedFixtures = await AsyncStorage.getItem("fixtures");
        // if (storedFixtures) {
        //   setFixtures((prevFixtures) => [
        //     ...JSON.parse(storedFixtures),
        //     ...prevFixtures,
        //   ]); // Merging local with Firebase
        // }
      } catch (error) {
        console.error(
          "Failed to load fixtures from AsyncStorage or Firebase",
          error
        );
      }
    };

    loadFixtures();
  }, []);

  // // Save fixtures to AsyncStorage and Firebase whenever they change
  // useEffect(() => {
  //   const saveFixtures = async () => {
  //     try {
  //       // Save to AsyncStorage
  //       await AsyncStorage.setItem("fixtures", JSON.stringify(fixtures));

  //       // Sync to Firebase
  //       if (fixtures.length > 0) {
  //         await set(ref(database, "fixtures"), fixtures);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Failed to save fixtures to AsyncStorage or Firebase",
  //         error
  //       );
  //     }
  //   };

  //   if (fixtures.length > 0) {
  //     saveFixtures();
  //   }
  // }, [fixtures]);

  return (
    <FixtureContext.Provider value={{ fixtures, setFixtures }}>
      {children}
    </FixtureContext.Provider>
  );
};

export const useFixtures = (): FixtureContextType => {
  const context = React.useContext(FixtureContext);
  if (!context) {
    throw new Error("useFixtures must be used within a FixtureProvider");
  }
  return context;
};
