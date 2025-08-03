import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import dayjs from "dayjs";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const WeekCalendar = () => {
  const [pressedDays, setPressedDays] = useState({});

  const weekDays = [...Array(7)].map((_, i) => {
    const date = dayjs().startOf("isoWeek").add(i, "day");
    return {
      label: date.format("ddd"),
      date: date.format("YYYY-MM-DD"),
      dayNum: date.format("D"),
    };
  });

  return (
    <FlatList
      data={weekDays}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: wp("1.5%"),
      }}
      style={{ maxHeight: wp("25%") }}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => {
        const isPressed = pressedDays[item.date] || false;

        return (
          <Pressable
            style={{
              padding: wp("2%"),
              backgroundColor: "white",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              width: wp("11.5%"),
            }}
          >
            <Text style={{ color: "black", fontSize: 12 }}>{item.label}</Text>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              {item.dayNum}
            </Text>
            <Pressable
              onPress={() =>
                setPressedDays((prev) => ({
                  ...prev,
                  [item.date]: !prev[item.date],
                }))
              }
              style={{
                backgroundColor: isPressed ? "red" : "yellow",
              }}
              className="rounded-full w-3 h-3 mt-1"
            />
          </Pressable>
        );
      }}
    />
  );
};

export default WeekCalendar;
