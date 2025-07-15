import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DefaultEmojis from "../../data/DefaultImages";
import CircularSlider from "../../components/CircularSlider";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function MoodSelectPage({ navigation }) {
  const [mood, setMood] = useState(DefaultEmojis[0]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        // padding: wp("4%"),
        alignItems: "center",
        gap: wp("7%"),
        paddingBottom: hp("20%"),
      }}
    >
      <Text className="font-bold text-4xl color-[#130057]">
        What is your mood?
      </Text>
      <CircularSlider changeIndex={(index) => setMood(DefaultEmojis[index])} />
      <Pressable
        className="bg-[#130057] rounded-xl items-center justify-center"
        style={{ width: wp("50%"), height: wp("15%") }}
        onPress={() => {
          console.log(mood);
          navigation.navigate("MoreDetail");
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
