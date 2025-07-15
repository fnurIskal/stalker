import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoodSelectPage from "../screens/Mood/MoodSelectPage";
import MoreDetailPage from "../screens/Mood/MoreDetailPage";

export default function MoodStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mood" component={MoodSelectPage} />
      <Stack.Screen name="moreDetail" component={MoreDetailPage} />
    </Stack.Navigator>
  );
}
