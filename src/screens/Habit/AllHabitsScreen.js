import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import WeekCalendar from '../../components/WeekCalendar'


export default function AllHabitsScreen({navigation}) {
  return (
    <View    style={{
            flex: 1,
            backgroundColor: "#f9f6ed",
            padding: wp("4%"),
          }}>
            <Pressable onPress={()=>navigation.navigate("CreateHabitScreen")} style={{
                padding:wp("4%"),
                backgroundColor:"green",
                borderRadius:75,
                width:wp("15%"),
                
            }}> 
                <Text>ekle</Text>
            </Pressable>

        <View className="bg-slate-300 rounded-sm">
            <View className="flex-row justify-between items-center"> <Text>Readin a book</Text>
<Text>Streak</Text>
</View>

            <WeekCalendar/>
        </View>
    </View>
  )
}