import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";
import {Feather} from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const WeekDays = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];

export function New() {

    const [weekDaysState, setWeekDays] = useState<number[]>([]);

    //This function receives the week day index and check if it's already in the array to include then or remove.
    function handleToggleWeekDay(weekDayIndex: number){

        if(weekDaysState.includes(weekDayIndex)){ //If the passed value already is in array, remove 

            setWeekDays(prevState => prevState.filter(day => day !== weekDayIndex));
        }
        else //other wise, include
        {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom:100}}
            >
                
                <BackButton/>

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    Qual o seu comprometimento?
                </Text>

                <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600" 
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                />

                {
                    WeekDays.map((day, index) =>(
                        <Checkbox 
                            key={index}
                            title={day}
                            onPress={()=>handleToggleWeekDay(index )}
                            checked = {weekDaysState.includes(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.7}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white">
                    Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}