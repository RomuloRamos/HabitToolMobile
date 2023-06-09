import { View, Text, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { generateDaysFromYearBegining } from "../utils/generate-days-from-year-begining";
import { api } from "../lib/axios";
import { useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ['D','S','T','Q','Q','S','S'];

const datesFromYearStart = generateDaysFromYearBegining();
const mininumSummaryDateSize = 18*7;
const amountOfDaysToFill = mininumSummaryDateSize - datesFromYearStart.length;

type SummaryProps = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

enum RequestData {
    Status_Loading = 0,
    Status_Done,
    Status_Error
}

export function Home(){

    const [loading, setLoading] = useState<RequestData>(RequestData.Status_Loading);
    const [summary, setSummary] = useState<SummaryProps >([]);

    const {navigate} = useNavigation();
    
    async function fetchData() {
        try {
            setLoading(RequestData.Status_Loading);
            
            const response = await api.get('/summary');
            setSummary(response.data);
            setLoading(RequestData.Status_Done);
        } catch (error) {
            setLoading(RequestData.Status_Error);
            Alert.alert('Ops', 'Não foi possível carregar as informações sobe os hábitos');
        }
    }

    useFocusEffect(
        useCallback(()=>{
            fetchData();
    },[]));
        
    if(loading === RequestData.Status_Loading){
        return (
            <Loading></Loading>
        )
    }
    if(loading === RequestData.Status_Error){
        return (
            <View className="flex-1 bg-background px-8 pt-16">
                <Header />
                <Text className="text-zinc-400 text-base mt-6">
                    Sem Connexão com o servidor :(
                </Text>
            </View>
        )
    }
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                {weekDays.map((day, index) =>(
                    <Text 
                        key={`${day}-${index}`}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{width: DAY_SIZE}}
                    >
                        {day}
                    </Text>
                ))}
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{paddingBottom:100}}
            >
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                            
                            const dayWithHabits = summary.find(day =>{
                                return dayjs(date).isSame(day.date, 'day');
                            })
                            
                            return(
                                <HabitDay 
                                    key={date.toISOString()}
                                    date = {date}
                                    completed={dayWithHabits?.completed}
                                    amountOfHabits={dayWithHabits?.amount}
                                    onPress={()=> navigate('habit', {date: date.toISOString()})} //Navigate to Habit Screen passing the date as parameter
                                />
                            )
                        })
                    }
                    {
                        amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, index)=>{
                            return(
                                <View
                                    key={index}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40 "
                                    style={{width: DAY_SIZE, height: DAY_SIZE}}>

                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}