import { View, Text, Image, FlatList, Pressable } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import WeekCalendar from "../components/WeekCalendar";
import DefaultEmojis from "../data/DefaultImages";

export default function HomeScreen({ navigation }) {
  const topRow = DefaultEmojis.slice(0, 4);
  const bottomRow = DefaultEmojis.slice(4);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("MoodStack")}
        style={{ height: wp("65%") }}
        className="bg-[#b9e7fa] rounded-2xl "
      >
        <Image
          style={{
            position: "absolute",
            right: wp("-6%"),
            top: wp("-6%"),
            width: wp("45%"),
            height: wp("45%"),
          }}
          source={require("../../assets/stalkerIcon.png")}
        />
        <Text
          style={{ padding: wp("4%"), paddingTop: wp("10%") }}
          className="font-extrabold text-4xl"
        >
          How Are You{"\n"}Feeling Today?
        </Text>
        <Text
          style={{ paddingHorizontal: wp("4%") }}
          className="font-light text-sm"
        >
          Press and Select Your Mood
        </Text>

        <View style={{ marginTop: wp("5%") }}>
          {[topRow, bottomRow].map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: wp("3%"),
              }}
            >
              {row.map((item) => (
                <View
                  key={item.value}
                  style={{
                    alignItems: "center",
                    marginHorizontal: wp("1%"),
                    flexDirection: "row",
                    backgroundColor: "#cdedfa",
                    gap: wp("1%"),
                    borderRadius: 12,
                    paddingHorizontal: wp("1%"),
                    paddingVertical: wp("1%"),
                  }}
                >
                  <Image
                    source={item.file}
                    style={{ width: wp("7%"), height: wp("7%") }}
                  />
                  <Text className="font-light text-sm">{item.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Pressable>
      {/* <WeekCalendar /> */}
    </View>
  );
}
