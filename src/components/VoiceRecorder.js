import { useState, useRef } from "react";
import { Pressable, Text } from "react-native";
import { Audio } from "expo-av";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function VoiceRecorder({ onRecordingComplete }) {
  const [recordedUri, setRecordedUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef(null);
  const soundRef = useRef(null);

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        alert("Recording permission is required!");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();

      recordingRef.current = newRecording;
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recordingRef.current) return;

      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      setRecordedUri(uri);
      setIsRecording(false);

      if (onRecordingComplete && typeof onRecordingComplete === "function") {
        onRecordingComplete(uri);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
      soundRef.current = sound;
      await sound.playAsync();
    } catch (err) {
      console.error("Error playing sound", err);
    }
  };

  return (
    <>
      <Pressable
        onPressIn={startRecording}
        onPressOut={stopRecording}
        className="flex-row rounded-xl items-center justify-center"
        style={{
          width: wp("85%"),
          height: wp("15%"),
          gap: wp("3%"),
          backgroundColor: isRecording ? "red" : "white",
        }}
      >
        <FontAwesome6 name="microphone-lines" size={24} color="#130057" />
        <Text className="font-normal">
          {isRecording ? "Recording..." : "Hold to Record"}
        </Text>
      </Pressable>
      {recordedUri && (
        <Pressable onPress={playSound}>
          <Text>Play Recorded Audio</Text>
        </Pressable>
      )}
    </>
  );
}
