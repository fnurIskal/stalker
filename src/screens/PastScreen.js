import { ScrollView } from "react-native";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SegmentedButtons } from "react-native-paper";
import PastMoodsScreen from "../components/PastMoodsScreen";
import PastHabitsScreen from "../components/PastHabitsScreen";
import { useRoute } from "@react-navigation/native";

export default function PastScreen() {
  const route = useRoute();
  const { screenName } = route.params || {};
  const [screen, setScreen] = useState(screenName || "moods");

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
      contentContainerStyle={{ gap: wp("5%"), paddingBottom: hp("20%") }}
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
      {screen === "moods" && <PastMoodsScreen />}
      {screen === "habits" && <PastHabitsScreen />}
    </ScrollView>
  );
}
