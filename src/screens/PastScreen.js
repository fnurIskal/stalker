import { View, TouchableOpacity } from "react-native";
import { useState, useLayoutEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SegmentedButtons } from "react-native-paper";
import PastMoodsScreen from "../components/PastMoodsScreen";
import PastHabitsScreen from "../components/PastHabitsScreen";
import { useRoute, useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import PremiumModal from "../components/PremiumModal";

export default function PastScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { screenName } = route.params || {};
  const [screen, setScreen] = useState(screenName || "moods");
  const [modalVisible, setModalVisible] = useState(false);

  const openPremiumModal = () => {
    setModalVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={openPremiumModal}
          style={{ marginLeft: wp("5%") }}
        >
          <MaterialCommunityIcons name="crown" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        paddingHorizontal: wp("4%"),
        paddingTop: wp("4%"),
        gap: wp("5%"),
      }}
    >
      <SegmentedButtons
        value={screen}
        onValueChange={setScreen}
        buttons={[
          {
            value: "moods",
            label: "Moods",
            style: {
              backgroundColor: screen === "moods" ? "#3e8440" : "white",
            },
            checkedColor: screen === "moods" ? "white" : "#3e8440",
          },
          {
            value: "habits",
            label: "Habits",
            style: {
              backgroundColor: screen === "habits" ? "#3e8440" : "white",
            },
            checkedColor: screen === "habits" ? "white" : "#3e8440",
          },
        ]}
      />
      {screen === "moods" && <PastMoodsScreen />}
      {screen === "habits" && <PastHabitsScreen />}
      <PremiumModal
        visible={modalVisible}
        onDissmis={() => setModalVisible(false)}
      />
    </View>
  );
}
