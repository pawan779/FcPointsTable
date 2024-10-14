import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={"soccer-field"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="table"
        options={{
          title: "Table",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "view-grid" : "view-grid-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
