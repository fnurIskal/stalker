import { useState, useRef, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import {
  useAudioRecorder,
  useAudioPlayer,
  useAudioPlayerStatus,
  RecordingPresets,
  AudioModule,
  setAudioModeAsync,
} from "expo-audio";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export default function VoiceRecorder({ onRecordingComplete }) {
  const [recordedUri, setRecordedUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const pressInTimerRef = useRef(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const player = useAudioPlayer(recordedUri ? { uri: recordedUri } : null);
  const playerState = useAudioPlayerStatus(player);

  const record = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsRecording(true);
    } catch (error) {
      Alert.alert("Kayıt başlatılamadı", error.message);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      setIsRecording(false);

      const uri = audioRecorder.uri;
      if (uri) {
        setRecordedUri(uri);
        if (onRecordingComplete) onRecordingComplete(uri);
      } else {
        Alert.alert("Kayıt URI bulunamadı.");
      }
    } catch (error) {
      Alert.alert("Kayıt durdurulamadı", error.message);
    }
  };

  const handlePressIn = () => {
    pressInTimerRef.current = setTimeout(() => {
      record();
    }, 200);
  };

  const handlePressOut = () => {
    clearTimeout(pressInTimerRef.current);
    if (isRecording) {
      stopRecording();
    }
  };

  const handleDelete = () => {
    setRecordedUri(null);
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Mikrofon izni verilmedi.");
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    <View>
      {recordedUri && player ? (
        <View
          className="flex-row rounded-xl items-center justify-between px-4"
          style={{
            width: wp("85%"),
            height: wp("15%"),
            backgroundColor: "white",
          }}
        >
          <Pressable
            onPress={() => {
              if (playerState?.playing) {
                player.pause();
              } else {
                player.seekTo(0);
                player.play();
              }
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: wp("3%"),
            }}
          >
            <AntDesign
              name={playerState?.playing ? "pausecircleo" : "play"}
              size={30}
              color="black"
            />
            <Text>{playerState?.playing ? "Playing..." : "Tap to Play"}</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Feather name="trash-2" size={24} color="red" />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          className="flex-row rounded-xl items-center justify-center"
          style={{
            width: wp("85%"),
            height: wp("15%"),
            gap: wp("3%"),
            backgroundColor: isRecording ? "red" : "white",
          }}
        >
          <FontAwesome6 name="microphone-lines" size={24} color="#130057" />
          <Text>{isRecording ? "Recording..." : "Hold to Record"}</Text>
        </Pressable>
      )}
    </View>
  );
}
