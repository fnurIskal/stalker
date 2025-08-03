import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { useState, useLayoutEffect, useEffect, useCallback } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import WeekCalendar from "../components/WeekCalendar";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PremiumModal from "../components/PremiumModal";
export default function HomeScreen({ navigation }) {
  const selectedEmojiType = useSelector((state) => state.mood.value);
  const [modalVisible, setModalVisible] = useState(false);
  console.log(selectedEmojiType.name);
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

  const openPremiumModal = () => {
    setModalVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={openPremiumModal}
          style={{ marginLeft: wp("5%") }}
        >
          <MaterialCommunityIcons name="crown" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const topRow = selectedEmojiType.data.slice(0, 4);
  const bottomRow = selectedEmojiType.data.slice(4);

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
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("MainMoodScreen")}
        style={{ height: wp("67%") }}
        className="bg-[#fcf6dd] rounded-2xl elevation-xl"
      >
        <Image
          style={{
            position: "absolute",
            right: wp("-6%"),
            top: wp("-6%"),
            width: wp("43%"),
            height: wp("43%"),
          }}
          source={require("../../assets/stalkerIcon.png")}
        />
        <Text
          style={{ padding: wp("4%"), paddingTop: wp("10%") }}
          className="font-extrabold text-4xl color-[#3e8440]"
        >
          How Are You{"\n"}Feeling Today?
        </Text>
        <Text
          style={{ paddingHorizontal: wp("4%") }}
          className="font-light text-sm color-[#3e8440]"
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
                    backgroundColor: "#fffae6",
                    gap: wp("1%"),
                    borderRadius: 12,
                    paddingHorizontal: wp("1%"),
                    paddingVertical: wp("1%"),
                    borderWidth: 1,
                    borderColor: "#3e8440",
                  }}
                >
                  <Image
                    source={item.file}
                    style={{
                      width: wp("7%"),
                      height: wp("7%"),
                      resizeMode: "contain",
                    }}
                  />
                  <Text className="font-light text-sm">{item.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Pressable>
      {/* Habit Tracker */}
      <Pressable
        onPress={() => navigation.navigate("HabitSelectPage")}
        style={{ height: wp("67%"), marginTop: wp("5%") }}
        className="bg-[#fcf6dd] rounded-2xl elevation-xl"
      >
        <Image
          style={{
            position: "absolute",
            left: wp("-9%"),
            top: wp("-4%"),
            width: wp("43%"),
            height: wp("43%"),
          }}
          source={require("../../assets/stalkerIcon.png")}
        />
        <Text
          style={{ paddingHorizontal: wp("4%"), paddingTop: wp("5%") }}
          className="font-extrabold self-end text-4xl color-[#3e8440]"
        >
          Did You Keep Up
        </Text>
        <Text
          style={{ paddingHorizontal: wp("4%") }}
          className="font-extrabold self-end text-4xl color-[#3e8440]"
        >
          Today?
        </Text>
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
      {/* <WeekCalendar /> */}
      <PremiumModal
        visible={modalVisible}
        onDissmis={() => setModalVisible(false)}
      />
    </View>
  );
}
