import { View, Text, Image, Pressable } from "react-native";
import { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Audio } from "expo-av";
import dayjs from "dayjs";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PastMoodDetails({ mood }) {
  const selectedEmojiType = useSelector((state) => state.mood.value);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const soundRef = useRef(null);

  const getEmojiFile = (selectedEmojiType, moodType) => {
    return selectedEmojiType?.data.find((item) => item.value === moodType)
      ?.file;
  };

  const togglePlay = async (mood) => {
    try {
      if (currentPlayingId === mood.id) {
        await soundRef.current?.stopAsync();
        await soundRef.current?.unloadAsync();
        soundRef.current = null;
        setCurrentPlayingId(null);
      } else {
        if (soundRef.current) {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync({
          uri: mood.audio_url,
        });
        soundRef.current = sound;
        await sound.playAsync();
        setCurrentPlayingId(mood.id);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setCurrentPlayingId(null);
          }
        });
      }
    } catch (error) {
      setCurrentPlayingId(null);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fbf7ea",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        padding: wp("3%"),
        borderRadius: 12,
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{
          gap: wp("3%"),
        }}
      >
        <View className="flex-row items-center" style={{ gap: wp("1%") }}>
          <Image
            source={getEmojiFile(selectedEmojiType, mood.mood_type)}
            style={{
              width: wp("13%"),
              height: wp("13%"),
              resizeMode: "contain",
            }}
          />
          <View>
            <Text className="font-medium text-xl">{`I feel ${mood.mood_type} today!`}</Text>
            <Text className="font-light text-xs">
              {dayjs(mood.created_at).format("YYYY-MM-DD HH:mm")}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center" style={{ gap: wp("2%") }}>
          <Ionicons name="share-social" size={20} color="black" />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
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

            <Text className="text-base leading-[20px]">{mood.mood_desc}</Text>
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
                // console.log(mood.audio_url);
                togglePlay(mood);
              }}
            >
              <AntDesign
                name={currentPlayingId === mood.id ? "pausecircleo" : "play"}
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
              {[12, 20, 16, 24, 18, 14, 22, 12, 20, 16, 24, 18, 14, 22].map(
                (height, index) => (
                  <View
                    key={index}
                    style={{
                      width: 4,
                      height: height,
                      backgroundColor:
                        currentPlayingId === mood.id ? "#3750a0" : "#999",
                      borderRadius: 2,
                    }}
                  />
                )
              )}
            </View>
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
  );
}
