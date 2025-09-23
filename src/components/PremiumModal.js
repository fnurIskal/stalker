import { View, Text, Image, Pressable } from "react-native";
import { Portal, Modal } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { AllEmojis } from "../data/DefaultImages";
import { changeMood } from "../redux/slices/MoodSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EmojiTypeSave } from "../services/AsyncEmojiTypeSave";

export default function PremiumModal({ visible, onDissmis }) {
  const selectedMood = useSelector((state) => state.mood.value);
  const dispatch = useDispatch();
  const handleSave = async (item) => {
    dispatch(changeMood(item));
    await EmojiTypeSave(item);
    onDissmis();
  };

  return (
    <View
      style={{
        width: wp("100%"),
        flex: 1,
        gap: wp("2%"),
      }}
      className="bg-[#f9f6ed] justify-start items-center self-center"
    >
      <Text
        style={{
          paddingHorizontal: wp("3%"),
          margin: wp("5%"),
        }}
        className="font-light text-center"
      >
        Make mood tracking fun Pick the emoji theme you prefer.
      </Text>

      {AllEmojis.map((item, index) => (
        <Pressable
          onPress={() => {
            handleSave(item);
          }}
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
  );
}
