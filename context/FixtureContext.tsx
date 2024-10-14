import { Fixture } from "@/constants/DummyData";
import React, { createContext, useState, useContext, ReactNode } from "react";

type FixtureContextType = {
  fixtures: Fixture[];
  setFixtures: React.Dispatch<React.SetStateAction<Fixture[]>>;
};

const FixtureContext = createContext<FixtureContextType | undefined>(undefined);

export const useFixtures = () => {
  const context = useContext(FixtureContext);
  if (!context) {
    throw new Error("useFixtures must be used within a FixtureProvider");
  }
  return context;
};

type FixtureProviderProps = {
  children: ReactNode;
};

export const FixtureProvider = ({ children }: FixtureProviderProps) => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [result, setResult] = useState<Fixture[]>([]);

  return (
    <FixtureContext.Provider value={{ fixtures, setFixtures }}>
      {children}
    </FixtureContext.Provider>
  );
};
