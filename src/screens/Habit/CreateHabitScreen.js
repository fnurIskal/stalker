import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Entypo from '@expo/vector-icons/Entypo';
import { TextInput } from "react-native-paper";
import CustomButton from "../../components/CustomButton";

export default function CreateHabitScreen() {
  const categories = ["Personal", "Health", "Financial", "Hobby", "Bad Habbits"];
  const [selectedItem, setSelectedItem] = useState("");
const [name,setName] = useState("")
const handlePress=()=>{
  console.log("oldu")
}
  console.log(selectedItem);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9f6ed",
        padding: wp("4%"),
      }}
    >
      <View>
        <Text className="text-2xl font-bold" style={{ textAlign: "center", marginBottom: wp("4%") }}>
          Choose Your Category
        </Text>

        {!selectedItem ? (
          <View>
            {categories.map((item, index) => (
              <Pressable key={index} onPress={() => setSelectedItem(item)}>
                <Text
                  style={{
                    backgroundColor: "#ffc4c4",
                    marginTop: wp("2%"),
                    padding: wp("3%"),
                    width: wp("70%"),
                    alignSelf: "center",
                    textAlign: "center",
                    borderRadius: 24,
                    color:"#850e35"
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View   style={{
                backgroundColor: "#ffc4c4",
                color:"#850e35",
                marginTop: wp("2%"),
                padding: wp("3%"),
                width: wp("70%"),
                alignSelf: "center",
                textAlign: "center",
                borderRadius: 24,
                flexDirection:"row",
                justifyContent:"center",
              }}>
            <Text
            
            >
              {selectedItem}
            </Text>
            <Pressable style={{position:"absolute" ,right:wp("2"),top:wp("2%")}} onPress={() => setSelectedItem("")}>
              <Entypo name="cross" size={24} color="red" />
            </Pressable>
          </View>
        )}
         <Text className="text-2xl font-bold" style={{ textAlign: "center", marginTop: wp("10%") ,marginBottom:wp("3%")}}>
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
    width:wp("75%"),
    alignSelf:"center",
    borderRadius:24
  }} 
/>
<CustomButton onPress={handlePress} title="Create"/>
      </View>
    </View>
  );
}
