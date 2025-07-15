import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import dayjs from "dayjs";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const WeekCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(dayjs().format("YYYY-MM-DD"));

  const weekDays = [...Array(7)].map((_, i) => {
    const date = dayjs().startOf("week").add(i, "day");
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
        gap: wp("2.5%"),
        paddingHorizontal: wp("3%"), // sadece yatay boşluk
      }}
      style={{ maxHeight: wp("25%") }}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => {
        const isSelected = item.date === selectedDay;
        return (
          <Pressable
            onPress={() => setSelectedDay(item.date)}
            style={{
              padding: wp("2%"),
              backgroundColor: isSelected ? "black" : "white",
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#ccc",
              width: wp("12%"),
              height: wp("20%"),
            }}
          >
            <Text style={{ color: isSelected ? "white" : "black" }}>
              {item.label}
            </Text>
            <Text
              style={{
                color: isSelected ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {item.dayNum}
            </Text>
          </Pressable>
        );
      }}
    />
  );
};

export default WeekCalendar;
