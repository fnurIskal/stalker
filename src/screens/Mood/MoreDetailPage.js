import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState, useEffect } from "react";
import VoiceRecorder from "../../components/VoiceRecorder";
import Camera from "../../components/Camera";
import * as ImagePicker from "expo-image-picker";
import { insertMoodWithMedia } from "../../services/MoodService";

export default function MoreDetailPage({ route, navigation }) {
  const [audioUri, setAudioUri] = useState(null);
  const [quickNote, setQuickNote] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const moodType = route?.params?.moodType ?? "default";

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlePictureTaken = (newPhoto) => {
    setPhoto(newPhoto.uri);
    setCameraOn(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleAddMood = async () => {
    await insertMoodWithMedia(moodType.value, quickNote, photo, audioUri);
    setIsPressed(true);
    navigation.navigate("BottomNav", { screen: "PastScreen" });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={hp("0%")}
      style={{ flex: 1, backgroundColor: "#f9f6ed" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        {cameraOn ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Camera onPictureTaken={handlePictureTaken} />
          </View>
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingTop: hp("5%"),
              alignItems: "center",
              gap: wp("15%"),
              paddingBottom: hp("12%"),
            }}
          >
            <Text className="text-2xl font-semibold">Add more details</Text>
            <View style={{ gap: wp("6%") }}>
              <View style={{ gap: wp("3%") }}>
                <Text className="font-medium text-base">Quick Note</Text>
                <TextInput
                  mode="outlined"
                  dense
                  multiline
                  placeholder="Add your note..."
                  outlineColor="transparent"
                  activeOutlineColor="transparent"
                  returnKeyType="done"
                  submitBehavior="blurAndSubmit"
                  cursorColor="#130057"
                  style={{
                    width: wp("85%"),
                    height: wp("25%"),
                    backgroundColor: "white",
                  }}
                  outlineStyle={{ borderRadius: 12 }}
                  textColor="black"
                  theme={{
                    colors: {
                      background: "transparent",
                      onSurfaceVariant: "gray",
                    },
                  }}
                  onChangeText={setQuickNote}
                  value={quickNote}
                />
              </View>
              <View style={{ gap: wp("3%") }}>
                <Text className="font-medium text-base">Voice Memo</Text>
                <VoiceRecorder
                  onRecordingComplete={(uri) => setAudioUri(uri)}
                />
              </View>
              <View style={{ gap: wp("3%") }}>
                <Text className="font-medium text-base">Photo</Text>

                {photo ? (
                  <View style={{ alignItems: "center", marginTop: 10 }}>
                    <Image
                      source={{ uri: photo }}
                      style={{
                        width: wp("85%"),
                        height: hp("30%"),
                        borderRadius: 12,
                      }}
                    />
                    <Pressable
                      className="bg-[#570000] rounded-xl items-center justify-center"
                      style={{
                        margin: wp("3%"),
                        width: wp("35%"),
                        height: wp("10%"),
                      }}
                      onPress={() => {
                        setPhoto("");
                      }}
                    >
                      <Text className="color-white text-2xl font-medium">
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <View className="flex-row" style={{ gap: wp("3%") }}>
                    <Pressable
                      onPress={() => setCameraOn(true)}
                      className="flex-1 flex-row bg-white rounded-xl items-center justify-center"
                      style={{ height: wp("15%"), gap: wp("3%") }}
                    >
                      <FontAwesome6
                        name="camera-retro"
                        size={24}
                        color="#130057"
                      />
                      <Text className="font-normal">Camera</Text>
                    </Pressable>

                    <Pressable
                      onPress={pickImage}
                      className="flex-1 flex-row bg-white rounded-xl items-center justify-center"
                      style={{ height: wp("15%"), gap: wp("3%") }}
                    >
                      <FontAwesome6 name="image" size={24} color="#130057" />
                      <Text className="font-normal">Gallery</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
            <Pressable
              disabled={isPressed ? true : false}
              className="rounded-xl items-center justify-center"
              style={{
                width: wp("50%"),
                height: wp("15%"),
                backgroundColor: isPressed ? "#ccc" : "#130057",
              }}
              onPress={handleAddMood}
            >
              <Text className="color-white text-2xl font-medium">Save</Text>
            </Pressable>
          </ScrollView>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
