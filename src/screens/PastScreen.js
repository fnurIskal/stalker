import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getMyMoods } from "../services/MoodService";
import { Audio } from "expo-av";
import dayjs from "dayjs";
import emojiMap from "../../assets/emojiMap";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function PastScreen() {
  const [moods, setMoods] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const moods = await getMyMoods();
      console.log(moods);
      setMoods(moods);
    };
    fetchData();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  if (!moods)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "red",
        padding: wp("4%"),
      }}
      contentContainerStyle={{ gap: wp("5%"), paddingBottom: hp("20%") }}
    >
      {moods.map((mood, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            backgroundColor: "#f9f6e0",
            padding: wp("3%"),
            borderRadius: 12,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: wp("3%"),
            }}
          >
            <Image
              source={emojiMap[mood.mood_type]}
              style={{ width: wp("13%"), height: wp("13%") }}
            />
            <View>
              <Text className="font-medium text-xl">I feel happy today!</Text>
              <Text className="font-light text-xs">
                {dayjs(mood.created_at).format("YYYY-MM-DD HH:mm")}
              </Text>
            </View>
          </View>
          {/* note */}
          {mood.mood_desc && (
            <>
              <Text
                style={{
                  marginTop: wp("5%"),
                  marginBottom: wp("2%"),
                }}
                className="font-bold text-sm"
              >
                My Note
              </Text>
              <View
                style={{ padding: wp("5%") }}
                className="bg-[#fdfdf5] rounded-xl border border-gray-300 relative overflow-hidden"
              >
                <SimpleLineIcons
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                  }}
                  name="pin"
                  size={12}
                  color="black"
                />
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
                  {mood.mood_desc}
                </Text>
              </View>
            </>
          )}

          {/* voice */}
          {mood.audio_url && (
            <View>
              <Text
                style={{
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
                <Pressable
                  onPress={() => {
                    togglePlay();
                    playAudio(mood.audio_url);
                  }}
                >
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
          )}

          {/* image */}
          {mood.photo_url && (
            <>
              <Text
                style={{
                  marginTop: wp("5%"),
                  marginBottom: wp("2%"),
                }}
                className="font-bold text-sm"
              >
                My Image
              </Text>
              <Image
                source={{ uri: mood.photo_url }}
                style={{
                  width: wp("35%"),
                  height: wp("35%"),
                  margin: wp("3%"),
                  borderRadius: 12,
                }}
              />
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
