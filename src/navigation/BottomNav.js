import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import PastScreen from "../screens/PastScreen";
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
import Entypo from "@expo/vector-icons/Entypo";
import PremiumModal from "../components/PremiumModal";
import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const PRIMARY_COLOR = "#a8df8e";
const ACTIVE_COLOR = "#01ad47";
const INACTIVE_COLOR = "rgba(255, 255, 255, 0.7)";

const Tab = createBottomTabNavigator();

function getIconByRouteName(routeName, color) {
  switch (routeName) {
    case "HomeStack":
      return <Entypo name="emoji-happy" size={20} color={color} />;
    case "PastScreen":
      return (
        <MaterialCommunityIcons name="bookshelf" size={24} color={color} />
      );
    case "PremiumModal":
      return <MaterialCommunityIcons name="crown" size={24} color={color} />;
    default:
      return <Entypo name="emoji-happy" size={20} color={color} />;
  }
}

const AnimatedTabItem = ({ isFocused, onPress, label, routeName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
  const navigation = useNavigation();

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
        options={{ title: "Moods", headerShown: false }}
      />
      <Tab.Screen
        name="PastScreen"
        component={PastScreen}
        options={{
          title: "Habits",
          headerTitleAlign: "center",
          headerRight: () => (
            <Feather
              style={{ marginRight: wp("5%") }}
              name="plus"
              size={24}
              color="black"
              onPress={() => navigation.navigate("HabitSelectPage")}
            />
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f9f6ed",
          },
        }}
      />
      <Tab.Screen
        name="PremiumModal"
        component={PremiumModal}
        options={{
          title: "Premium",
          headerTitle: "Choose your emoji theme",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f9f6ed",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
