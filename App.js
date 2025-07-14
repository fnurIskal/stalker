import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import BottomNav from "./src/navigation/BottomNav";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
