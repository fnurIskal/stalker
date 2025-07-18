import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNav";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import MoodSelectPage from "./src/screens/Mood/MoodSelectPage";
import MoreDetailPage from "./src/screens/Mood/MoreDetailPage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMoodScreen"
        component={MoodSelectPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#f9f6ed",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: wp("5%") }}
            >
              <Ionicons
                name="arrow-undo-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DetailedMoodScreen"
        component={MoreDetailPage}
        options={({ navigation }) => ({
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#f9f6ed",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: wp("5%") }}
            >
              <Ionicons
                name="arrow-undo-circle-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <PaperProvider>
            <AppStack />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
