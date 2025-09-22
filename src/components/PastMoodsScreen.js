import PastMoodDetails from "./PastMoodDetails";
import { getMyMoods } from "../services/MoodService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    <FlatList
      data={moods}
      renderItem={({ item }) => <PastMoodDetails mood={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: hp("2%") }} />}
      contentContainerStyle={{
        paddingBottom: hp("5%"),
        paddingHorizontal: hp("1%"),
      }}
    />
  );
}
