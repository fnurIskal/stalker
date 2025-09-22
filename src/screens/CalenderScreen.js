import { View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SegmentedButtons } from "react-native-paper";
import HabitsCalendarScreen from "../components/HabitsCalendarScreen";

export default function CalenderScreen() {
  const [screen, setScreen] = useState("habits");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f6ed" }}>
      <View
        style={{
          flex: 1,
          padding: wp("4%"),
          gap: wp("5%"),
        }}
      >
        <SegmentedButtons
          value={screen}
          onValueChange={setScreen}
          buttons={[
            {
              value: "moods",
              label: "Moods",
              style: {
                backgroundColor: screen === "moods" ? "#3e8440" : "white",
              },
              checkedColor: screen === "moods" ? "white" : "#3e8440",
            },
            {
              value: "habits",
              label: "Habits",
              style: {
                backgroundColor: screen === "habits" ? "#3e8440" : "white",
              },
              checkedColor: screen === "habits" ? "white" : "#3e8440",
            },
          ]}
        />
        {screen === "habits" && <HabitsCalendarScreen />}
      </View>
    </SafeAreaView>
  );
}
