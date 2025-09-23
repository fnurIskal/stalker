import { View, Text, Image } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { HabitCategoryColors } from "../data/HabitCategoryColors";
import dayjs from "dayjs";

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

const calculateMaxStreak = (days) => {
  if (!days || days.length === 0) return 0;

  const uniqueSortedDates = Array.from(
    new Set(days.map((d) => dayjs(d, "DD/MM/YYYY").format("YYYY-MM-DD")))
  )
    .map((d) => dayjs(d, "YYYY-MM-DD"))
    .sort((a, b) => a.valueOf() - b.valueOf());

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueSortedDates.length; i++) {
    const diff = uniqueSortedDates[i].diff(uniqueSortedDates[i - 1], "day");
    if (diff === 1) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }
  }

  return uniqueSortedDates.length === 0 ? 0 : maxStreak;
};

export default function PastHabitDetails({ habit }) {
  const categoryColor = HabitCategoryColors.find(
    (c) => c.category === habit.habit_category
  );

  const textColor = getContrastingTextColor(categoryColor?.color1);

  const lastFiveDays = [...Array(5)]
    .map((_, i) => {
      const date = dayjs().subtract(i, "day");
      return {
        date,
        isCompleted: habit.days.includes(date.format("DD/MM/YYYY")),
      };
    })
    .reverse();

  const maxStreak = calculateMaxStreak(habit.days);

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
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
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
              <Text
                className="font-medium text-xs"
                style={{ color: textColor }}
              >
                {habit.habit_category}
              </Text>
            </View>
          </View>
          <View className="flex-row" style={{ gap: wp("5%") }}>
            <View
              style={{
                flexDirection: "row",
                gap: wp("2%"),
                marginTop: wp("3%"),
              }}
            >
              {lastFiveDays.map((day, index) => (
                <View
                  key={index}
                  style={{ alignItems: "center", gap: wp("1%") }}
                >
                  <Text
                    style={{ fontSize: 10, color: textColor, opacity: 0.8 }}
                  >
                    {day.date.format("ddd")}
                  </Text>
                  <View
                    style={{
                      width: wp("4%"),
                      height: wp("4%"),
                      borderRadius: wp("2%"),
                      backgroundColor: day.isCompleted
                        ? "#66ff66"
                        : "rgba(255, 255, 255, 0.3)",
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    }}
                  />
                </View>
              ))}
            </View>
            <View style={{ alignItems: "center", gap: wp("1%") }}>
              <Image
                source={require("../../assets/streakicon.png")}
                style={{ width: wp("6%"), height: wp("6%") }}
              />
              <Text
                className="font-medium text-xl"
                style={{ color: textColor }}
              >
                {maxStreak}
                <Text style={{ color: textColor }}> days</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
