import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";
import VoiceRecorder from "../../components/VoiceRecorder";

export default function MoreDetailPage() {
  const [quickNote, setQuickNote] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f9f6ed" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
              <VoiceRecorder />
            </View>
            <View style={{ gap: wp("3%") }}>
              <Text className="font-medium text-base">Photo</Text>
              <View className="flex-row" style={{ gap: wp("3%") }}>
                <Pressable
                  className="flex-1 flex-row bg-white rounded-xl items-center justify-center"
                  style={{ height: wp("15%"), gap: wp("3%") }}
                >
                  <FontAwesome6 name="camera-retro" size={24} color="#130057" />
                  <Text className="font-normal">Camera</Text>
                </Pressable>
                <Pressable
                  className="flex-1 flex-row bg-white rounded-xl items-center justify-center"
                  style={{ height: wp("15%"), gap: wp("3%") }}
                >
                  <FontAwesome6 name="image" size={24} color="#130057" />
                  <Text className="font-normal">Gallery</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Pressable
            className="bg-[#130057] rounded-xl items-center justify-center"
            style={{ width: wp("50%"), height: wp("15%") }}
            onPress={() => {
              console.log(quickNote);
            }}
          >
            <Text className="color-white text-2xl font-medium">Save</Text>
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
