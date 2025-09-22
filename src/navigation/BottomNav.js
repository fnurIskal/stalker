import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import PastScreen from "../screens/PastScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const PRIMARY_COLOR = "#3e8440";
const ACTIVE_COLOR = "#fff";
const INACTIVE_COLOR = "rgba(255, 255, 255, 0.7)";

const Tab = createBottomTabNavigator();

function getIconByRouteName(routeName, color) {
  switch (routeName) {
    case "HomeStack":
      return <AntDesign name="home" size={24} color={color} />;
    case "PastScreen":
      return <AntDesign name="folderopen" size={24} color={color} />;
    default:
      return <AntDesign name="home" size={24} color={color} />;
  }
}

const AnimatedTabItem = ({ isFocused, onPress, label, routeName }) => {
  const animatedPillStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isFocused ? 1 : 0),
      transform: [{ scale: withSpring(isFocused ? 1 : 0.5) }],
    };
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Animated.View style={[styles.activePill, animatedPillStyle]} />
      <View style={{ alignItems: "center", gap: 4 }}>
        {getIconByRouteName(
          routeName,
          isFocused ? ACTIVE_COLOR : INACTIVE_COLOR
        )}
        <Text
          style={[
            styles.text,
            { color: isFocused ? ACTIVE_COLOR : INACTIVE_COLOR },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function CustomBottomNav({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
            <AnimatedTabItem
              key={route.key}
              isFocused={isFocused}
              onPress={onPress}
              label={label}
              routeName={route.name}
            />
          );
        })}
      </View>
    </View>
  );
}

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBar={(props) => <CustomBottomNav {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="PastScreen"
        component={PastScreen}
        options={{ title: "Past", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: hp("5%"),
  },
  innerContainer: {
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: wp("2%"),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activePill: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    width: "40%",
    height: "100%",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default BottomNav;
