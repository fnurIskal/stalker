import { Pressable, Text } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function CustomButton({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: wp("3%"),
        backgroundColor: "#1d6517",
        borderRadius: 24,
        width: wp("65%"),
        alignSelf: "center",
        margin: wp("5%"),
      }}
    >
      <Text className="text-[#f3f6f3] font-bold text-xl self-center ">
        {title}
      </Text>
    </Pressable>
  );
}
