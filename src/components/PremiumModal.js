import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Portal, Modal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { AllEmojis } from "../data/DefaultImages";
import { changeMood } from "../redux/slices/MoodSlice";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PremiumModal({ visible, onDissmis }) {
  const selectedMood = useSelector((state) => state.mood.value);
  const dispatch = useDispatch();

  return (
    <Portal>
      <Modal visible={visible} onDissmis={onDissmis}>
        <View
          style={{
            width: wp("90%"),
            height: hp("90%"),
            paddingVertical: wp("4%"),
            gap: wp("2%"),
          }}
          className="bg-white justify-start items-center self-center rounded-2xl"
        >
          <AntDesign
            style={{
              position: "absolute",
              top: wp("3%"),
              right: wp("3%"),
            }}
            onPress={onDissmis}
            name="closecircleo"
            size={30}
            color="black"
          />
          <Text
            style={{
              marginTop: wp("8%"),
            }}
            className="font-bold text-2xl"
          >
            Choose your emoji theme
          </Text>
          <Text
            style={{
              paddingHorizontal: wp("3%"),
              marginBottom: wp("5%"),
            }}
            className="font-light text-center"
          >
            Make mood tracking fun Pick the emoji theme you prefer.
          </Text>

          {AllEmojis.map((item, index) => (
            <Pressable
              onPress={() => dispatch(changeMood(item))}
              style={{
                paddingVertical: wp("1%"),
                width: wp("85%"),
                borderWidth: selectedMood.name === item.name ? 2 : 1,
                borderColor: selectedMood.name === item.name ? "green" : "gray",
                borderRadius: 12,
              }}
              className=" self-center rounded-xl "
              key={index}
            >
              <Text className="text-center mb-1">{item.name}</Text>

              <View className="flex-row gap-1 justify-center items-center">
                {item.data.map((emoji, index) => (
                  <Image
                    key={index}
                    source={emoji.file}
                    style={{ width: 32, height: 32, resizeMode: "contain" }}
                  />
                ))}
              </View>
            </Pressable>
          ))}
        </View>
      </Modal>
    </Portal>
  );
}
