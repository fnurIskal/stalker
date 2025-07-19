import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CircularSlider from "../../components/CircularSlider";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function MoodSelectPage({ navigation }) {
  const selectedType = useSelector((state) => state.mood?.value);

  if (!selectedType || !Array.isArray(selectedType.data)) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#f9f6ed",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  const [mood, setMood] = useState(selectedType?.data[0]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        // padding: wp("4%"),
        alignItems: "center",
        gap: wp("15%"),
        paddingBottom: hp("12%"),
      }}
    >
      <Text className="font-bold text-4xl color-[#130057]">
        What is your mood?
      </Text>
      <CircularSlider
        changeIndex={(index) => setMood(selectedType.data[index])}
      />
      <Pressable
        className="bg-[#130057] rounded-xl items-center justify-center"
        style={{ width: wp("50%"), height: wp("15%") }}
        onPress={() => {
          navigation.navigate("DetailedMoodScreen", { moodType: mood });
        }}
      >
        <Animated.Text
          key={mood.slogan}
          entering={FadeIn.duration(400)}
          exiting={FadeOut.duration(400)}
          className="color-white text-2xl font-medium"
        >
          {mood.slogan}
        </Animated.Text>
      </Pressable>
    </View>
  );
}
