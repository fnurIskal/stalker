import { View, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import WeekCalendar from "../../components/WeekCalendar";
import { insertHabit, updateHabit } from "../../services/HabitService";
import NewHabitScreen from "../../components/NewHabitScreen";
import { useState } from "react";
import UpdateHabitScreen from "../../components/UpdateHabitScreen";
import dayjs from "dayjs";

export default function HabitSelectPage({ navigation }) {
  const [screen, setScreen] = useState("NewHabitScreen");

  const handleAddNewHabit = async (habitCategory, habitName) => {
    await insertHabit(habitCategory, habitName, 1);
    navigation.navigate("BottomNav", {
      screen: "PastScreen",
      params: { screenName: "habits" },
    });
  };

  const handleUpdateHabit = async (habitId, habitStreak, isRemoving) => {
    console.log(habitId + "@" + habitStreak);
    await updateHabit(habitId, habitStreak + 1, dayjs().format("DD/MM/YYYY"));
    navigation.navigate("BottomNav", {
      screen: "PastScreen",
      params: { screenName: "habits" },
    });
  };

  return (
    <View
      className="flex-1 items-center"
      style={{
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
        paddingBottom: wp("15%"),
      }}
    >
      {screen === "NewHabitScreen" && (
        <>
          <NewHabitScreen onSelect={handleAddNewHabit} />
          <Pressable
            style={{ marginTop: wp("2%") }}
            onPress={() => setScreen("UpdateHabitScreen")}
          >
            <Text className="italic underline">Or update your own habit</Text>
          </Pressable>
        </>
      )}
      {screen === "UpdateHabitScreen" && (
        <>
          <UpdateHabitScreen onUpdate={handleUpdateHabit} />
          <Pressable
            style={{ marginTop: wp("2%") }}
            onPress={() => setScreen("NewHabitScreen")}
          >
            <Text className="italic underline">Or start a new habit</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
