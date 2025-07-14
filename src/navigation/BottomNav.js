import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalenderScreen from "../screens/CalenderScreen";
import HomeScreen from "../screens/HomeScreen";
import PastScreen from "../screens/PastScreen";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitle: "stalker",
        headerStyle: {
          backgroundColor: "#f9f6ed",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleAlign: "center",
        headerTintColor: "#3750a0",
        headerTitleStyle: {
          fontWeight: "bold",
        },
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
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom + wp("2%"),
          marginLeft: wp("5%"),
          backgroundColor: "#f9f6ed",
          borderRadius: 20,
          height: wp("14%"),
          elevation: 4,
          shadowColor: "#000",
          width: wp("90%"),
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 4,
        },
      }}
    >
      <Tab.Screen
        name="PastScreen"
        component={PastScreen}
        options={{
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#3750a0",
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: wp("1%"),
              }}
            >
              {focused ? (
                <View
                  style={{
                    gap: wp("2%"),
                    width: wp("22%"),
                    height: wp("7%"),
                    marginTop: wp("2%"),
                  }}
                  className="justify-center items-center flex-row bg-slate-400"
                >
                  <EvilIcons
                    name="archive"
                    size={34}
                    color={focused ? "#3750a0" : "gray"}
                  />
                  <Text
                    style={{
                      marginTop: wp("2%"),
                    }}
                  >
                    Past
                  </Text>
                </View>
              ) : (
                <EvilIcons
                  name="archive"
                  size={34}
                  color={focused ? "#3750a0" : "gray"}
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#3750a0",
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: wp("2%"),
              }}
            >
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#3750a0" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CalenderScreen"
        component={CalenderScreen}
        options={{
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#3750a0",
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: wp("2%"),
              }}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={focused ? "#3750a0" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNav;
