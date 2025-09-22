import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { TextInput } from "react-native-paper";
import CustomButton from "./CustomButton";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { HabitCategoryColors } from "../data/HabitCategoryColors";
import { LinearGradient } from "expo-linear-gradient";

const getContrastingTextColor = (hexColor) => {
  if (!hexColor || !hexColor.startsWith("#")) {
    return "#ffffff"; // Varsayılan olarak beyaz
  }
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#000000" : "#ffffff";
};

export default function NewHabitScreen({ onSelect }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [name, setName] = useState("");

  const selectedTextColor = getContrastingTextColor(selectedItem?.color1);

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
              {HabitCategoryColors.map((item, index) => {
                const textColor = getContrastingTextColor(item.color1);
                return (
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
                      <Text
                        className="font-bold text-xl"
                        style={{ color: textColor }}
                      >
                        {item.category}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                );
              })}
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
              <Text
                className="font-bold text-xl"
                style={{ color: selectedTextColor }}
              >
                {selectedItem.category}
              </Text>
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
