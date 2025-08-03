import PastMoodDetails from "./PastMoodDetails";
import { getMyMoods } from "../services/MoodService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function PastMoodsScreen() {
  const [moods, setMoods] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const moods = await getMyMoods();
        setMoods(moods);
      };
      fetchData();
    }, [])
  );

  if (!moods)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  return (
    <>
      {moods.map((mood, index) => (
        <View key={index}>
          <PastMoodDetails mood={mood} />
        </View>
      ))}
    </>
  );
}
