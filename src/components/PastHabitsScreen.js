import { View, Text, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getMyHabits } from "../services/HabitService";
import PastHabitDetails from "./PastHabitDetails";

export default function PastHabitsScreen() {
  const [habits, setHabits] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const habitsData = await getMyHabits();
        setHabits(habitsData);
      };
      fetchData();
    }, [])
  );

  if (!habits)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  return (
    <>
      {habits.map((habit, index) => (
        <View key={index}>
          <PastHabitDetails habit={habit} />
        </View>
      ))}
    </>
  );
}
