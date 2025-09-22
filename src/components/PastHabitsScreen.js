import { View, ActivityIndicator, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getMyHabits } from "../services/HabitService";
import PastHabitDetails from "./PastHabitDetails";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    <FlatList
      data={habits}
      renderItem={({ item }) => <PastHabitDetails habit={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: hp("2%") }} />}
      contentContainerStyle={{
        paddingBottom: hp("5%"),
        paddingHorizontal: hp("1%"),
      }}
    />
  );
}
