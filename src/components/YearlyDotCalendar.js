import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import dayjs from "dayjs";

const months = ["Ja", "F", "Ma", "Ap", "M", "Ju", "J", "A", "S", "O", "N", "D"];

const year = dayjs().year();

export default function YearlyDotCalendar() {
  const handleDayPress = (day, monthIndex) => {
    const date = dayjs(`${year}-${monthIndex + 1}-${day + 1}`).format(
      "YYYY-MM-DD"
    );
    console.log("Selected date:", date);
  };

  return (
    <ScrollView horizontal>
      <View style={{ flexDirection: "row", padding: 10 }}>
        {/* Gün numaraları sütunu */}
        <View style={{ alignItems: "center", marginRight: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>Day</Text>
          {[...Array(31)].map((_, i) => (
            <Text key={i} style={{ fontSize: 10, marginVertical: 2 }}>
              {i + 1}
            </Text>
          ))}
        </View>

        {/* Her ay bir sütun */}
        {months.map((month, monthIndex) => {
          const daysInMonth = dayjs(
            `${year}-${monthIndex + 1}-01`
          ).daysInMonth();

          return (
            <View
              key={month}
              style={{ alignItems: "center", marginHorizontal: 4 }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                {month}
              </Text>
              {[...Array(31)].map((_, dayIndex) => {
                const valid = dayIndex < daysInMonth;

                return (
                  <Pressable
                    key={dayIndex}
                    disabled={!valid}
                    onPress={() => handleDayPress(dayIndex, monthIndex)}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      marginVertical: 2,
                      backgroundColor: "#e0e0e0",
                    }}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
