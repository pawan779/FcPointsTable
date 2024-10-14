import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Load fixtures from AsyncStorage when the app starts
  useEffect(() => {
    const loadFixtures = async () => {
      try {
        const storedFixtures = await AsyncStorage.getItem("fixtures");
        if (storedFixtures) {
          setFixtures(JSON.parse(storedFixtures));
        }
      } catch (error) {
        console.error("Failed to load fixtures from AsyncStorage", error);
      }
    };

    loadFixtures();
  }, []);

  // Save fixtures to AsyncStorage whenever they change
  useEffect(() => {
    const saveFixtures = async () => {
      try {
        await AsyncStorage.setItem("fixtures", JSON.stringify(fixtures));
      } catch (error) {
        console.error("Failed to save fixtures to AsyncStorage", error);
      }
    };

    if (fixtures.length > 0) {
      saveFixtures();
    }
  }, [fixtures]);

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
