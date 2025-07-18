import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PastScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // burada ses çalma/durdurma fonksiyonu eklenebilir
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
    >
      {/*  image*/}
      <View
        style={{
          flex: 1,
          backgroundColor: "#f9f6e0",
          height: hp("45%"),
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: wp("4%"),
            right: wp("4%"),
          }}
          className="font-light text-sm"
        >
          16.07.2025
        </Text>
        <View
          style={{
            alignItems: "center",
            marginTop: wp("13%"),
          }}
        >
          <Image
            source={require("../../assets/emojis/default/happy.png")}
            style={{ width: wp("35%"), height: wp("35%") }}
          />
          <Text
            style={{ marginTop: wp("2%") }}
            className="font-medium text-2xl "
          >
            I feel happy today!
          </Text>
        </View>
        {/* note */}
        <Text
          style={{
            paddingHorizontal: wp("4%"),
            marginTop: wp("5%"),
            marginBottom: wp("2%"),
          }}
          className="font-bold text-sm"
        >
          My Note
        </Text>
        <View
          style={{ padding: wp("5%") }}
          className="bg-[#fdfdf5] rounded-xl border border-gray-300  relative  overflow-hidden"
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <View
              key={index}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: index * 20,
                height: 1,
                backgroundColor: "#dcdcdc",
              }}
            />
          ))}

          <Text className="text-base leading-[20px]">
            bugün bunları hissetmişim boş boş yazı yazmışım. bugün bunları
            hissetmişim boş boş yazı yazmışım. bugün bunları hissetmişim boş boş
            yazı yazmışım. bugün bunları hissetmişim boş boş yazı yazmışım.
          </Text>
        </View>

        {/* voice */}
        <View>
          <Text
            style={{
              paddingHorizontal: wp("4%"),
              marginTop: wp("5%"),
              marginBottom: wp("2%"),
            }}
            className="font-bold text-sm"
          >
            My Voice
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: 15,
              borderRadius: 12,
              marginVertical: 10,
            }}
          >
            {/* Oynatma butonu */}
            <Pressable onPress={togglePlay}>
              <AntDesign
                name={isPlaying ? "pausecircleo" : "play"}
                size={30}
                color="black"
              />
            </Pressable>

            {/* Dalga görünümü */}
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                gap: 4,
              }}
            >
              {[12, 20, 16, 24, 18, 14, 22].map((height, index) => (
                <View
                  key={index}
                  style={{
                    width: 4,
                    height: height,
                    backgroundColor: isPlaying ? "#3750a0" : "#999",
                    borderRadius: 2,
                  }}
                />
              ))}
            </View>

            {/* Süre */}
            <Text style={{ marginLeft: 15, color: "#555", fontSize: 14 }}>
              00:12
            </Text>
          </View>
        </View>

        {/* image */}
        <Text
          style={{
            paddingHorizontal: wp("4%"),
            marginTop: wp("5%"),
            marginBottom: wp("2%"),
          }}
          className="font-bold text-sm"
        >
          My Image
        </Text>

        <Image
          source={require("../../assets/icon.png")}
          style={{ width: wp("35%"), height: wp("35%"), margin: wp("3%") }}
        />
      </View>
    </ScrollView>
  );
}
