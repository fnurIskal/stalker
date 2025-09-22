import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getMyHabits } from "../services/HabitService";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "./CustomButton";
import dayjs from "dayjs";
import { HabitCategoryColors } from "../data/HabitCategoryColors";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";

const getContrastingTextColor = (hexColor) => {
  if (!hexColor || !hexColor.startsWith("#")) {
    return "#ffffff";
  }
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#000000" : "#ffffff";
};

export default function UpdateHabitScreen({ onUpdate }) {
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [pendingHabits, setPendingHabits] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const habitsData = await getMyHabits();

        setCompletedHabits(
          habitsData.filter((habit) =>
            habit.days.includes(dayjs().format("DD/MM/YYYY"))
          )
        );
        setPendingHabits(
          habitsData.filter(
            (habit) => !habit.days.includes(dayjs().format("DD/MM/YYYY"))
          )
        );
      };
      fetchData();
    }, [])
  );

  if (!completedHabits && !pendingHabits)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  return (
    <View
      className="flex-1 justify-center items-center"
      style={{ gap: wp("3%") }}
    >
      <Text className="font-bold text-4xl text-center color-[#1d6517]">
        Keep your{"\n"}streak alive!
      </Text>
      <View
        style={{
          backgroundColor: "white",
          width: wp("85%"),
          height: wp("20%"),
          borderRadius: 12,
          padding: wp("4%"),
          gap: wp("3%"),
          elevation: 6,
        }}
      >
        <View className="flex-row justify-between">
          <Text className="font-semibold">Today's Progress</Text>
          <Text>
            {`${
              (completedHabits?.length ?? 0) + (pendingHabits?.length ?? 0) > 0
                ? (completedHabits?.length ?? 0)
                : 0
            }/${(completedHabits?.length ?? 0) + (pendingHabits?.length ?? 0)} `}
            completed
          </Text>
        </View>
        <ProgressBar
          progress={
            (completedHabits?.length ?? 0) + (pendingHabits?.length ?? 0) > 0
              ? (completedHabits?.length ?? 0) /
                ((completedHabits?.length ?? 0) + (pendingHabits?.length ?? 0))
              : 0
          }
          color="#f4aada"
          style={{ borderRadius: 12, height: wp("3%") }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ gap: wp("2%") }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="font-semibold p-2 text-lg">Pending Habits Today</Text>
        {pendingHabits.map((habit, index) => {
          const categoryColor = HabitCategoryColors.find(
            (c) => c.category === habit.habit_category
          );
          const textColor = getContrastingTextColor(categoryColor?.color1);

          return (
            <Pressable
              key={index}
              onPress={() =>
                selectedHabit !== habit
                  ? setSelectedHabit(habit)
                  : setSelectedHabit(null)
              }
            >
              <LinearGradient
                colors={[
                  categoryColor?.color1 || "#ccc",
                  categoryColor?.color2 || "#999",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: wp("4%"),
                  borderRadius: 12,
                  width: wp("85%"),
                  height: wp("20%"),
                }}
              >
                <View style={{ gap: wp("2%") }}>
                  <Text className="font-medium" style={{ color: textColor }}>
                    {habit.habit_name}
                  </Text>
                  <View
                    className="rounded-3xl"
                    style={{
                      backgroundColor:
                        textColor === "#000000"
                          ? "rgba(0, 0, 0, 0.1)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Text
                      className="font-light"
                      style={{
                        paddingVertical: wp("1%"),
                        paddingHorizontal: wp("1.5%"),
                        color: textColor,
                      }}
                    >
                      {habit.habit_category}
                    </Text>
                  </View>
                </View>
                {selectedHabit === habit && (
                  <View
                    className="rounded-full"
                    style={{
                      gap: wp("2%"),
                      backgroundColor: "#e3faeb",
                      padding: wp("2%"),
                      position: "absolute",
                      right: 5,
                    }}
                  >
                    <Feather name="check-circle" size={24} color="#5ebe81" />
                  </View>
                )}
              </LinearGradient>
            </Pressable>
          );
        })}
        <Text className="font-semibold p-2 text-lg">
          Completed Habits Today
        </Text>
        {completedHabits.map((habit, index) => {
          const categoryColor = HabitCategoryColors.find(
            (c) => c.category === habit.habit_category
          );
          const textColor = getContrastingTextColor(categoryColor?.color1);

          return (
            <Pressable key={index} className="flex-row items-center w-full">
              <LinearGradient
                colors={[
                  categoryColor?.color1 || "#ccc",
                  categoryColor?.color2 || "#999",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: wp("4%"),
                  borderRadius: 12,
                  width: wp("85%"),
                  height: wp("20%"),
                }}
              >
                <View style={{ gap: wp("2%") }}>
                  <Text
                    className="font-medium line-through"
                    style={{ color: textColor, opacity: 0.7 }}
                  >
                    {habit.habit_name}
                  </Text>
                  <View
                    className="rounded-3xl"
                    style={{
                      backgroundColor:
                        textColor === "#000000"
                          ? "rgba(0, 0, 0, 0.1)"
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Text
                      className="font-light"
                      style={{
                        paddingVertical: wp("1%"),
                        paddingHorizontal: wp("1.5%"),
                        color: textColor,
                      }}
                    >
                      {habit.habit_category}
                    </Text>
                  </View>
                </View>
                <View
                  className="rounded-full"
                  style={{
                    gap: wp("2%"),
                    backgroundColor: "#e3faeb",
                    padding: wp("2%"),
                    position: "absolute",
                    right: 5,
                  }}
                >
                  <Feather name="check-circle" size={24} color="#5ebe81" />
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
        <CustomButton
          title="Update the habit"
          onPress={() =>
            onUpdate(selectedHabit.id, selectedHabit.habit_streak, false)
          }
        />
      </ScrollView>
    </View>
  );
}
