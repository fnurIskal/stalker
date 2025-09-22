import { View, Text, ActivityIndicator, Pressable } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getMyHabits } from "../services/HabitService";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "react-native-paper";
import DailyHabit from "./DailyHabit";
import WeeklyHabit from "./WeeklyHabit";
import OverallHabit from "./OverallHabit";

export default function HabitsCalendarScreen() {
  const [habits, setHabits] = useState(null);
  const [chosenFilter, setChosenFilter] = useState("daily");

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: wp("10%"),
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  return (
    <View style={{ flex: 1, gap: wp("5%") }}>
      <View className="flex-row">
        {["daily", "weekly", "overall"].map((filter) => (
          <Button
            key={filter}
            mode={chosenFilter === filter ? "outlined" : "text"}
            onPress={() => setChosenFilter(filter)}
            style={{ borderColor: "black" }}
            contentStyle={{ width: wp("25%"), height: hp("5%") }}
            rippleColor="#3e8440"
          >
            <Text className="color-black">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </Button>
        ))}
      </View>
      {chosenFilter === "daily" && <DailyHabit habits={habits} />}
      {chosenFilter === "weekly" && <WeeklyHabit />}
      {chosenFilter === "overall" && <OverallHabit habits={habits} />}
    </View>
  );
}
