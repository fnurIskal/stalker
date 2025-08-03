import { View, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function PastHabitDetails({ habit }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fbf7ea",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        padding: wp("3%"),
        borderRadius: 12,
      }}
    >
      <Text>{habit.habit_category}</Text>
      <Text>{habit.habit_name}</Text>
    </View>
  );
}
