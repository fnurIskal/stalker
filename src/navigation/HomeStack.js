import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function HomeStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Stalker",
          headerStyle: {
            backgroundColor: "#f9f6ed",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleAlign: "center",
          headerTintColor: "#130057",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => (
            <View style={{ marginRight: wp("5%") }}>
              <AntDesign name="setting" size={30} color="black" />
            </View>
          ),
          headerLeft: () => (
            <View style={{ marginLeft: wp("5%") }}>
              <MaterialCommunityIcons name="crown" size={30} color="black" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
