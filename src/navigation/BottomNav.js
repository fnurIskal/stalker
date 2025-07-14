import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CalenderScreen from "../screens/CalenderScreen";
import HomeScreen from "../screens/HomeScreen";
import PastScreen from "../screens/PastScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const PRIMARY_COLOR = "#130057";
const SECONDARY_COLOR = "#fff";

const Tab = createBottomTabNavigator();

function CustomBottomNav({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition.springify().mass(0.5)}
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? SECONDARY_COLOR : "transparent" },
            ]}
          >
            {getIconByRouteName(
              route.name,
              isFocused ? PRIMARY_COLOR : SECONDARY_COLOR
            )}
            {isFocused && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                style={styles.text}
              >
                {label}
              </Animated.Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );

  function getIconByRouteName(routeName, color) {
    switch (routeName) {
      case "HomeScreen":
        return <AntDesign name="home" size={24} color={color} />;
      case "CalendarScreen":
        return <AntDesign name="calendar" size={24} color={color} />;
      case "PastScreen":
        return <AntDesign name="folderopen" size={24} color={color} />;
      default:
        return <AntDesign name="home" size={24} color={color} />;
    }
  }
}

function BottomNav() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomNav {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        headerTitle: "Stalker",
        headerStyle: {
          backgroundColor: "#f9f6ed",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleAlign: "center",
        headerTintColor: "#130057",
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
      }}
    >
      <Tab.Screen
        name="PastScreen"
        component={PastScreen}
        options={{ title: "Past" }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalenderScreen}
        options={{ title: "Calendar" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: wp("80%"),
    alignSelf: "center",
    bottom: hp("6%"),
    borderRadius: 40,
    paddingVertical: wp("4%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    gap: wp("3%"),
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp("4.5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 30,
  },
  text: {
    color: PRIMARY_COLOR,
    marginLeft: wp("2%"),
    fontWeight: "500",
  },
});

export default BottomNav;
