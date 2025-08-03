import { Pressable, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

export default function CustomButton({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: wp("70%"),
        alignSelf: "center",
        margin: wp("5%"),
      }}
    >
      <LinearGradient
        colors={["#dbb3fb", "#e8afea", "#f9a8d5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingVertical: wp("4%"), borderRadius: 12 }}
      >
        <Text className="text-[#f3f6f3] font-bold text-xl self-center ">
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
