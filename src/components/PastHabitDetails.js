import { View, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HabitCategoryColors } from "../data/HabitCategoryColors";

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

export default function PastHabitDetails({ habit }) {
  const categoryColor = HabitCategoryColors.find(
    (c) => c.category === habit.habit_category
  );

  const textColor = getContrastingTextColor(categoryColor?.color1);

  return (
    <View
      style={{
        borderRadius: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}
    >
      <LinearGradient
        colors={[
          categoryColor?.color1 || "#ccc",
          categoryColor?.color2 || "#999",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: wp("5%"),
          borderRadius: 16,
        }}
      >
        <View style={{ gap: wp("2%") }}>
          <Text className="font-bold text-lg" style={{ color: textColor }}>
            {habit.habit_name}
          </Text>
          <View
            className="rounded-full self-start"
            style={{
              backgroundColor:
                textColor === "#000000"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.2)",
              paddingVertical: wp("1%"),
              paddingHorizontal: wp("3%"),
            }}
          >
            <Text className="font-medium text-xs" style={{ color: textColor }}>
              {habit.habit_category}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", gap: wp("1%") }}>
          <Text className="font-bold text-2xl" style={{ color: textColor }}>
            {habit.habit_streak}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
