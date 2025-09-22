import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  const selectedEmojiType = useSelector((state) => state.mood.value);

  if (!selectedEmojiType || !Array.isArray(selectedEmojiType.data)) {
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

  const CategoryPill = ({ icon, label }) => (
    <View
      style={{
        alignItems: "center",
        marginHorizontal: wp("1%"),
        flexDirection: "row",
        backgroundColor: "#fffae6",
        gap: wp("1%"),
        borderRadius: 12,
        paddingHorizontal: wp("2%"),
        paddingVertical: wp("1%"),
        borderWidth: 1,
        borderColor: "#3e8440",
      }}
    >
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <Text className="font-light text-sm">{label}</Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: hp("5%"),
      }}
    >
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        resizeMode="cover"
        className="inset-0 absolute"
        imageStyle={{ height: hp("40%") }}
      />
      <Text className="color-[#fec200] font-bold text-4xl text-center">
        Stalker
      </Text>
      <View style={{ gap: wp("2%") }}>
        <Image
          source={require("../../assets/char.png")}
          style={{ height: 200, width: 200, alignSelf: "center" }}
        />
      </View>
      <View
        style={{
          padding: wp("4%"),
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: wp("12%"),
          gap: wp("10%"),
        }}
      >
        <View>
          <View
            className="absolute bg-white elevation-lg self-center rounded-xl items-center justify-center border"
            style={{
              width: wp("80%"),
              height: hp("7%"),
              zIndex: 10,
              top: wp("-12%"),
            }}
          >
            <Text className="color-[#fec200] text-xl">
              How are you feeling today?
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("MainMoodScreen")}
            style={{
              paddingVertical: wp("5%"),
            }}
            className="bg-[#fefdf1] rounded-2xl elevation-lg border"
          >
            <Text
              style={{ paddingHorizontal: wp("4%") }}
              className="font-medium text-base color-black"
            >
              Click and select your mood
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: wp("4%"),
                marginTop: wp("5%"),
              }}
            >
              {selectedEmojiType.data.map((item) => (
                <View
                  key={item.value}
                  style={{
                    width: "48%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#01ad47",
                    borderRadius: 12,
                    padding: wp("2%"),
                    marginBottom: wp("2%"),
                    elevation: 2,
                    gap: wp("2%"),
                  }}
                >
                  <Image
                    source={item.file}
                    style={{
                      width: wp("8%"),
                      height: wp("8%"),
                      resizeMode: "contain",
                    }}
                  />
                  <Text className="font-bold text-base text-white">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </Pressable>
        </View>
        <View>
          <View
            className="absolute bg-white elevation-lg self-center rounded-xl items-center justify-center border"
            style={{
              width: wp("80%"),
              height: hp("7%"),
              zIndex: 10,
              top: wp("-7%"),
            }}
          >
            <Text className="color-[#fec200] text-xl">
              Did you keep up today?
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("HabitSelectPage")}
            style={{ height: wp("67%"), marginTop: wp("5%") }}
            className="bg-[#fefdf1] rounded-2xl elevation-lg border"
          >
            <Text
              style={{ padding: wp("3%") }}
              className="font-light self-end text-sm color-[#3e8440]"
            >
              Build Your Streak Today
            </Text>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginBottom: wp("3%"),
                marginTop: wp("5%"),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: wp("2%"),
                  width: wp("90%"),
                }}
              >
                <CategoryPill icon="brain" label="Personal" />
                <CategoryPill icon="meditation" label="Health" />
                <CategoryPill icon="wallet" label="Financial" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: wp("80%"),
                }}
              >
                <CategoryPill icon="palette" label="Hobby" />
                <CategoryPill icon="stop-circle" label="Addiction" />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
