import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SegmentedButtons } from "react-native-paper";
import YearlyDotCalendar from "../components/YearlyDotCalendar";

export default function CalenderScreen() {
  const [value, setValue] = useState();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
    >
      <SafeAreaView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "monthly",
              label: "Monthly",
            },
            {
              value: "yearly",
              label: "Yearly",
            },
          ]}
        />
      </SafeAreaView>
      {value === "yearly" && <YearlyDotCalendar />}
    </View>
  );
}
