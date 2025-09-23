import { View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PastHabitsScreen from "../components/PastHabitsScreen";

export default function PastScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        paddingHorizontal: wp("4%"),
        paddingTop: wp("4%"),
        gap: wp("5%"),
      }}
    >
      <PastHabitsScreen />
    </View>
  );
}
