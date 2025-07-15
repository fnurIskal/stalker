import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoodSelectPage from "../screens/Mood/MoodSelectPage";
import MoreDetailPage from "../screens/Mood/MoreDetailPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MoodStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#f9f6ed",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerLeft: () => (
          <View style={{ marginLeft: wp("5%") }}>
            <Ionicons
              name="arrow-undo-circle-outline"
              size={30}
              color="black"
            />
          </View>
        ),
      }}
    >
      <Stack.Screen name="Mood" component={MoodSelectPage} />
      <Stack.Screen name="MoreDetail" component={MoreDetailPage} />
    </Stack.Navigator>
  );
}
