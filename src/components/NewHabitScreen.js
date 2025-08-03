import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { TextInput } from "react-native-paper";
import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { HabitCategoryColors } from "../data/HabitCategoryColors";
import { LinearGradient } from "expo-linear-gradient";

export default function NewHabitScreen({ onSelect }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");

  return (
    <>
      <Text className="font-bold text-4xl text-center color-[#1d6517]">
        Start something{"\n"}new today!
      </Text>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f9f6ed",
          padding: wp("4%"),
        }}
        contentContainerStyle={{
          paddingBottom: wp("10%"),
        }}
      >
        <View>
          <Text
            className="text-2xl font-bold"
            style={{ textAlign: "center", marginBottom: wp("4%") }}
          >
            Choose Your Category
          </Text>

          {!selectedItem ? (
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                gap: wp("2%"),
                width: wp("85%"),
              }}
            >
              {HabitCategoryColors.map((item, index) => (
                <Pressable
                  style={{ width: wp("40%") }}
                  key={index}
                  onPress={() => setSelectedItem(item)}
                >
                  <LinearGradient
                    colors={[item?.color1 || "#ccc", item?.color2 || "#999"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      flex: 1,
                      paddingHorizontal: wp("4%"),
                      borderRadius: 12,
                      height: wp("18%"),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text className="font-bold text-xl">{item.category}</Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>
          ) : (
            <LinearGradient
              colors={[
                selectedItem?.color1 || "#ccc",
                selectedItem?.color2 || "#999",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingHorizontal: wp("4%"),
                borderRadius: 12,
                width: wp("85%"),
                height: wp("18%"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="font-bold text-xl">{selectedItem.category}</Text>
              <Pressable
                style={{
                  position: "absolute",
                  right: wp("2"),
                  top: wp("5%"),
                  backgroundColor: "#ffebee",
                  borderRadius: 9999,
                }}
                onPress={() => setSelectedItem("")}
              >
                <Entypo name="cross" size={30} color="#e53935" />
              </Pressable>
            </LinearGradient>
          )}
          <Text
            className="text-2xl font-bold"
            style={{
              textAlign: "center",
              marginTop: wp("10%"),
              marginBottom: wp("3%"),
            }}
          >
            Add a Name
          </Text>
          <TextInput
            mode="outlined"
            label="Habit Name"
            value={name}
            onChangeText={setName}
            outlineColor="#000"
            activeOutlineColor="#000"
            style={{
              width: wp("75%"),
              alignSelf: "center",
              borderRadius: 24,
            }}
          />
        </View>
      </ScrollView>
      <CustomButton
        title="Add new habit"
        onPress={() => onSelect(selectedItem.category, name)}
      />
    </>
  );
}
