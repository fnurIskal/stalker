import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Camera({ onPictureTaken }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (onPictureTaken) {
        onPictureTaken(photo);
      }
    }
  }

  return (
    <View style={styles.fullScreen}>
      <StatusBar hidden />
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.controlOverlay}>
          <Pressable style={styles.captureButton} onPress={takePicture} />
          <Pressable style={styles.flipButton} onPress={toggleCameraFacing}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "black",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  controlOverlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  flipButton: {
    backgroundColor: "#ffffff88",
    padding: 12,
    borderRadius: 10,
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#00000088",
  },
});
