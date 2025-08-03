import AsyncStorage from "@react-native-async-storage/async-storage";

export const EmojiTypeSave = async (emojiType) => {
  try {
    const value =
      typeof emojiType === "string" ? emojiType : JSON.stringify(emojiType);
    await AsyncStorage.setItem("emojiType", value);
  } catch (error) {
    console.error(error);
  }
};

export const GetEmojiType = async () => {
  try {
    const str = await AsyncStorage.getItem("emojiType");
    if (!str) return null;
    return JSON.parse(str);
  } catch (error) {
    console.error("Load error:", error);
    return null;
  }
};
